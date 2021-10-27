const ObjectId = require('mongoose').Types.ObjectId;
const ChatModel = require('../../models/chat');
const { ShortChatDto } = require('../../dtos/chat');
const { chats } = require('../aggregations');

class ChatService {
  async createChat(customerId, creatorId, caseId, checkedServices) {
    const candidate = await ChatModel.findOne({
      customerId,
      creatorId,
      caseId,
    });
    if (candidate) {
      return { ...new ShortChatDto(candidate) };
    }
    let services = undefined;
    if (checkedServices) {
      services = checkedServices.map((s) => new ObjectId(s));
    }

    const chat = await ChatModel.create({
      creatorId,
      customerId,
      caseId,
      checkedServices: services,
    });

    return { ...new ShortChatDto(chat) };
  }

  async getChats(userId, userType) {
    // await timeout(1500); // TODO: REMOVE TIMEOUT
    const candidate = await ChatModel.aggregate(
      chats.getChats(userId, userType)
    );

    return candidate;
  }

  async getChatMessages(chatId) {
    const candidate = await ChatModel.aggregate(chats.getChatMessages(chatId));
    // await timeout(1500); // TODO: REMOVE TIMEOUT

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
    // await timeout(3000);
  }

  async getUserIdMessageTo(chatId, userType) {
    const chat = await ChatModel.aggregate(
      chats.getMessageInfoToNotify(chatId, userType)
    );

    return chat[0];
  }

  async exchangeServices(chatId, services) {
    const checkedServices = services.map((s) => new ObjectId(s));

    await ChatModel.findByIdAndUpdate(new ObjectId(chatId), {
      checkedServices,
    });
  }

  async checkRights(userId, chatId) {
    const candidate = await ChatModel.aggregate(
      chats.checkRights(userId, chatId)
    );

    return candidate;
  }
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = new ChatService();
