import {expect} from 'chai';
import loginPage from '../../../../Page objects/Login.page';
import insightDashboardPage from '../../../../Page objects/eFormDashboard/eformDashboard.page';
import dashboardsPage from '../../../../Page objects/eFormDashboard/eformDashboard-Dashboards.page';
import dashboardsViewPage from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardView.page';
import {dashboardLineDataItems, dashboardLineDataJson} from '../../../../Page objects/eFormDashboard/ChartData/DashboardLine.data';
import dashboardEditPage, {DashboardTestConfigEditModel} from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardEdit.page';

const dashboardConfig: DashboardTestConfigEditModel = {
  locationTagName: 'Location 1',
  dateFrom: '2016/01/01',
  dateTo: '2020/05/14',
  today: true
};

describe('eForm Dashboard - Dashboards - Line', function () {
  before(function () {
    loginPage.open('/auth');
    loginPage.login();
    insightDashboardPage.goToDashboards();
    dashboardsPage.createDashboard('Line');
    dashboardEditPage.setDashboardSettings(dashboardConfig);
    dashboardEditPage.generateItems(dashboardLineDataItems);
    dashboardEditPage.dashboardUpdateSaveBtn.click();
  });
  it('should compare items headers', function () {
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
    dashboardsViewPage.compareHeaders(dashboardLineDataJson);
  });
  it('should compare items percentage', function () {
    dashboardsViewPage.comparePercentage(dashboardLineDataJson);
  });
  it('should compare items amounts', function () {
    dashboardsViewPage.compareAmounts(dashboardLineDataJson);
  });
});
