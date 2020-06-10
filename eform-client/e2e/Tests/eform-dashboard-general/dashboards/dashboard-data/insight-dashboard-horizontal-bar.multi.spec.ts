import {expect} from 'chai';
import loginPage from '../../../../Page objects/Login.page';
import insightDashboardPage from '../../../../Page objects/eFormDashboard/eformDashboard.page';
import dashboardsPage from '../../../../Page objects/eFormDashboard/eformDashboard-Dashboards.page';
import dashboardsViewPage from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardView.page';
import dashboardEditPage, {DashboardTestConfigEditModel} from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardEdit.page';
import {
  dashboardHorizontalBarDataJson,
  dashboardHorizontalBarItems
} from '../../../../Page objects/eFormDashboard/ChartData/DashboardHorizontalBar.data';

const dashboardConfig: DashboardTestConfigEditModel = {
  locationTagName: 'Location 1',
  dateFrom: '2016/01/01',
  dateTo: '2020/05/14',
  today: true
};

describe('eForm Dashboard - Dashboards - Horizontal Bar', function () {
  before(function () {
    loginPage.open('/auth');
    loginPage.login();
    insightDashboardPage.goToDashboards();
    dashboardsPage.createDashboard('Horizontal Bar');
    dashboardEditPage.setDashboardSettings(dashboardConfig);
    dashboardEditPage.generateItems(dashboardHorizontalBarItems);
    dashboardEditPage.dashboardUpdateSaveBtn.click();
  });
  it('should compare items headers', function () {
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
    dashboardsViewPage.compareHeaders(dashboardHorizontalBarDataJson);
  });
  it('should compare items percentage', function () {
    dashboardsViewPage.comparePercentage(dashboardHorizontalBarDataJson);
  });
  it('should compare items amounts', function () {
    dashboardsViewPage.compareAmounts(dashboardHorizontalBarDataJson);
  });
});
