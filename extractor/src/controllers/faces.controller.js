const facesService = require('../services/faces.service');

async function getFaces(req, res, next) {
    try {
        const results = await facesService.getFaces(req.query.imageId);

        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getFaces,
};
