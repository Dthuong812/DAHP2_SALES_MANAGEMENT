const { default: aqp } = require('api-query-params');
const PurchaseOrder = require('../models/purchaseOrder');
module.exports={
    createPurchaseOrderService:async(purchaseOrderData)=>{
        try {
            const prefix = "Po";
            const lastPurchaseOrder = await PurchaseOrder .findOne().sort({ purchaseOrder_id: -1 });
            let newId
            if (!lastPurchaseOrder ) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastPurchaseOrder .purchaseOrder_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            purchaseOrderData.purchaseOrder_id = newId
            let result = await PurchaseOrder.create(purchaseOrderData)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArrayPurchaseOrderService: async (arr) => {
        try {
            const prefix = "Po";
            const lastPurchaseOrder = await PurchaseOrder .findOne().sort({ purchaseOrder_id: -1 });
            let lastIdNumber = lastPurchaseOrder ? parseInt(lastPurchaseOrder.purchaseOrder_id.slice(2), 10) : 0;
    
            const validPurchaseOrders = arr.filter(purchaseOrder => {
                return purchaseOrder.status && purchaseOrder.supplier && purchaseOrder.warehouse_id && purchaseOrder.total_amount;
            });
            validPurchaseOrders.forEach(purchaseOrder => {
                lastIdNumber += 1;
                purchaseOrder.purchaseOrder_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
            if (validPurchaseOrders.length > 0) {
                const result = await PurchaseOrder.insertMany(validPurchaseOrders);
                return result;
            } else {
                console.log("No valid PurchaseOrders to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayPurchaseOrderService:", error);
            return null;
        }
    },
    getAllPurchaseOrderService:async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await PurchaseOrder.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllPurchaseOrderService:", error);
            return null;
        }
    },
    updatePurchaseOrderService:async(purchaseOrder_id, supplier, warehouse_id, total_amount, status)=>{
        try {
            let result = await PurchaseOrder.updateOne({purchaseOrder_id:purchaseOrder_id},{supplier, warehouse_id, total_amount, status})
            return result
        } catch (error) {
            console.log(error)
            return null;
        } 
    },
    deletePurchaseOrderService:async(purchaseOrder_id)=>{
        try {
            let result = await PurchaseOrder.deleteOne({"purchaseOrder_id": purchaseOrder_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayPurchaseOrderService:async(arrIds)=>{
        try {
            let result = await PurchaseOrder.deleteMany({purchaseOrder_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
} 