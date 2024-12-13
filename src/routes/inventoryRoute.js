const express = require('express');
const inventoryRoute= express.Router();
const {createInventoryController,createArrayInventoryController,getInventoryController,updateInventoryController,deleteInventoryController,deleteArrayInventoryController} = require("../controllers/inventoryController")
inventoryRoute.post("/api",createInventoryController)
inventoryRoute.post("/api-many",createArrayInventoryController)
inventoryRoute.get("/api",getInventoryController)
inventoryRoute.put("/api",updateInventoryController)
inventoryRoute.delete("/api",deleteInventoryController)
inventoryRoute.delete("/api-many",deleteArrayInventoryController)
module.exports = inventoryRoute