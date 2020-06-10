import {
  ApplicationPageModel,
  PageSettingsModel
} from 'src/app/common/models/settings/application-page-settings.model';

export const eformDashboardPnLocalSettings = [
  new ApplicationPageModel({
      name: 'SurveyConfigs',
      settings: new PageSettingsModel({
        pageSize: 10,
        sort: '',
        isSortDsc: false
      })
    }
  ),
  new ApplicationPageModel({
      name: 'Dashboards',
      settings: new PageSettingsModel({
        pageSize: 10,
        sort: '',
        isSortDsc: false
      })
    }
  )
];

export const insightDashboardPnSettings = 'insightDashboardPnSettings';
