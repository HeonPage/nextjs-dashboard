// 'use client'
// import React from 'react'
// import { render } from 'react-dom'
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'

// const options = {
//   title: {
//     text: 'My chart',
//   },
//   series: [
//     {
//       data: [1, 2, 3],
//     },
//   ],
// }
// const pieChart = () => {
//   return (
//     <>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </>
//   )
// }

// export default pieChart()
'use client'
import React, { useEffect, useRef, useState } from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { Radio_Document } from '@/app/lib/type'

// import HighchartsExporting from 'highcharts/modules/exporting';

// if (typeof Highcharts === 'object') {
//   HighchartsExporting(Highcharts);
// }

const PieChart = ({ data }: { data: Radio_Document[] }) => {
  const mediumCounts: any = {}
  data.forEach((item: Radio_Document) => {
    if (mediumCounts[item.medium]) {
      mediumCounts[item.medium]++
    } else {
      mediumCounts[item.medium] = 1
    }
  })

  const result = Object.keys(mediumCounts).map((key) => ({
    name: key,
    y: mediumCounts[key],
  }))

  const chartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '매체별 분류',
    },
    series: [
      {
        name: '매체',
        colorByPoint: true,
        data: result,
      },
    ],
    exporting: {
      allowHTML: true,
    },
  }

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType="stockChart"
      />
    </div>
  )
}

export default PieChart
