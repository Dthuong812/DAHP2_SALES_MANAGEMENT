const path = require('path');
const fs = require('fs');

const ensureUploadPathExists = (uploadPath) => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
};

const uploadSingleFile = async (fileObject) => {
    const uploadPath = path.resolve(__dirname, "../public/images/upload");
    ensureUploadPathExists(uploadPath);  // Ensure directory exists

    const extName = path.extname(fileObject.name);
    const baseName = path.basename(fileObject.name, extName);
    const finalName = `${baseName}-${Date.now()}${extName}`;
    const finalPath = path.join(uploadPath, finalName);

    try {
        await fileObject.mv(finalPath);
        return {
            status: "success",
            path: finalName,
            error: null
        };
    } catch (error) {
        return {
            status: "failed",
            path: null,
            error: JSON.stringify(error)
        };
    }
};

const uploadMultipleFiles = async (filesArr) => {
    const uploadPath = path.resolve(__dirname, "../public/images/upload");
    ensureUploadPathExists(uploadPath);  // Ensure directory exists

    const resultArr = [];
    let countSuccess = 0;

    for (let i = 0; i < filesArr.length; i++) {
        const extName = path.extname(filesArr[i].name);
        const baseName = path.basename(filesArr[i].name, extName);
        const finalName = `${baseName}-${Date.now()}${extName}`;
        const finalPath = path.join(uploadPath, finalName);

        try {
            await filesArr[i].mv(finalPath);
            resultArr.push({
                status: "success",
                path: finalName,
                fileName: filesArr[i].name,
                error: null
            });
            countSuccess++;
        } catch (error) {
            resultArr.push({
                status: "failed",
                path: null,
                fileName: filesArr[i].name,
                error: JSON.stringify(error)
            });
        }
    }

    return {
        countSuccess,
        detail: resultArr
    };
};

module.exports = {
    uploadSingleFile,
    uploadMultipleFiles
};
