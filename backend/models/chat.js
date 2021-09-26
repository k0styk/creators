const { Schema, model } = require('mongoose');
const { Chat, Users, Cases } = require('./names');

const ChatSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: Users },
    caseId: { type: Schema.Types.ObjectId, ref: Cases },
    deleted: { type: Boolean },
    messages: [
      {
        fromId: { type: Schema.Types.ObjectId, ref: Users },
        dateSend: { type: Date, default: new Date() },
        text: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model(Chat, ChatSchema);
