const { Schema, model } = require('mongoose');
const { Tokens, Users } = require('./names');

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: Users },
  refreshToken: { type: String, required: true },
});

module.exports = model(Tokens, TokenSchema);
