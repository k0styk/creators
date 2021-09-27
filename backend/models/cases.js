const { Schema, model } = require('mongoose');
const {
  Cases,
  Users,
  SeedCaseType,
  SeedService,
  SeedSphere,
} = require('./names');

const CasesSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    sphereId: {
      type: Schema.Types.ObjectId,
      ref: SeedSphere,
      required: true,
    },
    youtubeId: { type: String, required: true },
    caseType: {
      type: Schema.Types.ObjectId,
      ref: SeedCaseType,
      required: true,
    },
    description: { type: String },
    productionTime: { type: Number }, // minutes
    time: { type: Number },
    city: {
      id: { type: String },
      name: { type: String },
    },
    services: [
      {
        serviceType: { type: Number },
        price: { type: Number },
        serviceId: { type: Schema.Types.ObjectId, ref: SeedService },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(Cases, CasesSchema);
