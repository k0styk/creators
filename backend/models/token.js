const { Schema, model } = require('mongoose');
const { Token, User } = require('./names');

const TokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: User },
    refreshToken: { type: String, required: true },
});

module.exports = model(Token, TokenSchema);
