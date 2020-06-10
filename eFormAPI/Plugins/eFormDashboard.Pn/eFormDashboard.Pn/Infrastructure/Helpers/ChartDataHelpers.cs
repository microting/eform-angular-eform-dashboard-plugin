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
using System.Linq;
using System.Threading.Tasks;
using eFormDashboard.Pn.Infrastructure.Models.Dashboards;
using eFormDashboard.Pn.Services.Common.eFormDashboardLocalizationService;
using Microsoft.EntityFrameworkCore;
using Microting.eForm.Infrastructure;
using Microting.eForm.Infrastructure.Data.Entities;
using Microting.eFormDashboardBase.Infrastructure.Data.Entities;
using Microting.eFormDashboardBase.Infrastructure.Enums;

namespace eFormDashboard.Pn.Infrastructure.Helpers
{
    public static class ChartDataHelpers
    {
        public static async Task CalculateDashboardItem(
            DashboardItemViewModel dashboardItemModel,
            MicrotingDbContext sdkContext,
            DashboardItem dashboardItem,
            IeFormDashboardLocalizationService localizationService,
            int? dashboardLocationId,
            int? dashboardLocationTagId,
            int dashboardeFormId,
            DashboardEditAnswerDates answerDates)
        {
            // Chart data
            var singleData = false;
            var smileyLabels = new List<KeyValuePair<int, string>>()
            {
                new KeyValuePair<int, string>(100, "Meget glad"),
                new KeyValuePair<int, string>(75, "Glad"),
                new KeyValuePair<int, string>(50, "Neutral"),
                new KeyValuePair<int, string>(25, "Sur"),
                new KeyValuePair<int, string>(0, "Meget sur"),
                new KeyValuePair<int, string>(999, "Ved ikke")
            };
            switch (dashboardItem.ChartType)
            {
                case DashboardChartTypes.Line:
                    break;
                case DashboardChartTypes.Pie:
                    singleData = true;
                    break;
                case DashboardChartTypes.AdvancedPie:
                    singleData = true;
                    break;
                case DashboardChartTypes.PieGrid:
                    singleData = true;
                    break;
                case DashboardChartTypes.HorizontalBar:
                    singleData = true;
                    break;
                case DashboardChartTypes.HorizontalBarStacked:
                    break;
                case DashboardChartTypes.HorizontalBarGrouped:
                    break;
                case DashboardChartTypes.VerticalBar:
                    singleData = true;
                    break;
                case DashboardChartTypes.VerticalBarStacked:
                    break;
                case DashboardChartTypes.VerticalBarGrouped:
                    break;
                case DashboardChartTypes.GroupedStackedBarChart:
                    break;
                case 0:
                    if (dashboardItemModel.FirstQuestionType != "text")
                    {
                        throw new ArgumentOutOfRangeException();
                    }
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            bool isStackedData;
            if (
                dashboardItem.ChartType == DashboardChartTypes.GroupedStackedBarChart
                && dashboardItem.CompareEnabled
                && dashboardItem.CalculateAverage == false)
            {
                isStackedData = true;
            }
            else
            {
                isStackedData = false;
            }

            var isComparedData = false;
            if (dashboardItem.ChartType == DashboardChartTypes.GroupedStackedBarChart
                || dashboardItem.ChartType == DashboardChartTypes.Line)
            {
                if (dashboardItem.CompareEnabled)
                {
                    isComparedData = true;
                }
                else if (dashboardItem.ChartType == DashboardChartTypes.Line && dashboardItem.CalculateAverage)
                {
                    isComparedData = true;
                }
            }

            var answerQueryable = sdkContext.answer_values
                .AsNoTracking()
                .Where(x => x.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                .AsQueryable();

            if (answerDates.Today)
            {
                var dateTimeNow = DateTime.Now;
                answerDates.DateTo = new DateTime(
                    dateTimeNow.Year,
                    dateTimeNow.Month,
                    dateTimeNow.Day,
                    23,
                    59,
                    59);
            }

            if (answerDates.DateFrom != null)
            {
                answerQueryable = answerQueryable
                    .Where(x => x.Answer.FinishedAt >= answerDates.DateFrom);
            }

            if (answerDates.DateTo != null)
            {
                answerQueryable = answerQueryable
                    .Where(x => x.Answer.FinishedAt <= answerDates.DateTo);
            }

            answerQueryable = answerQueryable
                .Where(x => x.Answer.QuestionSetId == dashboardeFormId);

            if (dashboardItem.FilterFieldOptionId != null && dashboardItem.FilterFieldId != null)
            {
                var answerIds = answerQueryable
                    .Where(y => y.QuestionId == dashboardItem.FilterFieldOptionId &&
                                y.OptionId == dashboardItem.FilterFieldId)
                    .Select(y => y.AnswerId)
                    .ToList();

                answerQueryable = answerQueryable
                    .Where(x => answerIds
                        .Contains(x.AnswerId))
                    .Where(x => x.QuestionId == dashboardItem.FieldId);
            }
            else
            {
                answerQueryable = answerQueryable
                    .Where(x => x.QuestionId == dashboardItem.FieldId);
            }

            // Question type == Text
            if (dashboardItemModel.FirstQuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Text)
            {
                if (dashboardLocationId != null)
                {
                    answerQueryable = answerQueryable
                        .Where(x => x.Answer.SiteId == dashboardLocationId);
                }
                else if (dashboardLocationTagId != null)
                {
                    answerQueryable = answerQueryable
                        .Where(x => x.Answer.Site.SiteTags.Any(
                            y => y.TagId == dashboardLocationTagId));
                }

                var textData = await answerQueryable
                    .Select(x => new DashboardItemTextQuestionDataModel
                    {
                        Date = x.Answer.FinishedAt,
                        LocationName = x.Answer.Site.Name,
                        Commentary = x.Value,
                        Id = x.Answer.Id,
                    })
                    .OrderBy(t => t.Date)
                    .ToListAsync();

                dashboardItemModel.TextQuestionData.AddRange(textData);
            }
            else
            {
                // Question type != Text
                if (!dashboardItem.CompareEnabled)
                {
                    if (dashboardLocationId != null)
                    {
                        answerQueryable = answerQueryable
                            .Where(x => x.Answer.SiteId == dashboardLocationId);
                    }
                    else if (dashboardLocationTagId != null)
                    {
                        answerQueryable = answerQueryable
                            .Where(x => x.Answer.Site.SiteTags.Any(
                                y => y.TagId == dashboardLocationTagId));
                    }
                }

                var ignoreOptions = new List<options>();

                if (dashboardItem.IgnoredFieldValues
                    .Any(x => x.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed))
                {
                    var optionIds = dashboardItem.IgnoredFieldValues
                        .Where(y => y.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                        .Select(x => x.FieldOptionId)
                        .ToArray();

                    answerQueryable = answerQueryable
                        .Where(x => !optionIds.Contains(x.OptionId));

                    ignoreOptions = await sdkContext.options.Where(x => optionIds.Contains(x.Id)).ToListAsync();
                }

                var data = new List<ChartDataItem>();
                if (isComparedData)
                {
                    var tagIds = new List<int>();
                    if (dashboardItem.CompareEnabled)
                    {
                        tagIds = dashboardItem.CompareLocationsTags
                            .Where(x => x.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                            .Where(x => x.TagId != null)
                            .Select(x => (int)x.TagId)
                            .ToList();
                    }
                    else
                    {
                        if (dashboardLocationTagId != null)
                        {
                            tagIds.Add((int)dashboardLocationTagId);
                        }
                    }

                    var tagsData = new List<ChartDataItem>();
                    foreach (var tagId in tagIds)
                    {
                        var tagData = await answerQueryable
                            .Where(x => x.Answer.Site.SiteTags.Any(
                                y => y.TagId == tagId))
                            .Select(x => new ChartDataItem
                            {
                                Name = x.Question.IsSmiley()
                                    ? x.Option.WeightValue.ToString()
                                    : x.Question.QuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Multi
                                        ? x.Option.OptionTranslationses
                                            .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                            .Select(z => $@"{x.Question.QuestionTranslationses
                                                .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                                .Select(qt => qt.Name)
                                                .FirstOrDefault()}_{z.Name}")
                                            .FirstOrDefault()
                                        : x.Value,
                                Finished = x.Answer.FinishedAt,
                                LocationTagName = x.Answer.Site.SiteTags
                                    .Where(y => y.TagId == tagId)
                                    .Select(y => y.Tag.Name)
                                    .FirstOrDefault(),
                                LocationTagId = (int)x.Answer.Site.SiteTags
                                    .Where(y => y.TagId == tagId)
                                    .Select(y => y.TagId)
                                    .FirstOrDefault(),
                                IsTag = true,
                                Weight = x.Option.WeightValue,
                                OptionIndex = x.Option.OptionsIndex,
                                AnswerId = x.AnswerId,
                            })
                            .ToListAsync();

                        tagsData.AddRange(tagData);
                    }

                    var siteIds = new List<int>();
                    if (dashboardItem.CompareEnabled)
                    {
                        siteIds = dashboardItem.CompareLocationsTags
                            .Where(x => x.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                            .Where(x => x.LocationId != null)
                            .Select(x => (int)x.LocationId)
                            .ToList();
                    }
                    else
                    {
                        if (dashboardLocationId != null)
                        {
                            siteIds.Add((int)dashboardLocationId);
                        }
                    }

                    var sitesData = await answerQueryable
                        .Where(x => siteIds.Contains(x.Answer.SiteId))
                        .Select(x => new ChartDataItem
                        {
                            Name = x.Question.IsSmiley()
                                ? x.Option.WeightValue.ToString()
                                : x.Question.QuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Multi
                                    ? x.Option.OptionTranslationses
                                        .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                        .Select(z => $@"{x.Question.QuestionTranslationses
                                            .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                            .Select(qt => qt.Name)
                                            .FirstOrDefault()}_{z.Name}")
                                        .FirstOrDefault()
                                    : x.Value,
                            Finished = x.Answer.FinishedAt,
                            LocationTagName = x.Answer.Site.Name,
                            LocationTagId = x.Answer.SiteId,
                            IsTag = false,
                            Weight = x.Option.WeightValue,
                            OptionIndex = x.Option.OptionsIndex,
                            AnswerId = x.AnswerId,
                        })
                        .ToListAsync();

                    data.AddRange(tagsData);
                    data.AddRange(sitesData);
                    data = data.OrderBy(t => t.Finished).ToList();
                }
                else
                {
                    if (dashboardLocationId != null)
                    {
                        data = await answerQueryable
                            .Select(x => new ChartDataItem
                            {
                                Name = x.Question.IsSmiley()
                                    ? x.Option.WeightValue.ToString()
                                    : x.Question.QuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Multi
                                        ? x.Option.OptionTranslationses
                                            .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                            .Select(z => $@"{x.Question.QuestionTranslationses
                                                .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                                .Select(qt => qt.Name)
                                                .FirstOrDefault()}_{z.Name}")
                                            .FirstOrDefault()
                                        : x.Value,
                                Finished = x.Answer.FinishedAt,
                                LocationTagName = x.Answer.Site.Name,
                                LocationTagId = x.Answer.SiteId,
                                IsTag = false,
                                Weight = x.Option.WeightValue,
                                OptionIndex = x.Option.OptionsIndex,
                                AnswerId = x.AnswerId
                            })
                            .OrderBy(t => t.Finished)
                            .ToListAsync();
                    }

                    if (dashboardLocationTagId != null)
                    {
                        data = await answerQueryable
                            .Select(x => new ChartDataItem
                            {
                                Name = x.Question.IsSmiley()
                                    ? x.Option.WeightValue.ToString()
                                    : x.Question.QuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Multi
                                        ? x.Option.OptionTranslationses
                                            .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                            .Select(z => $@"{x.Question.QuestionTranslationses
                                                .Where(ws => ws.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                                                .Select(qt => qt.Name)
                                                .FirstOrDefault()}_{z.Name}")
                                            .FirstOrDefault()
                                        : x.Value,
                                Finished = x.Answer.FinishedAt,
                                LocationTagName = x.Answer.Site.SiteTags
                                    .Where(y => y.TagId == dashboardLocationTagId)
                                    .Select(y => y.Tag.Name)
                                    .FirstOrDefault(),
                                LocationTagId = (int) x.Answer.Site.SiteTags
                                    .Where(y => y.TagId == dashboardLocationTagId)
                                    .Select(y => y.TagId)
                                    .FirstOrDefault(),
                                IsTag = true,
                                Weight = x.Option.WeightValue,
                                OptionIndex = x.Option.OptionsIndex,
                                
                                AnswerId = x.AnswerId,
                            })
                            .OrderBy(t => t.Finished)
                            .ToListAsync();
                    }
                }

                // Get question type
                var questionTypeData = await sdkContext.questions
                    .AsNoTracking()
                    .Where(x => x.WorkflowState != Microting.eForm.Infrastructure.Constants.Constants.WorkflowStates.Removed)
                    .Where(x => x.Id == dashboardItem.FieldId)
                    .Select(x=> new
                    {
                        IsSmiley = x.IsSmiley(),
                        IsMulti = x.QuestionType == Microting.eForm.Infrastructure.Constants.Constants.QuestionTypes.Multi,
                    })
                    .FirstOrDefaultAsync();


                var isSmiley = questionTypeData.IsSmiley;
                var isMulti = questionTypeData.IsMulti;

                List<string> lines;
                if (dashboardItem.CalculateAverage)
                {
                    lines = data
                        .GroupBy(x => x.LocationTagName)
                        .OrderBy(x => x.Key)
                        .Select(x => x.Key)
                        .ToList();
                }
                else
                {
                    lines = data
                        .GroupBy(x => x.Name)
                        .OrderBy(x => x.Key)
                        .Select(x => x.Key)
                        .ToList();
                }

                if (singleData)
                {
                    var count = data.Count;

                    var groupedData = data
                        .GroupBy(x => x.Name)
                        .Select(x => new DashboardViewChartDataSingleModel
                        {
                            Name = x.Key,
                            DataCount = x.Count(),
                            Value = GetDataPercentage(x.Count(), count),
                        })
                        .ToList();

                    if (isSmiley)
                    {
                        var tmpData = new List<DashboardViewChartDataSingleModel>();
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "100", Value = 0});
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "75", Value = 0});
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "50", Value = 0});
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "25", Value = 0});
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "0", Value = 0});
                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                            tmpData.Add(new DashboardViewChartDataSingleModel { Name = "999", Value = 0});

