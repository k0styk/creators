const { Schema, model } = require('mongoose');
const { date } = require('../service/helper');

const UserSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        type: { type: Number, required: true, enum: [1, 2], default: 1 },
        firstName: { type: String },
        lastName: { type: String },
        about: { type: String },
        cityId: { type: Number },
        phone: { type: String, unique: true },
        isFullRegister: { type: Boolean, default: false },
        isActivated: { type: Boolean, default: false },
        activationLink: { type: String },
        activationLinkExpiration: {
            type: Date,
            default: date.addWeekDays(new Date(), 7),
        },
        secondName: { type: String },
        photoPath: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = model('User', UserSchema);
