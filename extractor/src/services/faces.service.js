const Face = require('../models/face.model');

async function getFaces(imageId) {
    const results = await Face.find({ original_image_id: imageId });

    return results;
}


async function createFaces(imageId, faceUrls) {
    const faces = [];
    for (let i = 0; i < faceUrls.length; ++i) {
        const face = new Face({
            url: faceUrls[i],
            original_image_id: imageId,
        });
        await face.save();
        faces.push(face);
    }
    return faces;
}

module.exports = {
    getFaces,
    createFaces,
};