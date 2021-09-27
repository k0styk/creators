const { Schema, model } = require('mongoose');
const { SeedSphere } = require('./names');

const SphereSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = model(SeedSphere, SphereSchema);
