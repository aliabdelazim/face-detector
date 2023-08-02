const express = require('express');
require('express-async-errors');
const mongoose = require('./src/configs/database')
const router = require('./src/routes/upload.route');
const RabbitMQService = require('./src/services/rabbitmqService');


RabbitMQService.connect().catch(error => {
  console.error('Unable to connect to the Rabbit MQ:', error);
  process.exit(1);
});

const app = express();

app.use(express.json());

app.use(router);

const port = +process.env.PORT ?? 3003;

app.listen(port, () => {
  console.log(`Uploader Service at ${port}`);
});

mongoose.once('open', () => {
  console.log('MongoDB connected');
} );


