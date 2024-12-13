const express = require('express');
const purchaseOrderRoute= express.Router();
const {createPurchaseOrderController,createArrayPurchaseOrderController,getPurchaseOrderController,updatePurchaseOrderController,deletePurchaseOrderController,deleteArrayPurchaseOrderController} = require("../controllers/purchaseOrderController")
purchaseOrderRoute.post("/api",createPurchaseOrderController)
purchaseOrderRoute.post("/api-many",createArrayPurchaseOrderController)
purchaseOrderRoute.get("/api",getPurchaseOrderController)
purchaseOrderRoute.put("/api",updatePurchaseOrderController)
purchaseOrderRoute.delete("/api",deletePurchaseOrderController)
purchaseOrderRoute.delete("/api-many",deleteArrayPurchaseOrderController)
module.exports = purchaseOrderRoute