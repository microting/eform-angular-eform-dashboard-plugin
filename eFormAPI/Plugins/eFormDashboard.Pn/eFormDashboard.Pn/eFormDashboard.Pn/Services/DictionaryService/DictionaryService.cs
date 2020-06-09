﻿/*
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
 using System.Threading.Tasks;
 using eFormDashboard.Pn.Infrastructure.Helpers;
 using eFormDashboard.Pn.Infrastructure.Models;
 using eFormDashboard.Pn.Infrastructure.Models.Dashboards;
 using eFormDashboard.Pn.Services.Common.InsightDashboardLocalizationService;
 using Microsoft.EntityFrameworkCore;
 using Microsoft.Extensions.Logging;
 using Microting.eForm.Infrastructure.Constants;
 using Microting.eFormApi.BasePn.Abstractions;
 using Microting.eFormApi.BasePn.Infrastructure.Models.API;
 using Microting.eFormApi.BasePn.Infrastructure.Models.Common;

 namespace eFormDashboard.Pn.Services.DictionaryService
{
    public class DictionaryService : IDictionaryService
    {
        private readonly ILogger<DictionaryService> _logger;
        private readonly IeFormDashboardLocalizationService _localizationService;
        private readonly IEFormCoreService _coreHelper;

        public DictionaryService(
            ILogger<DictionaryService> logger,
            IeFormDashboardLocalizationService localizationService,
            IEFormCoreService coreHelper)
        {
            _logger = logger;
            _localizationService = localizationService;
            _coreHelper = coreHelper;
        }

        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetSurveys()
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    var surveys = await sdkContext.question_sets
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Select(x => new CommonDictionaryModel()
                        {
                            Id = x.Id,
                            Name = x.Name,
                        }).ToListAsync();

                    return new OperationDataResult<List<CommonDictionaryModel>>(true, surveys);
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<List<CommonDictionaryModel>>(false,
                    _localizationService.GetString("ErrorWhileObtainingSurveys"));
            }
        }
        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetTags()
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    var surveys = await sdkContext.tags
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Select(x => new CommonDictionaryModel()
                        {
                            Id = x.Id,
                            Name = x.Name,
                        }).ToListAsync();

                    return new OperationDataResult<List<CommonDictionaryModel>>(true, surveys);
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<List<CommonDictionaryModel>>(false,
                    _localizationService.GetString("ErrorWhileObtainingTags"));
            }
        }

        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetLocationsByeFormId(int surveyId)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var dbContext = core.dbContextHelper.GetDbContext())
                {
                    var sites = await dbContext.site_survey_configurations
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.Site.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.SurveyConfiguration.QuestionSet.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.SurveyConfiguration.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.SurveyConfiguration.QuestionSetId == surveyId)
                        .GroupBy(x => new
                        {
                            Id = x.SiteId,
                            x.Site.Name,
                        })
                        .Select(x => new CommonDictionaryModel
                        {
                            Id = x.Key.Id,
                            Name = x.Key.Name,
                        }).ToListAsync();

                    return new OperationDataResult<List<CommonDictionaryModel>>(true, sites);
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return new OperationDataResult<List<CommonDictionaryModel>>(false,
                    _localizationService.GetString("ErrorWhileObtainingSites"));
            }
        }

        // public async Task<OperationDataResult<List<QuestionDictionaryModel>>> GetQuestions(int surveyId)
        // {
        //     try
        //     {
        //         var core = await _coreHelper.GetCore();
        //         using (var sdkContext = core.dbContextHelper.GetDbContext())
        //         {
        //             var languages = await sdkContext.languages.ToListAsync();
        //             var questionsResult = new List<QuestionDictionaryModel>();
        //             foreach (var language in languages)
        //             {
        //                 // TODO take by language
        //                 var questions = await sdkContext.questions
        //                     .AsNoTracking()
        //                     .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
        //                     .Where(x => x.QuestionSetId == surveyId)
        //                     .Select(x => new QuestionDictionaryModel()
        //                     {
        //                         Id = x.Id,
        //                         Type = x.GetQuestionType(),
        //                         Name = x.QuestionTranslationses
        //                             .Where(qt => qt.WorkflowState != Constants.WorkflowStates.Removed)
        //                             .Where(qt => qt.Language.Id == language.Id)
        //                             .Select(qt => qt.Name)
        //                             .FirstOrDefault(),
        //                     }).ToListAsync();
        //
        //                 if (questions.Any())
        //                 {
        //                     questionsResult.AddRange(questions);
        //                     break;
        //                 }
        //             }
        //
        //             return new OperationDataResult<List<QuestionDictionaryModel>>(
        //                 true,
        //                 questionsResult);
        //         }
        //     }
        //     catch (Exception e)
        //     {
        //         Trace.TraceError(e.Message);
        //         _logger.LogError(e.Message);
        //         return new OperationDataResult<List<QuestionDictionaryModel>>(false,
        //             _localizationService.GetString("ErrorWhileObtainingQuestions"));
        //     }
        // }


        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetFilterAnswers(DashboardItemAnswerRequestModel requestModel)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    var languages = await sdkContext.languages.ToListAsync();
                    var answersResult = new List<CommonDictionaryModel>();
                    bool isSmileyQuestion = false;
                    foreach (var language in languages)
                    {
                        isSmileyQuestion = await sdkContext.questions
                            .Where(x => x.Id == requestModel.FilterFieldOptionId)
                            .Select(x => x.IsSmiley())
                            .FirstOrDefaultAsync();

                        // TODO take by language
                        var answers = await sdkContext.options
                            .AsNoTracking()
                            .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                            .Where(x => x.QuestionId == requestModel.FilterFieldOptionId)
                            .Select(x => new CommonDictionaryModel()
                            {
                                Id = x.Id,
                                Name = x.OptionTranslationses
                                    .Where(qt => qt.WorkflowState != Constants.WorkflowStates.Removed)
                                    .Where(qt => qt.Language.Id == language.Id)
                                    .Select(qt => qt.Name)
                                    .FirstOrDefault(),
                            }).ToListAsync();

                        if (answers.Any())
                        {
                            answersResult.AddRange(answers);
                            break;
                        }
                    }

                    if (isSmileyQuestion)
                    {
                        var result = new List<CommonDictionaryModel>();

                        foreach (var dictionaryModel in answersResult)
                        {
                            result.Add(new CommonDictionaryModel
                            {
                                Id = dictionaryModel.Id,
                                Name = ChartHelpers.GetSmileyLabel(dictionaryModel.Name),
                                Description = dictionaryModel.Description,
                            });
                        }

                        return new OperationDataResult<List<CommonDictionaryModel>>(
                            true,
                            result);
                    }


                    return new OperationDataResult<List<CommonDictionaryModel>>(
                        true,
                        answersResult);
                }
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<List<CommonDictionaryModel>>(false,
                    _localizationService.GetString("ErrorWhileObtainingAnswers"));
            }
        }
    }
}
