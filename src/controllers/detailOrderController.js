const {CreateDetailOrder, createArrayOrderItemService, getAllOderItemService, updateOrderItemService, deleteOrderItemService, deleteArrayOrderItemService} = require("../services/detailOrderService")
module.exports = {
    postCreateDetailOrderController: async (req, res) => {
        let {
            orderItem_id,
            order_id,
            product_id,
            quantity,
            unit_price
        } = req.body
        console.log(orderItem_id, order_id, product_id, quantity, unit_price)
        let dataDetailOrder = {
            orderItem_id,
            order_id,
            product_id,
            quantity,
            unit_price
        }
        let detailOrder = await CreateDetailOrder(dataDetailOrder)
        return res.status(200).json({errorCode: 0, data: detailOrder})
    },
    postArrCreateDetailOrderController: async (req, res) => {
        try {
            const dataDetailOrder = req.body.orderItems;
            if (!Array.isArray(dataDetailOrder) || dataDetailOrder.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid orderItems array."});
            }

            let orderItems = await createArrayOrderItemService(dataDetailOrder);
            if (orderItems) {
                return res.status(200).json({errorCode: 0, data: orderItems});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid orderItems to insert."});
            }
        } catch (error) {
            console.error("Error in postCreateArrayProduct:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getAllDetailOrderController: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const orderItems = await getAllOderItemService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: orderItems});
        } catch (error) {
            console.error("Error in getAllOrderItem:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    updateDetailOrderController: async (req, res) => {
        let {
            orderItem_id,
            order_id,
            product_id,
            quantity,
            unit_price
        } = req.body
        console.log(orderItem_id, order_id, product_id, quantity, unit_price)
        let orderItem = await updateOrderItemService(orderItem_id, order_id, product_id, quantity, unit_price)
        return res.status(200).json({errorCode: 0, data: orderItem})
    },
    deleteDetailOrderController: async (req, res) => {
        let orderItem_id = req.body.orderItem_id
        let orderItem = await deleteOrderItemService(orderItem_id)
        return res.status(200).json({errorCode: 0, data: orderItem})
    },
    deleteArrDetailOrderController: async (req, res) => {
        let orderItem = await deleteArrayOrderItemService(req.body.orderItemIds)
        return res.status(200).json({errorCode: 0, data: orderItem})
    }

}
