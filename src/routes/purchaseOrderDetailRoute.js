const express = require('express');
const purchaseOrderDetailRoute = express.Router();
const {
    createPurchaseOrderDetailController,
    createArrayPurchaseOrderDetailController,
    getPurchaseOrderDetailController,
    updatePurchaseOrderDetailController,
    deletePurchaseOrderDetailController,
    deleteArrayPurchaseOrderDetailController
} = require("../controllers/purchaseOrderDetailController")
purchaseOrderDetailRoute.post("/api", createPurchaseOrderDetailController)
purchaseOrderDetailRoute.post("/api-many", createArrayPurchaseOrderDetailController)
purchaseOrderDetailRoute.get("/api", getPurchaseOrderDetailController)
purchaseOrderDetailRoute.put("/api", updatePurchaseOrderDetailController)
purchaseOrderDetailRoute.delete("/api", deletePurchaseOrderDetailController)
purchaseOrderDetailRoute.delete("/api-many", deleteArrayPurchaseOrderDetailController)
module.exports = purchaseOrderDetailRoute;
