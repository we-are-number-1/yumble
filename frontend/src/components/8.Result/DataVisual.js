import React from 'react';
import {Pie} from 'react-chartjs-2';

/**
 * @param {*} props
 * @return {*}
 */
function DataVisual(props) {
  return (
    <div> {/* className='PieChart' */}
      <Pie data={props.data}/>
    </div>
  );
}

export default DataVisual;
