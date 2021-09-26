const { Schema, model } = require('mongoose');
const { Cases, Users, Seeds } = require('./names');

const CasesSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    sphere: { type: String, required: true },
    youtubeId: { type: String, required: true },
    description: { type: String },
    productionTime: { type: Number }, // minutes
    time: { type: Number },
    caseType: { type: String },
    city: {
      id: { type: String },
      name: { type: String },
    },
    services: [
      {
        serviceType: { type: Number },
        price: { type: Number },
        serviceId: { type: Schema.Types.ObjectId, ref: Seeds },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(Cases, CasesSchema);
