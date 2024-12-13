
const express = require('express');
const customerRoute = express.Router();
const {postCreateCustomerAPI,postCreateArrayCustomerAPI,getCustomerAPI,putCustomerAPI,deleteCustomerAPI,deleteArrayCustomerAPI, checkCustomerController, searchCustomerAPI} = require('../controllers/customerController')

customerRoute.post("/api",postCreateCustomerAPI)
customerRoute.post("/api-many",postCreateArrayCustomerAPI)
customerRoute.get("/api",getCustomerAPI)
customerRoute.get('/api-search', searchCustomerAPI);
customerRoute.put("/api",putCustomerAPI)
customerRoute.delete("/api",deleteCustomerAPI)
customerRoute.delete("/api-many",deleteArrayCustomerAPI)
customerRoute.get("/api-check",checkCustomerController)

module.exports = customerRoute