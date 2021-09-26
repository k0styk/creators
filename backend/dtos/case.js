class CaseDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
  }
}

module.exports = {
  CaseDto,
};
