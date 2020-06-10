import {Injectable} from '@angular/core';
import {BaseService} from '../../../../common/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {OperationDataResult, OperationResult} from '../../../../common/models';
import {DashboardCreateModel, DashboardsListModel, DashboardViewModel} from '../models';
import {DashboardsRequestModel} from '../models/dashboard/dashboards-request.model';
import {DashboardEditModel} from '../models/dashboard/dashboard-edit.model';
import {DashboardViewExportDocModel} from '../models/dashboard/dashboard-view/dashboard-view-export-doc.model';

export let DashboardMethods = {
  Get: 'api/eform-dashboard-pn/dashboards',
  GetForEdit: 'api/eform-dashboard-pn/dashboards/edit',
  GetForView: 'api/eform-dashboard-pn/dashboards/view',
  Create: 'api/eform-dashboard-pn/dashboards/create',
  Update: 'api/eform-dashboard-pn/dashboards/update',
  Copy: 'api/eform-dashboard-pn/dashboards/copy',
  Delete: 'api/eform-dashboard-pn/dashboards/delete',
  ExportDoc: 'api/eform-dashboard-pn/dashboards/export-doc',
};

@Injectable()
// tslint:disable-next-line:class-name
export class eFormDashboardPnDashboardsService extends BaseService {
  constructor(private _http: HttpClient, router: Router, toastrService: ToastrService) {
    super(_http, router, toastrService);
  }

  getAll(model: DashboardsRequestModel): Observable<OperationDataResult<DashboardsListModel>> {
    return this.post(DashboardMethods.Get, model);
  }

  getSingleForView(id: number): Observable<OperationDataResult<DashboardViewModel>> {
    return this.get(DashboardMethods.GetForView + '/' + id);
  }

  getSingleForEdit(id: number): Observable<OperationDataResult<DashboardEditModel>> {
    return this.get(DashboardMethods.GetForEdit + '/' + id);
  }

  create(model: DashboardCreateModel): Observable<OperationDataResult<number>> {
    return this.post(DashboardMethods.Create, model);
  }

  copy(dashboardId: number): Observable<OperationResult> {
    return this.post(DashboardMethods.Copy + '/' + dashboardId, {});
  }

  update(model: DashboardEditModel): Observable<OperationResult> {
    return this.post(DashboardMethods.Update, model);
  }

  remove(dashboardId: number): Observable<OperationResult> {
    return this.post(DashboardMethods.Delete + '/' + dashboardId, {});
  }

  exportToDoc(model: DashboardViewExportDocModel): Observable<any> {
    return this.uploadFiles(DashboardMethods.ExportDoc + '/' + model.dashboardId, model.files, {}, 'blob');
  }
}
