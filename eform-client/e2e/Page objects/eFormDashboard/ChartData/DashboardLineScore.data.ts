import {DashboardTestItemEditModel} from '../eformDashboard-DashboardEdit.page';

export const dashboardLineScoreItems: DashboardTestItemEditModel[] = [
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Uge',
    chartType: 'Linje',
    calculateAverage: true,
    ignoredAnswerIds: [8],
    comparedItems: []
  },
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Måned',
    chartType: 'Linje',
    calculateAverage: true,
    ignoredAnswerIds: [8],
    comparedItems: []
  },
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Kvarter',
    chartType: 'Linje',
    calculateAverage: true,
    ignoredAnswerIds: [8],
    comparedItems: []
  },
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Seks måned',
    chartType: 'Linje',
    calculateAverage: true,
    ignoredAnswerIds: [8],
    comparedItems: []
  },
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'År',
    chartType: 'Linje',
    calculateAverage: true,
    ignoredAnswerIds: [8],
    comparedItems: []
  }
];

export const dashboardLineScoreDataJson = {
  'id': 42,
  'dashboardName': 'Line Score',
  'surveyName': 'Test-Set',
  'surveyId': 1,
  'locationName': 'Location 1',
  'locationId': 1,
  'tagName': null,
  'tagId': null,
  'answerDates': {
    'dateFrom': '2016-01-01T00:00:00',
    'dateTo': '2020-05-28T23:59:59',
    'today': true
  },
  'items': [
    {
      'id': 90,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 1,
      'chartType': 1,
      'compareEnabled': false,
      'calculateAverage': true,
      'position': 1,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 1,
            'name': 'Location 1',
            'answersCount': 104,
            'isTag': false,
            'series': [
              {
                'name': '16_01',
                'value': 75.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_05',
                'value': 100.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': '16_09',
                'value': 88.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_13',
                'value': 100.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': '16_14',
                'value': 50.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': '16_18',
                'value': 75.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': '16_23',
                'value': 88.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_27',
                'value': 100.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_31',
                'value': 100.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': '16_36',
                'value': 86.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': '16_40',
                'value': 80.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '16_45',
                'value': 83.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': '16_50',
                'value': 90.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_02',
                'value': 70.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_05',
                'value': 100.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_10',
                'value': 88.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_15',
                'value': 100.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_19',
                'value': 88.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_23',
                'value': 75.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': '17_24',
                'value': 96.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_27',
                'value': 88.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': '17_33',
                'value': 96.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': '17_37',
                'value': 88.0,
                'dataCount': 13,
                'optionIndex': 0
              },
              {
                'name': '17_38',
                'value': 90.0,
                'dataCount': 5,
                'optionIndex': 0
              }
            ]
          }
        ],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              '16_01',
              '16_05',
              '16_09',
              '16_13',
              '16_14',
              '16_18',
              '16_23',
              '16_27',
              '16_31',
              '16_36',
              '16_40',
              '16_45',
              '16_50',
              '17_02',
              '17_05',
              '17_10',
              '17_15',
              '17_19',
              '17_23',
              '17_24',
              '17_27',
              '17_33',
              '17_37',
              '17_38'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      75.0,
                      100.0,
                      88.0,
                      100.0,
                      50.0,
                      75.0,
                      88.0,
                      100.0,
                      100.0,
                      86.0,
                      80.0,
                      83.0,
                      90.0,
                      70.0,
                      100.0,
                      88.0,
                      100.0,
                      88.0,
                      75.0,
                      96.0,
                      88.0,
                      96.0,
                      88.0,
                      90.0
                    ],
                    'amounts': [
                      2.0,
                      1.0,
                      2.0,
                      1.0,
                      3.0,
                      3.0,
                      2.0,
                      2.0,
                      4.0,
                      7.0,
                      5.0,
                      3.0,
                      5.0,
                      5.0,
                      5.0,
                      6.0,
                      6.0,
                      6.0,
                      1.0,
                      6.0,
                      4.0,
                      7.0,
                      13.0,
                      5.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      75.0,
                      100.0,
                      88.0,
                      100.0,
                      50.0,
                      75.0,
                      88.0,
                      100.0,
                      100.0,
                      86.0,
                      80.0,
                      83.0,
                      90.0,
                      70.0,
                      100.0,
                      88.0,
                      100.0,
                      88.0,
                      75.0,
                      96.0,
                      88.0,
                      96.0,
                      88.0,
                      90.0
                    ],
                    'amounts': [
                      2.0,
                      1.0,
                      2.0,
                      1.0,
                      3.0,
                      3.0,
                      2.0,
                      2.0,
                      4.0,
                      7.0,
                      5.0,
                      3.0,
                      5.0,
                      5.0,
                      5.0,
                      6.0,
                      6.0,
                      6.0,
                      1.0,
                      6.0,
                      4.0,
                      7.0,
                      13.0,
                      5.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [
        {
          'id': 80,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    },
    {
      'id': 91,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 2,
      'chartType': 1,
      'compareEnabled': false,
      'calculateAverage': true,
      'position': 2,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 1,
            'name': 'Location 1',
            'answersCount': 104,
            'isTag': false,
            'series': [
              {
                'name': '16_jan',
                'value': 75.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_feb',
                'value': 100.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': '16_mar',
                'value': 88.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_apr',
                'value': 63.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': '16_maj',
                'value': 75.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': '16_jun',
                'value': 88.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_jul',
                'value': 100.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': '16_aug',
                'value': 100.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': '16_sep',
                'value': 86.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': '16_okt',
                'value': 80.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '16_nov',
                'value': 83.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': '16_dec',
                'value': 90.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_jan',
                'value': 70.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_feb',
                'value': 100.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '17_mar',
                'value': 88.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_apr',
                'value': 100.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_maj',
                'value': 88.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': '17_jun',
                'value': 93.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': '17_jul',
                'value': 88.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': '17_aug',
                'value': 96.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': '17_sep',
                'value': 89.0,
                'dataCount': 18,
                'optionIndex': 0
              }
            ]
          }
        ],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              '16_jan',
              '16_feb',
              '16_mar',
              '16_apr',
              '16_maj',
              '16_jun',
              '16_jul',
              '16_aug',
              '16_sep',
              '16_okt',
              '16_nov',
              '16_dec',
              '17_jan',
              '17_feb',
              '17_mar',
              '17_apr',
              '17_maj',
              '17_jun',
              '17_jul',
              '17_aug',
              '17_sep'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      75.0,
                      100.0,
                      88.0,
                      63.0,
                      75.0,
                      88.0,
                      100.0,
                      100.0,
                      86.0,
                      80.0,
                      83.0,
                      90.0,
                      70.0,
                      100.0,
                      88.0,
                      100.0,
                      88.0,
                      93.0,
                      88.0,
                      96.0,
                      89.0
                    ],
                    'amounts': [
                      2.0,
                      1.0,
                      2.0,
                      4.0,
                      3.0,
                      2.0,
                      2.0,
                      4.0,
                      7.0,
                      5.0,
                      3.0,
                      5.0,
                      5.0,
                      5.0,
                      6.0,
                      6.0,
                      6.0,
                      7.0,
                      4.0,
                      7.0,
                      18.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      75.0,
                      100.0,
                      88.0,
                      63.0,
                      75.0,
                      88.0,
                      100.0,
                      100.0,
                      86.0,
                      80.0,
                      83.0,
                      90.0,
                      70.0,
                      100.0,
                      88.0,
                      100.0,
                      88.0,
                      93.0,
                      88.0,
                      96.0,
                      89.0
                    ],
                    'amounts': [
                      2.0,
                      1.0,
                      2.0,
                      4.0,
                      3.0,
                      2.0,
                      2.0,
                      4.0,
                      7.0,
                      5.0,
                      3.0,
                      5.0,
                      5.0,
                      5.0,
                      6.0,
                      6.0,
                      6.0,
                      7.0,
                      4.0,
                      7.0,
                      18.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [
        {
          'id': 81,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    },
    {
      'id': 92,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 3,
      'chartType': 1,
      'compareEnabled': false,
      'calculateAverage': true,
      'position': 3,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 1,
            'name': 'Location 1',
            'answersCount': 104,
            'isTag': false,
            'series': [
              {
                'name': '16_K1',
                'value': 85.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': '16_K2',
                'value': 72.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': '16_K3',
                'value': 92.0,
                'dataCount': 13,
                'optionIndex': 0
              },
              {
                'name': '16_K4',
                'value': 85.0,
                'dataCount': 13,
                'optionIndex': 0
              },
              {
                'name': '17_K1',
                'value': 86.0,
                'dataCount': 16,
                'optionIndex': 0
              },
              {
                'name': '17_K2',
                'value': 93.0,
                'dataCount': 19,
                'optionIndex': 0
              },
              {
                'name': '17_K3',
                'value': 91.0,
                'dataCount': 29,
                'optionIndex': 0
              }
            ]
          }
        ],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              '16_K1',
              '16_K2',
              '16_K3',
              '16_K4',
              '17_K1',
              '17_K2',
              '17_K3'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      85.0,
                      72.0,
                      92.0,
                      85.0,
                      86.0,
                      93.0,
                      91.0
                    ],
                    'amounts': [
                      5.0,
                      9.0,
                      13.0,
                      13.0,
                      16.0,
                      19.0,
                      29.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      85.0,
                      72.0,
                      92.0,
                      85.0,
                      86.0,
                      93.0,
                      91.0
                    ],
                    'amounts': [
                      5.0,
                      9.0,
                      13.0,
                      13.0,
                      16.0,
                      19.0,
                      29.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [
        {
          'id': 82,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    },
    {
      'id': 93,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 4,
      'chartType': 1,
      'compareEnabled': false,
      'calculateAverage': true,
      'position': 4,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 1,
            'name': 'Location 1',
            'answersCount': 104,
            'isTag': false,
            'series': [
              {
                'name': '16_1H',
                'value': 77.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': '16_2H',
                'value': 88.0,
                'dataCount': 26,
                'optionIndex': 0
              },
              {
                'name': '17_1H',
                'value': 90.0,
                'dataCount': 35,
                'optionIndex': 0
              },
              {
                'name': '17_2H',
                'value': 91.0,
                'dataCount': 29,
                'optionIndex': 0
              }
            ]
          }
        ],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              '16_1H',
              '16_2H',
              '17_1H',
              '17_2H'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      77.0,
                      88.0,
                      90.0,
                      91.0
                    ],
                    'amounts': [
                      14.0,
                      26.0,
                      35.0,
                      29.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      77.0,
                      88.0,
                      90.0,
                      91.0
                    ],
                    'amounts': [
                      14.0,
                      26.0,
                      35.0,
                      29.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [
        {
          'id': 83,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    },
    {
      'id': 94,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 5,
      'chartType': 1,
      'compareEnabled': false,
      'calculateAverage': true,
      'position': 5,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 1,
            'name': 'Location 1',
            'answersCount': 104,
            'isTag': false,
            'series': [
              {
                'name': '2016',
                'value': 84.0,
                'dataCount': 40,
                'optionIndex': 0
              },
              {
                'name': '2017',
                'value': 90.0,
                'dataCount': 64,
                'optionIndex': 0
              }
            ]
          }
        ],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              '2016',
              '2017'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      84.0,
                      90.0
                    ],
                    'amounts': [
                      40.0,
                      64.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      84.0,
                      90.0
                    ],
                    'amounts': [
                      40.0,
                      64.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [
        {
          'id': 84,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    }
  ]
};
