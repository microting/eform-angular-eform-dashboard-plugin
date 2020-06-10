import {Component, Input} from '@angular/core';
import {DashboardChartTypesEnum} from '../../../../const/enums';
import * as domtoimage from 'dom-to-image';
import {DashboardViewItemModel} from '../../../../models/dashboard/dashboard-view/dashboard-view-item.model';

@Component({
  selector: 'app-dashboard-chart-view',
  templateUrl: './dashboard-chart-view.component.html',
  styleUrls: ['./dashboard-chart-view.component.scss']
})
export class DashboardChartViewComponent {
  @Input() chartPosition: number;
  @Input() itemModel: DashboardViewItemModel = new DashboardViewItemModel;

  get chartTypes() {
    return DashboardChartTypesEnum;
  }

  line: any[];
  multi: any[];
  pie: any[];
  view: any[] = [1200, 400];
  multiChartView: any[] = [800, 400];

  colorScheme = {
    domain: ['#9c27b0', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffc107', '#ff9800', '#9e9e9e']
  };

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = 'below';
  legendAdvanced = false;
  showXAxisLabel = true;
  tooltipDisabled = false;
  showText = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Percents';
  showGridLines = true;
  innerPadding = '10%';
  barPadding = 20;
  animations: boolean = true;

  customColors = [
    {
      name: 'Meget glad', // 100
      value: '#007E33'
    },
    {
      name: 'Glad', // 75
      value: '#00C851'
    },
    {
      name: 'Neutral', // 50
      value: '#ffbb33'
    },
    {
      name: 'Sur', // 25
      value: '#ff4444'
    },
    {
      name: 'Meget sur', // 0
      value: '#CC0000'
    },
    {
      name: 'Ved ikke', // 999
      value: '#0099CC '
    }
  ];

  constructor() {
    Object.assign(this, {line});
    Object.assign(this, {multi});
    Object.assign(this, {pie});
  }

  copyChart() {
    const context = this;
    const scale = 2;
    const node = document.getElementById(`copyableChart${this.chartPosition}`);
    setTimeout(() => domtoimage.toBlob(node, {
      // add greater scaling
      height: node.offsetHeight * scale,
      width: this.itemModel.chartType === DashboardChartTypesEnum.HorizontalBarStackedGrouped
        ? node.scrollWidth * scale : node.offsetWidth * scale,
      style: {
        transform: 'scale(' + scale + ')',
        transformOrigin: 'top left',
        width: node.offsetWidth + 'px',
        height: node.offsetHeight + 'px'
      }
    })
      .then(async function (data) {
        // use newest Clipboard API
        const navi = navigator as any;
        try {
          const blob = data;
          await navi.clipboard.write([
            // @ts-ignore
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          // context.spinnerStatus = false;
        } catch (e) {
          // context.spinnerStatus = false;
          console.error(e, e.message);
        }
      })
      .catch(function (error) {
        console.error('Chart could not be copied', error);
      }), 100);
  }
}

const pie = [
  {
    name: '0',
    value: 1.19
  },
  {
    name: '25',
    value: 1.67
  },
  {
    name: '50',
    value: 3.34
  },
  {
    name: '75',
    value: 26.73
  },
  {
    name: '100',
    value: 65.63
  },
  {
    name: '999',
    value: 1.43
  },
];

const line = [
  {
    name: 'Ja',
    series: [
      {
        value: 20,
        name: '16-apr'
      },
      {
        value: 80,
        name: '16-aug'
      },
      {
        value: 50,
        name: '16-sep'
      },
      {
        'value': 30,
        'name': '16-oct'
      },
      {
        'value': 10,
        'name': '16-nov'
      },
      {
        'value': 67,
        'name': '16-dec'
      },
      {
        'value': 79,
        'name': '17-jan'
      }
    ]
  },
  {
    'name': 'Nej',
    'series': [
      {
        'value': 80,
        'name': '16-apr'
      },
      {
        'value': 20,
        'name': '16-aug'
      },
      {
        'value': 50,
        'name': '16-sep'
      },
      {
        'value': 70,
        'name': '16-oct'
      },
      {
        'value': 90,
        'name': '16-nov'
      },
      {
        'value': 33,
        'name': '16-dec'
      },
      {
        'value': 21,
        'name': '17-jan'
      }
    ]
  },
];

const multi = [
  {
    'name': '16-apr',
    'series': [
      {
        'name': 'Ja',
        'value': 70
      },
      {
        'name': 'Nej',
        'value': 30
      }
    ]
  },
  {
    'name': '16-aug',
    'series': [
      {
        'name': 'Ja',
        'value': 75
      },
      {
        'name': 'Nej',
        'value': 25
      }
    ]
  },
  {
    'name': '16-dec',
    'series': [
      {
        'name': 'Ja',
        'value': 50
      },
      {
        'name': 'Nej',
        'value': 50
      }
    ]
  },
  {
    'name': '16-feb',
    'series': [
      {
        'name': 'Ja',
        'value': 30
      },
      {
        'name': 'Nej',
        'value': 70
      }
    ]
  },
  {
    'name': '17-jan',
    'series': [
      {
        'name': 'Ja',
        'value': 60
      },
      {
        'name': 'Nej',
        'value': 40
      }
    ]
  },
  {
    'name': '17-feb',
    'series': [
      {
        'name': 'Ja',
        'value': 10
      },
      {
        'name': 'Nej',
        'value': 90
      }
    ]
  },
  {
    'name': '17-mar',
    'series': [
      {
        'name': 'Ja',
        'value': 25
      },
      {
        'name': 'Nej',
        'value': 75
      }
    ]
  },
  {
    'name': '17-apr',
    'series': [
      {
        'name': 'Ja',
        'value': 5
      },
      {
        'name': 'Nej',
        'value': 95
      }
    ]
  },
  {
    'name': '17-aug',
    'series': [
      {
        'name': 'Ja',
        'value': 17
      },
      {
        'name': 'Nej',
        'value': 83
      }
    ]
  },
  {
    'name': '17-sep',
    'series': [
      {
        'name': 'Ja',
        'value': 33
      },
      {
        'name': 'Nej',
        'value': 67
      }
    ]
  },
  {
    'name': '17-oct',
    'series': [
      {
        'name': 'Ja',
        'value': 0
      },
      {
        'name': 'Nej',
        'value': 100
      }
    ]
  },
  {
    'name': '17-nov',
    'series': [
      {
        'name': 'Ja',
        'value': 15
      },
      {
        'name': 'Nej',
        'value': 85
      }
    ]
  },
  {
    'name': '17-dec',
    'series': [
      {
        'name': 'Ja',
        'value': 5
      },
      {
        'name': 'Nej',
        'value': 95
      }
    ]
  },
];
