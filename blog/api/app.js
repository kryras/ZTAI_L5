const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config");
const routes = require("./REST/routes");

const express = require('express');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useCreateIndex: true}, (error) => {
  if (error) {
    console.error(error);
  }
  else {
    console.log('Connect with database established');
  }
});
process.on('SIGINT', () => {
  mongoose.connection.close(function () {
    console.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

routes(app);
app.listen(config.port, () => {
  console.info(`Server is running at ${config.port}`)
});
