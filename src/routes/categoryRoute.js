const express = require('express');
const categoryRoute = express.Router();
const { postCreateCategory ,getAllCategory,putCategory ,deleteCategory,postCreateArrayCategory,deleteCreateArrayCategory} = require('../controllers/categoryController');

categoryRoute.post('/api', postCreateCategory);
categoryRoute.post('/api-many', postCreateArrayCategory);
categoryRoute.get('/api', getAllCategory );
categoryRoute.put('/api', putCategory );
categoryRoute.delete('/api', deleteCategory );
categoryRoute.delete('/api-many', deleteCreateArrayCategory);

module.exports = categoryRoute;
