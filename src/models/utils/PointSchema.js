const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    // Tipo uma coluna
    type: String, 
    enum:['Point'],
    required:true,
    },
    coordinates: {
      // armazenamento = longitude e latitude
      type: [Number],
      required:true
    },
});

module.exports = PointSchema;