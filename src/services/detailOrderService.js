const OrderItem = require('../models/orderItem');
const aqp = require('api-query-params');
module.exports = {
    CreateDetailOrder: async (orderItemsData) => {
        try {
            const prefix = "It";
            const lastItemOrder = await OrderItem.findOne().sort({orderItem_id: -1});
            let newId
            if (! lastItemOrder) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastItemOrder.orderItem_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${
                    String(nextIdNumber).padStart(4, "0")
                }`;
            }
            orderItemsData.orderItem_id = newId
            let result = await OrderItem.create(orderItemsData)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArrayOrderItemService: async (arr) => {
        try {
            const prefix = "It";
            const lastItemOrder = await OrderItem.findOne().sort({orderItem_id: -1});
            let lastIdNumber = lastItemOrder ? parseInt(lastItemOrder.orderItem_id.slice(2), 10) : 0;

            const validOderItems = arr.filter(orderItem => {
                return orderItem.order_id && orderItem.product_id && orderItem.quantity && orderItem.unit_price;
            });
            validOderItems.forEach(orderItem => {
                lastIdNumber += 1;
                orderItem.orderItem_id = `${prefix}${
                    String(lastIdNumber).padStart(4, "0")
                }`;
            });
            if (validOderItems.length > 0) {
                const result = await OrderItem.insertMany(validOderItems);
                return result;
            } else {
                console.log("No valid  orderItems to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArray orderItemService:", error);
            return null;
        }
    },
    getAllOderItemService: async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) ;
            page = parseInt(page, 10) ;

            let offset = (page - 1) * limit;

            const {filter} = aqp(queryString);
            delete filter.page;
            delete filter.limit;

            result = await OrderItem.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllOderItemService:", error);
            return null;
        }
    },
    updateOrderItemService: async (orderItem_id, order_id, product_id, quantity, unit_price) => {
        try {
            let result = await OrderItem.updateOne({
                orderItem_id: orderItem_id
            }, {order_id, product_id, quantity, unit_price})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteOrderItemService:async (orderItem_id)=>{
        try {
            let result = await OrderItem.deleteOne({"orderItem_id": orderItem_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayOrderItemService:async (arrIds)=>{
        try {
            let result = await OrderItem.deleteMany({orderItem_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
        }
    }
}
