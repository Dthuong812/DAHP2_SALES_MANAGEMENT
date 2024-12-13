const { default: aqp } = require('api-query-params');
const PurchaseOrderDetail = require('../models/purchaseOrderDetail');

module.exports = {
    createPurchaseOrderDetailService: async (purchaseOrderDetailData) => {
        try {
            const prefix = "Pd";
            const lastPurchaseOrderDetail = await PurchaseOrderDetail.findOne().sort({ purchaseOrderDetail_id: -1 });
            let newId;
            if (!lastPurchaseOrderDetail) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastPurchaseOrderDetail.purchaseOrderDetail_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            purchaseOrderDetailData.purchaseOrderDetail_id = newId;
            purchaseOrderDetailData.subtotal = purchaseOrderDetailData.quantity * purchaseOrderDetailData.unit_cost;

            let result = await PurchaseOrderDetail.create(purchaseOrderDetailData);
            return { success: true, data: result };
        } catch (error) {
            console.error("Error in createPurchaseOrderDetailService:", error);
            return { success: false, message: error.message };
        }
    },

    createArrayPurchaseOrderDetailService: async (arr) => {
        try {
            const prefix = "Pd";
            const lastPurchaseOrderDetail = await PurchaseOrderDetail.findOne().sort({ purchaseOrderDetail_id: -1 });
            let lastIdNumber = lastPurchaseOrderDetail
                ? parseInt(lastPurchaseOrderDetail.purchaseOrderDetail_id.slice(2), 10)
                : 0;

            // Lọc các bản ghi hợp lệ
            const validPurchaseOrderDetails = arr.filter(purchaseOrderDetail => {
                return purchaseOrderDetail.product_id &&
                    purchaseOrderDetail.purchaseOrder_id &&
                    purchaseOrderDetail.quantity &&
                    purchaseOrderDetail.unit_cost;
            });

            // Gán id và tính toán subtotal
            validPurchaseOrderDetails.forEach(purchaseOrderDetail => {
                lastIdNumber += 1;
                purchaseOrderDetail.purchaseOrderDetail_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
                purchaseOrderDetail.subtotal = purchaseOrderDetail.quantity * purchaseOrderDetail.unit_cost;
            });

            if (validPurchaseOrderDetails.length > 0) {
                const result = await PurchaseOrderDetail.insertMany(validPurchaseOrderDetails);
                return { success: true, data: result };
            } else {
                console.log("No valid purchaseOrderDetails to insert.");
                return { success: false, message: "No valid data to insert." };
            }
        } catch (error) {
            console.error("Error in createArrayPurchaseOrderDetailService:", error);
            return { success: false, message: error.message };
        }
    },
    getAllPurchaseOrderDetailService:async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await PurchaseOrderDetail.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllPurchaseOrderDetailService:", error);
            return null;
        }
    },
    updatePurchaseOrderDetailService: async (purchaseOrderDetail_id, purchaseOrder_id, product_id, quantity, unit_cost) => {
        try {
            const existingDetail = await PurchaseOrderDetail.findOne({ purchaseOrderDetail_id });
            if (!existingDetail) {
                throw new Error(`PurchaseOrderDetail with id ${purchaseOrderDetail_id} not found.`);
            }
            quantity = quantity || existingDetail.quantity;
            unit_cost = unit_cost || existingDetail.unit_cost;
            const subtotal = quantity * unit_cost;

            const result = await PurchaseOrderDetail.updateOne(
                { purchaseOrderDetail_id },
                { purchaseOrder_id, product_id, quantity, unit_cost, subtotal },
                { runValidators: true } 
            );
            return result;
        } catch (error) {
            console.error("Error in updatePurchaseOrderDetailService:", error);
            return null;
        }
    },
    deletePurchaseOrderDetailService:async(purchaseOrderDetail_id)=>{
        try {
            let result = await PurchaseOrderDetail.deleteOne({"purchaseOrderDetail_id": purchaseOrderDetail_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayPurchaseOrderDetailService:async(arrIds)=>{
        try {
            let result = await PurchaseOrderDetail.deleteMany({purchaseOrderDetail_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
};
