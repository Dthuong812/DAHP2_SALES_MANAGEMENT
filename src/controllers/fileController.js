const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ errorCode: 1, message: 'No files were uploaded.' });
    }

    const result = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        errorCode: result.status === 'success' ? 0 : 1,
        data: result
    });
};

const postUploadMultipleFileAPI = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ errorCode: 1, message: 'No files were uploaded.' });
    }

    if (Array.isArray(req.files.image)) {
        const result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            errorCode: 0,
            data: result
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};

module.exports = {
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI
};
