const {createPurchaseOrderService, createArrayPurchaseOrderService, getAllPurchaseOrderService, updatePurchaseOrderService, deletePurchaseOrderService, deleteArrayPurchaseOrderService} = require("../services/purchaseOrderSevice");

module.exports = {
    createPurchaseOrderController: async (req, res) => {
        let {
            purchaseOrder_id,
            supplier_id,
            
            total_amount,
           
        } = req.body;
        console.log(purchaseOrder_id, supplier_id,  total_amount)
        let purchaseOrderData = {
            purchaseOrder_id,
            supplier_id,
            
            total_amount,
           
        };
        let purchaseOrder = await createPurchaseOrderService(purchaseOrderData)
        return res.status(200).json({errorCode: 0, data: purchaseOrder})
    },
    createArrayPurchaseOrderController: async (req, res) => {
        try {
            const purchaseOrderData = req.body.purchaseOrders;
            if (!Array.isArray(purchaseOrderData) || purchaseOrderData.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid products array."});
            }

            let purchaseOrders = await createArrayPurchaseOrderService(purchaseOrderData);
            if (purchaseOrders) {
                return res.status(200).json({errorCode: 0, data: purchaseOrders});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid purchaseOrders to insert."});
            }
        } catch (error) {
            console.error("Error in postCreateArrayProduct:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getPurchaseOrderController: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const purchaseOrders = await getAllPurchaseOrderService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: purchaseOrders});
        } catch (error) {
            console.error("Error in getPurchaseOrderController:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    updatePurchaseOrderController: async (req, res) => {
        let {
            purchaseOrder_id,
            supplier_id,
            
            total_amount,
        } = req.body;
        let purchaseOrder = await updatePurchaseOrderService(purchaseOrder_id, supplier_id,  total_amount)
        return res.status(200).json({errorCode: 0, data: purchaseOrder})
    },
    deletePurchaseOrderController: async (req, res) => {
        let purchaseOrder_id = req.body.purchaseOrder_id
        let purchaseOrder = await deletePurchaseOrderService(purchaseOrder_id)
        return res.status(200).json({errorCode: 0, data: purchaseOrder})
    },
    deleteArrayPurchaseOrderController: async (req, res) => {
        let purchaseOrder = await deleteArrayPurchaseOrderService(req.body.purchaseOrderIds)
        return res.status(200).json({errorCode: 0, data: purchaseOrder})
    }
}
