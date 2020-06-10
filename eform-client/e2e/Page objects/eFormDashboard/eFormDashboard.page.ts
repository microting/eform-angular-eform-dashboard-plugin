import Page from '../Page';

export class eformDashboardPage extends Page {
  constructor() {
    super();
  }
  public eformDashboardDropDown() {
    $(`//*[contains(@class, 'dropdown')]//*[contains(text(), 'eForm Dashboard')]`).click();
  }
  public get SurveysConfigsBtn() {
    $('#eform-dashboard-pn-surveys-configs').waitForDisplayed({timeout: 30000});
    $('#eform-dashboard-pn-surveys-configs').waitForClickable({timeout: 20000});
    return $('#eform-dashboard-pn-surveys-configs');
  }
  public get DashboardsBtn() {
    $('#eform-dashboard-pn-dashboards').waitForDisplayed({timeout: 30000});
    $('#eform-dashboard-pn-dashboards').waitForClickable({timeout: 20000});
    return $('#eform-dashboard-pn-dashboards');
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
