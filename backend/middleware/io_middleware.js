'use strict';

const http = require('http');

/**
 * Maps the http codes vs the sended status from the controller
 *
 * @param  {Number} [status=200] response status
 * @return {Object}              result object with httpCode property and message
 */
const httpCodes = (code = 200) => {
  code = parseInt(code) || 500;

  let result = {
    status: 'error',
    httpCode: code,
    message: http.STATUS_CODES[code].toString().toLowerCase()
  };

  if(code >= 200 && code < 300)
    result.status = 'success';

  return result;
};

/**
 * Method than resolves the response
 *
 * @param {Object} req           http request object
 * @param {Object} res           http response object
 * @param {Number} [status=200]  response status
 * @param {Object | Array} data  response data
 */
const IO = (req, res, { code = 200, message, data = null }) => {
  let result = httpCodes(code);
  let response = {
    object: req.serviceMethodName || "notificaciones-service",
    code: result.httpCode,
    status: result.status,
    message: (message)?message:result.status+'.'+ message,
    request: Date.now(),
    url: req.originalUrl
  };

  if(data) response = Object.assign(response, data);

  res.statusMessage = result.message;
  res
    .status(result.httpCode, result.message)
    .json(response);
};

/**
 * Add the IO method to the response object
 */
module.exports = (req, res, next) => {
  res.io = IO.bind(IO, req, res);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header("Allow","PUT,POST,GET,DELETE,OPTIONS,PATCH")
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Cache-Control,Authorization");
  
  return next();
};