const express = require('express');
const orderRoute= express.Router();
const {createOrderController,createArrayOrderController,getAllOrderController,updateOrderController,deleteOrderController,deleteArrayOrderController, searchOrdersController} = require("../controllers/orderController")
orderRoute.post("/api",createOrderController)
orderRoute.post("/api-many",createArrayOrderController)
orderRoute.get("/api",getAllOrderController)
orderRoute.get("/api-search",searchOrdersController)
orderRoute.put("/api",updateOrderController)
orderRoute.delete("/api",deleteOrderController)
orderRoute.delete("/api-many",deleteArrayOrderController)
module.exports = orderRoute