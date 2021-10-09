class ChatDto {
  constructor(model) {
    this.id = model._id;
    this.customerId = model.customerId;
    this.caseId = model.caseId;
  }
}

module.exports = {
  ChatDto,
};
