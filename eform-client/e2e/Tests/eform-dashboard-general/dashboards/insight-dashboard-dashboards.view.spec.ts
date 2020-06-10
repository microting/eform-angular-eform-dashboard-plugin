import {expect} from 'chai';
import loginPage from '../../../Page objects/Login.page';
import insightDashboardPage from '../../../Page objects/eFormDashboard/eformDashboard.page';
import dashboardsPage from '../../../Page objects/eFormDashboard/eformDashboard-Dashboards.page';
import dashboardEditPage, {DashboardTestConfigEditModel} from '../../../Page objects/eFormDashboard/eformDashboard-DashboardEdit.page';
import dashboardsViewPage from '../../../Page objects/eFormDashboard/eformDashboard-DashboardView.page';

const dashboardConfig: DashboardTestConfigEditModel = {
  locationTagName: 'Location 1',
  dateFrom: '2016/01/01',
  dateTo: '2020/05/14',
  today: false
};

const item = {
  firstQuestion: 'Q2',
  filterQuestion: 'Q3',
  // firstQuestion: 'Q2: Er personalet på afsnittet venligt og imødekommende?',
  // filterQuestion: 'Q3: Oplever du, at personalet er forberedt til samtaler med dig om din udredning/behandling?',
  filterAnswer: 'Meget glad',
  period: 'Måned',
  chartType: 'Linje',
  calculateAverage: false,
  ignoredAnswerIds: [],
  comparedItems: []
};

describe('eForm Dashboard - Dashboards - View', function () {
  before(function () {
    loginPage.open('/auth');
    loginPage.login();
    insightDashboardPage.goToDashboards();
    dashboardsPage.createDashboard('Test View');
    dashboardEditPage.setDashboardSettings(dashboardConfig);
  });
  it('should observe filled item', function () {
    dashboardEditPage.generateItems([item]);
    dashboardEditPage.dashboardUpdateSaveBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
    dashboardsViewPage.compareItem(dashboardsViewPage.rowNum, item, dashboardConfig);
  });
});
