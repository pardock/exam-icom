import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';


const GraphicChart = ({titulo, precioActual, datos}) => {
    const defaults = {
        labels : datos.labels,
        datasets : [
            {
                label: 'Precio MXN (Miles)',
                backgroundColor: '#007bff',
                borderColor: '#007bff',
                borderWidth: 1,
                hoverBackgroundColor: '#0062cc',
                hoverBorderColor: '#0062cc',
                data : datos.datos
            }
        ]
    }

    return ( 
        <div>
            <h2>{titulo} {precioActual}</h2>
            <HorizontalBar data={defaults} />
        </div>
     );
}
 
export default GraphicChart;