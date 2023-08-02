const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
