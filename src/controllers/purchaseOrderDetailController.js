const {createPurchaseOrderDetailService, createArrayPurchaseOrderDetailService, getAllPurchaseOrderDetailService, updatePurchaseOrderDetailService, deletePurchaseOrderDetailService, deleteArrayPurchaseOrderDetailService} = require("../services/purchaseOrderDetailService");

module.exports = {
    createPurchaseOrderDetailController: async (req, res) => {
        let {
            purchaseOrderDetail_id,
            purchaseOrder_id,
            product_id,
            quantity,
            unit_cost,
            subtotal
        } = req.body;
        console.log(purchaseOrderDetail_id, purchaseOrder_id, product_id, quantity, unit_cost, subtotal)
        let purchaseOrderDetailData = {
            purchaseOrderDetail_id,
            purchaseOrder_id,
            product_id,
            quantity,
            unit_cost,
            subtotal
        }
        let purchaseOrderDetail = await createPurchaseOrderDetailService(purchaseOrderDetailData)
        return res.status(200).json({errorCode: 0, data: purchaseOrderDetail})
    },
    createArrayPurchaseOrderDetailController: async (req, res) => {
        try {
            const purchaseOrderDetailData = req.body.purchaseOrderDetails;
            if (!Array.isArray(purchaseOrderDetailData) || purchaseOrderDetailData.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid purchaseOrderDetails array."});
            }

            let purchaseOrderDetails = await createArrayPurchaseOrderDetailService(purchaseOrderDetailData);
            if (purchaseOrderDetails) {
                return res.status(200).json({errorCode: 0, data: purchaseOrderDetails});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid purchaseOrderDetails to insert."});
            }
        } catch (error) {
            console.error("Error in createArrayPurchaseOrderDetailController:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getPurchaseOrderDetailController: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const purchaseOrderDetails = await getAllPurchaseOrderDetailService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: purchaseOrderDetails});
        } catch (error) {
            console.error("Error in getPurchaseOrderDetailController:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    updatePurchaseOrderDetailController: async (req, res) => {
        let {
            purchaseOrderDetail_id,
            purchaseOrder_id,
            product_id,
            quantity,
            unit_cost,
            subtotal
        } = req.body;
        let purchaseOrderDetail = await updatePurchaseOrderDetailService(purchaseOrderDetail_id, purchaseOrder_id, product_id, quantity, unit_cost, subtotal)
        return res.status(200).json({errorCode: 0, data: purchaseOrderDetail})
    },
    deletePurchaseOrderDetailController: async (req, res) => {
        let purchaseOrderDetail_id = req.body.purchaseOrderDetail_id
        let purchaseOrderDetail = await deletePurchaseOrderDetailService(purchaseOrderDetail_id)
        return res.status(200).json({errorCode: 0, data: purchaseOrderDetail})
    },
    deleteArrayPurchaseOrderDetailController: async (req, res) => {
        let purchaseOrderDetail = await deleteArrayPurchaseOrderDetailService(req.body.purchaseOrderDetailIds)
        return res.status(200).json({errorCode: 0, data: purchaseOrderDetail})
    }
}
