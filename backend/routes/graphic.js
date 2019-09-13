const express = require('express');
const request = require('request-promise');
const info_service = require('./../services/info_service');

const router = express.Router();

const headers = {
    'Content-type' : 'application/json' 
}

const ping = async (req, res) => {
    return res.io({ code : 200 , message: 'pong'})
}

const getInfo = async (req, res) => {
    let apiInfo = await request.get(`https://api.bitso.com/v3/ticker/?book=btc_mxn`,{ headers }).then(result => JSON.parse(result)).catch(error => undefined);
    let datos = await info_service.processData(apiInfo.payload).then(result => result);
    return res.io({ code : datos.code , message: datos.message , data :{ data : datos.data }})
}

const getFiltro = async(req, res) => {
    const { minutos } = req.body;
    let datos = await info_service.filterData(minutos).then(result => result);
    return res.io({ code : datos.code , message: datos.message , data :{ data : datos.data }})
}

const dataCrypto = async(req, res) => {
    const key = '47e2e7a2ccbdc6e9cbd9e441d3a7330a682b3c2ec9a18715b36b68d3082c141b'
    let apiInfo = await request.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=MXN&api_key=${key}`, { headers })
    return res.io({ code : 200 , message: 'Ok', data :{ data : apiInfo }})
}

router.get('/',ping)
router.get('/info',getInfo)
router.post('/filtro', getFiltro)
router.get('/crypto', dataCrypto)

module.exports = router;