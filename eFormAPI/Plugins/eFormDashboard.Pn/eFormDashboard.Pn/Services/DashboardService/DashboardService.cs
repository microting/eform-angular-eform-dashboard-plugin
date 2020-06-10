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
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using eFormDashboard.Pn.Infrastructure.Helpers;
using eFormDashboard.Pn.Infrastructure.Models.Dashboards;
using eFormDashboard.Pn.Services.Common.eFormDashboardLocalizationService;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microting.eForm.Infrastructure.Constants;
using Microting.eFormApi.BasePn.Abstractions;
using Microting.eFormApi.BasePn.Infrastructure.Extensions;
using Microting.eFormApi.BasePn.Infrastructure.Models.API;
using Microting.eFormApi.BasePn.Infrastructure.Models.Common;
using Microting.eFormDashboardBase.Infrastructure.Data;
using Microting.eFormDashboardBase.Infrastructure.Data.Entities;

namespace eFormDashboard.Pn.Services.DashboardService
{
    public class DashboardService : IDashboardService
    {
        private readonly ILogger<DashboardService> _logger;
        private readonly IeFormDashboardLocalizationService _localizationService;
        private readonly IEFormCoreService _coreHelper;
        private readonly eFormDashboardPnDbContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DashboardService(
            ILogger<DashboardService> logger,
            IeFormDashboardLocalizationService localizationService,
            IEFormCoreService coreHelper,
            eFormDashboardPnDbContext dbContext,
            IHttpContextAccessor httpContextAccessor)
        {
            _logger = logger;
            _localizationService = localizationService;
            _coreHelper = coreHelper;
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<OperationDataResult<DashboardsListModel>> GetAll(DashboardsRequestModel requestModel)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                var result = new DashboardsListModel();
                var dashboardsQueryable = _dbContext.Dashboards
                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                    .AsNoTracking()
                    .AsQueryable();

                if (!string.IsNullOrEmpty(requestModel.SearchString))
                {
                    dashboardsQueryable = dashboardsQueryable
                        .Where(x => x.Name.Contains(
                            requestModel.SearchString,
                            StringComparison.CurrentCultureIgnoreCase));
                }

                if (!string.IsNullOrEmpty(requestModel.Sort))
                {
                    if (requestModel.IsSortDsc)
                    {
                        dashboardsQueryable = dashboardsQueryable
                            .CustomOrderByDescending(requestModel.Sort);
                    }
                    else
                    {
                        dashboardsQueryable = dashboardsQueryable
                            .CustomOrderBy(requestModel.Sort);
                    }
                }
                else
                {
                    dashboardsQueryable = dashboardsQueryable
                        .OrderBy(x => x.Id);
                }

                result.Total = await dashboardsQueryable
                    .Select(x => x.Id)
                    .CountAsync();

                dashboardsQueryable = dashboardsQueryable
                    .Skip(requestModel.Offset)
                    .Take(requestModel.PageSize);

                // dashboards
                var dashboards = await dashboardsQueryable
                    .Select(x => new DashboardModel
                    {
                        Id = x.Id,
                        eFormId = x.eFormId,
                        LocationId = x.LocationId,
                        TagId = x.TagId,
                        DashboardName = x.Name,
                        DateFrom = x.DateFrom,
                        DateTo = x.DateTo,
                    })
                    .ToListAsync();

                foreach (var dashboardModel in dashboards)
                {
                    using (var sdkContext = core.dbContextHelper.GetDbContext())
                    {
                        dashboardModel.SurveyName = await sdkContext.question_sets
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboardModel.eFormId)
                            .Select(x => x.Name)
                            .FirstOrDefaultAsync();

                        if (dashboardModel.LocationId != null)
                        {
                            dashboardModel.LocationName = await sdkContext.sites
                                .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                .Where(x => x.Id == dashboardModel.LocationId)
                                .Select(x => x.Name)
                                .FirstOrDefaultAsync();
                        }

                        if (dashboardModel.TagId != null)
                        {
                            dashboardModel.TagName = await sdkContext.tags
                                .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                .Where(x => x.Id == dashboardModel.TagId)
                                .Select(x => x.Name)
                                .FirstOrDefaultAsync();
                        }
                    }
                }

