require('dotenv').config();
const crypto = require('crypto');

class UploadService {
  async upload(files) {
    const mimeTypes = ['image/png', 'image/gif', 'image/jpeg'];
    const imageFile = files.file;
    if (!mimeTypes.includes(imageFile.mimetype)) {
      return { status: 415 };
    }
    const ext = imageFile.name.split('.').pop();
    const fileName = `${imageFile.name}.${ext}`;
    const hash = crypto.createHash('md5').update(fileName).digest('hex');
    const hashedFileName = `${hash}.${ext}`;

    try {
      await imageFile.mv(`public/${hashedFileName}`);
    } catch (error) {
      console.log(error);
      return error;
    }

    if (process.env['NODE_ENV'] === 'production') {
      return {
        file: `${process.env['ORIGIN']}/public/${hashedFileName}`,
      };
    } else {
      return {
        file: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/public/${hashedFileName}`,
      };
    }
  }
}

module.exports = new UploadService();
