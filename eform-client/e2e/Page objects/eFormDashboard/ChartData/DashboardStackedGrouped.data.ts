import {DashboardTestItemEditModel} from '../eformDashboard-DashboardEdit.page';

export const dashboardStackedGroupedItems: DashboardTestItemEditModel[] = [
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'År',
    chartType: 'Vandret Bjælke Stablet Grupperet',
    calculateAverage: false,
    ignoredAnswerIds: [8],
    comparedItems: [
      {itemIndex: 0, value: 2},
      {itemIndex: 1, value: 3},
      {itemIndex: 2, value: 4},
      {itemIndex: 3, value: 5},
      {itemIndex: 4, value: 1},
    ]
  }
];

export const dashboardStackedGroupedDataJson = {
  'id': 99,
  'dashboardName': 'Stacked Grouped',
  'surveyName': 'Test-Set',
  'surveyId': 1,
  'locationName': null,
  'locationId': null,
  'tagName': 'Total',
  'tagId': 7,
  'answerDates': {
    'dateFrom': '2016-01-01T00:00:00',
    'dateTo': '2020-05-28T23:59:59',
    'today': true
  },
  'items': [
    {
      'id': 287,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 5,
      'chartType': 11,
      'compareEnabled': true,
      'calculateAverage': false,
      'position': 1,
      'chartData': {
        'single': [],
        'multi': [],
        'multiStacked': [
          {
            'id': 7,
            'name': 'Total',
            'isTag': true,
            'series': [
              {
                'id': 0,
                'name': '2016',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 60.0,
                    'dataCount': 100,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 32.0,
                    'dataCount': 53,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 4.0,
                    'dataCount': 6,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 2.0,
                    'dataCount': 4,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 2.0,
                    'dataCount': 3,
                    'optionIndex': 0
                  }
                ]
              },
              {
                'id': 0,
                'name': '2017',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 71.0,
                    'dataCount': 175,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 24.0,
                    'dataCount': 59,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 3.0,
                    'dataCount': 8,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 1.0,
                    'dataCount': 3,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 1.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  }
                ]
              }
            ]
          },
          {
            'id': 1,
            'name': 'Location 1',
            'isTag': false,
            'series': [
              {
                'id': 0,
                'name': '2016',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 55.0,
                    'dataCount': 22,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 33.0,
                    'dataCount': 13,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 8.0,
                    'dataCount': 3,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 5.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  }
                ]
              },
              {
                'id': 0,
                'name': '2017',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 69.0,
                    'dataCount': 44,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 27.0,
                    'dataCount': 17,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 3.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  }
                ]
              }
            ]
          },
          {
            'id': 2,
            'name': 'Location 2',
            'isTag': false,
            'series': [
              {
                'id': 0,
                'name': '2016',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 49.0,
                    'dataCount': 21,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 47.0,
                    'dataCount': 20,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  }
                ]
              },
              {
                'id': 0,
                'name': '2017',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 75.0,
                    'dataCount': 47,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 21.0,
                    'dataCount': 13,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 3.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  }
                ]
              }
            ]
          },
          {
            'id': 3,
            'name': 'Location 3',
            'isTag': false,
            'series': [
              {
                'id': 0,
                'name': '2016',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 72.0,
                    'dataCount': 31,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 21.0,
                    'dataCount': 9,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 5.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  }
                ]
              },
              {
                'id': 0,
                'name': '2017',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 72.0,
                    'dataCount': 44,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 25.0,
                    'dataCount': 15,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 3.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  }
                ]
              }
            ]
          },
          {
            'id': 4,
            'name': 'Location 4',
            'isTag': false,
            'series': [
              {
                'id': 0,
                'name': '2016',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 65.0,
                    'dataCount': 26,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 28.0,
                    'dataCount': 11,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 0.0,
                    'dataCount': 0,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 5.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 3.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  }
                ]
              },
              {
                'id': 0,
                'name': '2017',
                'answersCount': 0,
                'isTag': false,
                'series': [
                  {
                    'name': 'Meget glad',
                    'value': 68.0,
                    'dataCount': 40,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Glad',
                    'value': 24.0,
                    'dataCount': 14,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Neutral',
                    'value': 3.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Sur',
                    'value': 3.0,
                    'dataCount': 2,
                    'optionIndex': 0
                  },
                  {
                    'name': 'Meget sur',
                    'value': 2.0,
                    'dataCount': 1,
                    'optionIndex': 0
                  }
                ]
              }
            ]
          }
        ],
        'rawData': [
          {
            'rawHeaders': [
              'Meget glad',
              'Glad',
              'Neutral',
              'Sur',
              'Meget sur',
              '%',
              'Meget glad',
              'Glad',
              'Neutral',
              'Sur',
              'Meget sur',
              'n'
            ],
            'rawDataItems': [
              {
                'rawValueName': '2016',
                'rawDataValues': [
                  {
                    'valueName': 'Total',
                    'percents': [
                      60.0,
                      32.0,
                      4.0,
                      2.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      100.0,
                      53.0,
                      6.0,
                      4.0,
                      3.0,
                      166.0
                    ]
                  },
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      55.0,
                      33.0,
                      8.0,
                      5.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      22.0,
                      13.0,
                      3.0,
                      2.0,
                      0.0,
                      40.0
                    ]
                  },
                  {
                    'valueName': 'Location 2',
                    'percents': [
                      49.0,
                      47.0,
                      2.0,
                      2.0,
                      0.0,
                      100.0
                    ],
                    'amounts': [
                      21.0,
                      20.0,
                      1.0,
                      1.0,
                      0.0,
                      43.0
                    ]
                  },
                  {
                    'valueName': 'Location 3',
                    'percents': [
                      72.0,
                      21.0,
                      5.0,
                      2.0,
                      0.0,
                      100.0
                    ],
                    'amounts': [
                      31.0,
                      9.0,
                      2.0,
                      1.0,
                      0.0,
                      43.0
                    ]
                  },
                  {
                    'valueName': 'Location 4',
                    'percents': [
                      65.0,
                      28.0,
                      5.0,
                      3.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      26.0,
                      11.0,
                      2.0,
                      1.0,
                      0.0,
                      40.0
                    ]
                  }
                ]
              },
              {
                'rawValueName': '2017',
                'rawDataValues': [
                  {
                    'valueName': 'Total',
                    'percents': [
                      71.0,
                      24.0,
                      3.0,
                      1.0,
                      1.0,
                      100.0
                    ],
                    'amounts': [
                      175.0,
                      59.0,
                      8.0,
                      3.0,
                      2.0,
                      247.0
                    ]
                  },
                  {
                    'valueName': 'Location 1',
                    'percents': [
                      69.0,
                      27.0,
                      3.0,
                      2.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      44.0,
                      17.0,
                      2.0,
                      1.0,
                      0.0,
                      64.0
                    ]
                  },
                  {
                    'valueName': 'Location 2',
                    'percents': [
                      75.0,
                      21.0,
                      3.0,
                      2.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      47.0,
                      13.0,
                      2.0,
                      1.0,
                      0.0,
                      63.0
                    ]
                  },
                  {
                    'valueName': 'Location 3',
                    'percents': [
                      72.0,
                      25.0,
                      3.0,
                      0.0,
                      0.0,
                      100.0
                    ],
                    'amounts': [
                      44.0,
                      15.0,
                      2.0,
                      0.0,
                      0.0,
                      61.0
                    ]
                  },
                  {
                    'valueName': 'Location 4',
                    'percents': [
                      68.0,
                      24.0,
                      3.0,
                      3.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      40.0,
                      14.0,
                      2.0,
                      2.0,
                      1.0,
                      59.0
                    ]
                  }
                ]
              }
            ]
          },
          {
            'rawHeaders': [
              'Meget glad',
              'Glad',
              'Neutral',
              'Sur',
              'Meget sur',
              '%',
              'Meget glad',
              'Glad',
              'Neutral',
              'Sur',
              'Meget sur',
              'n'
            ],
            'rawDataItems': [
              {
                'rawValueName': 'Total',
                'rawDataValues': [
                  {
                    'valueName': '2016',
                    'percents': [
                      60.0,
                      32.0,
                      4.0,
                      2.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      100.0,
                      53.0,
                      6.0,
                      4.0,
                      3.0,
                      166.0
                    ]
                  },
                  {
                    'valueName': '2017',
                    'percents': [
                      71.0,
                      24.0,
                      3.0,
                      1.0,
                      1.0,
                      100.0
                    ],
                    'amounts': [
                      175.0,
                      59.0,
                      8.0,
                      3.0,
                      2.0,
                      247.0
                    ]
                  }
                ]
              },
              {
                'rawValueName': 'Location 1',
                'rawDataValues': [
                  {
                    'valueName': '2016',
                    'percents': [
                      55.0,
                      33.0,
                      8.0,
                      5.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      22.0,
                      13.0,
                      3.0,
                      2.0,
                      0.0,
                      40.0
                    ]
                  },
                  {
                    'valueName': '2017',
                    'percents': [
                      69.0,
                      27.0,
                      3.0,
                      0.0,
                      2.0,
                      101.0
                    ],
                    'amounts': [
                      44.0,
                      17.0,
                      2.0,
                      0.0,
                      1.0,
                      64.0
                    ]
                  }
                ]
              },
              {
                'rawValueName': 'Location 2',
                'rawDataValues': [
                  {
                    'valueName': '2016',
                    'percents': [
                      49.0,
                      47.0,
                      2.0,
                      0.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      21.0,
                      20.0,
                      1.0,
                      0.0,
                      1.0,
                      43.0
                    ]
                  },
                  {
                    'valueName': '2017',
                    'percents': [
                      75.0,
                      21.0,
                      3.0,
                      2.0,
                      0.0,
                      101.0
                    ],
                    'amounts': [
                      47.0,
                      13.0,
                      2.0,
                      1.0,
                      0.0,
                      63.0
                    ]
                  }
                ]
              },
              {
                'rawValueName': 'Location 3',
                'rawDataValues': [
                  {
                    'valueName': '2016',
                    'percents': [
                      72.0,
                      21.0,
                      5.0,
                      0.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      31.0,
                      9.0,
                      2.0,
                      0.0,
                      1.0,
                      43.0
                    ]
                  },
                  {
                    'valueName': '2017',
                    'percents': [
                      72.0,
                      25.0,
                      3.0,
                      0.0,
                      0.0,
                      100.0
                    ],
                    'amounts': [
                      44.0,
                      15.0,
                      2.0,
                      0.0,
                      0.0,
                      61.0
                    ]
                  }
                ]
              },
              {
                'rawValueName': 'Location 4',
                'rawDataValues': [
                  {
                    'valueName': '2016',
                    'percents': [
                      65.0,
                      28.0,
                      0.0,
                      5.0,
                      3.0,
                      101.0
                    ],
                    'amounts': [
                      26.0,
                      11.0,
                      0.0,
                      2.0,
                      1.0,
                      40.0
                    ]
                  },
                  {
                    'valueName': '2017',
                    'percents': [
                      68.0,
                      24.0,
                      3.0,
                      3.0,
                      2.0,
                      100.0
                    ],
                    'amounts': [
                      40.0,
                      14.0,
                      2.0,
                      2.0,
                      1.0,
                      59.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [
        {
          'id': 130,
          'locationId': null,
          'tagId': 7,
          'position': 1,
          'name': 'Total'
        },
        {
          'id': 131,
          'locationId': 1,
          'tagId': null,
          'position': 2,
          'name': 'Location 1'
        },
        {
          'id': 132,
          'locationId': 2,
          'tagId': null,
          'position': 3,
          'name': 'Location 2'
        },
        {
          'id': 133,
          'locationId': 3,
          'tagId': null,
          'position': 4,
          'name': 'Location 3'
        },
        {
          'id': 134,
          'locationId': 4,
          'tagId': null,
          'position': 5,
          'name': 'Location 4'
        }
      ],
      'ignoredAnswerValues': [
        {
          'id': 128,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    }
  ]
};
