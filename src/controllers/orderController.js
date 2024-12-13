
const {createOrderService,createArrayOrderService, getAllOrderService, updateOrderService, deleteOrderService, deleteArrayOrderService, searchOrdersService} = require("../services/orderService");
module.exports = {
    createOrderController: async (req, res) => {
        const {customer_id, total_amount, status, paymentMethod} = req.body;

        const orderData = {
            customer_id,
            total_amount,
            status,
            paymentMethod
        };
        console.log("Order Data:", orderData);

        try {
            const order = await createOrderService(orderData);
            return res.status(200).json({errorCode: 0, message: "Order created successfully", data: {
                    order
                }});
        } catch (error) {
            console.error("Error creating order:", error.message);
            res.status(500).json({message: "Có lỗi xảy ra khi tạo đơn hàng", error: error.message});
        }
    },
    createArrayOrderController:async(req,res)=>{
        try {
            const  orderData = req.body.orders;
            if (!Array.isArray( orderData) ||  orderData.length === 0) {
                return res.status(400).json({ errorCode: 1, message: "Invalid Orders array." });
            }
    
            let orders = await createArrayOrderService( orderData);
            if (orders) {
                return res.status(200).json({ errorCode: 0, data: orders });
            } else {
                return res.status(400).json({ errorCode: 2, message: "No valid Orders to insert." });
            }
        } catch (error) {
            console.error("Error in postCreateArrayOrder:", error);
            return res.status(500).json({ errorCode: 3, message: "Internal server error." });
        }
    },
    getAllOrderController:async(req,res)=>{
        try {
            const { limit, page, ...queryString } = req.query; 
            const orders = await getAllOrderService(limit, page, queryString);
    
            return res.status(200).json({ errorCode: 0, data: orders });
        } catch (error) {
            console.error("Error in getAllOrder:", error);
            return res.status(500).json({ errorCode: 1, message: "Internal Server Error" });
        }
    },
    searchOrdersController:async (req, res) => {
        const { name, limit, page } = req.query;
    
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword cannot be empty.'
            });
        }
    
        const result = await searchOrdersService(name, parseInt(limit) || 10, parseInt(page) || 1);
    
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }
    },
    updateOrderController:async(req,res)=>{
        const {order_id,customer_id, total_amount, status, paymentMethod} = req.body;

        const orderData = {
            customer_id,
            total_amount,
            status,
            paymentMethod
        };
        console.log("Order Data:", orderData);
        let order = await updateOrderService(order_id,customer_id, total_amount, status, paymentMethod)
        return res.status(200).json({errorCode: 0, data: order})
    },
    deleteOrderController:async(req,res)=>{
        let order_id = req.body.order_id
        let order = await deleteOrderService(order_id)
        return res.status(200).json({errorCode: 0, data: order})
    },
    deleteArrayOrderController:async(req,res)=>{
        let order = await deleteArrayOrderService(req.body.orderIds)
        return res.status(200).json({errorCode: 0, data: order})
    },


}
