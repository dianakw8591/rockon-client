import React from 'react';
import _ from 'lodash';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import * as moment from 'moment';


export default function Graph(props) {
  const { entries } = props;

  const groupByType = _.groupBy(entries, 'climb.key_type');

  const groupByDate = (arr) => {
    return _.groupBy(arr, 'start_date')
  }

  // trad data series
  const tradDate = groupByDate(groupByType['Trad'])
  const maxRatingT = _.map(tradDate, (value) => _.maxBy(value, 'climb.numeric_rating'))
  const sortedT = _.sortBy(maxRatingT, 'start_date');
  const maxRatingDataT = _.map(sortedT, (obj) => [moment(obj.start_date).valueOf(), obj.climb.numeric_rating])

  console.log(sortedT)

  //boulder data series
  const boulderDate = groupByDate(groupByType['Boulder'])
  const maxRatingB = _.map(boulderDate, (value) => _.maxBy(value, 'climb.numeric_rating'))
  const sortedB = _.sortBy(maxRatingB, 'start_date');
  const maxRatingDataB = _.map(sortedB, (obj) => [moment(obj.start_date).valueOf(), obj.climb.numeric_rating])


  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Climbs by Highest Grade per Day'
    },
    xAxis: {
      type: 'datetime',
      title: {
        enabled: true,
        text: 'Date'
      },
    },
    yAxis: {
      title: {
        text: 'Climbing Grade (converted)'
      }
    },
    series: [
      {
        name: 'Trad',
        color: 'rgba(223, 83, 83, .5)',
        data: maxRatingDataT
      },
      {
        name: 'Boulder',
        data: maxRatingDataB
      }
    ]
  };


  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}