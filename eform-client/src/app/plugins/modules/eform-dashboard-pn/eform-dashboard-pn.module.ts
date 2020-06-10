import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {CollapseModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedPnModule} from '../shared/shared-pn.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EformSharedModule} from '../../../common/modules/eform-shared/eform-shared.module';
import {eFormDashboardPnLayoutComponent} from './layouts';

import {eFormDashboardPnRoutingModule} from './eform-dashboard-pn-routing.module';
import {CasesModule} from '../../../modules';
import {
  eformDashboardPnDashboardDictionariesService,
  eformDashboardPnDashboardItemsService,
  eFormDashboardPnDashboardsService,
  eformDashboardPnSettingsService,
} from './services';
import {
  DashboardBlockViewComponent,
  DashboardChartDataEditComponent,
  DashboardChartDataViewComponent,
  DashboardChartEditComponent,
  DashboardChartViewComponent,
  DashboardCopyComponent,
  DashboardDeleteComponent,
  DashboardEditComponent,
  DashboardEditHeaderComponent,
  DashboardInterviewsEditComponent,
  DashboardInterviewsViewComponent,
  DashboardItemEditComponent,
  DashboardNewComponent,
  DashboardsPageComponent,
  DashboardViewComponent,
  eFormDashboardSettingsComponent,
} from './components';
import {DragulaModule} from 'ng2-dragula';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {OwlDateTimeModule} from 'ng-pick-datetime-ex';

@NgModule({
  imports: [
    CommonModule,
    SharedPnModule,
    MDBBootstrapModule,
    eFormDashboardPnRoutingModule,
    TranslateModule,
    FormsModule,
    NgSelectModule,
    EformSharedModule,
    FontAwesomeModule,
    CasesModule,
    DragulaModule,
    CollapseModule,
    NgxChartsModule,
    OwlDateTimeModule
  ],
  declarations: [
    eFormDashboardPnLayoutComponent,
    eFormDashboardSettingsComponent,
    DashboardsPageComponent,
    DashboardNewComponent,
    DashboardEditComponent,
    DashboardViewComponent,
    DashboardDeleteComponent,
    DashboardCopyComponent,
    DashboardItemEditComponent,
    DashboardChartEditComponent,
    DashboardChartViewComponent,
    DashboardBlockViewComponent,
    DashboardEditHeaderComponent,
    DashboardInterviewsEditComponent,
    DashboardChartDataEditComponent,
    DashboardChartDataViewComponent,
    DashboardInterviewsViewComponent
  ],
  providers: [eformDashboardPnSettingsService, eFormDashboardPnDashboardsService,
    eformDashboardPnDashboardDictionariesService, eformDashboardPnDashboardItemsService]
})

export class eFormDashboardPnModule {
}
