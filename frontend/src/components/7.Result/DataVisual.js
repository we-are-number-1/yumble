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
  return (
    <div className='PieChart'>
      <Pie data={props.data}/>
    </div>
  );
}

export default DataVisual;
