const uploadService = require('../service/upload');
const ApiError = require('../exceptions/api-error');

class ApiController {
  async upload(req, res, next) {
    try {
      const { files } = req;
      const data = await uploadService.upload(files);
      if (data.status === 415) {
        return res.sendStatus(415);
      }

      return res.json(data);
    } catch (e) {
      // TODO: need fileupload error
      next(e);
    }
  }
}

module.exports = new ApiController();
