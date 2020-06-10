import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {eformDashboardPnLayoutComponent} from './layouts';
import {AdminGuard, AuthGuard, PermissionGuard} from '../../../common/guards';
import {
  DashboardEditComponent,
  DashboardsPageComponent,
  DashboardViewComponent,
  eformDashboardSettingsComponent,
  SurveyConfigurationsPageComponent
} from './components';
import {eformDashboardPnClaims} from './const';

export const routes: Routes = [
  {
    path: '',
    component: eformDashboardPnLayoutComponent,
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
        path: 'surveys-configs',
        canActivate: [AuthGuard],
        component: SurveyConfigurationsPageComponent
      },
      {
        path: 'settings',
        canActivate: [AdminGuard],
        component: eformDashboardSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class eformDashboardPnRoutingModule {
}
