const express = require('express');
const detailOrderRoute = express.Router();
const {postCreateDetailOrderController,postArrCreateDetailOrderController,getAllDetailOrderController,updateDetailOrderController,deleteDetailOrderController,deleteArrDetailOrderController} = require("../controllers/detailOrderController")
detailOrderRoute.post("/api",postCreateDetailOrderController)
detailOrderRoute.post("/api-many",postArrCreateDetailOrderController)
detailOrderRoute.get("/api",getAllDetailOrderController)
detailOrderRoute.put("/api",updateDetailOrderController)
detailOrderRoute.delete("/api",deleteDetailOrderController)
detailOrderRoute.delete("/api-many",deleteArrDetailOrderController)
module.exports = detailOrderRoute