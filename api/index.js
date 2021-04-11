const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const db = require('./db');
const droneRoutes = require('./routes/drones');
const imageRoutes = require('./routes/images');
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/drones', droneRoutes);
app.use('/images', imageRoutes);
app.use('/users', userRoutes);

app.get('/', (_, res) => {
  res.sendStatus(200);
});

const port = process.env.NODEJS_LOCAL_PORT || 3000;

db.initializeConnection().then(() => {
  app.listen(port, () => console.log("Running in port", port));
});
