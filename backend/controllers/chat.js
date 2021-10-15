const chatService = require('../service/chat/chat');
const ApiError = require('../exceptions/api-error');

class ChatController {
  async createChat(req, res, next) {
    try {
      const { customerId, creatorId, caseId } = req.body;
      const chat = await chatService.createChat(customerId, creatorId, caseId);

      res.json({ ...chat });
    } catch (e) {
      next(e);
    }
  }

  async getChats(userId, cb) {
    try {
      const data = await chatService.getChats(userId);

      cb(data);
    } catch (e) {
      cb({ error: e });
    }
  }

  async getChatMessages(chatId, cb) {
    try {
      const data = await chatService.getChatMessages(chatId);

      cb(data);
    } catch (e) {
      cb({ error: e });
    }
  }

  async joinChat() {}

  async leftChat() {}

  async sendMessageToChat(chatId, fromId, text) {
    const data = await chatService.sendMessageToChat(chatId, fromId, text);
  }
}

module.exports = new ChatController();
