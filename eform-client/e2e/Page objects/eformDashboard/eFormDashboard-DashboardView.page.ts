import Page from '../Page';
import {expect} from 'chai';
import dashboardEditPage, {DashboardTestConfigEditModel, DashboardTestItemEditModel} from './eformDashboard-DashboardEdit.page';

export class eformDashboardDashboardViewPage extends Page {
  constructor() {
    super();
  }

  public get rowNum(): number {
    browser.pause(500);
    return $$('#dashboardViewItem').length;
  }

  public get returnToDashboards() {
    $('#returnToPrevious').waitForDisplayed({timeout: 30000});
    $('#returnToPrevious').waitForClickable({timeout: 20000});
    return $('#returnToPrevious');
  }

  public firstQuestion(rowNum: number) {
    return $(`#firstQuestion${rowNum}`);
  }

  public filterQuestion(rowNum: number) {
    return $(`#filterQuestion${rowNum}`);
  }

  public filterAnswer(rowNum: number) {
    return $(`#filterAnswer${rowNum}`);
  }

  public dateFrom(rowNum: number) {
    return $(`#dateFrom${rowNum}`);
  }

  public dateTo(rowNum: number) {
    return $(`#dateTo${rowNum}`);
  }

  public period(rowNum: number) {
    return $(`#period${rowNum}`);
  }

  public chartType(rowNum: number) {
    return $(`#chartType${rowNum}`);
  }

  public rawChartDataHeaders(rowNum: number, rawDataNum: number) {
    return $(`#dashboardViewChartData${rowNum}_${rawDataNum}`).$$(`#dataViewRawHeader`);
  }

  public rawChartDataPercentValueRows(rowNum: number, rawDataNum: number, dataItemNum: number) {
    const dataViewPercentRow = $(`#dashboardViewChartData${rowNum}_${rawDataNum}`).$$(`#dataViewPercent${dataItemNum}`);
    return dataViewPercentRow.map(x => {
      return x.$$(`#dataViewPercentValue`);
    });
  }

  public rawChartDataAmountValueRows(rowNum: number, rawDataNum: number, dataItemNum: number) {
    const dataViewPercentRow = $(`#dashboardViewChartData${rowNum}_${rawDataNum}`).$$(`#dataViewAmount${dataItemNum}`);
    return dataViewPercentRow.map(x => {
      return x.$$(`#dataViewAmountValue`);
    });
  }

  public compareHeaders(dataJson: any) {
    // items in dashboard
    for (let itemIndex = 0; itemIndex < dashboardsViewPage.rowNum; itemIndex++) {
      // raw data in item
      for (let rawDataIndex = 0; rawDataIndex < dataJson.items[itemIndex].chartData.rawData.length; rawDataIndex++) {
        const headerArray = dashboardsViewPage.rawChartDataHeaders(itemIndex, rawDataIndex);
        // headers in raw data
        for (let headerIndex = 0; headerIndex < headerArray.length; headerIndex++) {
          expect(dataJson.items[itemIndex].chartData.rawData[rawDataIndex].rawHeaders[headerIndex]
            , `Header is incorrect on ${itemIndex} item, ${headerIndex} header`)
            .equal(headerArray[headerIndex].getText());
        }
      }
    }
  }

  public comparePercentage(dataJson: any, addPercentSymbol: boolean = true) {
    for (let itemIndex = 0; itemIndex < dashboardsViewPage.rowNum; itemIndex++) {
      // raw data in item
      for (let rawDataIndex = 0; rawDataIndex < dataJson.items[itemIndex].chartData.rawData.length; rawDataIndex++) {
        // data items in raw data
        for (let rawDataItemIndex = 0; rawDataItemIndex < dataJson.items[itemIndex].chartData.rawData[rawDataIndex].rawDataItems.length; rawDataItemIndex++) {
          const percentValueRows = dashboardsViewPage.rawChartDataPercentValueRows(itemIndex, rawDataIndex, rawDataItemIndex);
          // rows in data item
          for (let row = 0; row < percentValueRows.length; row++) {
            // columns in row
            for (let value = 0; value < percentValueRows[row].length; value++) {
              // Requires % to compare correctly
              expect(`${dataJson.items[itemIndex].chartData.rawData[rawDataIndex].rawDataItems[rawDataIndex].rawDataValues[row].percents[value]}${addPercentSymbol ? '%' : ''}`,
                `Percentage is incorrect on ${itemIndex} item, ${row} row, ${value} value`)
                .equal(percentValueRows[row][value].getText());
            }
          }
        }
      }
    }
  }

//   export class DashboardChartRawDataModel {
//   rawHeaders: string[];
//   rawDataItems: DashboardChartRawDataItemsModel[];
// }
//
// export class DashboardChartRawDataItemsModel {
//   rawValueName: string;
//   rawDataValues: DashboardChartRawDataValuesModel[];
// }

  public compareAmounts(dataJson: any) {
    for (let itemIndex = 0; itemIndex < dashboardsViewPage.rowNum; itemIndex++) {
      // raw data in item
      for (let rawDataIndex = 0; rawDataIndex < dataJson.items[itemIndex].chartData.rawData.length; rawDataIndex++) {
        // data items in raw data
        for (let rawDataItemIndex = 0; rawDataItemIndex < dataJson.items[itemIndex].chartData.rawData[rawDataIndex].rawDataItems.length; rawDataItemIndex++) {
          const amountValueRows = dashboardsViewPage.rawChartDataAmountValueRows(itemIndex, rawDataIndex, rawDataItemIndex);
          // rows in raw data
          for (let row = 0; row < amountValueRows.length; row++) {
            for (let amount = 0; amount < amountValueRows[row].length; amount++) {
              // Requires cast to integer or to string
              expect(dataJson.items[itemIndex].chartData.rawData[rawDataIndex].rawDataItems[rawDataIndex].rawDataValues[row].amounts[amount],
                `Amount is incorrect on ${itemIndex} item, ${row} row, ${amount} value`)
                .equal(+amountValueRows[row][amount].getText());
            }
          }
        }
      }
    }
  }

  compareItem(rowNum: number, originalItem: DashboardTestItemEditModel, config: DashboardTestConfigEditModel) {
    browser.pause(1000);
    expect(this.firstQuestion(rowNum).getText()).equal(originalItem.firstQuestion);
    expect(this.filterQuestion(rowNum).getText()).equal(originalItem.filterQuestion);
    expect(this.filterAnswer(rowNum).getText()).equal(originalItem.filterAnswer);
    expect(this.dateFrom(rowNum).getText()).equal(config.dateFrom);
    expect(this.dateTo(rowNum).getText()).equal(config.dateTo);
  }
}

const dashboardsViewPage = new eformDashboardDashboardViewPage();
export default dashboardsViewPage;
