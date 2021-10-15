class ChatDto {
  constructor(model) {
    this.id = model._id;
    this.customerId = model.customerId;
    this.caseId = model.caseId;
  }
}

class ShortChatDto {
  constructor(model) {
    this.id = model._id;
  }
}

module.exports = {
  ChatDto,
  ShortChatDto,
};
