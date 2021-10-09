const ObjectId = require('mongoose').Types.ObjectId;
const ChatModel = require('../../models/chat');
const { ChatDto } = require('../../dtos/chat');

class ChatService {
  async createCase(customerId, creatorId, caseId) {
    const candidate = await ChatModel.findOne({
      customerId,
      creatorId,
      caseId,
    });
    if (candidate) {
      return { chat: new ChatDto(candidate) };
    }

    const chat = await ChatModel.create({
      creatorId,
      customerId,
      caseId,
    });

    return { chat: new ChatDto(chat) };
  }
}

module.exports = new ChatService();
