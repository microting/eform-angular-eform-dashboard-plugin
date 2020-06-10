import {expect} from 'chai';
import loginPage from '../../../../Page objects/Login.page';
import insightDashboardPage from '../../../../Page objects/eformDashboard/eformDashboard.page';
import dashboardsPage from '../../../../Page objects/eformDashboard/eformDashboard-Dashboards.page';
import dashboardsViewPage from '../../../../Page objects/eformDashboard/eformDashboard-DashboardView.page';
import dashboardEditPage, {DashboardTestConfigEditModel} from '../../../../Page objects/eformDashboard/eformDashboard-DashboardEdit.page';
import {
  dashboardLineScoreDataJson,
  dashboardLineScoreItems
} from '../../../../Page objects/eformDashboard/ChartData/DashboardLineScore.data';

const dashboardConfig: DashboardTestConfigEditModel = {
  locationTagName: 'Location 1',
  dateFrom: '2016/01/01',
  dateTo: '2020/05/14',
  today: true
};

describe('eForm Dashboard - Dashboards - Line Score', function () {
  before(function () {
    loginPage.open('/auth');
    loginPage.login();
    insightDashboardPage.goToDashboards();
    dashboardsPage.createDashboard('Line Score');
    dashboardEditPage.setDashboardSettings(dashboardConfig);
    dashboardEditPage.generateItems(dashboardLineScoreItems);
    dashboardEditPage.dashboardUpdateSaveBtn.click();
  });
  it('should compare items headers', function () {
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
    dashboardsViewPage.compareHeaders(dashboardLineScoreDataJson);
  });
  it('should compare items average', function () {
    dashboardsViewPage.comparePercentage(dashboardLineScoreDataJson, false);
  });
  it('should compare items amounts', function () {
    dashboardsViewPage.compareAmounts(dashboardLineScoreDataJson);
  });
});
