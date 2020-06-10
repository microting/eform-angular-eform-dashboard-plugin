import Page from '../Page';

export class eformDashboardPage extends Page {
  constructor() {
    super();
  }
  public eformDashboardDropDown() {
    $(`//*[contains(@class, 'dropdown')]//*[contains(text(), 'eForm Dashboard')]`).click();
  }
  public get SurveysConfigsBtn() {
    $('#insight-dashboard-pn-surveys-configs').waitForDisplayed({timeout: 30000});
    $('#insight-dashboard-pn-surveys-configs').waitForClickable({timeout: 20000});
    return $('#insight-dashboard-pn-surveys-configs');
  }
  public get DashboardsBtn() {
    $('#insight-dashboard-pn-dashboards').waitForDisplayed({timeout: 30000});
    $('#insight-dashboard-pn-dashboards').waitForClickable({timeout: 20000});
    return $('#insight-dashboard-pn-dashboards');
  }
  goToSurveysConfigs() {
    this.eformDashboardDropDown();
    browser.pause(1000);
    this.SurveysConfigsBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
  }
  goToDashboards() {
    this.eformDashboardDropDown();
    browser.pause(1000);
    this.DashboardsBtn.click();
    $('#spinner-animation').waitForDisplayed({timeout: 30000, reverse: true});
  }
}

const EFormDashboardPage = new eformDashboardPage();
export default EFormDashboardPage;
