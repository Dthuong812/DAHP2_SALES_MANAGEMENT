const express = require('express');
const productRoute = express.Router();
const { postCreateProduct ,getAllProduct, postCreateArrayProduct,putProduct,deleteProduct,deleteArrayProduct, searchProductsController} = require('../controllers/productController');
const { postUploadSingleFileAPI, postUploadMultipleFileAPI, getImageAPI } = require('../controllers/fileController');
const path = require('path');

productRoute.use('/images', express.static(path.join(__dirname, 'public/images')));
productRoute.post('/file', postUploadSingleFileAPI);
productRoute.post('/files', postUploadMultipleFileAPI);
productRoute.get('/images/:imageName', getImageAPI);

productRoute.post('/api', postCreateProduct);
productRoute.post('/api-many', postCreateArrayProduct);
productRoute.get('/api', getAllProduct);
productRoute.get('/api-search', searchProductsController);
productRoute.put('/api', putProduct);
productRoute.delete('/api', deleteProduct);
productRoute.delete('/api-many', deleteArrayProduct);




module.exports = productRoute;