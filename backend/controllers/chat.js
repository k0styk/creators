const chatService = require('../service/chat/chat');
const ApiError = require('../exceptions/api-error');

class ChatController {
  async createChat(req, res, next) {
    try {
      const { customerId, creatorId, caseId } = req.body;
      const { chat } = await chatService.createCase(
        customerId,
        creatorId,
        caseId
      );

      res.json({ chat });
    } catch (e) {
      next(e);
    }
  }

  async getChats() {
    try {
      // const { customerId, creatorId, caseId } = req.body;
      // const { chat } = await chatService(customerId, creatorId, caseId);
      // res.json({ chat });
    } catch (e) {
      next(e);
    }
  }

  async joinChat() {}

  async leftChat() {}

  async sendMessageToChat() {}

  async getMessagesChat() {}
}

module.exports = new ChatController();
