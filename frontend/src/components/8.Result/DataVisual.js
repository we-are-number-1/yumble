import React from 'react';
import {Pie} from 'react-chartjs-2';

/**
 * @param {*} props
 * @return {*}
 */
function DataVisual(props) {
  return (
    <> {/* className='PieChart' */}
      <Pie data={props.data}/>
    </>
  );
}

export default DataVisual;
