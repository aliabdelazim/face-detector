const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  original_image_id: {
    type: String,
    required: true,
  },
});

const Face = mongoose.model('Face', faceSchema);

module.exports = Face;
