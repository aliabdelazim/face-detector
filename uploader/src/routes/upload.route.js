const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const isAuthenticated = require('../middlewares/isAuthenticated');
const multer = require('multer');

const upload = multer();

router.get('/images', uploadController.getImages);

router.post('/upload', isAuthenticated, upload.single('image'), uploadController.uploadImage);

router.get('/images/:id', isAuthenticated, uploadController.getImageById);

module.exports = router;