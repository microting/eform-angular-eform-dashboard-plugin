import {Injectable} from '@angular/core';
import {BaseService} from '../../../../common/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {OperationDataResult, OperationResult} from '../../../../common/models';
import {eformDashboardBaseSettingsModel} from '../models';

export const eformDashboardSettingsMethods = {
  Settings: 'api/eform-dashboard-pn/settings'
};

@Injectable()
export class eformDashboardPnSettingsService extends BaseService {
  constructor(private _http: HttpClient, router: Router, toastrService: ToastrService) {
    super(_http, router, toastrService);
  }

  getAllSettings(): Observable<OperationDataResult<any>> {
    return this.get(eformDashboardSettingsMethods.Settings);
  }

  updateSettings(model: eformDashboardBaseSettingsModel): Observable<OperationResult> {
    return this.post(eformDashboardSettingsMethods.Settings, model);
  }
}
