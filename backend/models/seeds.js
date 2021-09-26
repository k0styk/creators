const { Schema, model } = require('mongoose');
const { Seeds } = require('./names');

const SeedsSchema = new Schema({
  services: [
    {
      name: { type: String, required: true },
      tooltipText: { type: String, required: true },
      tooltipAdditionalType: { type: String },
      tooltipAdditional: { type: String },
    },
  ],
  spheres: [
    {
      name: { type: String, required: true },
    },
  ],
  caseType: [
    {
      name: { type: String, required: true },
    },
  ],
});

module.exports = model(Seeds, SeedsSchema);
