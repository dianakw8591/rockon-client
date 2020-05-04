import React from 'react';
import { withRouter } from "react-router-dom";
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as moment from 'moment';


const Graph  = (props) => {
  const { entries } = props;

  //helper functions

  const groupByType = _.groupBy(entries, 'climb.key_type');

  const groupByDate = (arr) => {
    return _.groupBy(arr, 'start_date')
  }

  const groupByOutcome = (arr) => {
    return _.groupBy(arr, 'outcome')
  }

  const maxForDate = (arr) => {
    return _.map(arr, (value) => _.maxBy(value, 'climb.numeric_rating'))
  }

  const sortByDate = (arr) => {
    return _.sortBy(arr, 'start_date');
  }

  const objBuilder = (arr) => {
    return _.map(arr, (obj) => {
      return ({
        x: moment(obj.start_date).valueOf(),
        y: obj.climb.numeric_rating,
        climbName: obj.climb.name,
        rating: obj.climb.rating,
        style: obj.style,
        outcome: obj.outcome,
        // id: obj.id,
        climb_id: obj.climb.climb_id,
      })
    })
  }

  //builds series for spline graph

  const splineSeriesBuilder = (type, outcome) => {
    const sortedArr = sortByDate(maxForDate(groupByDate(groupByOutcome(groupByType[type])[outcome])));
    return objBuilder(sortedArr);
  }

  //builds series for scatter graph

  const scatterSeriesBuilder = (type) => {
    return objBuilder(groupByType[type])
  }

  //grade converters

  const yds_conversion = {
    "5.0": 1,
    "5.1": 2,
    "5.2": 3,
    "5.3": 4,
    "5.4": 5,
    "5.5": 6,
    "5.6": 7,
    "5.7": 8,
    "5.8": 9,
    "5.9": 10,
    "5.10": 13,
    "5.10-": 11,
    "5.10+": 14,
    "5.10a": 11,
    "5.10b": 12,
    "5.10c": 13,
    "5.10d": 14,
    "5.11": 17,
    "5.11-": 15,
    "5.11+": 18,
    "5.11a": 15,
    "5.11b": 16,
    "5.11c": 17,
    "5.11d": 18,
    "5.12": 21,
    "5.12-": 19,
    "5.12+": 22,
    "5.12a": 19,
    "5.12b": 20,
    "5.12c": 21,
    "5.12d": 22,
    "5.13": 25,
    "5.13-": 23,
    "5.13+": 26,
    "5.13a": 23,
    "5.13b": 24,
    "5.13c": 25,
    "5.13d": 26,
    "5.14": 29,
    "5.14-": 27,
    "5.14+": 30,
    "5.14a": 27,
    "5.14b": 28,
    "5.14c": 29,
    "5.14d": 30,
    "5.15": 33,
    "5.15-": 31,
    "5.15+": 34,
    "5.15a": 31,
    "5.15b": 32,
    "5.15c": 33,
    "5.15d": 34
  }

  const invertYDS = _.invert(yds_conversion);

  const v_conversion = {
    "V": 8,
    "V0": 10,
    "V1": 13,
    "V2": 15,
    "V3": 17,
    "V4": 18,
    "V5": 19,
    "V6": 21,
    "V7": 22,
    "V8": 24,
    "V9": 26,
    "V10": 27,
    "V11": 28,
    "V12": 29,
    "V13": 30,
    "V14": 31,
    "V15": 32,
    "V16": 33,
    "V17": 34,
  }

  const invertV = _.invert(v_conversion);

  const options = {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'Your Climbs'
    },
    plotOptions: {
      spline: {
        enableMouseTracking: false,
        marker: {
          enabled: false
        },
      },
      scatter: {
        jitter: {
          x: 10000000,
          y: 0
        },
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              props.history.push(`/dashboard/climbs/${this.climb_id}`);
            }
          }
        },
      }
    },
    tooltip: {
      // shared: true,
      useHTML: true,
      headerFormat: '<small>{point.key}</small><table>',
      pointFormat: '<tr><td style="color: {series.color}">{point.climbName} </td>' +
        '<td style="text-align: right"><b>{point.rating}</b></td></tr>' +
        '<tr><td>Style: {point.style}</td></tr>' +
        '<tr><td>Outcome: {point.outcome}</td></tr>',
      footerFormat: '</table>',
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%e. %b %y',
        week: '%e. %b %y'
      },
      title: {
        enabled: true,
        text: 'Date'
      },
    },
    yAxis: [
      {
        title: {
          text: 'YDS Grades'
        },
        labels: {
          formatter: function () {
            return invertYDS[this.value]
          }
        }
      },
      {
        linkedTo: 0,
        title: {
          text: 'V Grades'
        },
        labels: {
          formatter: function () {
            return invertV[this.value]
          }
        },
        opposite: true
      },
    ],
    series: [
      {
        name: 'Trad Redpoints',
        type: 'spline',
        yAxis: 0,
        color: 'rgba(223, 83, 83, 1)',
        data: splineSeriesBuilder("Trad", "Redpoint")
      },
      {
        name: 'Sport Redpoints',
        type: 'spline',
        yAxis: 0,
        data: splineSeriesBuilder("Sport", "Redpoint")
      },
      {
        name: 'Boulder Redpoints',
        type: 'spline',
        yAxis: 0,
        data: splineSeriesBuilder("Boulder", "Redpoint")
      },
      {
        name: 'Trad',
        type: 'scatter',
        yAxis: 0,
        color: 'rgba(223, 83, 83, .5)',
        data: scatterSeriesBuilder("Trad")
      },
      {
        name: 'Sport',
        type: 'scatter',
        yAxis: 0,
        color: 'rgba(119, 152, 191, .5)',
        data: scatterSeriesBuilder("Sport")
      },
      {
        name: 'Boulder',
        type: 'scatter',
        yAxis: 0,
        color: 'rgba(0, 0, 0, .5)',
        data: scatterSeriesBuilder("Boulder")
      }
    ]
  };


  return (
      <HighchartsReact highcharts={Highcharts} options={options} />
  )
}

export default withRouter(Graph)