                        foreach (var tmpDataModel in tmpData)
                        {
                            var chartDataSingleModel = groupedData
                                .FirstOrDefault(x => x.Name == tmpDataModel.Name);

                            if (chartDataSingleModel != null)
                            {
                                var parseResult = int.TryParse(chartDataSingleModel.Name, out var labelNumber);
                                if (parseResult)
                                {
                                    tmpDataModel.Name = smileyLabels.Single(z => z.Key == labelNumber).Value;
                                    tmpDataModel.Value = chartDataSingleModel.Value;
                                    tmpDataModel.DataCount = chartDataSingleModel.DataCount;
                                }
                            }
                        }

                        groupedData = tmpData;
                    }

                    var rawData = ChartRawDataHelpers.ConvertSingleData(localizationService, groupedData);

                    // Convert data for pie chart
                    if (dashboardItem.ChartType == DashboardChartTypes.AdvancedPie ||
                        dashboardItem.ChartType == DashboardChartTypes.PieGrid)
                    {
                        foreach (var singleModel in groupedData)
                        {
                            singleModel.Value = singleModel.DataCount;
                        }
                    }

                    dashboardItemModel.ChartData.RawData = rawData;
                    dashboardItemModel.ChartData.Single.AddRange(groupedData);
                }
                else
                {
                    var multiData = new List<DashboardViewChartDataMultiModel>();
                    var multiStackedData = new List<DashboardViewChartDataMultiStackedModel>();
                    var multiStackedRawData = new List<DashboardViewChartDataMultiStackedModel>();
                    switch (dashboardItem.Period)
                    {
                        case DashboardPeriodUnits.Week:
                            if (isStackedData)
                            {
                                multiStackedData = data
                                    .GroupBy(x => new { x.LocationTagName, x.IsTag })
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                        Name = x.Key.LocationTagName, // Location or tag name
                                        IsTag = x.Key.IsTag,
                                        Series = x
                                            .GroupBy(y => ChartHelpers.GetWeekString(y.Finished))
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Name = y.Key, // Week name
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = x.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        OptionIndex = i.Key.OptionIndex,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();

                                multiStackedRawData = data
                                    .GroupBy(ms => ChartHelpers.GetWeekString(ms.Finished))
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Name = x.Key, // Week
                                        Series = x
                                            .GroupBy(ms => new {ms.LocationTagName, ms.IsTag})
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Id = y.Select(i => i.LocationTagId).FirstOrDefault(),
                                                Name = y.Key.LocationTagName, // Location
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = y.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new {g.Name, g.OptionIndex})
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name))
                                                                .Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();
                            }
                            else
                            {
                                if (isComparedData)
                                {
                                    multiData = data
                                        .GroupBy(y => new { y.LocationTagName, y.IsTag })
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                            Name = x.Key.LocationTagName, // Location or tag name
                                            IsTag = x.Key.IsTag,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x
                                                .GroupBy(y => ChartHelpers.GetWeekString(y.Finished))
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = y.Key,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .ToList(),
                                        }).ToList();
                                }
                                else
                                {
                                    multiData = data
                                        .GroupBy(x => ChartHelpers.GetWeekString(x.Finished))
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Name = x.Key.ToString(),
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(g => new { g.Name, g.OptionIndex })
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = isSmiley
                                                        ? smileyLabels.Single(z => z.Key == int.Parse(y.Key.Name)).Value
                                                        : y.Key.Name,
                                                    DataCount = y.Count(),
                                                    OptionIndex = y.Key.OptionIndex,
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : isMulti
                                                            ? GetDataPercentage(y.Count(), GetAnswersCount(x))
                                                            : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .OrderBy(f => f.OptionIndex)
                                                .ToList(),
                                        }).ToList();
                                }
                            }

                            break;
                        case DashboardPeriodUnits.Month:
                            if (isStackedData)
                            {
                                multiStackedData = data
                                    .GroupBy(x => new { x.LocationTagName, x.IsTag })
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                        Name = x.Key.LocationTagName, // Location or tag name
                                        IsTag = x.Key.IsTag,
                                        Series = x
                                            .GroupBy(ms => ChartHelpers.GetMonthString(ms.Finished))
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Name = y.Key, // Month name
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = x.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        OptionIndex = i.Key.OptionIndex,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            // .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();

                                multiStackedRawData = data
                                    .GroupBy(ms => ChartHelpers.GetMonthString(ms.Finished))
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Name = x.Key, // Month
                                        Series = x
                                            .GroupBy(ms => new {ms.LocationTagName, ms.IsTag})
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Id = y.Select(i => i.LocationTagId).FirstOrDefault(),
                                                Name = y.Key.LocationTagName, // Location
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = y.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new {g.Name, g.OptionIndex})
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name))
                                                                .Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            //.OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();
                            }
                            else
                            {
                                if (isComparedData)
                                {
                                    multiData = data
                                        .GroupBy(y => new { y.LocationTagName, y.IsTag })
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                            Name = x.Key.LocationTagName, // Location or tag name
                                            IsTag = x.Key.IsTag,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x
                                                .GroupBy(ms => ChartHelpers.GetMonthString(ms.Finished))
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = y.Key,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .ToList(),
                                        }).ToList();
                                }
                                else
                                {
                                    multiData = data
                                        .GroupBy(ms => ChartHelpers.GetMonthString(ms.Finished))
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Name = x.Key.ToString(),
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(g => new { g.Name, g.OptionIndex })
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = isSmiley
                                                        ? smileyLabels.Single(z => z.Key == int.Parse(y.Key.Name)).Value
                                                        : y.Key.Name,
                                                    OptionIndex = y.Key.OptionIndex,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : isMulti
                                                            ? GetDataPercentage(y.Count(), GetAnswersCount(x))
                                                            : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .OrderBy(f => f.OptionIndex)
                                                .ToList(),
                                        }).ToList();
                                }
                            }

                            break;
                        case DashboardPeriodUnits.Quarter:
                            if (isStackedData)
                            {
                                multiStackedData = data
                                    .GroupBy(x => new { x.LocationTagName, x.IsTag })
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                        Name = x.Key.LocationTagName, // Location or tag name
                                        IsTag = x.Key.IsTag,
                                        Series = x
                                            .GroupBy(item =>
                                                $"{item.Finished:yy}_K{((item.Finished.Month - 1) / 3) + 1}")
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Name = y.Key, // Quarter name
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = x.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();

                                multiStackedRawData = data
                                    .GroupBy(ms => $"{ms.Finished:yy}_K{((ms.Finished.Month - 1) / 3) + 1}")
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Name = x.Key, // Quarter
                                        Series = x
                                            .GroupBy(ms => new {ms.LocationTagName, ms.IsTag})
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Id = y.Select(i => i.LocationTagId).FirstOrDefault(),
                                                Name = y.Key.LocationTagName, // Location
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = y.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new {g.Name, g.OptionIndex})
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name))
                                                                .Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();
                            }
                            else
                            {
                                if (isComparedData)
                                {
                                    multiData = data
                                        .GroupBy(y => new { y.LocationTagName, y.IsTag })
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                            Name = x.Key.LocationTagName, // Location or tag name
                                            IsTag = x.Key.IsTag,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(item =>
                                                    $"{item.Finished:yy}_K{((item.Finished.Month - 1) / 3) + 1}")
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = y.Key,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .ToList(),
                                        }).ToList();
                                }
                                else
                                {
                                    multiData = data
                                        .GroupBy(item => $"{item.Finished:yy}_K{((item.Finished.Month - 1) / 3) + 1}")
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Name = x.Key,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(g => new { g.Name, g.OptionIndex })
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = isSmiley
                                                        ? smileyLabels.Single(z => z.Key == int.Parse(y.Key.Name)).Value
                                                        : y.Key.Name,
                                                    DataCount = y.Count(),
                                                    OptionIndex = y.Key.OptionIndex,
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : isMulti
                                                            ? GetDataPercentage(y.Count(), GetAnswersCount(x))
                                                            : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .OrderBy(f => f.OptionIndex)
                                                .ToList(),
                                        }).ToList();
                                }
                            }

                            break;
                        case DashboardPeriodUnits.SixMonth:
                            if (isStackedData)
                            {
                                multiStackedData = data
                                    .GroupBy(x => new { x.LocationTagName, x.IsTag })
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                        Name = x.Key.LocationTagName, // Location or tag name
                                        IsTag = x.Key.IsTag,
                                        Series = x
                                            .GroupBy(item =>
                                                $"{item.Finished:yy}_{ChartHelpers.GetHalfOfYear(item.Finished)}H")
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Name = y.Key, // SixMonth name
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = x.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        OptionIndex = i.Key.OptionIndex,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();

                                multiStackedRawData = data
                                    .GroupBy(ms => $"{ms.Finished:yy}_{ChartHelpers.GetHalfOfYear(ms.Finished)}H")
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Name = x.Key, // Half of year 
                                        Series = x
                                            .GroupBy(ms => new {ms.LocationTagName, ms.IsTag})
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Id = y.Select(i => i.LocationTagId).FirstOrDefault(),
                                                Name = y.Key.LocationTagName, // Location
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = y.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new {g.Name, g.OptionIndex})
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name))
                                                                .Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();
                            }
                            else
                            {
                                if (isComparedData)
                                {
                                    multiData = data
                                        .GroupBy(y => new { y.LocationTagName, y.IsTag })
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                            Name = x.Key.LocationTagName, // Location or tag name
                                            IsTag = x.Key.IsTag,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x
                                                .GroupBy(item =>
                                                    $"{item.Finished:yy}_{ChartHelpers.GetHalfOfYear(item.Finished)}H")
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = y.Key,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .ToList(),
                                        }).ToList();
                                }
                                else
                                {
                                    multiData = data
                                        .GroupBy(item =>
                                            $"{item.Finished:yy}_{ChartHelpers.GetHalfOfYear(item.Finished)}H")
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Name = x.Key,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(g => new { g.Name, g.OptionIndex })
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = isSmiley
                                                        ? smileyLabels.Single(z => z.Key == int.Parse(y.Key.Name)).Value
                                                        : y.Key.Name,
                                                    OptionIndex = y.Key.OptionIndex,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : isMulti
                                                            ? GetDataPercentage(y.Count(), GetAnswersCount(x))
                                                            : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .OrderBy(f => f.OptionIndex)
                                                .ToList(),
                                        }).ToList();
                                }
                            }

                            break;
                        case DashboardPeriodUnits.Year:
                            if (isStackedData)
                            {
                                multiStackedData = data
                                    .GroupBy(x => new { x.LocationTagName, x.IsTag })
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                        Name = x.Key.LocationTagName, // Location or tag name
                                        IsTag = x.Key.IsTag,
                                        Series = x
                                            .GroupBy(ms => $"{ms.Finished:yyyy}")
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Name = y.Key, // Year name
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = x.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();

                                multiStackedRawData = data
                                    .GroupBy(ms => $"{ms.Finished:yyyy}")
                                    .Select(x => new DashboardViewChartDataMultiStackedModel
                                    {
                                        Name = x.Key, // Year 
                                        Series = x
                                            .GroupBy(ms => new { ms.LocationTagName, ms.IsTag })
                                            .Select(y => new DashboardViewChartDataMultiModel
                                            {
                                                Id = y.Select(i => i.LocationTagId).FirstOrDefault(),
                                                Name = y.Key.LocationTagName, // Location
                                                AnswersCount = GetAnswersCount(y),
                                                IsTag = y.Key.IsTag,
                                                Series = y
                                                    .GroupBy(g => new { g.Name, g.OptionIndex })
                                                    .Select(i => new DashboardViewChartDataSingleModel
                                                    {
                                                        OptionIndex = i.Key.OptionIndex,
                                                        Name = isSmiley
                                                            ? smileyLabels.Single(z => z.Key == int.Parse(i.Key.Name)).Value
                                                            : i.Key.Name,
                                                        DataCount = i.Count(),
                                                        Value = isMulti
                                                            ? GetDataPercentage(i.Count(), GetAnswersCount(y))
                                                            : GetDataPercentage(i.Count(), y.Count()),
                                                    })
                                                    .OrderByDescending(
                                                        t => t.Name.All(char.IsDigit) ? int.Parse(t.Name) : 0)
                                                    .ThenBy(f => f.OptionIndex)
                                                    .ToList(),
                                            })
                                            .OrderBy(y => y.Name)
                                            .ToList(),
                                    }).ToList();
                            }
                            else
                            {
                                if (isComparedData)
                                {
                                    multiData = data
                                        .GroupBy(y => new { y.LocationTagName, y.IsTag })
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Id = x.Select(i => i.LocationTagId).FirstOrDefault(),
                                            Name = x.Key.LocationTagName, // Location or tag name
                                            IsTag = x.Key.IsTag,
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x
                                                .GroupBy(ms => $"{ms.Finished:yyyy}")
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    Name = y.Key,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .ToList(),
                                        }).ToList();
                                }
                                else
                                {
                                    multiData = data
                                        .GroupBy(ms => $"{ms.Finished:yyyy}")
                                        .Select(x => new DashboardViewChartDataMultiModel
                                        {
                                            Name = x.Key.ToString(),
                                            AnswersCount = GetAnswersCount(x),
                                            Series = x.GroupBy(y => new { y.Name, y.OptionIndex })
                                                .Select(y => new DashboardViewChartDataSingleModel
                                                {
                                                    OptionIndex = y.Key.OptionIndex,
                                                    Name = isSmiley
                                                        ? smileyLabels.Single(z => z.Key == int.Parse(y.Key.Name)).Value
                                                        : y.Key.Name,
                                                    DataCount = y.Count(),
                                                    Value = dashboardItem.CalculateAverage
                                                        ? GetAverageDataPercentage(y.Average(k => k.Weight))
                                                        : isMulti
                                                            ? GetDataPercentage(y.Count(), GetAnswersCount(x))
                                                            : GetDataPercentage(y.Count(), x.Count()),
                                                })
                                                .OrderBy(f => f.OptionIndex)
                                                .ToList(),
                                        }).ToList();
                                }
                            }

                            break;
                        case DashboardPeriodUnits.Total:
                            var totalPeriod = new DashboardViewChartDataMultiModel
                            {
                                Name = localizationService.GetString("TotalPeriod")
                            };

                            totalPeriod.Series = data
                                .GroupBy(g => new { g.Name, g.OptionIndex })
                                .Select(x => new DashboardViewChartDataSingleModel
                                {
                                    Name = isSmiley ? smileyLabels.Single(z => z.Key == int.Parse(x.Key.Name)).Value : x.Key.Name,
                                    OptionIndex = x.Key.OptionIndex,
                                    DataCount = x.Count(),
                                    Value = dashboardItem.CalculateAverage
                                        ? GetAverageDataPercentage(x.Average(k => k.Weight))
                                        : GetDataPercentage(x.Count(), data.Count),
                                })
                                .OrderBy(f => f.OptionIndex)
                                .ToList();
                            multiData.Add(totalPeriod);
                            break;
                        default:
                            throw new ArgumentOutOfRangeException();
                    }

                    if (dashboardItem.ChartType == DashboardChartTypes.Line)
                    {
                        if (dashboardItem.CalculateAverage)
                        {
                            var lineData = new List<DashboardViewChartDataMultiModel>();
                            var newLineData = new List<DashboardViewChartDataMultiModel>();
                            if (!multiData.Any())
                            {
                                foreach (var line in lines)
                                {
                                    var multiItem = new DashboardViewChartDataMultiModel
                                    {
                                        Name = isSmiley && !isComparedData ? smileyLabels.Single(z => z.Key == int.Parse(line)).Value : line,
                                    };

                                    foreach (var groupedItem in multiData)
                                    {
                                        foreach (var item in groupedItem.Series)
                                        {
                                            if (item.Name == (isSmiley && !isComparedData
                                                    ? smileyLabels.Single(z => z.Key == int.Parse(line)).Value
                                                    : line))
                                            {
                                                var singleItem = new DashboardViewChartDataSingleModel
                                                {
                                                    Name = groupedItem.Name,
                                                    Value = item.Value,
                                                    DataCount = item.DataCount,
                                                };
                                                multiItem.Series.Add(singleItem);
                                            }
                                        }
                                    }

                                    lineData.Add(multiItem);
                                }

                                var columnNames = new List<string>();
                                var lineNames = new List<string>();

                                foreach (var model in lineData)
                                {
                                    if (!lineNames.Contains(model.Name))
                                    {
                                        lineNames.Add(model.Name);
                                    }

                                    foreach (var dashboardViewChartDataSingleModel in model.Series)
                                    {
                                        if (!columnNames.Contains(dashboardViewChartDataSingleModel.Name))
                                        {
                                            columnNames.Add(dashboardViewChartDataSingleModel.Name);
                                        }
                                    }
                                }

                                if (dashboardItem.Period != DashboardPeriodUnits.Month)
                                {
                                    columnNames.Sort();
                                }

                                lineNames.Sort();

                                if (isSmiley)
                                {
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 100).Value });
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 75).Value });
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 50).Value });
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 25).Value });
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 0).Value });
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                                        newLineData.Add(new DashboardViewChartDataMultiModel
                                        { Name = smileyLabels.Single(z => z.Key == 999).Value });

                                    foreach (var model in newLineData)
                                    {
                                        foreach (var columnName in columnNames)
                                        {
                                            var singleItem = new DashboardViewChartDataSingleModel
                                            {
                                                Name = columnName,
                                                Value = 0,
                                            };
                                            model.Series.Add(singleItem);
                                        }
                                    }

                                    foreach (var model in newLineData)
                                    {
                                        foreach (var multiModel in lineData)
                                        {
                                            if (model.Name == multiModel.Name)
                                            {
                                                foreach (var series in multiModel.Series)
                                                {
                                                    foreach (var modelSeries in model.Series)
                                                    {
                                                        if (modelSeries.Name == series.Name)
                                                        {
                                                            modelSeries.Value = series.Value;
                                                            modelSeries.DataCount = series.DataCount;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    foreach (var lineName in lineNames)
                                    {
                                        var multiItem = new DashboardViewChartDataMultiModel
                                        {
                                            Name = lineName,
                                        };

                                        foreach (var columnName in columnNames)
                                        {
                                            var singleItem = new DashboardViewChartDataSingleModel
                                            {
                                                Name = columnName,
                                                Value = 0,
                                            };
                                            multiItem.Series.Add(singleItem);
                                        }

                                        newLineData.Add(multiItem);
                                    }

                                    foreach (var model in newLineData)
                                    {
                                        foreach (var multiModel in lineData)
                                        {
                                            if (model.Name == multiModel.Name)
                                            {
                                                foreach (var series in multiModel.Series)
                                                {
                                                    foreach (var modelSeries in model.Series)
                                                    {
                                                        if (modelSeries.Name == series.Name)
                                                        {
                                                            modelSeries.Value = series.Value;
                                                            modelSeries.DataCount = series.DataCount;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else
                            {
                                newLineData = multiData;
                            }

                            // Sort by location position
                            if (isComparedData && lines.Any())
                            {
                                if (dashboardItem.CompareEnabled == false)
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            dashboardLocationId,
                                            dashboardLocationTagId);
                                }
                                else
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            null,
                                            null);
                                }
                            }

                            var rawData = ChartRawDataHelpers.ConvertMultiData(localizationService, newLineData, true, isMulti);
                            dashboardItemModel.ChartData.RawData = rawData;
                            dashboardItemModel.ChartData.Multi.AddRange(newLineData);
                        }
                        else
                        {
                            var lineData = new List<DashboardViewChartDataMultiModel>();
                            foreach (var line in lines)
                            {
                                var multiItem = new DashboardViewChartDataMultiModel
                                {
                                    Name = isSmiley ? smileyLabels.Single(z => z.Key == int.Parse(line)).Value : line,
                                };

                                foreach (var groupedItem in multiData)
                                {
                                    foreach (var item in groupedItem.Series)
                                    {
                                        if (item.Name == (isSmiley
                                                ? smileyLabels.Single(z => z.Key == int.Parse(line)).Value
                                                : line))
                                        {
                                            var singleItem = new DashboardViewChartDataSingleModel
                                            {
                                                Name = groupedItem.Name,
                                                Value = item.Value,
                                                DataCount = item.DataCount,
                                            };
                                            multiItem.Series.Add(singleItem);
                                        }
                                    }
                                }

                                lineData.Add(multiItem);
                            }

                            var columnNames = new List<string>();
                            var lineNames = new List<string>();

                            foreach (var model in lineData)
                            {
                                if (!lineNames.Contains(model.Name))
                                {
                                    lineNames.Add(model.Name);
                                }

                                foreach (var dashboardViewChartDataSingleModel in model.Series)
                                {
                                    if (!columnNames.Contains(dashboardViewChartDataSingleModel.Name))
                                    {
                                        columnNames.Add(dashboardViewChartDataSingleModel.Name);
                                    }
                                }
                            }

                            if (dashboardItem.Period != DashboardPeriodUnits.Month)
                            {
                                columnNames.Sort();
                            }
                            lineNames.Sort();

                            var newLineData = new List<DashboardViewChartDataMultiModel>();

                            if (isSmiley)
                            {
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 100).Value});
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 75).Value});
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 50).Value});
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 25).Value});
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 0).Value});
                                if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                                    newLineData.Add(new DashboardViewChartDataMultiModel
                                    { Name = smileyLabels.Single(z => z.Key == 999).Value});

                                foreach (var model in newLineData)
                                {
                                    foreach (var columnName in columnNames)
                                    {
                                        var singleItem = new DashboardViewChartDataSingleModel
                                        {
                                            Name = columnName,
                                            Value = 0,
                                        };
                                        model.Series.Add(singleItem);
                                    }
                                }

                                foreach (var model in newLineData)
                                {
                                    foreach (var multiModel in lineData)
                                    {
                                        if (model.Name == multiModel.Name)
                                        {
                                            foreach (var series in multiModel.Series)
                                            {
                                                foreach (var modelSeries in model.Series)
                                                {
                                                    if (modelSeries.Name == series.Name)
                                                    {
                                                        modelSeries.Value = series.Value;
                                                        modelSeries.DataCount = series.DataCount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else
                            {
                                foreach (var lineName in lineNames)
                                {
                                    var multiItem = new DashboardViewChartDataMultiModel
                                    {
                                        Name = lineName,
                                    };

                                    foreach (var columnName in columnNames)
                                    {
                                        var singleItem = new DashboardViewChartDataSingleModel
                                        {
                                            Name = columnName,
                                            Value = 0,
                                        };
                                        multiItem.Series.Add(singleItem);
                                    }

                                    newLineData.Add(multiItem);
                                }

                                foreach (var model in newLineData)
                                {
                                    foreach (var multiModel in lineData)
                                    {
                                        if (model.Name == multiModel.Name)
                                        {
                                            foreach (var series in multiModel.Series)
                                            {
                                                foreach (var modelSeries in model.Series)
                                                {
                                                    if (modelSeries.Name == series.Name)
                                                    {
                                                        modelSeries.Value = series.Value;
                                                        modelSeries.DataCount = series.DataCount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            // Sort by location position
                            if (isComparedData)
                            {
                                if (dashboardItem.CompareEnabled == false)
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            dashboardLocationId,
                                            dashboardLocationTagId);
                                }
                                else
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            null,
                                            null);
                                }
                            }

                            var rawData = ChartRawDataHelpers.ConvertMultiData(localizationService, newLineData, true, isMulti);
                            dashboardItemModel.ChartData.RawData = rawData;
                            dashboardItemModel.ChartData.Multi.AddRange(newLineData);
                        }
                    }
                    else
                    {
                        if (!isStackedData)
                        {
                            var columnNames = new List<string>();
                            var lineNames = new List<string>();

                            if (multiData.Any())
                            {
                                foreach (var multiDataModel in multiData)
                                {
                                    if (!columnNames.Contains(multiDataModel.Name))
                                    {
                                        columnNames.Add(multiDataModel.Name);
                                    }

                                    foreach (var dashboardViewChartDataSingleModel in multiDataModel.Series)
                                    {
                                        if (!lineNames.Contains(dashboardViewChartDataSingleModel.Name))
                                        {
                                            lineNames.Add(dashboardViewChartDataSingleModel.Name);
                                        }
                                    }
                                }
                            }
                            else
                            {
                                columnNames.Add(localizationService.GetString("NoData"));
                            }

                            var newLineData = new List<DashboardViewChartDataMultiModel>();

                            if (isSmiley)
                            {
                                foreach (var columnName in columnNames)
                                {
                                    var model = new DashboardViewChartDataMultiModel {Name = columnName};
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                                    {
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                        {
                                            Name = smileyLabels.Single(z => z.Key == 100).Value,
                                            Value = 0
                                        });
                                    }
                                        
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                            {Name = smileyLabels.Single(z => z.Key == 75).Value, Value = 0});
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                            {Name = smileyLabels.Single(z => z.Key == 50).Value, Value = 0});
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                            {Name = smileyLabels.Single(z => z.Key == 25).Value, Value = 0});
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                            {Name = smileyLabels.Single(z => z.Key == 0).Value, Value = 0});
                                    if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                                        model.Series.Add(new DashboardViewChartDataSingleModel
                                            {Name = smileyLabels.Single(z => z.Key == 999).Value, Value = 0});
                                    newLineData.Add(model);
                                }

                                foreach (var model in newLineData)
                                {
                                    foreach (var multiModel in multiData)
                                    {
                                        if (model.Name == multiModel.Name)
                                        {
                                            foreach (var series in multiModel.Series)
                                            {
                                                foreach (var modelSeries in model.Series)
                                                {
                                                    if (modelSeries.Name == series.Name)
                                                    {
                                                        modelSeries.Value = series.Value;
                                                        modelSeries.DataCount = series.DataCount;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            else if (isMulti)
                            {
                                foreach (var stackedModel in multiData)
                                {
                                    var newStackedModel = new DashboardViewChartDataMultiModel
                                    {
                                        Id = stackedModel.Id,
                                        Name = stackedModel.Name,
                                        AnswersCount = stackedModel.AnswersCount,
                                        IsTag = stackedModel.IsTag,
                                        Series = stackedModel.Series
                                            .OrderBy(x => x.Name)
                                            .ToList(),
                                    };


                                    newLineData.Add(newStackedModel);
                                }
                            }
                            else
                            {
                                newLineData = multiData;
                            }

                            // Sort by location position
                            if (isComparedData)
                            {
                                if (dashboardItem.CompareEnabled == false)
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            dashboardLocationId,
                                            dashboardLocationTagId);
                                }
                                else
                                {
                                    newLineData =
                                        ChartHelpers.SortMultiDataLocationPosition(
                                            newLineData,
                                            dashboardItem,
                                            null,
                                            null);
                                }
                            }

                            var rawData = ChartRawDataHelpers.ConvertMultiData(localizationService, newLineData, false, isMulti);
                            dashboardItemModel.ChartData.RawData = rawData;
                            dashboardItemModel.ChartData.Multi.AddRange(newLineData);
                        }
                        else
                        {
                            multiStackedData =
                                ChartHelpers.SortMultiStackedDataLocationPosition(
                                    multiStackedData,
                                    dashboardItem);

                            multiStackedRawData =
                                ChartHelpers.SortMultiStackedRawDataLocationPosition(
                                    multiStackedRawData,
                                    dashboardItem);

                            if (isSmiley)
                            {
                                var newLineData = new List<DashboardViewChartDataMultiStackedModel>();
                                var columnNames = new List<string>();

                                if (multiStackedData.Any())
                                {
                                    foreach (var stackedModel in multiStackedData)
                                    {
                                        foreach (var modelSeries in stackedModel.Series)
                                        {
                                            if (!columnNames.Contains(modelSeries.Name))
                                            {
                                                columnNames.Add(modelSeries.Name);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    var model = new DashboardViewChartDataMultiStackedModel()
                                    {
                                        Name = localizationService.GetString("NoData"),
                                        IsTag = false,
                                        Id = 0,
                                    };
                                    multiStackedData.Add(model);
                                    columnNames.Add(localizationService.GetString("NoData"));
                                }

                                foreach (var stackedModel in multiStackedData)
                                {
                                    var model = new DashboardViewChartDataMultiStackedModel()
                                    {
                                        Name = stackedModel.Name,
                                        IsTag = stackedModel.IsTag,
                                        Id = stackedModel.Id,
                                    };


                                    foreach (var columnName in columnNames)
                                    {
                                        var innerModel = new DashboardViewChartDataMultiModel() {Name = columnName};
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 100).Value, Value = 0});
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 75).Value, Value = 0});
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 50).Value, Value = 0});
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 25).Value, Value = 0});
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 0).Value, Value = 0});
                                        if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                                            innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                            { Name = smileyLabels.Single(z => z.Key == 999).Value, Value = 0});
                                        model.Series.Add(innerModel);
                                    }
                                  
                                    foreach (var modelSeries in stackedModel.Series)
                                    {
                                        // var innerModel = new DashboardViewChartDataMultiModel() {Name = modelSeries.Name};
                                        var innerModel = model.Series.Single(x => x.Name == modelSeries.Name);

                                        // foreach (var modelSeries in model.Series)
                                        // {
                                        //     if (modelSeries.Name == series.Name)
                                        //     {
                                        //         modelSeries.Value = series.Value;
                                        //     }
                                        // }
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 100) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 100).Value, Value = 0});
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 75) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 75).Value, Value = 0});
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 50) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 50).Value, Value = 0});
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 25) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 25).Value, Value = 0});
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 0) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 0).Value, Value = 0});
                                        // if (ignoreOptions.SingleOrDefault(x => x.WeightValue == 999) == null)
                                        //     innerModel.Series.Add(new DashboardViewChartDataSingleModel
                                        //         {Name = smileyLabels.Single(z => z.Key == 999).Value, Value = 0});

                                        foreach (var innerSeries in modelSeries.Series)
                                        {
                                            foreach (var newInnerSeriesModel in innerModel.Series)
                                            {
                                                if (innerSeries.Name == newInnerSeriesModel.Name)
                                                {
                                                    newInnerSeriesModel.Value = innerSeries.Value;
                                                    newInnerSeriesModel.DataCount = innerSeries.DataCount;
                                                }
                                            }
                                        }
                                    }

                                    newLineData.Add(model);
                                }

                                dashboardItemModel.ChartData.MultiStacked.AddRange(newLineData);
                            }
                            else if (isMulti)
                            {
                                var newLineData = new List<DashboardViewChartDataMultiStackedModel>();

                                foreach (var stackedModel in multiStackedData)
                                {
                                    var newStackedModel = new DashboardViewChartDataMultiStackedModel
                                    {
                                        Id = stackedModel.Id,
                                        Name = stackedModel.Name,
                                        IsTag = stackedModel.IsTag,
                                    };

                                    foreach (var stackedModelSeries in stackedModel.Series)
                                    {
                                        stackedModelSeries.Series = stackedModelSeries.Series
                                            .OrderBy(x => x.Name)
                                            .ToList();
                                    }

                                    newStackedModel.Series = stackedModel.Series
                                        .OrderBy(x => x.Name)
                                        .ToList();

                                    newLineData.Add(newStackedModel);
                                }

                                dashboardItemModel.ChartData.MultiStacked.AddRange(newLineData);
                            }
                            else
                            {
                                dashboardItemModel.ChartData.MultiStacked.AddRange(multiStackedData);
                            }

                            // convert
                            var rawData = ChartRawDataHelpers.ConvertMultiStackedData(
                                dashboardItemModel.ChartData.MultiStacked,
                                multiStackedRawData,
                                isMulti);

                            dashboardItemModel.ChartData.RawData = rawData;
                        }
                    }
                }
            }
        }

        private static int GetAverageDataPercentage(double averageValue)
        {
            var value = Math.Round((decimal)averageValue, 0, MidpointRounding.AwayFromZero);
            return decimal.ToInt32(value);
        }

        private static int GetAnswersCount(IGrouping<object, ChartDataItem> grouping)
        {
            var value = grouping.GroupBy(u => u.AnswerId)
                .Select(u => u.Key)
                .Count();
            return value;
        }

        public static int GetDataPercentage(int subCount, int totalCount)
        {
            var value = Math.Round(((decimal) subCount * 100) / totalCount, 0, MidpointRounding.AwayFromZero);
            return decimal.ToInt32(value);
        }
    }
}