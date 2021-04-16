import React from 'react';
import {Pie} from 'react-chartjs-2';

/**
 * @param {*} props
 * @return {*}
 * 
 * Component for representing the data of all votes in a game
 * Presented as a pie chart.
 * 
 */
function DataVisual(props) {
  // Modify the options prop to change the chart legend's font colour
  const chartOptions = {
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 255, 255)',
      },
    },
  };
  return (
    <div className='PieChart'>
      <Pie data={props.data} options={chartOptions} />
    </div>
  );
}

export default DataVisual;
