import React, { Fragment, useState, useEffect } from 'react';
import GraphicChart from './GraphicChart'
import axios from 'axios';

import Nav from './Nav';
import Spinner from './Spinner';
import Options from './Options';

const Graphic = (props) => {

    const [ loading, setLoading] = useState(true);
    const [ dataRequest, setDataRequest] = useState({});
    const [ data, setData] = useState({});

    document.body.style.background = 'white';

    const getData = () => {
        return axios.get(`http://localhost:9000/crypto`).then(res => JSON.parse(res.data.data)).catch(error => { console.log(error); return []})
    }

    useEffect(() => {
        getData().then(result => {
            const datos = result.DISPLAY['BTC']['MXN'];
            setDataRequest(datos);
            const dataGraph = [ parseFloat(datos.PRICE.replace('MXN','').trim()) ]
            setData({ datos : dataGraph, labels : ['Precio Actual']})
            setLoading(false);
        })
    },[]);

    const realoadGrapich = (dataReload) => {
        const { minimo, maximo , cambio, apertura} = dataReload;
        
        let label = ['Precio Actual'];
        let data = [parseFloat(dataRequest.PRICE.replace('MXN','').trim())];
        if(minimo){
            label.push('Precio mas Bajo')
            data.push(parseFloat(dataRequest.LOW24HOUR.replace('MXN','').trim()))
        }
        if(maximo){
            label.push('Precio mas Alto')
            data.push(parseFloat(dataRequest.HIGHDAY.replace('MXN','').trim()))
        }
        if(cambio){
            label.push('Precio Cambio')
            data.push(parseFloat(dataRequest.CHANGEDAY.replace('MXN','').trim()))
        }
        if(apertura){
            label.push('Precio Apertura')
            data.push(parseFloat(dataRequest.OPENDAY.replace('MXN','').trim()))
        }
        setData({ datos : data , labels : label})
    }

    if(loading)
        return <Spinner />

    return ( 
        <Fragment>
            <Nav titulo="Bitso Cripto" />
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <GraphicChart titulo={"Grafica Bitcoin a Pesos "} datos={data} precioActual={dataRequest.PRICE} />
                    </div>
                    <div className="col-md-4">
                        <Options reload={realoadGrapich} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default Graphic;