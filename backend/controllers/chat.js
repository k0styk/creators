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
      console.log('get');
      const data = await chatService.getChats(userId);

      cb(data);
    } catch (e) {
      cb({ error: e });
    }
  }

  async getChatMessages(chatId, cb) {
    try {
      console.log(chatId);
      const data = await chatService.getChatMessages(chatId);

      cb(data);
    } catch (e) {
      cb({ error: e });
    }
  }

  async joinChat() {}

  async leftChat() {}

  async sendMessageToChat(data) {
    try {
      await chatService.sendMessageToChat(data);
    } catch (e) {
      console.log('Send message error;');
      console.log(e);
      console.log('-------------------');
    }
  }
}

module.exports = new ChatController();
