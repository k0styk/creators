const { Schema, model } = require('mongoose');
const { SeedService } = require('./names');

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  tooltipText: { type: String, required: true },
  tooltipAdditionalType: { type: String },
  tooltipAdditional: { type: String },
});

module.exports = model(SeedService, ServiceSchema);