                result.DashboardList = dashboards;
                return new OperationDataResult<DashboardsListModel>(true, result);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<DashboardsListModel>(false,
                    _localizationService.GetString("ErrorWhileObtainingDashboardList"));
            }
        }

        public async Task<OperationDataResult<int>> Create(DashboardCreateModel createModel)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {

                    if (!await sdkContext
                        .question_sets
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .AnyAsync(x=>x.Id == createModel.eFormId))
                    {
                        return new OperationDataResult<int>(
                            false,
                            _localizationService.GetString("SurveyNotFound"));
                    }
                }

                var dashboard = new Dashboard
                {
                    CreatedByUserId = UserId,
                    UpdatedByUserId = UserId,
                    Name = createModel.Name,
                    eFormId = createModel.eFormId,
                };

                await dashboard.Create(_dbContext);
                return new OperationDataResult<int>(
                    true,
                    _localizationService.GetString("DashboardCreatedSuccessfully"),
                    dashboard.Id);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<int>(false,
                    _localizationService.GetString("ErrorWhileCreatingNewDashboard"));
            }
        }

        public async Task<OperationResult> Copy(int dashboardId)
        {
            try
            {
                using (var transaction = await _dbContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var dashboard = await _dbContext.Dashboards
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.CompareLocationsTags)
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.IgnoredFieldValues)
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .FirstOrDefaultAsync(x => x.Id == dashboardId);

                        if (dashboard == null)
                        {
                            return new OperationResult(
                                false,
                                _localizationService.GetString("DashboardNotFound"));
                        }

                        var newDashboard = new Dashboard
                        {
                            Name = dashboard.Name,
                            eFormId = dashboard.eFormId,
                            CreatedByUserId = UserId,
                            UpdatedByUserId = UserId,
                        };

                        await newDashboard.Create(_dbContext);

                        newDashboard.LocationId = dashboard.LocationId;
                        newDashboard.TagId = dashboard.TagId;
                        newDashboard.DateFrom = dashboard.DateFrom;
                        newDashboard.DateTo = dashboard.DateTo;
                        newDashboard.Today = dashboard.Today;
                        newDashboard.UpdatedByUserId = UserId;

                        await newDashboard.Update(_dbContext);

                        foreach (var dashboardItem in dashboard
                            .DashboardItems
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed))
                        {
                            var newDashboardItem = new DashboardItem
                            {
                                DashboardId = newDashboard.Id,
                                CreatedByUserId = UserId,
                                UpdatedByUserId = UserId,
                                ChartType = dashboardItem.ChartType,
                                FilterFieldId = dashboardItem.FilterFieldId,
                                FilterFieldOptionId = dashboardItem.FilterFieldOptionId,
                                FieldId = dashboardItem.FieldId,
                                Period = dashboardItem.Period,
                                Position = dashboardItem.Position,
                                CalculateAverage = dashboardItem.CalculateAverage,
                                CompareEnabled = dashboardItem.CompareEnabled,
                            };

                            await newDashboardItem.Create(_dbContext);

                            // Compare
                            foreach (var dashboardItemCompare in dashboardItem.CompareLocationsTags.Where(x =>
                                x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                var newDashboardItemCompare = new DashboardItemCompare
                                {
                                    CreatedByUserId = UserId,
                                    UpdatedByUserId = UserId,
                                    DashboardItemId = newDashboardItem.Id,
                                    LocationId = dashboardItemCompare.LocationId,
                                    Position = dashboardItemCompare.Position,
                                    TagId = dashboardItemCompare.TagId,
                                };

                                await newDashboardItemCompare.Create(_dbContext);
                            }

                            // Ignore
                            foreach (var dashboardItemIgnoredAnswer in dashboardItem
                                .IgnoredFieldValues
                                .Where(x =>
                                    x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                var newDashboardItemIgnoredAnswer = new DashboardItemIgnoredFieldValue()
                                {
                                    CreatedByUserId = UserId,
                                    UpdatedByUserId = UserId,
                                    DashboardItemId = newDashboardItem.Id,
                                    FieldOptionId = dashboardItemIgnoredAnswer.FieldOptionId,
                                };

                                await newDashboardItemIgnoredAnswer.Create(_dbContext);
                            }
                        }

                        transaction.Commit();
                        return new OperationResult(
                            true,
                            _localizationService.GetString("DashboardCopiedSuccessfully"));
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationResult(false,
                    _localizationService.GetString("ErrorWhileCopyingDashboard"));
            }
        }

        public async Task<OperationResult> Update(DashboardEditModel editModel)
        {
            try
            {
                // Validation
                if (editModel.LocationId == null && editModel.TagId == null)
                {
                    return new OperationDataResult<int>(
                        false,
                        _localizationService.GetString("IncorrectLocationIdOrTagId"));
                }

                if (editModel.LocationId != null && editModel.TagId != null)
                {
                    return new OperationDataResult<int>(
                        false,
                        _localizationService.GetString("IncorrectLocationIdOrTagId"));
                }

                if (editModel.AnswerDates.Today)
                {
                    var dateTimeNow = DateTime.Now;
                    editModel.AnswerDates.DateTo = new DateTime(
                        dateTimeNow.Year,
                        dateTimeNow.Month,
                        dateTimeNow.Day,
                        23,
                        59,
                        59);
                }
                else if (editModel.AnswerDates.DateTo != null)
                {
                    editModel.AnswerDates.DateTo = new DateTime(
                        editModel.AnswerDates.DateTo.Value.Year,
                        editModel.AnswerDates.DateTo.Value.Month,
                        editModel.AnswerDates.DateTo.Value.Day,
                        23,
                        59,
                        59);
                }

                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    if (editModel.LocationId != null)
                    {
                        if (!await sdkContext
                            .sites
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .AnyAsync(x => x.Id == editModel.LocationId))
                        {
                            return new OperationDataResult<int>(
                                false,
                                _localizationService.GetString("LocationNotFound"));
                        }
                    }

                    if (editModel.TagId != null)
                    {
                        if (!await sdkContext
                            .tags
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .AnyAsync(x => x.Id == editModel.TagId))
                        {
                            return new OperationDataResult<int>(
                                false,
                                _localizationService.GetString("TagNotFound"));
                        }
                    }
                }

                using (var transactions = await _dbContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var dashboard = await _dbContext.Dashboards
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.CompareLocationsTags)
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.IgnoredFieldValues)
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .FirstOrDefaultAsync(x => x.Id == editModel.Id);

                        if (dashboard == null)
                        {
                            return new OperationResult(
                                false,
                                _localizationService.GetString("DashboardNotFound"));
                        }

                        dashboard.UpdatedAt = DateTime.UtcNow;
                        dashboard.UpdatedByUserId = UserId;
                        dashboard.Name = editModel.DashboardName;
                        dashboard.TagId = editModel.TagId;
                        dashboard.LocationId = editModel.LocationId;
                        dashboard.DateFrom = editModel.AnswerDates.DateFrom;
                        dashboard.DateTo = editModel.AnswerDates.DateTo;
                        dashboard.Today = editModel.AnswerDates.Today;

                        await dashboard.Update(_dbContext);

                        var editItemsIds = editModel.Items
                            .Where(x => x.Id != null)
                            .Select(x => x.Id)
                            .ToArray();

                        var forDelete = dashboard.DashboardItems
                            .Where(x => !editItemsIds.Contains(x.Id))
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .ToList();

                        var forUpdate = dashboard.DashboardItems
                            .Where(x => editItemsIds.Contains(x.Id))
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .ToList();

                        var forCreate = editModel.Items
                            .Where(x => x.Id == null)
                            .ToList();

                        // Remove
                        foreach (var dashboardItem in forDelete)
                        {
                            foreach (var dashboardItemCompareLocationsTag in dashboardItem.CompareLocationsTags.Where(
                                x => x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                await dashboardItemCompareLocationsTag.Delete(_dbContext);
                            }

                            foreach (var dashboardItemIgnoredAnswerValue in dashboardItem.IgnoredFieldValues.Where(x =>
                                x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                await dashboardItemIgnoredAnswerValue.Delete(_dbContext);
                            }

                            await dashboardItem.Delete(_dbContext);
                        }

                        // Update
                        foreach (var dashboardItem in forUpdate)
                        {
                            var dashboardItemModel = editModel.Items
                                .FirstOrDefault(x => x.Id == dashboardItem.Id);

                            if (dashboardItemModel != null)
                            {
                                dashboardItem.UpdatedAt = DateTime.UtcNow;
                                dashboardItem.UpdatedByUserId = UserId;
                                dashboardItem.ChartType = dashboardItemModel.ChartType;
                                dashboardItem.FilterFieldId = dashboardItemModel.FilterFieldId;
                                dashboardItem.FilterFieldOptionId = dashboardItemModel.FilterFieldOptionId;
                                dashboardItem.FieldId = dashboardItemModel.FieldId;
                                dashboardItem.Period = dashboardItemModel.Period;
                                dashboardItem.Position = dashboardItemModel.Position;
                                dashboardItem.CalculateAverage = dashboardItemModel.CalculateAverage;
                                dashboardItem.CompareEnabled = dashboardItemModel.CompareEnabled;

                                await dashboardItem.Update(_dbContext);

                                // Compare
                                var compareItemsIds = dashboardItemModel.CompareLocationsTags
                                    .Where(x => x.Id != null)
                                    .Select(x => x.Id)
                                    .ToArray();

                                var compareForDelete = dashboardItem.CompareLocationsTags
                                    .Where(x => !compareItemsIds.Contains(x.Id))
                                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                    .ToList();

                                var compareForCreate = dashboardItemModel.CompareLocationsTags
                                    .Where(x => x.Id == null)
                                    .ToList();

                                foreach (var dashboardItemCompare in compareForDelete)
                                {
                                    await dashboardItemCompare.Delete(_dbContext);
                                }

                                foreach (var dashboardItemCompareModel in compareForCreate)
                                {
                                    var dashboardItemCompare = new DashboardItemCompare
                                    {
                                        CreatedByUserId = UserId,
                                        UpdatedByUserId = UserId,
                                        DashboardItemId = dashboardItem.Id,
                                        Position = dashboardItemCompareModel.Position,
                                        LocationId = dashboardItemCompareModel.LocationId,
                                        TagId = dashboardItemCompareModel.TagId,
                                    };

                                    await dashboardItemCompare.Create(_dbContext);
                                }

                                // Check ignore values
                                int answersCount;
                                using (var sdkContext = core.dbContextHelper.GetDbContext())
                                {
                                    answersCount = await sdkContext.options
                                        .AsNoTracking()
                                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                        .Where(x => x.QuestionId == dashboardItemModel.FieldId)
                                        .Select(x => x.Id)
                                        .CountAsync();
                                }

                                var modelAnswersCount = dashboardItemModel.IgnoredFieldValues
                                    .Select(x => x.FieldOptionId)
                                    .Count();

                                if (answersCount == modelAnswersCount)
                                {
                                    transactions.Rollback();
                                    return new OperationResult(
                                        false,
                                        _localizationService.GetString("SelectAtLeastOneValueThatShouldNotBeIgnored"));
                                }

                                // Ignore
                                var ignoreItemsIds = dashboardItemModel.IgnoredFieldValues
                                    .Where(x => x.Id != null)
                                    .Select(x => x.Id)
                                    .ToArray();

                                var ignoreForDelete = dashboardItem.IgnoredFieldValues
                                    .Where(x => !ignoreItemsIds.Contains(x.Id))
                                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                    .ToList();

                                var ignoreForCreate = dashboardItemModel.IgnoredFieldValues
                                    .Where(x => x.Id == null)
                                    .ToList();

                                foreach (var dashboardItemIgnoredAnswer in ignoreForDelete)
                                {
                                    await dashboardItemIgnoredAnswer.Delete(_dbContext);
                                }

                                foreach (var dashboardItemIgnoredAnswerModel in ignoreForCreate)
                                {

                                    var dashboardItemIgnoredAnswer = new DashboardItemIgnoredFieldValue()
                                    {
                                        CreatedByUserId = UserId,
                                        UpdatedByUserId = UserId,
                                        DashboardItemId = dashboardItem.Id,
                                        FieldOptionId = dashboardItemIgnoredAnswerModel.FieldOptionId,
                                    };

                                    await dashboardItemIgnoredAnswer.Create(_dbContext);
                                }
                            }
                        }

                        // Create
                        foreach (var dashboardItemModel in forCreate)
                        {
                            int answersCount;
                            using (var sdkContext = core.dbContextHelper.GetDbContext())
                            {
                                answersCount = await sdkContext.options
                                    .AsNoTracking()
                                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.QuestionId == dashboardItemModel.FieldId)
                                    .Select(x => x.Id)
                                    .CountAsync();
                            }

                            var modelAnswersCount = dashboardItemModel.IgnoredFieldValues
                                .Select(x => x.FieldOptionId)
                                .Count();

                            if (answersCount == modelAnswersCount)
                            {
                                transactions.Rollback();
                                return new OperationResult(
                                    false,
                                    _localizationService.GetString("SelectAtLeastOneValueThatShouldNotBeIgnored"));
                            }

                            var dashboardItem = new DashboardItem
                            {
                                DashboardId = dashboard.Id,
                                CreatedByUserId = UserId,
                                ChartType = dashboardItemModel.ChartType,
                                FilterFieldId = dashboardItemModel.FilterFieldId,
                                FilterFieldOptionId = dashboardItemModel.FilterFieldOptionId,
                                FieldId = dashboardItemModel.FieldId,
                                Period = dashboardItemModel.Period,
                                Position = dashboardItemModel.Position,
                                CalculateAverage = dashboardItemModel.CalculateAverage,
                                CompareEnabled = dashboardItemModel.CompareEnabled,
                            };

                            await dashboardItem.Create(_dbContext);

                            // Compare
                            foreach (var dashboardItemCompareModel in dashboardItemModel.CompareLocationsTags)
                            {
                                var dashboardItemCompare = new DashboardItemCompare
                                {
                                    CreatedByUserId = UserId,
                                    UpdatedByUserId = UserId,
                                    DashboardItemId = dashboardItem.Id,
                                    LocationId = dashboardItemCompareModel.LocationId,
                                    Position = dashboardItemCompareModel.Position,
                                    TagId = dashboardItemCompareModel.TagId,
                                };

                                await dashboardItemCompare.Create(_dbContext);
                            }

                            // Ignore
                            foreach (var dashboardItemIgnoredAnswerModel in dashboardItemModel.IgnoredFieldValues)
                            {
                                var dashboardItemIgnoredAnswer = new DashboardItemIgnoredFieldValue()
                                {
                                    CreatedByUserId = UserId,
                                    UpdatedByUserId = UserId,
                                    DashboardItemId = dashboardItem.Id,
                                    FieldOptionId = dashboardItemIgnoredAnswerModel.FieldOptionId,
                                };

                                await dashboardItemIgnoredAnswer.Create(_dbContext);
                            }
                        }


                        transactions.Commit();
                        return new OperationResult(
                            true,
                            _localizationService.GetString("DashboardUpdatedSuccessfully"));
                    }
                    catch
                    {
                        transactions.Rollback();
                        throw;
                    }
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationResult(false,
                    _localizationService.GetString("ErrorWhileUpdatingDashboard"));
            }
        }

        public async Task<OperationResult> Remove(int dashboardId)
        {
            try
            {
                using (var transaction = await _dbContext.Database.BeginTransactionAsync())
                {
                    try
                    {
                        var dashboard = await _dbContext.Dashboards
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.CompareLocationsTags)
                            .Include(x => x.DashboardItems)
                            .ThenInclude(x => x.IgnoredFieldValues)
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .FirstOrDefaultAsync(x => x.Id == dashboardId);

                        if (dashboard == null)
                        {
                            return new OperationResult(
                                false,
                                _localizationService.GetString("DashboardNotFound"));
                        }

                        foreach (var dashboardItem in dashboard.DashboardItems.Where(x =>
                            x.WorkflowState != Constants.WorkflowStates.Removed))
                        {
                            foreach (var dashboardItemCompareLocationsTag in dashboardItem.CompareLocationsTags.Where(
                                x => x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                await dashboardItemCompareLocationsTag.Delete(_dbContext);
                            }

                            foreach (var dashboardItemIgnoredAnswerValue in dashboardItem.IgnoredFieldValues.Where(x =>
                                x.WorkflowState != Constants.WorkflowStates.Removed))
                            {
                                await dashboardItemIgnoredAnswerValue.Delete(_dbContext);
                            }

                            await dashboardItem.Delete(_dbContext);
                        }

                        await dashboard.Delete(_dbContext);
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                return new OperationResult(
                    true,
                    _localizationService.GetString("DashboardRemovedSuccessfully"));
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationResult(false,
                    _localizationService.GetString("ErrorWhileRemovingDashboard"));
            }
        }

        public async Task<OperationDataResult<DashboardViewModel>> GetSingleForView(
            int dashboardId,
            bool onlyTextData,
            int? dashboardItemId = null)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                var dashboard = await _dbContext.Dashboards
                    .Include(x => x.DashboardItems)
                    .ThenInclude(x => x.IgnoredFieldValues)
                    .Include(x => x.DashboardItems)
                    .ThenInclude(x => x.CompareLocationsTags)
                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                    .FirstOrDefaultAsync(x => x.Id == dashboardId);

                if (dashboard == null)
                {
                    return new OperationDataResult<DashboardViewModel>(
                        false,
                        _localizationService.GetString("DashboardNotFound"));
                }

                if (dashboard.Today)
                {
                    var dateTimeNow = DateTime.Now;
                    dashboard.DateTo = new DateTime(
                        dateTimeNow.Year,
                        dateTimeNow.Month,
                        dateTimeNow.Day,
                        23,
                        59,
                        59);
                }

                // Dashboard
                var result = new DashboardViewModel
                {
                    Id = dashboard.Id,
                    DashboardName = dashboard.Name,
                    eFormId = dashboard.eFormId,
                    LocationId = dashboard.LocationId,
                    TagId = dashboard.TagId,
                    AnswerDates = new DashboardEditAnswerDates
                    {
                        Today = dashboard.Today,
                        DateTo = dashboard.DateTo,
                        DateFrom = dashboard.DateFrom,
                    },
                };

                List<CommonDictionaryModel> sites;
                List<CommonDictionaryModel> tags;
                List<CommonDictionaryModel> options;

                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    result.SurveyName = await sdkContext.question_sets
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.Id == dashboard.eFormId)
                        .Select(x => x.Name)
                        .FirstOrDefaultAsync();

                    if (dashboard.LocationId != null)
                    {
                        result.LocationName = await sdkContext.sites
                            .AsNoTracking()
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboard.LocationId)
                            .Select(x => x.Name)
                            .FirstOrDefaultAsync();
                    }

                    if (dashboard.TagId != null)
                    {
                        result.TagName = await sdkContext.tags
                            .AsNoTracking()
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboard.TagId)
                            .Select(x => x.Name)
                            .FirstOrDefaultAsync();
                    }

                    sites = await sdkContext.sites
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Select(x => new CommonDictionaryModel
                        {
                            Id = x.Id,
                            Name = x.Name,
                        }).ToListAsync();

                    tags = await sdkContext.tags
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Select(x => new CommonDictionaryModel
                        {
                            Id = x.Id,
                            Name = x.Name,
                        }).ToListAsync();

                    options = await sdkContext.options
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Select(x => new CommonDictionaryModel
                        {
                            Id = x.Id,
                            Name = x.OptionTranslationses
                                .Select(y=>y.Name)
                                .FirstOrDefault(),
                        }).ToListAsync();
                }

                var items = dashboard.DashboardItems
                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                    .OrderBy(x => x.Position)
                    .ToList();

                // Dashboard items
                foreach (var dashboardItem in items)
                {
                    if (onlyTextData)
                    {
                        if (dashboardItem.Id != dashboardItemId)
                        {
                            continue;
                        }
                    }

                    var dashboardItemModel = new DashboardItemViewModel()
                    {
                        Id = dashboardItem.Id,
                        Position = dashboardItem.Position,
                        Period = dashboardItem.Period,
                        ChartType = dashboardItem.ChartType,
                        CalculateAverage = dashboardItem.CalculateAverage,
                        CompareEnabled = dashboardItem.CompareEnabled,
                        FilterFieldOptionId = dashboardItem.FilterFieldOptionId,
                        FilterFieldId = dashboardItem.FilterFieldId,
                        FieldId = dashboardItem.FieldId,
                    };

                    foreach (var dashboardItemCompareLocationsTag in dashboardItem
                        .CompareLocationsTags
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .OrderBy(x => x.Position))
                    {
                        foreach (var site in sites)
                        {
                            if (site.Id == dashboardItemCompareLocationsTag.LocationId)
                            {
                                var itemCompare = new DashboardItemCompareModel
                                {
                                    Id = dashboardItemCompareLocationsTag.Id,
                                    LocationId = dashboardItemCompareLocationsTag.LocationId,
                                    Position = dashboardItemCompareLocationsTag.Position,
                                    TagId = dashboardItemCompareLocationsTag.TagId,
                                    Name = site.Name,
                                };
                                dashboardItemModel.CompareLocationsTags.Add(itemCompare);
                            }
                        }
                        foreach (var tag in tags)
                        {
                            if (tag.Id == dashboardItemCompareLocationsTag.TagId)
                            {
                                var itemCompare = new DashboardItemCompareModel
                                {
                                    Id = dashboardItemCompareLocationsTag.Id,
                                    LocationId = dashboardItemCompareLocationsTag.LocationId,
                                    Position = dashboardItemCompareLocationsTag.Position,
                                    TagId = dashboardItemCompareLocationsTag.TagId,
                                    Name = tag.Name,
                                };
                                dashboardItemModel.CompareLocationsTags.Add(itemCompare);
                            }
                        }
                    }

                    foreach (var dashboardItemIgnoredAnswer in dashboardItem
                        .IgnoredFieldValues
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed))
                    {
                        foreach (var option in options)
                        {
                            if (option.Id == dashboardItemIgnoredAnswer.FieldOptionId)
                            {
                                var ignoredAnswer = new DashboardItemIgnoredAnswerModel
                                {
                                    Id = dashboardItemIgnoredAnswer.Id,
                                    FieldOptionId = dashboardItemIgnoredAnswer.FieldOptionId,
                                    Name = ChartHelpers.GetSmileyLabel(option.Name),
                                };
                                dashboardItemModel.IgnoredFieldValues.Add(ignoredAnswer);
                            }
                        }
                    }

                    using (var sdkContext = core.dbContextHelper.GetDbContext())
                    {
                        var languages = await sdkContext.languages.ToListAsync();
                        foreach (var language in languages)
                        {
                            var firstQuestion = await sdkContext.QuestionTranslations
                                .AsNoTracking()
                                .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                .Where(x => x.Question.WorkflowState != Constants.WorkflowStates.Removed)
                                .Where(x => x.Language.WorkflowState != Constants.WorkflowStates.Removed)
                                .Where(x => x.QuestionId == dashboardItem.FieldId)
                                .Where(x => x.Language.Id == language.Id)
                                .Select(x => new
                                {
                                    x.Name,
                                    x.Question.QuestionType,
                                })
                                .FirstOrDefaultAsync();

                            dashboardItemModel.FirstQuestionName = firstQuestion?.Name;
                            dashboardItemModel.FirstQuestionType = firstQuestion?.QuestionType;

                            if (dashboardItemModel.FirstQuestionName != null)
                            {
                                break;
                            }
                        }

                        if (dashboardItem.FilterFieldOptionId != null)
                        {
                            foreach (var language in languages)
                            {
                                dashboardItemModel.FilterQuestionName = await sdkContext.QuestionTranslations
                                    .AsNoTracking()
                                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.Question.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.Language.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.QuestionId == dashboardItem.FilterFieldOptionId)
                                    .Where(x => x.Language.Id == language.Id)
                                    .Select(x => x.Name)
                                    .FirstOrDefaultAsync();

                                if (dashboardItemModel.FilterQuestionName != null)
                                {
                                    break;
                                }
                            }
                        }

                        if (dashboardItem.FilterFieldId != null)
                        {
                            foreach (var language in languages)
                            {
                                dashboardItemModel.FilterAnswerName = await sdkContext.OptionTranslations
                                    .AsNoTracking()
                                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.option.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.Language.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(x => x.OptionId == dashboardItem.FilterFieldId)
                                    .Where(x => x.Language.Id == language.Id)
                                    .Select(x => ChartHelpers.GetSmileyLabel(x.Name))
                                    .FirstOrDefaultAsync();

                                if (dashboardItemModel.FilterAnswerName != null)
                                {
                                    break;
                                }
                            }
                        }

                        await ChartDataHelpers.CalculateDashboardItem(
                            dashboardItemModel,
                            sdkContext,
                            dashboardItem,
                            _localizationService,
                            dashboard.LocationId,
                            dashboard.TagId,
                            dashboard.eFormId,
                            new DashboardEditAnswerDates
                            {
                                Today = dashboard.Today,
                                DateFrom = dashboard.DateFrom,
                                DateTo = dashboard.DateTo,
                            });
                    }

                    // Add Item
                    result.Items.Add(dashboardItemModel);
                }

                return new OperationDataResult<DashboardViewModel>(
                    true,
                    result);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<DashboardViewModel>(false,
                    _localizationService.GetString("ErrorWhileObtainingDashboardInfo"));
            }
        }

        public async Task<OperationDataResult<DashboardEditModel>> GetSingleForEdit(int dashboardId)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                var dashboard = await _dbContext.Dashboards
                    .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                    .Select(x=>new DashboardEditModel
                    {
                        Id = x.Id,
                        LocationId = x.LocationId,
                        TagId = x.TagId,
                        eFormId = x.eFormId,
                        DashboardName = x.Name,
                        AnswerDates = new DashboardEditAnswerDates
                        {
                            DateFrom = x.DateFrom,
                            DateTo = x.DateTo,
                            Today = x.Today,
                        },
                        Items = x.DashboardItems
                            .Where(y => y.WorkflowState != Constants.WorkflowStates.Removed)
                            .Select(i => new DashboardItemModel
                            {
                                Id = i.Id,
                                ChartType = i.ChartType,
                                FilterFieldId = i.FilterFieldId,
                                FilterFieldOptionId = i.FilterFieldOptionId,
                                FieldId = i.FieldId,
                                Period = i.Period,
                                Position = i.Position,
                                CalculateAverage = i.CalculateAverage,
                                CompareEnabled = i.CompareEnabled,
                                CompareLocationsTags = i.CompareLocationsTags
                                    .Where(y => y.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Select(l => new DashboardItemCompareModel
                                    {
                                        Id = l.Id,
                                        LocationId = l.LocationId,
                                        TagId = l.TagId,
                                        Position = l.Position,
                                    })
                                    .OrderBy(l => l.Position)
                                    .ToList(),
                                IgnoredFieldValues = i.IgnoredFieldValues
                                    .Where(y => y.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Select(l => new DashboardItemIgnoredAnswerModel
                                    {
                                        Id = l.Id,
                                        FieldOptionId = l.FieldOptionId,
                                    }).ToList(),
                            })
                            .OrderBy(i => i.Position)
                            .ToList(),
                    })
                    .FirstOrDefaultAsync(x => x.Id == dashboardId);

                if (dashboard == null)
                {
                    return new OperationDataResult<DashboardEditModel>(
                        false,
                        _localizationService.GetString("DashboardNotFound"));
                }

                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    dashboard.SurveyName = await sdkContext.question_sets
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.Id == dashboard.eFormId)
                        .Select(x => x.Name)
                        .FirstOrDefaultAsync();

                    if (dashboard.LocationId != null)
                    {
                        dashboard.LocationName = await sdkContext.sites
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboard.LocationId)
                            .Select(x => x.Name)
                            .FirstOrDefaultAsync();
                    }

                    if (dashboard.TagId != null)
                    {
                        dashboard.TagName = await sdkContext.tags
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboard.TagId)
                            .Select(x => x.Name)
                            .FirstOrDefaultAsync();
                    }

                    foreach (var dashboardItemModel in dashboard.Items)
                    {
                        var question = await sdkContext.questions
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.Id == dashboardItemModel.FieldId)
                            .FirstOrDefaultAsync();

                        if (question != null)
                        {
                            dashboardItemModel.IsFirstQuestionSmiley = question.IsSmiley();
                            // dashboardItemModel.FirstQuestionType = question.GetQuestionType();
                        }
                    }
                }

                return new OperationDataResult<DashboardEditModel>(
                    true,
                    dashboard);
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<DashboardEditModel>(false,
                    _localizationService.GetString("ErrorWhileObtainingDashboardInfo"));
            }
        }

        private int UserId
        {
            get
            {
                var value = _httpContextAccessor?.HttpContext.User?.FindFirstValue(ClaimTypes.NameIdentifier);
                return value == null ? 0 : int.Parse(value);
            }
        }
    }
}