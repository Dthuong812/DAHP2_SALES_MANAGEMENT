const express = require('express');
const supplierRoute= express.Router();
const {createSupplierController,createArraySupplierController,getSupplierController,updateSupplierController,deleteSupplierController,deleteArraySupplierController, searchSupplierControllerI} = require("../controllers/SupplierController")
supplierRoute.post("/api",createSupplierController)
supplierRoute.post("/api-many",createArraySupplierController)
supplierRoute.get("/api",getSupplierController)
supplierRoute.get("/api-search",searchSupplierControllerI)
supplierRoute.put("/api",updateSupplierController)
supplierRoute.delete("/api",deleteSupplierController)
supplierRoute.delete("/api-many",deleteArraySupplierController)
module.exports = supplierRoute