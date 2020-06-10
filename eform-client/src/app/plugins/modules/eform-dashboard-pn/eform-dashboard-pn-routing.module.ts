import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {eFormDashboardPnLayoutComponent} from './layouts';
import {AdminGuard, AuthGuard, PermissionGuard} from '../../../common/guards';
import {
  DashboardEditComponent,
  DashboardsPageComponent,
  DashboardViewComponent,
  eFormDashboardSettingsComponent,
} from './components';
import {eformDashboardPnClaims} from './const';

export const routes: Routes = [
  {
    path: '',
    component: eFormDashboardPnLayoutComponent,
    // canActivate: [PermissionGuard],
    // data: {requiredPermission: eformDashboardPnClaims.accesseformDashboardPlugin},
    children: [
      {
        path: 'dashboards',
        canActivate: [AuthGuard],
        component: DashboardsPageComponent
      },
      {
        path: 'dashboard/:dashboardId',
        canActivate: [AuthGuard],
        component: DashboardViewComponent
      },
      {
        path: 'dashboard/edit/:dashboardId',
        canActivate: [AuthGuard],
        component: DashboardEditComponent
      },
      {
        path: 'settings',
        canActivate: [AdminGuard],
        component: eFormDashboardSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class eFormDashboardPnRoutingModule {
}
