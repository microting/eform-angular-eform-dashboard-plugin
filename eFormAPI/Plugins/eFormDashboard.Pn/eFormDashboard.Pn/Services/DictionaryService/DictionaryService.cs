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
 using eFormDashboard.Pn.Services.Common.eFormDashboardLocalizationService;
 using Microsoft.EntityFrameworkCore;
 using Microsoft.Extensions.Logging;
 using Microting.eForm.Infrastructure.Constants;
 using Microting.eForm.Infrastructure.Data.Entities;
 using Microting.eFormApi.BasePn.Abstractions;
 using Microting.eFormApi.BasePn.Infrastructure.Models.API;
 using Microting.eFormApi.BasePn.Infrastructure.Models.Common;
 using KeyValuePair = Microting.eForm.Dto.KeyValuePair;

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
                    var surveys = await sdkContext.check_lists
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed && x.ParentId == null)
                        .Select(x => new CommonDictionaryModel()
                        {
                            Id = x.Id,
                            Name = x.Label,
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

        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetLocationsByeFormId(int eFormId)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var dbContext = core.dbContextHelper.GetDbContext())
                {
                    var sites = await dbContext.check_list_sites
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.Site.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.CheckListId == eFormId)
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
                    
                    var siteCases = await dbContext.cases
                        .AsNoTracking()
                        .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.Site.WorkflowState != Constants.WorkflowStates.Removed)
                        .Where(x => x.CheckListId == eFormId)
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

                    sites = sites.Concat(siteCases).Distinct().ToList();

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

        public async Task<OperationDataResult<List<QuestionDictionaryModel>>> GetQuestions(int eFormId)
        {
            try
            {
                var questionsResult = new List<QuestionDictionaryModel>();
                var questions = await GetAllFields(eFormId);
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    foreach (fields field in questions)
                    {
                        questionsResult.Add(new QuestionDictionaryModel()
                        {
                            Id = field.Id,
                            Name = field.Label,
                            Type = sdkContext.field_types.Single(x => x.Id == field.FieldTypeId).FieldType
                        });
                    }
                }
                
                return new OperationDataResult<List<QuestionDictionaryModel>>(
                    true,
                    questionsResult);
                
            }
            catch (Exception e)
            {
                Trace.TraceError(e.Message);
                _logger.LogError(e.Message);
                return new OperationDataResult<List<QuestionDictionaryModel>>(false,
                    _localizationService.GetString("ErrorWhileObtainingQuestions"));
            }
        }


        public async Task<OperationDataResult<List<CommonDictionaryModel>>> GetFilterAnswers(DashboardItemAnswerRequestModel requestModel)
        {
            try
            {
                var core = await _coreHelper.GetCore();
                using (var sdkContext = core.dbContextHelper.GetDbContext())
                {
                    var languages = await sdkContext.languages.ToListAsync();
                    var answersResult = new List<CommonDictionaryModel>();
                    // bool isSmileyQuestion = false;
                    foreach (var language in languages)
                    {
                        // isSmileyQuestion = await sdkContext.questions
                        //     .Where(x => x.Id == requestModel.FilterFieldOptionId)
                        //     .Select(x => x.IsSmiley())
                        //     .FirstOrDefaultAsync();

                        // TODO take by language
                        List<CommonDictionaryModel> answers = new List<CommonDictionaryModel>();
                        fields field = await sdkContext.fields.SingleOrDefaultAsync(x => x.Id == requestModel.FilterFieldId);
                        if (field.KeyValuePairList != null)
                        {
                            List<KeyValuePair> theList = PairRead(field.KeyValuePairList);
                            foreach (KeyValuePair keyValuePair in theList)
                            {
                                answersResult.Add(new CommonDictionaryModel()
                                {
                                    Description = "",
                                    Id = int.Parse(keyValuePair.Key),
                                    Name = keyValuePair.Value
                                });
                            }
                        }
                        // var answers = await sdkContext.options
                        //     .AsNoTracking()
                        //     .Where(x => x.WorkflowState != Constants.WorkflowStates.Removed)
                        //     .Where(x => x.QuestionId == requestModel.FilterFieldId)
                        //     .Select(x => new CommonDictionaryModel()
                        //     {
                        //         Id = x.Id,
                        //         Name = x.OptionTranslationses
                        //             .Where(qt => qt.WorkflowState != Constants.WorkflowStates.Removed)
                        //             .Where(qt => qt.Language.Id == language.Id)
                        //             .Select(qt => qt.Name)
                        //             .FirstOrDefault(),
                        //     }).ToListAsync();

                        // if (answers.Any())
                        // {
                        //     answersResult.AddRange(answers);
                        //     break;
                        // }
                    }

                    // if (isSmileyQuestion)
                    // {
                    //     var result = new List<CommonDictionaryModel>();
                    //
                    //     foreach (var dictionaryModel in answersResult)
                    //     {
                    //         result.Add(new CommonDictionaryModel
                    //         {
                    //             Id = dictionaryModel.Id,
                    //             Name = ChartHelpers.GetSmileyLabel(dictionaryModel.Name),
                    //             Description = dictionaryModel.Description,
                    //         });
                    //     }
                    //
                    //     return new OperationDataResult<List<CommonDictionaryModel>>(
                    //         true,
                    //         result);
                    // }


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
        
        private List<KeyValuePair> PairRead(string str)
        {
            List<KeyValuePair> list = new List<KeyValuePair>();
            str = Locate(str, "<hash>", "</hash>");

            bool flag = true;
            int index = 1;
            string keyValue, displayIndex;
            bool selected;

            while (flag)
            {
                string inderStr = Locate(str, "<" + index + ">", "</" + index + ">");

                keyValue = Locate(inderStr, "<key>", "</");
                selected = bool.Parse(Locate(inderStr.ToLower(), "<selected>", "</"));
                displayIndex = Locate(inderStr, "<displayIndex>", "</");

                list.Add(new KeyValuePair(index.ToString(), keyValue, selected, displayIndex));

                index += 1;

                if (Locate(str, "<" + index + ">", "</" + index + ">") == "")
                    flag = false;
            }

            return list;
        }
        
        private string Locate(string textStr, string startStr, string endStr)
        {
            try
            {
                if (!textStr.Contains(startStr))
                    return "";

                if (!textStr.Contains(endStr))
                    return "";

                int startIndex = textStr.IndexOf(startStr, StringComparison.Ordinal) + startStr.Length;
                int length = textStr.IndexOf(endStr, startIndex, StringComparison.Ordinal) - startIndex;
                //return textStr.Substring(startIndex, lenght);
                return textStr.AsSpan().Slice(start: startIndex, length).ToString();
            }
            catch
            {
                return "";
            }
        }

        private async Task<List<fields>> GetAllFields(int eFormId)
        {
            List<fields> theList = new List<fields>();
            var core = await _coreHelper.GetCore();
            using (var sdkContext = core.dbContextHelper.GetDbContext())
            {
                if (sdkContext.check_lists.Any(x => x.ParentId == eFormId))
                {
                    foreach (check_lists checkList in sdkContext.check_lists.Where(x => x.ParentId == eFormId).ToList())
                    {
                        theList.AddRange(await GetAllFields(checkList.Id));
                    }
                }
                else
                {
                    theList.AddRange(sdkContext.fields.Where(x => x.CheckListId == eFormId));
                }
            }

            return theList;
        }
    }
}
