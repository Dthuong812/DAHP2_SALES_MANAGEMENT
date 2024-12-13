const Order = require("../models/order")
const aqp = require ('api-query-params');
module.exports ={
    createOrderService :async(orderData)=>{
        try {
            const prefix = "Od";
            const lastOrder = await Order.findOne().sort({ order_id: -1 });
            const lastIdNumber = lastOrder ? parseInt(lastOrder.order_id.slice(2), 10) || 0 : 0;
            const nextIdNumber = lastIdNumber + 1;
            orderData.order_id = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            
            const result = await Order.create(orderData);
            return result;
        } catch (error) {
            console.error("Error creating order:", error.message);
            throw new Error("Could not create order");
        }
    },
    createArrayOrderService:async(arr)=>{
        try {
            const prefix = "Od";
            const lastOrder = await Order.findOne().sort({ order_id: -1 });
            let lastIdNumber = lastOrder ? parseInt(lastOrder.order_id.slice(2), 10) || 0 : 0;
    
            const validOrders = arr.filter((order) => {
                return order.paymentMethod && order.status && order.customer_id;
            });

            validOrders.forEach((order) => {
                lastIdNumber += 1;
                order.order_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
    
            if (validOrders.length > 0) {
                const result = await Order.insertMany(validOrders);
                return result;
            } else {
                console.log("No valid orders to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayOrderService:", error.message);
            throw new Error("Failed to insert orders");
        }
    },
    getAllOrderService: async (limit,page,queryString)=>{
        try {
            let result = null;
            limit = parseInt(limit, 10) ; 
            page = parseInt(page, 10) ; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Order.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllOrderService:", error);
            return null;
        }
    },
    searchOrdersService: async (searchKeyword, limit, page) => {
        try {
            const query = {
                 order_id: { $regex: searchKeyword, $options: 'i' } 
            }
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            const orders = await Order.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            const total = await Order.countDocuments(query);
    
            return {
                success: true,
                data: orders,
                total,
                page,
                limit
            };
        } catch (error) {
            console.error('Error in searchOrdersService:', error);
            return { success: false, message: error.message };
        }
    },
    updateOrderService:async(order_id,customer_id, total_amount, status, paymentMethod)=>{
        try {
            let result = await Order.updateOne({order_id:order_id},{customer_id, total_amount, status, paymentMethod})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteOrderService:async (order_id)=>{
        try {
            let result = await Order.deleteOne({"order_id": order_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayOrderService:async(arrIds)=>{
        try {
            let result = await Order.deleteMany({order_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
}