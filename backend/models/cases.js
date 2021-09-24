const { Schema, model } = require('mongoose');
const { Cases, Spheres, User, Cities, CaseTypes } = require('./names');

const CasesSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        productionTime: { type: Number }, // minutes
        userId: { type: Schema.Types.ObjectId, ref: User, required: true },
        sphereId: { type: Schema.Types.ObjectId, ref: Spheres, required: true },
        youtubeId: { type: String, required: true },
        typeId: { type: Schema.Types.ObjectId, ref: CaseTypes },
        cityId: { type: Schema.Types.ObjectId, ref: Cities },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model(Cases, CasesSchema);
