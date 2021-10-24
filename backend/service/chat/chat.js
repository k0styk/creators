const ObjectId = require('mongoose').Types.ObjectId;
const ChatModel = require('../../models/chat');
const { ShortChatDto } = require('../../dtos/chat');
const { chats } = require('../aggregations');

class ChatService {
  async createChat(customerId, creatorId, caseId) {
    const candidate = await ChatModel.findOne({
      customerId,
      creatorId,
      caseId,
    });
    if (candidate) {
      return { ...new ShortChatDto(candidate) };
    }

    const chat = await ChatModel.create({
      creatorId,
      customerId,
      caseId,
    });

    return { ...new ShortChatDto(chat) };
  }

  async getChats(userId) {
    // TODO: REMOVE TIMEOUT
    await timeout(1500);
    const candidate = await ChatModel.aggregate(chats.getChats(userId));

    return candidate;
  }

  async getChatMessages(chatId) {
    // TODO: REMOVE TIMEOUT
    await timeout(1500);
    const candidate = await ChatModel.aggregate(chats.getChatMessages(chatId));

    return candidate[0];
  }

  async sendMessageToChat({ chatId, fromId, text, dateSend }) {
    await ChatModel.findByIdAndUpdate(new ObjectId(chatId), {
      $push: {
        messages: {
          fromId: new ObjectId(fromId),
          dateSend,
          text,
        },
      },
    });
    // TODO: REMOVE TIMEOUT
    await timeout(3000);
  }
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = new ChatService();
