require('dotenv').config();

module.exports = {
  upload: async ({ files }) => {
    const imageFile = files.file;

    try {
      await imageFile.mv(`public/${imageFile.name}`);
    } catch (error) {
      console.log(error);
      return error;
    }

    if (process.env['NODE_ENV'] === 'production') {
      return {
        file: `https://creators.emergent.su/public/${imageFile.name}`,
      };
    } else {
      return {
        file: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/public/${imageFile.name}`,
      };
    }
  },
};
