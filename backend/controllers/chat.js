const chatService = require('../service/chat/chat');

class ChatController {
  async createChat(req, res, next) {
    try {
      const { customerId, creatorId, caseId, checkedServices } = req.body;
      const chat = await chatService.createChat(
        customerId,
        creatorId,
        caseId,
        checkedServices
      );

      res.json({ ...chat });
    } catch (e) {
      next(e);
    }
  }

  async checkRights(req, res, next) {
    try {
      const {
        params: { id },
      } = req;
      const result = await chatService.checkRights(req.user.id, id);

      if (result.length) {
        res.sendStatus(200);
      } else {
        res.json({
          status: 301,
          url: '/chat',
        });
      }
    } catch (e) {
      next(e);
    }
  }

  async getChats(userId, userType, cb) {
    try {
      const data = await chatService.getChats(userId, userType);

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

  async sendMessageToChat(data) {
    try {
      await chatService.sendMessageToChat(data);
    } catch (e) {
      console.log('Send message error;');
      console.log(e);
      console.log('-------------------');
    }
  }

  async exchangeServices(chatId, services) {
    try {
      await chatService.exchangeServices(chatId, services);
    } catch (e) {
      console.log('Exchange services error;');
      console.log(e);
      console.log('-------------------');
    }
  }

  async getUserIdMessageTo({ chatId, userType }) {
    try {
      const data = await chatService.getUserIdMessageTo(chatId, userType);

      return data;
    } catch (e) {
      console.log('Send message error;');
      console.log(e);
      console.log('-------------------');
    }
  }
}

module.exports = new ChatController();
