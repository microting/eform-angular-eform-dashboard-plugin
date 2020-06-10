import {DashboardTestItemEditModel} from '../eformDashboard-DashboardEdit.page';

export const dashboardTotalItems: DashboardTestItemEditModel[] = [
  {
    firstQuestion: 'Q1',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Total',
    chartType: 'Lagkagediagram',
    calculateAverage: false,
    ignoredAnswerIds: [],
    comparedItems: []
  },
  {
    firstQuestion: 'Q1',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Total',
    chartType: 'Cirkelnettet',
    calculateAverage: false,
    ignoredAnswerIds: [],
    comparedItems: []
  },
  {
    firstQuestion: 'Q1',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Total',
    chartType: 'Vandret Søjlediagram',
    calculateAverage: false,
    ignoredAnswerIds: [],
    comparedItems: []
  },
  {
    firstQuestion: 'Q1',
    filterQuestion: '',
    filterAnswer: '',
    period: 'Total',
    chartType: 'Lodret Søjlediagram',
    calculateAverage: false,
    ignoredAnswerIds: [],
    comparedItems: []
  }
];

export const dashboardTotalDataJson = {
  'id': 41,
  'dashboardName': 'Total',
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
      'id': 87,
      'firstQuestionName': 'Q1: Vil du deltage i undersøgelsen?',
      'firstQuestionType': 'list',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 1,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 6,
      'chartType': 3,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 1,
      'chartData': {
        'single': [
          {
            'name': 'Ja',
            'value': 105.0,
            'dataCount': 105,
            'optionIndex': 0
          },
          {
            'name': 'Nej',
            'value': 33.0,
            'dataCount': 33,
            'optionIndex': 0
          }
        ],
        'multi': [],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              'Samlet periode'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Ja',
                    'percents': [
                      76.0
                    ],
                    'amounts': [
                      105.0
                    ]
                  },
                  {
                    'valueName': 'Nej',
                    'percents': [
                      24.0
                    ],
                    'amounts': [
                      33.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      100.0
                    ],
                    'amounts': [
                      138.0
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
      'id': 127,
      'firstQuestionName': 'Q1: Vil du deltage i undersøgelsen?',
      'firstQuestionType': 'list',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 1,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 6,
      'chartType': 4,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 2,
      'chartData': {
        'single': [
          {
            'name': 'Ja',
            'value': 105.0,
            'dataCount': 105,
            'optionIndex': 0
          },
          {
            'name': 'Nej',
            'value': 33.0,
            'dataCount': 33,
            'optionIndex': 0
          }
        ],
        'multi': [],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              'Samlet periode'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Ja',
                    'percents': [
                      76.0
                    ],
                    'amounts': [
                      105.0
                    ]
                  },
                  {
                    'valueName': 'Nej',
                    'percents': [
                      24.0
                    ],
                    'amounts': [
                      33.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      100.0
                    ],
                    'amounts': [
                      138.0
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
      'id': 88,
      'firstQuestionName': 'Q1: Vil du deltage i undersøgelsen?',
      'firstQuestionType': 'list',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 1,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 6,
      'chartType': 5,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 3,
      'chartData': {
        'single': [
          {
            'name': 'Ja',
            'value': 76.0,
            'dataCount': 105,
            'optionIndex': 0
          },
          {
            'name': 'Nej',
            'value': 24.0,
            'dataCount': 33,
            'optionIndex': 0
          }
        ],
        'multi': [],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              'Samlet periode'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Ja',
                    'percents': [
                      76.0
                    ],
                    'amounts': [
                      105.0
                    ]
                  },
                  {
                    'valueName': 'Nej',
                    'percents': [
                      24.0
                    ],
                    'amounts': [
                      33.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      100.0
                    ],
                    'amounts': [
                      138.0
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
      'id': 89,
      'firstQuestionName': 'Q1: Vil du deltage i undersøgelsen?',
      'firstQuestionType': 'list',
      'filterQuestionName': null,
      'filterAnswerName': null,
      'firstQuestionId': 1,
      'filterQuestionId': null,
      'filterAnswerId': null,
      'period': 6,
      'chartType': 8,
      'compareEnabled': false,
      'calculateAverage': false,
      'position': 4,
      'chartData': {
        'single': [
          {
            'name': 'Ja',
            'value': 76.0,
            'dataCount': 105,
            'optionIndex': 0
          },
          {
            'name': 'Nej',
            'value': 24.0,
            'dataCount': 33,
            'optionIndex': 0
          }
        ],
        'multi': [],
        'multiStacked': [],
        'rawData': [
          {
            'rawHeaders': [
              'Samlet periode'
            ],
            'rawDataItems': [
              {
                'rawValueName': '',
                'rawDataValues': [
                  {
                    'valueName': 'Ja',
                    'percents': [
                      76.0
                    ],
                    'amounts': [
                      105.0
                    ]
                  },
                  {
                    'valueName': 'Nej',
                    'percents': [
                      24.0
                    ],
                    'amounts': [
                      33.0
                    ]
                  },
                  {
                    'valueName': 'Total',
                    'percents': [
                      100.0
                    ],
                    'amounts': [
                      138.0
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
    }
  ]
};
