const express = require('express');
const warehouseRoute= express.Router();
const {createWarehouseController,createArrayWarehouseController,getWarehouseController,updateWarehouseController,deleteWarehouseController,deleteArrayWarehouseController} = require("../controllers/warehouseController")
warehouseRoute.post("/api",createWarehouseController)
warehouseRoute.post("/api-many",createArrayWarehouseController)
warehouseRoute.get("/api",getWarehouseController)
warehouseRoute.put("/api",updateWarehouseController)
warehouseRoute.delete("/api",deleteWarehouseController)
warehouseRoute.delete("/api-many",deleteArrayWarehouseController)
module.exports = warehouseRoute