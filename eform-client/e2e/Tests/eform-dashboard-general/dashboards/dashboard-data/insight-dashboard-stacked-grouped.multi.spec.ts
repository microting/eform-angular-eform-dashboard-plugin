import {expect} from 'chai';
import loginPage from '../../../../Page objects/Login.page';
import insightDashboardPage from '../../../../Page objects/eFormDashboard/eformDashboard.page';
import dashboardsPage from '../../../../Page objects/eFormDashboard/eformDashboard-Dashboards.page';
import dashboardsViewPage from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardView.page';
import dashboardEditPage, {DashboardTestConfigEditModel} from '../../../../Page objects/eFormDashboard/eformDashboard-DashboardEdit.page';
import sitesPage from '../../../../Page objects/Sites.page';
import {
  dashboardStackedGroupedDataJson,
  dashboardStackedGroupedItems
} from '../../../../Page objects/eFormDashboard/ChartData/DashboardStackedGrouped.data';

const dashboardConfig: DashboardTestConfigEditModel = {
  locationTagName: 'Total',
  dateFrom: '2016/01/01',
  dateTo: '2020/05/14',
  today: true
};

describe('eForm Dashboard - Dashboards - Stacked Grouped', function () {
  before(function () {
    loginPage.open('/auth');
    loginPage.login();

    // Create and assign total tag
    loginPage.open('/advanced/sites');
    sitesPage.createAndAssignTag(dashboardConfig.locationTagName, [1, 2, 3, 4]);

    // Create dashboard with items
    insightDashboardPage.goToDashboards();
    dashboardsPage.createDashboard('Stacked Grouped');
    dashboardEditPage.setDashboardSettings(dashboardConfig);
    dashboardEditPage.generateItems(dashboardStackedGroupedItems);
    dashboardEditPage.dashboardUpdateSaveBtn.click();
  });
  it('should compare items headers', function () {
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
    dashboardsViewPage.compareHeaders(dashboardStackedGroupedDataJson);
  });
  it('should compare items percentage', function () {
    dashboardsViewPage.comparePercentage(dashboardStackedGroupedDataJson);
  });
  it('should compare items amounts', function () {
    dashboardsViewPage.compareAmounts(dashboardStackedGroupedDataJson);
  });
});
