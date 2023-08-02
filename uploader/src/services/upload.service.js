const Image = require('../models/image.model');
const s3 = require('../utils/aws-s3');
const rabbitMQService = require('../services/rabbitmqService');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

async function getImages() {
    const results = await Image.find();

    return results;
}

async function getImageById(id) {
    const image = await Image.findById(id);
    const extractedFaces = await axios.get(`http://extractor:3002/faces`, {
        params: {
            imageId: id
        }
    });

    const imageWithFaces = extractedFaces.data.reduce((acc, face) => {
        const { _id, ...rest } = face;
        acc.faces.push(rest);
        return acc;
    }, { ...image.toJSON(), faces: [] });

    return imageWithFaces;
}


/**
 * Uploads an image to S3 and saves the image URL to the database
 * 
 * @param {*} file 
 * @param {*} creator 
 * @returns 
 */
async function uploadImage(file, format, description) {
    const imageName = `image_${uuidv4()}.${format}`;
    const url = await s3.uploadFile(file, imageName )

    const image = new Image({
        url,
        description
    });

    await image.save();
    const message ={ ...image.toJSON(), key: imageName};
    rabbitMQService.publishMessage('IMAGES', JSON.stringify(message));
    
    return image;
}



module.exports = {
    getImages,
    uploadImage,
    getImageById,
};