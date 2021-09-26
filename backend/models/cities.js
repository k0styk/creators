const { Schema, model } = require('mongoose');

const CitiesSchema = new Schema(
  {
    name: { type: String, required: true },
    id: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

module.exports = model('Cities', CitiesSchema);
