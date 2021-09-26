const ApiError = require('../exceptions/api-error');
const caseService = require('../service/case/case');

// TODO: Check authroute to pass req.user
class CaseController {
  async createCase(req, res, next) {
    try {
      const created = await caseService.createCase(req.body, req.user);

      return res.json({ created });
    } catch (e) {
      next(e);
    }
  }

  async searchCases(req, res, next) {
    try {
      const searchedCase = await caseService.searchCases(req.body, req.user);

      return res.json({});
    } catch (e) {
      next(e);
    }
  }

  async getDataForCreateCases(req, res, next) {
    try {
      const data = await caseService.getDataForCreateCases();

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CaseController();
