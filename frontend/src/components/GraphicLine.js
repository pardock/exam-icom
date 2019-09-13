import React from 'react';
import {Line} from 'react-chartjs-2';

const GraphicLine = ({titulo, datos}) => {
    const data = {
        labels: datos.labels,
        datasets: [
          {
            label: 'Variacion Bitcoin',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: datos.data
          }
        ]
      };


    return ( 
        <div>
            <h2>{titulo}</h2>
            <Line data={data} width={100} height={40} />
        </div>
     );
}
 
export default GraphicLine;