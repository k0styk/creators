class SeedDto {
  constructor(model) {
    this.services = model.services.map((v) => ({
      id: v['_id'],
      name: v.name,
      tooltipText: v.tooltipText,
      tooltipAdditionalType: v.tooltipAdditionalType,
      tooltipAdditional: v.tooltipAdditional,
    }));
    this.spheres = model.spheres.map((v) => ({
      id: v['_id'],
      name: v.name,
    }));
    this.types = model.caseType.map((v) => ({
      id: v['_id'],
      name: v.name,
    }));
  }
}

module.exports = {
  SeedDto,
};
