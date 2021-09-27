const { Schema, model } = require('mongoose');
const { SeedCaseType } = require('./names');

const CaseTypeSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = model(SeedCaseType, CaseTypeSchema);
