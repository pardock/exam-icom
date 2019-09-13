'use strict';


const express = require( 'express');
const Promise = require( 'bluebird');
const morgan = require( 'morgan');
const bodyParser = require( 'body-parser');
const io = require( './middleware/io_middleware');
const routes = require( './routes');

global.Promise = Promise;

const app = express();

app.use(io);

morgan.token('request-data', (req, res) => { return "request: " + JSON.stringify({ headers: req.headers, body: req.body }); });
morgan.token('epoch', (req, res) => { return Date.now(); });
morgan.token('name-service', (req, res) => { return 'EXAM-API'; });
morgan.token('type-logger', (req, res) => { return "REQUEST"; });

app.use(morgan((tokens, req, res) => {

    if (!tokens['response-data']) {
      tokens['response-data'] = () => { return ""; };
    }
  
    //[date, service, type, code, ip, method,url,length,time, data]
    let consoleOutPut = [
      tokens['epoch'](req, res),
      tokens['name-service'](req, res),
      tokens['type-logger'](req, res),
      tokens.status(req, res),
      tokens['remote-addr'](req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.res(req, res, 'content-length'),
      tokens['response-time'](req, res),
      tokens['request-data'](req, res),
      tokens['response-data'](),
    ].join(' ');
  
    console.log(consoleOutPut);
    return consoleOutPut;
  }, {
      skip: (req, res) => {
        let excludePaths = String('ping')
          .split(",");
  
        for (let x in excludePaths) {
          if (req.url.includes(excludePaths[x]))
            return true;
        }
      }
}));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
  
app.use(routes);

// 404 Routes
app.use((req, res, next) => res.io({ code: 404 }));

module.exports = app;