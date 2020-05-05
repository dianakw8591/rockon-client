import React from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BarGraph = (props) => {
  const { entries } = props;

  //helper functions

  const groupByType = _.groupBy(entries, 'climb.key_type');

  const mappingRopeOutcomes = {
    'Onsight': 'Send',
    'Flash': 'Send',
    'Redpoint': 'Send',
    'Pinkpoint': 'Send',
    'Repeat': 'Repeat',
    'Tronsight': 'TR',
    'No Falls': 'TR',
    'TR Attempt': 'TR',
    'Attempt': 'Attempt'
  };

  const mappingBoulderOutcomes = {
    'Flash': 'Flash',
    'Redpoint': 'Send',
    'Repeat': 'Repeat',
    'Attempt': 'Attempt'
  }

  const mappingGrade = {
    1: '5.9',
    2: '5.9',
    3: '5.9',
    4: '5.9',
    5: '5.9',
    6: '5.9',
    7: '5.9',
    8: '5.9',
    9: '5.9',
    10: '5.9',
    11: '5.10',
    12: '5.10',
    13: '5.10',
    14: '5.10',
    15: "5.11",
    16: "5.11",
    17: "5.11",
    18: "5.11",
    19: "5.12",
    20: "5.12",
    21: "5.12",
    22: "5.12",
    23: "5.13",
    24: "5.13",
    25: "5.13",
    26: "5.13",
    27: "5.14",
    28: "5.14",
    29: "5.14",
    30: "5.14",
    31: "5.15",
    32: "5.15",
    33: "5.15",
    34: "5.15",
  }

  // outcomes = ['Onsight', 'Flash', 'Redpoint','Pinkpoint','Repeat','Tronsight', 'No Falls', 'TR Attempt', 'Attempt'];
  // const boulder_outcomes = ['Flash', 'Redpoint', 'Repeat', 'Attempt'];

  const mapRoped = (entry) => {
    return mappingRopeOutcomes[entry.outcome]
  }

  const mapBoulder = (entry) => {
    return mappingBoulderOutcomes[entry.outcome]
  }

  const mapGrade = (entry) => {
    return mappingGrade[entry.climb.numeric_rating]
  }

  const sortRopedSends = (array) => {
    return _.groupBy(array, mapRoped)
  }

  const sortBoulderSends = (array) => {
    return _.groupBy(array, mapBoulder)
  }

  const groupByRating = (arr) => {
    return _.groupBy(arr, mapGrade)
  }

  const buildDataArray = (obj) => {
    return [
      (obj['5.9'] || []).length,
      (obj['5.10'] || []).length,
      (obj['5.11'] || []).length,
      (obj['5.12'] || []).length,
      (obj['5.13'] || []).length,
      (obj['5.14'] || []).length,
      (obj['5.15'] || []).length
    ]
  }

  //build data series for bar graph
  
  const seriesBuilder = (outcome, type) => {
    if (type !== "Boulder ") {
      return buildDataArray(groupByRating(sortRopedSends(groupByType[type])[outcome]))
    } else {
      return buildDataArray(groupByRating(sortBoulderSends(groupByType[type])[outcome]))
    }
  }

  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Climbs grouped by Grade, Type, and Outcome'
    },
    xAxis: {
      categories: ['< 5.9 (< V0)', '5.10 (V1)', '5.11 (V2-V4)', '5.12 (V5-V7)', '5.13 (V8-V9)', '5.14 (V10-V13)', '5.15 (V14-V17)']
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: 'Number of Ascents'
      },
      // stackLabels: {
      //   enabled: true,
      //   verticalAlign: 'bottom',
      //   rotation: 45,
      //   crop: false,
      //   overflow: 'none',
      //   y: 20,
      //   formatter: function() {
      //     return this.stack;
      //   },
      //   style: {
      //     fontSize: '9px'
      //   }
      // }
    },
    tooltip: {
      formatter: function () {
        const stackName = this.series.userOptions.stack;

        return '<b>Type: </b>' + stackName + '<br/><b>' + this.x + '</b><br/>' +
          this.series.name + ': ' + this.y + '<br/>' +
          'Total: ' + this.point.stackTotal;
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    series: [
      {
        name: 'Send',
        data: seriesBuilder('Send', 'Trad'),
        stack: 'Trad',
        // color: 'rgb(144,237,125)',
        // borderWidth: 2,
        // borderColor: 'rgba(223, 83, 83, 1)',
      }, {
        name: 'Send',
        data: seriesBuilder('Send', 'Sport'),
        linkedTo: ':previous',
        stack: 'Sport',
        color: Highcharts.getOptions().colors[0],
        // borderWidth: 2,
        // borderColor: "rgb(124, 181, 236)",
      }, {
        name: 'Send',
        data: seriesBuilder('Send', 'Boulder'),
        linkedTo: ':previous',
        stack: 'Boulder',
        color: Highcharts.getOptions().colors[0],
        // borderWidth: 2,
        // borderColor: 'black',
      }, {
        name: 'Repeat',
        data: seriesBuilder('Repeat', 'Trad'),
        stack: 'Trad',
        // color: 'rgb(228,211,84)',
        // borderWidth: 2,
        // borderColor: 'rgba(223, 83, 83, 1)',
      }, {
        name: 'Repeat',
        data: seriesBuilder('Repeat', 'Sport'),
        linkedTo: ':previous',
        stack: 'Sport',
        color: Highcharts.getOptions().colors[1],
        // borderWidth: 2,
        // borderColor: "rgb(124, 181, 236)",
      }, {
        name: 'Repeat',
        data: seriesBuilder('Repeat', 'Boulder'),
        linkedTo: ':previous',
        stack: 'Boulder',
        color: Highcharts.getOptions().colors[1],
        // borderWidth: 2,
        // borderColor: 'black',
      }, {
        name: 'Attempt',
        data: seriesBuilder('Attempt', 'Trad'),
        stack: 'Trad',
        // color: "rgb(247,163,92)",
        // borderWidth: 2,
        // borderColor: 'rgba(223, 83, 83, 1)',
      }, {
        name: 'Attempt',
        data: seriesBuilder('Attempt', 'Sport'),
        linkedTo: ':previous',
        stack: 'Sport',
        color: Highcharts.getOptions().colors[2],
        // borderWidth: 2,
        // borderColor: "rgb(124, 181, 236)",
      }, {
        name: 'Attempt',
        data: seriesBuilder('Attempt', 'Boulder'),
        linkedTo: ':previous',
        stack: 'Boulder',
        color: Highcharts.getOptions().colors[2],
        // borderWidth: 2,
        // borderColor: 'black',
      }, {
        name: 'TR',
        data: seriesBuilder('TR', 'Trad'),
        stack: 'Trad',
        // color: 'rgb(230, 142, 224)',
        // borderWidth: 2,
        // borderColor: 'rgba(223, 83, 83, 1)',
      }, {
        name: 'TR',
        data: seriesBuilder('TR', 'Sport'),
        linkedTo: ':previous',
        stack: 'Sport',
        color: Highcharts.getOptions().colors[3],
        // borderWidth: 2,
        // borderColor: "rgb(124, 181, 236)",
      }, {
        name: 'Flash (boulder)',
        data: seriesBuilder('Flash', 'Boulder'),
        // linkedTo: ':previous',
        stack: 'Boulder',
        color: Highcharts.getOptions().colors[4],
        // borderWidth: 2,
        // borderColor: 'black',
      }
    ]
  };


  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default BarGraph