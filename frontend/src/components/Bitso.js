import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import Nav from './Nav'
import Spinner from './Spinner';
import GraphicLine from './GraphicLine';
import OptionsRadio from './OptionsRadio'

const Bitso = (props) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    document.body.style.background = 'white';

    const getData = async() => {
        return axios.get('http://localhost:9000/info').then(result => result.data).catch(error => { console.log(error); return {}})
    }

    const filterMinutes = async (minutos) => {
        let response = await axios.post('http://localhost:9000/filtro',{ minutos : minutos }).then(result => result.data);
        const dataResult = {
            labels : response.data.map(x => formatDate(new Date(x.created_at))),
            data : response.data.map(y => Number(y.last))
        }

        setData(dataResult)
    }

    const formatDate = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
      }

    useEffect(() => {
        getData().then(result => {
            console.log(result.data);
            const dataResult = {
                labels : result.data.map(x => formatDate(new Date(x.created_at))),
                data : result.data.map(y => Number(y.last))
            }

            console.log(dataResult);
            setData(dataResult)
            setLoading(false)
        }).catch(error => {
            console.log(error);
            setLoading(false)
        })
    }, [])

    if(loading)
        return <Spinner />
    return (
        <Fragment>
            <Nav titulo="Bitso Cripto" />
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-6">
                        <OptionsRadio filterMinutes={filterMinutes} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <GraphicLine titulo={"Grafica de Lineas"} datos={data} />
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default Bitso;