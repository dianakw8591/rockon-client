import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Timeline from "highcharts/modules/timeline.src.js";
import _ from 'lodash';
import * as moment from 'moment';

Timeline(Highcharts)

export default function GraphTimeline(props) {

  const { entries } = props;

  const objBuilder = () => {
    return _.map(entries, (obj) => {
      return ({
        x: moment(obj.start_date).valueOf(),
        // y: obj.climb.numeric_rating,
        name: obj.outcome,
        label: obj.outcome,
        // climbName: obj.climb.name,
        // rating: obj.climb.rating,
        // style: obj.style,
        // outcome: obj.outcome,
        // id: obj.id,
        // climb_id: obj.climb.climb_id,
      })
    })
  }

  const options = {
    chart: {
      zoomType: 'x',
      type: 'timeline',
      inverted: true,
    },
    xAxis: {
      type: 'datetime',
      visible: false
    },
    yAxis: {
      gridLineWidth: 1,
      title: null,
      labels: {
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    title: {
      text: "Timeline",
    },
    series:[{
      dataLabels: {
        alternate: true,
        distance: 150,
        allowOverlap: true,
        format: '<span style="color:{point.color}">● </span><span style="font-weight: bold;" > ' +
            '{point.x:%d %b %Y}</span><br/>{point.label}'
    },
      marker: {
        symbol: 'circle',
      },
      data: objBuilder(),
    }]  
  }

  return (
    <HighchartsReact highcharts={Highcharts} options={options} />
  )
}