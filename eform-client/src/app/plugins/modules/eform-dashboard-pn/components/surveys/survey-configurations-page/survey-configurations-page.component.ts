import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SurveyConfigsListModel} from '../../../models';
import {insightDashboardPnSettings, SurveyConfigsSortColumns} from '../../../const';
import {SurveyConfigModel} from '../../../models/survey/survey-config.model';
import {SurveyConfigsRequestModel} from '../../../models/survey/survey-configs-request.model';
import {PageSettingsModel} from '../../../../../../common/models/settings';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {SharedPnService} from '../../../../shared/services';
import {
  SurveyConfigurationDeleteComponent,
  SurveyConfigurationEditComponent,
  SurveyConfigurationNewComponent,
  SurveyConfigurationStatusComponent
} from '../..';
import {eformDashboardPnDashboardDictionariesService, eformDashboardPnSurveyConfigsService} from '../../../services';
import {CommonDictionaryModel} from '../../../../../../common/models/common';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {SitesService} from '../../../../../../common/services/advanced';

@AutoUnsubscribe()
@Component({
  selector: 'app-insight-dashboard-surveys',
  templateUrl: './survey-configurations-page.component.html',
  styleUrls: ['./survey-configurations-page.component.scss']
})
export class SurveyConfigurationsPageComponent implements OnInit, OnDestroy {
  @ViewChild('newSurveyConfigModal', { static: true }) newSurveyConfigModal: SurveyConfigurationNewComponent;
  @ViewChild('editSurveyConfigModal', { static: true }) editSurveyConfigModal: SurveyConfigurationEditComponent;
  @ViewChild('statusSurveyConfigModal', { static: true }) statusSurveyConfigModal: SurveyConfigurationStatusComponent;
  @ViewChild('deleteSurveyConfigModal', { static: true }) deleteSurveyConfigModal: SurveyConfigurationDeleteComponent;
  surveyConfigurationsListModel: SurveyConfigsListModel = new SurveyConfigsListModel();
  localPageSettings: PageSettingsModel = new PageSettingsModel();
  surveyConfigurationsRequestModel: SurveyConfigsRequestModel = new SurveyConfigsRequestModel();
  availableSurveys: CommonDictionaryModel[] = [];
  locations: CommonDictionaryModel[] = [];
  searchSubject = new Subject();
  getSurveyConfigsSub$: Subscription;
  getSurveysSub$: Subscription;
  getLocationsSub$: Subscription;

  get sortCols() {
    return SurveyConfigsSortColumns;
  }

  constructor(private sharedPnService: SharedPnService,
              private surveyConfigsService: eformDashboardPnSurveyConfigsService,
              private dictionariesService: eformDashboardPnDashboardDictionariesService,
              private sitesService: SitesService) {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(val => {
      this.surveyConfigurationsRequestModel.searchString = val.toString();
      this.getSurveyConfigsList();
    });
  }

  ngOnInit() {
    this.getLocalPageSettings();
    this.getLocations();
    this.getSurveys();
  }

  getSurveyConfigsList() {
    this.surveyConfigurationsRequestModel.isSortDsc = this.localPageSettings.isSortDsc;
    this.surveyConfigurationsRequestModel.sort = this.localPageSettings.sort;
    this.surveyConfigurationsRequestModel.pageSize = this.localPageSettings.pageSize;

    this.getSurveyConfigsSub$ = this.surveyConfigsService.getAll(this.surveyConfigurationsRequestModel)
      .subscribe((data) => {
        if (data && data.success) {
          this.surveyConfigurationsListModel = data.model;
        }
      });
  }

  getSurveys() {
    this.getSurveysSub$ = this.dictionariesService.getSurveys()
      .subscribe((data) => {
        if (data && data.success) {
          this.availableSurveys = data.model;
        }
      });
  }

  getLocations() {
    this.getLocationsSub$ = this.sitesService.getAllSitesDictionary().subscribe((data) => {
      if (data && data.success) {
        this.locations = data.model;
      }
    });
  }

  getLocalPageSettings() {
    this.localPageSettings = this.sharedPnService
      .getLocalPageSettings(insightDashboardPnSettings, 'SurveyConfigs')
      .settings;
    this.getSurveyConfigsList();
  }

  sortTable(sort: string) {
    if (this.localPageSettings.sort === sort) {
      this.localPageSettings.isSortDsc = !this.localPageSettings.isSortDsc;
    } else {
      this.localPageSettings.isSortDsc = false;
      this.localPageSettings.sort = sort;
    }
    this.updateLocalPageSettings();
  }

  changePage(e: any) {
    if (e || e === 0) {
      this.surveyConfigurationsRequestModel.offset = e;
      this.getSurveyConfigsList();
    }
  }

  onSearchInputChanged(e: any) {
    this.searchSubject.next(e.target.value);
  }

  getSortIcon(sort: string): string {
    if (this.surveyConfigurationsRequestModel.sort === sort) {
      return this.surveyConfigurationsRequestModel.isSortDsc ? 'expand_more' : 'expand_less';
    } else {
      return 'unfold_more';
    }
  }

  openEditModal(surveyConfig: SurveyConfigModel) {
    this.editSurveyConfigModal.show(surveyConfig);
  }

  openDeleteModal(surveyConfig: SurveyConfigModel) {
    this.deleteSurveyConfigModal.show(surveyConfig);
  }

  openCreateModal() {
    this.newSurveyConfigModal.show();
  }

  openStatusModal(surveyConfig: SurveyConfigModel) {
    this.statusSurveyConfigModal.show(surveyConfig);
  }

  updateLocalPageSettings() {
    this.sharedPnService.updateLocalPageSettings(
      insightDashboardPnSettings,
      this.localPageSettings,
      'SurveyConfigs'
    );
    this.getSurveyConfigsList();
  }

  ngOnDestroy(): void {
  }
}
