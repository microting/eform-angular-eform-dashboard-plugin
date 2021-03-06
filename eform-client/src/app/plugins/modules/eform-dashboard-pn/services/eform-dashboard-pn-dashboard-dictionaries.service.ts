import {Injectable} from '@angular/core';
import {BaseService} from '../../../../common/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {CommonDictionaryModel, OperationDataResult} from '../../../../common/models';
import {DashboardItemAnswerRequestModel, DashboardItemQuestionModel} from '../models';

const DictionariesMethods = {
  GetSurveys: 'api/eform-dashboard-pn/dictionary/surveys',
  GetLocationsBySurvey: 'api/eform-dashboard-pn/dictionary/locations-by-survey',
  GetQuestions: 'api/eform-dashboard-pn/dictionary/questions',
  GetFilterAnswers: 'api/eform-dashboard-pn/dictionary/filter-answers',
  GetTags: 'api/eform-dashboard-pn/dictionary/locations-tags'
};

@Injectable()
// tslint:disable-next-line:class-name
export class eformDashboardPnDashboardDictionariesService extends BaseService {
  constructor(private _http: HttpClient, router: Router, toastrService: ToastrService) {
    super(_http, router, toastrService);
  }

  getQuestions(eFormId: number): Observable<OperationDataResult<Array<DashboardItemQuestionModel>>> {
    return this.get(DictionariesMethods.GetQuestions + '/' + eFormId);
  }

  getFilterAnswers(model: DashboardItemAnswerRequestModel): Observable<OperationDataResult<Array<CommonDictionaryModel>>> {
    return this.get(DictionariesMethods.GetFilterAnswers, model);
  }

  getSurveys(): Observable<OperationDataResult<Array<CommonDictionaryModel>>> {
    return this.get(DictionariesMethods.GetSurveys);
  }

  getTags(): Observable<OperationDataResult<Array<CommonDictionaryModel>>> {
    return this.get(DictionariesMethods.GetTags);
  }

  getLocationBySurveyId(surveyId?: number): Observable<OperationDataResult<Array<CommonDictionaryModel>>> {
    return this.get(DictionariesMethods.GetLocationsBySurvey + '/' + surveyId);
  }
}
