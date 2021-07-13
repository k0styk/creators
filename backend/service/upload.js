module.exports = {
    upload: async ({files}) => {
        const imageFile = files.file;

        try {
            await imageFile.mv(`public/${imageFile.name}`);
        } catch (error) {
            return error;
        }

        //поменять на env
        return {file: `http://localhost:8000/public/${imageFile.name}`};
    }
};
