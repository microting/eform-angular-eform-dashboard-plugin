/*
The MIT License (MIT)

Copyright (c) 2007 - 2019 Microting A/S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

using System;
using System.Collections.Generic;
using System.Reflection;
using eFormDashboard.Pn.Infrastructure.Constants;
using eFormDashboard.Pn.Infrastructure.Data.Seed;
using eFormDashboard.Pn.Infrastructure.Data.Seed.Data;
using eFormDashboard.Pn.Services.Common.eFormDashboardLocalizationService;
using eFormDashboard.Pn.Services.DashboardService;
using eFormDashboard.Pn.Services.DictionaryService;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microting.eFormApi.BasePn;
using Microting.eFormApi.BasePn.Infrastructure.Database.Extensions;
using Microting.eFormApi.BasePn.Infrastructure.Helpers;
using Microting.eFormApi.BasePn.Infrastructure.Models.Application;
using Microting.eFormApi.BasePn.Infrastructure.Settings;
using Microting.eFormDashboardBase.Infrastructure.Data;
using Microting.eFormDashboardBase.Infrastructure.Data.Factories;

namespace eFormDashboard.Pn
{
    public class EformDashboardPlugin : IEformPlugin
    {
        public string Name => "Microting eForm Dashboard Plugin";
        public string PluginId => "eform-angular-eform-dashboard-plugin";
        public string PluginPath => PluginAssembly().Location;
        public string PluginBaseUrl => "eform-dashboard-pn";

        public Assembly PluginAssembly()
        {
            return typeof(EformDashboardPlugin).GetTypeInfo().Assembly;
        }

        public void Configure(IApplicationBuilder appBuilder)
        {
            // Do nothing
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IeFormDashboardLocalizationService, EFormDashboardLocalizationService>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped<IDictionaryService, DictionaryService>();
        }

        public void ConfigureOptionsServices(IServiceCollection services, IConfiguration configuration)
        {
            // services.ConfigurePluginDbOptions<eFormDashboardBaseSettings>(
            //     configuration.GetSection("eFormDashboardBaseSettings"));
        }

        public void ConfigureDbContext(IServiceCollection services, string connectionString)
        {
            if (connectionString.ToLower().Contains("convert zero datetime"))
            {
                services.AddDbContext<eFormDashboardPnDbContext>(o => o.UseMySql(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }
            else
            {
                services.AddDbContext<eFormDashboardPnDbContext>(o => o.UseSqlServer(connectionString,
                    b => b.MigrationsAssembly(PluginAssembly().FullName)));
            }

            var contextFactory = new eFormDashboardPnDbContextFactory();
            var context = contextFactory.CreateDbContext(new[] {connectionString});

            context.Database.Migrate();

            // Seed database
            SeedDatabase(connectionString);
        }

        public MenuModel HeaderMenu(IServiceProvider serviceProvider)
        {
            var localizationService = serviceProvider
                .GetService<IeFormDashboardLocalizationService>();

            var result = new MenuModel();
            result.LeftMenu.Add(new MenuItemModel()
            {
                Name = localizationService.GetString("eFormDashboard"),
                E2EId = "",
                Link = "",
                Guards = new List<string>() { eFormDashboardClaims.AccesseFormDashboardPlugin },
                MenuItems = new List<MenuItemModel>()
                {
                    new MenuItemModel()
                    {
                        Name = localizationService.GetString("Dashboards"),
                        E2EId = "eform-dashboard-pn-dashboards",
                        Link = "/plugins/eform-dashboard-pn/dashboards",
                        Position = 1
                    },
                }
            });
            return result;
        }

        public void SeedDatabase(string connectionString)
        {
            var contextFactory = new eFormDashboardPnDbContextFactory();
            using (var context = contextFactory.CreateDbContext(new []{connectionString}))
            {
                eFormDashboardPluginSeed.SeedData(context);
            }
        }

        public void AddPluginConfig(IConfigurationBuilder builder, string connectionString)
        {
            var seedData = new eFormDashboardConfigurationSeedData();
            var contextFactory = new eFormDashboardPnDbContextFactory();
            builder.AddPluginConfiguration(
                connectionString, 
                seedData, 
                contextFactory);
        }

        public PluginPermissionsManager GetPermissionsManager(string connectionString)
        {
            var contextFactory = new eFormDashboardPnDbContextFactory();
            var context = contextFactory.CreateDbContext(new[] { connectionString });

            return new PluginPermissionsManager(context);
        }
    }
}