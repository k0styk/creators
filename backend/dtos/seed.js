class ServiceDto {
  constructor(model) {
    this.services = model.map((v) => ({
      id: v['_id'],
      name: v.name,
      tooltipText: v.tooltipText,
      tooltipAdditionalType: v.tooltipAdditionalType,
      tooltipAdditional: v.tooltipAdditional,
    }));
  }
}

class SphereDto {
  constructor(model) {
    this.spheres = model.map((v) => ({
      id: v['_id'],
      name: v.name,
    }));
  }
}

class SphereAggregateDto {
  constructor(model) {
    this.sphere = model['_id'];
  }
}

class CaseTypeDto {
  constructor(model) {
    this.types = model.map((v) => ({
      id: v['_id'],
      name: v.name,
    }));
  }
}

module.exports = {
  ServiceDto,
  SphereDto,
  SphereAggregateDto,
  CaseTypeDto,
};
