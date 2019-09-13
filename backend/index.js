const app = require('./app');

const startServer = () => new Promise((resolve, reject) => {
    let port = 9000;
    let host = '0.0.0.0';
  
    let server = app.listen(port, host, () => {
      //logger.info
      console.log(`App started, listen connections on port: ${host}:${port}`);
      resolve(`${host}:${port}`);
    });
  
    server.on('error', err => {
      reject(err);
      process.exit();
    });
});


Promise.all([]).then(startServer);