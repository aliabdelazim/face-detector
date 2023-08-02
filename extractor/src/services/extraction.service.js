const s3 = require('../utils/aws-s3');
const rekognition = require('../utils/aws-rekognition');
const Jimp = require('jimp');


async function extractFacesFromImage(key) {
    console.log(`Extracting faces from ${key}`);
    const image = await s3.downloadFile(key);
    const params = {
        Image: {
          Bytes: image,
        },
      };
    const result = await rekognition.detectFaces(params).promise();

    const faces = result.FaceDetails || [];

    const mainImage = await Jimp.read(image);

    const extractedFaces = [];

    for (const face of faces) {
        const { Width, Height, Left, Top } = face.BoundingBox;
        const widthPx = mainImage.bitmap.width * Width;
        const heightPx = mainImage.bitmap.height * Height;
        const xPx = mainImage.bitmap.width * Left;
        const yPx = mainImage.bitmap.height * Top;
  
        const extractedFaceImage = mainImage.clone().crop(xPx, yPx, widthPx, heightPx);

        extractedFaces.push(extractedFaceImage);
    }


    const faceUrls = [];
    for (let i = 0; i < extractedFaces.length; ++i) {
        const faceBuffer = await extractedFaces[i].getBufferAsync(Jimp.MIME_JPEG);
        const faceUrl = await s3.uploadFile(faceBuffer, `face_${key}_#${i}.jpg`);
        faceUrls.push(faceUrl);
    }
    return faceUrls;
}


module.exports = {
    extractFacesFromImage,
};