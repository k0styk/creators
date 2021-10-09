const { Schema, model } = require('mongoose');
const { Chats, Users, Cases } = require('./names');

const ChatSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: Users, required: true },
    caseId: { type: Schema.Types.ObjectId, ref: Cases, required: true },
    deleted: { type: Boolean, default: false },
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

module.exports = model(Chats, ChatSchema);
