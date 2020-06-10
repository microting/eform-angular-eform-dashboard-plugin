import {DashboardTestItemEditModel} from '../eformDashboard-DashboardEdit.page';

export const dashboardStackedBarItems: DashboardTestItemEditModel[] = [
  {
    firstQuestion: 'Q1',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Uge',
    chartType: 'Vandret Stablet Søjlediagram',
    calculateAverage: false,
    ignoredAnswerIds: [],
    comparedItems: []
  },
  {
    firstQuestion: 'Q2',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Uge',
    chartType: 'Lodret Stablet Søjlediagram',
    calculateAverage: false,
    ignoredAnswerIds: [8],
    comparedItems: []
  },
  {
    firstQuestion: 'Q3',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Uge',
    chartType: 'Lodret Stablet Søjlediagram',
    calculateAverage: false,
    ignoredAnswerIds: [14],
    comparedItems: []
  }
];

export const dashboardStackedBarDataJson = {
  'id': 100,
  'dashboardName': 'Stacked Bar',
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
      'id': 250,
      'firstQuestionName': 'Q1: Vil du deltage i undersøgelsen?',
      'firstQuestionType': 'list',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 1,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 1,
      'chartType': 6,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 1,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 0,
            'name': '16_01',
            'answersCount': 10,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 80.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 20.0,
                'dataCount': 2,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_05',
            'answersCount': 10,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 70.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 30.0,
                'dataCount': 3,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_09',
            'answersCount': 10,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 90.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 10.0,
                'dataCount': 1,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_13',
            'answersCount': 6,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 67.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 33.0,
                'dataCount': 2,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_14',
            'answersCount': 16,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 75.0,
                'dataCount': 12,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 25.0,
                'dataCount': 4,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_18',
            'answersCount': 25,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 44.0,
                'dataCount': 11,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 56.0,
                'dataCount': 14,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_23',
            'answersCount': 18,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 72.0,
                'dataCount': 13,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 28.0,
                'dataCount': 5,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_27',
            'answersCount': 16,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 56.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 44.0,
                'dataCount': 7,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_31',
            'answersCount': 23,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 78.0,
                'dataCount': 18,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 22.0,
                'dataCount': 5,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_36',
            'answersCount': 28,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 68.0,
                'dataCount': 19,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 32.0,
                'dataCount': 9,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_40',
            'answersCount': 26,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 73.0,
                'dataCount': 19,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 27.0,
                'dataCount': 7,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_45',
            'answersCount': 22,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 82.0,
                'dataCount': 18,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 18.0,
                'dataCount': 4,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '16_50',
            'answersCount': 30,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 67.0,
                'dataCount': 20,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 33.0,
                'dataCount': 10,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_01',
            'answersCount': 1,
            'isTag': false,
            'series': [
              {
                'name': 'Nej',
                'value': 100.0,
                'dataCount': 1,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_02',
            'answersCount': 20,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 75.0,
                'dataCount': 15,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 25.0,
                'dataCount': 5,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_05',
            'answersCount': 29,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 76.0,
                'dataCount': 22,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 24.0,
                'dataCount': 7,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_10',
            'answersCount': 28,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 82.0,
                'dataCount': 23,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 18.0,
                'dataCount': 5,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_15',
            'answersCount': 33,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 70.0,
                'dataCount': 23,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 30.0,
                'dataCount': 10,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_19',
            'answersCount': 26,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 77.0,
                'dataCount': 20,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 23.0,
                'dataCount': 6,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_23',
            'answersCount': 5,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 100.0,
                'dataCount': 5,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_24',
            'answersCount': 28,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 86.0,
                'dataCount': 24,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 14.0,
                'dataCount': 4,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_27',
            'answersCount': 15,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 87.0,
                'dataCount': 13,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 13.0,
                'dataCount': 2,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_28',
            'answersCount': 15,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 67.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 33.0,
                'dataCount': 5,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_33',
            'answersCount': 30,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 87.0,
                'dataCount': 26,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 13.0,
                'dataCount': 4,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_37',
            'answersCount': 60,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 83.0,
                'dataCount': 50,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 17.0,
                'dataCount': 10,
                'optionIndex': 1
              }
            ]
          },
          {
            'id': 0,
            'name': '17_38',
            'answersCount': 22,
            'isTag': false,
            'series': [
              {
                'name': 'Ja',
                'value': 95.0,
                'dataCount': 21,
                'optionIndex': 0
              },
              {
                'name': 'Nej',
                'value': 5.0,
                'dataCount': 1,
                'optionIndex': 1
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
              '17_01',
              '17_02',
              '17_05',
              '17_10',
              '17_15',
              '17_19',
              '17_23',
              '17_24',
              '17_27',
              '17_28',
              '17_33',
              '17_37',
              '17_38'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Ja',
                    'percents': [
                      80.0,
                      70.0,
                      90.0,
                      67.0,
                      75.0,
                      44.0,
                      72.0,
                      56.0,
                      78.0,
                      68.0,
                      73.0,
                      82.0,
                      67.0,
                      100.0,
                      75.0,
                      76.0,
                      82.0,
                      70.0,
                      77.0,
                      100.0,
                      86.0,
                      87.0,
                      67.0,
                      87.0,
                      83.0,
                      95.0
                    ],
                    'amounts': [
                      8.0,
                      7.0,
                      9.0,
                      4.0,
                      12.0,
                      11.0,
                      13.0,
                      9.0,
                      18.0,
                      19.0,
                      19.0,
                      18.0,
                      20.0,
                      1.0,
                      15.0,
                      22.0,
                      23.0,
                      23.0,
                      20.0,
                      5.0,
                      24.0,
                      13.0,
                      10.0,
                      26.0,
                      50.0,
                      21.0
                    ]
                  },
                  {
                    'valueName': 'Nej',
                    'percents': [
                      20.0,
                      30.0,
                      10.0,
                      33.0,
                      25.0,
                      56.0,
                      28.0,
                      44.0,
                      22.0,
                      32.0,
                      27.0,
                      18.0,
                      33.0,
                      0.0,
                      25.0,
                      24.0,
                      18.0,
                      30.0,
                      23.0,
                      0.0,
                      14.0,
                      13.0,
                      33.0,
                      13.0,
                      17.0,
                      5.0
                    ],
                    'amounts': [
                      2.0,
                      3.0,
                      1.0,
                      2.0,
                      4.0,
                      14.0,
                      5.0,
                      7.0,
                      5.0,
                      9.0,
                      7.0,
                      4.0,
                      10.0,
                      0.0,
                      5.0,
                      7.0,
                      5.0,
                      10.0,
                      6.0,
                      0.0,
                      4.0,
                      2.0,
                      5.0,
                      4.0,
                      10.0,
                      1.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0
                    ],
                    'amounts': [
                      10.0,
                      10.0,
                      10.0,
                      6.0,
                      16.0,
                      25.0,
                      18.0,
                      16.0,
                      23.0,
                      28.0,
                      26.0,
                      22.0,
                      30.0,
                      1.0,
                      20.0,
                      29.0,
                      28.0,
                      33.0,
                      26.0,
                      5.0,
                      28.0,
                      15.0,
                      15.0,
                      30.0,
                      60.0,
                      22.0
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      'compareLocationsTags': [],
      'ignoredAnswerValues': [],
      'textQuestionData': []
    },
    {
      'id': 251,
      'firstQuestionName': 'Q2: Er personalet på afsnittet venligt og imødekommende?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 2,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 1,
      'chartType': 9,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 2,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 0,
            'name': '16_01',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 38.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 50.0,
                'dataCount': 4,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 13.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_05',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 86.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 0.0,
                'dataCount': 0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 14.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_09',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 44.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 56.0,
                'dataCount': 5,
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
          },
          {
            'id': 0,
            'name': '16_13',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 100.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 0.0,
                'dataCount': 0,
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
          },
          {
            'id': 0,
            'name': '16_14',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 25.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 58.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 8.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 8.0,
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
          },
          {
            'id': 0,
            'name': '16_18',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 55.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 27.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 9.0,
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
                'value': 9.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_23',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 69.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 15.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 8.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 8.0,
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
          },
          {
            'id': 0,
            'name': '16_27',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 100.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 0.0,
                'dataCount': 0,
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
          },
          {
            'id': 0,
            'name': '16_31',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 78.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 17.0,
                'dataCount': 3,
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
                'value': 6.0,
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
          },
          {
            'id': 0,
            'name': '16_36',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 42.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 53.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 5.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_40',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 47.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 47.0,
                'dataCount': 9,
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
          },
          {
            'id': 0,
            'name': '16_45',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 50.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 50.0,
                'dataCount': 9,
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
          },
          {
            'id': 0,
            'name': '16_50',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 84.0,
                'dataCount': 16,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 5.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 11.0,
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
          },
          {
            'id': 0,
            'name': '17_02',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 71.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 21.0,
                'dataCount': 3,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 7.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_05',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 80.0,
                'dataCount': 16,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 15.0,
                'dataCount': 3,
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
          },
          {
            'id': 0,
            'name': '17_10',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 61.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 35.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 4.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_15',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 87.0,
                'dataCount': 20,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 4.0,
                'dataCount': 1,
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
                'value': 4.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 4.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_19',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 70.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 25.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 5.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_23',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 20.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 80.0,
                'dataCount': 4,
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
          },
          {
            'id': 0,
            'name': '17_24',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 75.0,
                'dataCount': 18,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 21.0,
                'dataCount': 5,
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
                'value': 4.0,
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
          },
          {
            'id': 0,
            'name': '17_27',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 54.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 46.0,
                'dataCount': 6,
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
          },
          {
            'id': 0,
            'name': '17_28',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 60.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 40.0,
                'dataCount': 4,
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
          },
          {
            'id': 0,
            'name': '17_33',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 77.0,
                'dataCount': 20,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 19.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 4.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_37',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 73.0,
                'dataCount': 35,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 17.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 10.0,
                'dataCount': 5,
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
          },
          {
            'id': 0,
            'name': '17_38',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 67.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 33.0,
                'dataCount': 7,
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
              '17_28',
              '17_33',
              '17_37',
              '17_38'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Meget glad',
                    'percents': [
                      38.0,
                      86.0,
                      44.0,
                      100.0,
                      25.0,
                      55.0,
                      69.0,
                      100.0,
                      78.0,
                      42.0,
                      47.0,
                      50.0,
                      84.0,
                      71.0,
                      80.0,
                      61.0,
                      87.0,
                      70.0,
                      20.0,
                      75.0,
                      54.0,
                      60.0,
                      77.0,
                      73.0,
                      67.0
                    ],
                    'amounts': [
                      3.0,
                      6.0,
                      4.0,
                      4.0,
                      3.0,
                      6.0,
                      9.0,
                      9.0,
                      14.0,
                      8.0,
                      9.0,
                      9.0,
                      16.0,
                      10.0,
                      16.0,
                      14.0,
                      20.0,
                      14.0,
                      1.0,
                      18.0,
                      7.0,
                      6.0,
                      20.0,
                      35.0,
                      14.0
                    ]
                  },
                  {
                    'valueName': 'Glad',
                    'percents': [
                      50.0,
                      0.0,
                      56.0,
                      0.0,
                      58.0,
                      27.0,
                      15.0,
                      0.0,
                      17.0,
                      53.0,
                      47.0,
                      50.0,
                      5.0,
                      21.0,
                      15.0,
                      35.0,
                      4.0,
                      25.0,
                      80.0,
                      21.0,
                      46.0,
                      40.0,
                      19.0,
                      17.0,
                      33.0
                    ],
                    'amounts': [
                      4.0,
                      0.0,
                      5.0,
                      0.0,
                      7.0,
                      3.0,
                      2.0,
                      0.0,
                      3.0,
                      10.0,
                      9.0,
                      9.0,
                      1.0,
                      3.0,
                      3.0,
                      8.0,
                      1.0,
                      5.0,
                      4.0,
                      5.0,
                      6.0,
                      4.0,
                      5.0,
                      8.0,
                      7.0
                    ]
                  },
                  {
                    'valueName': 'Neutral',
                    'percents': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      8.0,
                      9.0,
                      8.0,
                      0.0,
                      0.0,
                      5.0,
                      0.0,
                      0.0,
                      11.0,
                      0.0,
                      0.0,
                      4.0,
                      0.0,
                      5.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      4.0,
                      10.0,
                      0.0
                    ],
                    'amounts': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      1.0,
                      1.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      2.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      5.0,
                      0.0
                    ]
                  },
                  {
                    'valueName': 'Sur',
                    'percents': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      8.0,
                      0.0,
                      8.0,
                      0.0,
                      6.0,
                      0.0,
                      5.0,
                      0.0,
                      0.0,
                      0.0,
                      5.0,
                      0.0,
                      4.0,
                      0.0,
                      0.0,
                      4.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    'amounts': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ]
                  },
                  {
                    'valueName': 'Meget sur',
                    'percents': [
                      13.0,
                      14.0,
                      0.0,
                      0.0,
                      0.0,
                      9.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      7.0,
                      0.0,
                      0.0,
                      4.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ],
                    'amounts': [
                      1.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      101.0,
                      100.0,
                      100.0,
                      100.0,
                      99.0,
                      100.0,
                      100.0,
                      100.0,
                      101.0,
                      100.0,
                      99.0,
                      100.0,
                      100.0,
                      99.0,
                      100.0,
                      100.0,
                      99.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0
                    ],
                    'amounts': [
                      8.0,
                      7.0,
                      9.0,
                      4.0,
                      12.0,
                      11.0,
                      13.0,
                      9.0,
                      18.0,
                      19.0,
                      19.0,
                      18.0,
                      19.0,
                      14.0,
                      20.0,
                      23.0,
                      23.0,
                      20.0,
                      5.0,
                      24.0,
                      13.0,
                      10.0,
                      26.0,
                      48.0,
                      21.0
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
          'id': 134,
          'answerId': 8,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    },
    {
      'id': 252,
      'firstQuestionName': 'Q3: Oplever du, at personalet er forberedt til samtaler med dig om din udredning/behandling?',
      'firstQuestionType': 'smiley2',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 3,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 1,
      'chartType': 9,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 3,
      'chartData': {
        'single': [],
        'multi': [
          {
            'id': 0,
            'name': '16_01',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 38.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 50.0,
                'dataCount': 4,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 13.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_05',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 71.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 14.0,
                'dataCount': 1,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 14.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_09',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 33.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 56.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 11.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_13',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 50.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 25.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 25.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_14',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 33.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 42.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 17.0,
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
                'value': 8.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_18',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 36.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 27.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 18.0,
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
                'value': 18.0,
                'dataCount': 2,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_23',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 38.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 31.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 15.0,
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
                'value': 15.0,
                'dataCount': 2,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_27',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 33.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 44.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 22.0,
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
          },
          {
            'id': 0,
            'name': '16_31',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 50.0,
                'dataCount': 9,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 33.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 11.0,
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
                'value': 6.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_36',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 42.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 42.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 16.0,
                'dataCount': 3,
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
          },
          {
            'id': 0,
            'name': '16_40',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 37.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 32.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 21.0,
                'dataCount': 4,
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
                'value': 11.0,
                'dataCount': 2,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_45',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 33.0,
                'dataCount': 6,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 56.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 6.0,
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
                'value': 6.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '16_50',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 67.0,
                'dataCount': 12,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 17.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 6.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 11.0,
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
            'name': '17_02',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 53.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 13.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 7.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 13.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 13.0,
                'dataCount': 2,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_05',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 70.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 30.0,
                'dataCount': 6,
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
          },
          {
            'id': 0,
            'name': '17_10',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 35.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 43.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 13.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 4.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Meget sur',
                'value': 4.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_15',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 65.0,
                'dataCount': 15,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 30.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 4.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_19',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 50.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 35.0,
                'dataCount': 7,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 10.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 5.0,
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
          },
          {
            'id': 0,
            'name': '17_23',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 20.0,
                'dataCount': 1,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 60.0,
                'dataCount': 3,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 20.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_24',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 75.0,
                'dataCount': 18,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 21.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 4.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_27',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 67.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 33.0,
                'dataCount': 4,
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
          },
          {
            'id': 0,
            'name': '17_28',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 40.0,
                'dataCount': 4,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 50.0,
                'dataCount': 5,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 10.0,
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
                'value': 0.0,
                'dataCount': 0,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_33',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 56.0,
                'dataCount': 14,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 32.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 8.0,
                'dataCount': 2,
                'optionIndex': 0
              },
              {
                'name': 'Sur',
                'value': 4.0,
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
          },
          {
            'id': 0,
            'name': '17_37',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 41.0,
                'dataCount': 20,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 39.0,
                'dataCount': 19,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 16.0,
                'dataCount': 8,
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
                'value': 2.0,
                'dataCount': 1,
                'optionIndex': 0
              }
            ]
          },
          {
            'id': 0,
            'name': '17_38',
            'answersCount': 0,
            'isTag': false,
            'series': [
              {
                'name': 'Meget glad',
                'value': 48.0,
                'dataCount': 10,
                'optionIndex': 0
              },
              {
                'name': 'Glad',
                'value': 38.0,
                'dataCount': 8,
                'optionIndex': 0
              },
              {
                'name': 'Neutral',
                'value': 14.0,
                'dataCount': 3,
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
              '17_28',
              '17_33',
              '17_37',
              '17_38'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Meget glad',
                    'percents': [
                      38.0,
                      71.0,
                      33.0,
                      50.0,
                      33.0,
                      36.0,
                      38.0,
                      33.0,
                      50.0,
                      42.0,
                      37.0,
                      33.0,
                      67.0,
                      53.0,
                      70.0,
                      35.0,
                      65.0,
                      50.0,
                      20.0,
                      75.0,
                      67.0,
                      40.0,
                      56.0,
                      41.0,
                      48.0
                    ],
                    'amounts': [
                      3.0,
                      5.0,
                      3.0,
                      2.0,
                      4.0,
                      4.0,
                      5.0,
                      3.0,
                      9.0,
                      8.0,
                      7.0,
                      6.0,
                      12.0,
                      8.0,
                      14.0,
                      8.0,
                      15.0,
                      10.0,
                      1.0,
                      18.0,
                      8.0,
                      4.0,
                      14.0,
                      20.0,
                      10.0
                    ]
                  },
                  {
                    'valueName': 'Glad',
                    'percents': [
                      50.0,
                      14.0,
                      56.0,
                      25.0,
                      42.0,
                      27.0,
                      31.0,
                      44.0,
                      33.0,
                      42.0,
                      32.0,
                      56.0,
                      17.0,
                      13.0,
                      30.0,
                      43.0,
                      30.0,
                      35.0,
                      60.0,
                      21.0,
                      33.0,
                      50.0,
                      32.0,
                      39.0,
                      38.0
                    ],
                    'amounts': [
                      4.0,
                      1.0,
                      5.0,
                      1.0,
                      5.0,
                      3.0,
                      4.0,
                      4.0,
                      6.0,
                      8.0,
                      6.0,
                      10.0,
                      3.0,
                      2.0,
                      6.0,
                      10.0,
                      7.0,
                      7.0,
                      3.0,
                      5.0,
                      4.0,
                      5.0,
                      8.0,
                      19.0,
                      8.0
                    ]
                  },
                  {
                    'valueName': 'Neutral',
                    'percents': [
                      0.0,
                      0.0,
                      11.0,
                      25.0,
                      17.0,
                      18.0,
                      15.0,
                      22.0,
                      11.0,
                      16.0,
                      21.0,
                      6.0,
                      6.0,
                      7.0,
                      0.0,
                      13.0,
                      4.0,
                      10.0,
                      20.0,
                      4.0,
                      0.0,
                      10.0,
                      8.0,
                      16.0,
                      14.0
                    ],
                    'amounts': [
                      0.0,
                      0.0,
                      1.0,
                      1.0,
                      2.0,
                      2.0,
                      2.0,
                      2.0,
                      2.0,
                      3.0,
                      4.0,
                      1.0,
                      1.0,
                      1.0,
                      0.0,
                      3.0,
                      1.0,
                      2.0,
                      1.0,
                      1.0,
                      0.0,
                      1.0,
                      2.0,
                      8.0,
                      3.0
                    ]
                  },
                  {
                    'valueName': 'Sur',
                    'percents': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      11.0,
                      13.0,
                      0.0,
                      4.0,
                      0.0,
                      5.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      4.0,
                      2.0,
                      0.0
                    ],
                    'amounts': [
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      2.0,
                      2.0,
                      0.0,
                      1.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      1.0,
                      0.0
                    ]
                  },
                  {
                    'valueName': 'Meget sur',
                    'percents': [
                      13.0,
                      14.0,
                      0.0,
                      0.0,
                      8.0,
                      18.0,
                      15.0,
                      0.0,
                      6.0,
                      0.0,
                      11.0,
                      6.0,
                      0.0,
                      13.0,
                      0.0,
                      4.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      2.0,
                      0.0
                    ],
                    'amounts': [
                      1.0,
                      1.0,
                      0.0,
                      0.0,
                      1.0,
                      2.0,
                      2.0,
                      0.0,
                      1.0,
                      0.0,
                      2.0,
                      1.0,
                      0.0,
                      2.0,
                      0.0,
                      1.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      101.0,
                      99.0,
                      100.0,
                      100.0,
                      100.0,
                      99.0,
                      99.0,
                      99.0,
                      100.0,
                      100.0,
                      101.0,
                      101.0,
                      101.0,
                      99.0,
                      100.0,
                      99.0,
                      99.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0,
                      100.0
                    ],
                    'amounts': [
                      8.0,
                      7.0,
                      9.0,
                      4.0,
                      12.0,
                      11.0,
                      13.0,
                      9.0,
                      18.0,
                      19.0,
                      19.0,
                      18.0,
                      18.0,
                      15.0,
                      20.0,
                      23.0,
                      23.0,
                      20.0,
                      5.0,
                      24.0,
                      12.0,
                      10.0,
                      25.0,
                      49.0,
                      21.0
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
          'id': 135,
          'answerId': 14,
          'name': 'Ved ikke'
        }
      ],
      'textQuestionData': []
    }
  ]
};
