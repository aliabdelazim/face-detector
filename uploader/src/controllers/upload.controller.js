const uploadService = require('../services/upload.service');

async function getImages(req, res, next) {
  try {
    const results = await uploadService.getImages();
    const images = results.map((image) => ({id: image._id, description: image.description}))
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
}

async function getImageById(req, res, next) {
  try {
    const image = await uploadService.getImageById(req.params.id);
    res.status(200).json(image);
  } catch (err) {
    next(err);
  }
}

async function uploadImage(req, res, next) {
    try {
        const imageBuffer = new Buffer.from(req.file.buffer, 'binary');
        const format = req.file.mimetype.split('/')[1];
        const image = await uploadService.uploadImage(imageBuffer, format, req.body.description);
    
        res.status(200).json(image);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getImages,
    uploadImage,
    getImageById
};