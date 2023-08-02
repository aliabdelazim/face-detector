const express = require('express');
const router = express.Router();
const facesController = require('../controllers/faces.controller');

router.get('/faces', facesController.getFaces);

module.exports = router;