const express = require('express');
require('express-async-errors');
const mongoose = require('./src/configs/database');
const extractionService = require('./src/services/extraction.service');
const facesService = require('./src/services/faces.service');
const router = require('./src/routes/faces.route');
const rabbitMQService = require('./src/services/rabbitmqService');


rabbitMQService.connect().then(() => {
  console.log('Connected to Rabbit MQ');
  rabbitMQService.consumeMessage('IMAGES', async (message) => {
    const { _id, key } = JSON.parse(message);
    console.log(`Received message: ${message}`);
    const faceUrls = await extractionService.extractFacesFromImage(key);
    await facesService.createFaces(_id, faceUrls);
  });
})
.catch(error => {
  console.error('Unable to connect to the Rabbit MQ:', error);
  process.exit(1);
});



const app = express();

app.use(express.json());

app.use(router);

const port = +process.env.PORT ?? 3002;

app.listen(port, () => {
  console.log(`Uploader Service at ${port}`);
});


mongoose.once('open', () => {
  console.log('Connected to MongoDB');
}
);