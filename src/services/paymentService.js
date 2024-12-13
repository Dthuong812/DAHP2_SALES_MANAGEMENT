const { default: aqp } = require('api-query-params');
const Payment = require('../models/payment');
module.exports={
    createPaymentService:async(dataPayment)=>{
        try {
            const prefix = "Pm";
            const lastPayment = await Payment.findOne().sort({ payment_id: -1 });
            let newId
            if (!lastPayment) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastPayment.payment_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            dataPayment.payment_id = newId
            let result = await Payment.create(dataPayment)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArrayPaymentService:async(arr)=>{
        try {
            const prefix = "Pm";
            const lastPayment = await Payment.findOne().sort({ payment_id: -1 });
            let lastIdNumber = lastPayment ? parseInt(lastPayment.payment_id.slice(2), 10) : 0;
    
            const validPayments = arr.filter(payment => {
                return payment.order_id && payment.method && payment.status && payment.amount;
            });
            validPayments.forEach(payment => {
                lastIdNumber += 1;
                payment.payment_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
            if (validPayments.length > 0) {
                const result = await Payment.insertMany(validPayments);
                return result;
            } else {
                console.log("No valid payments to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayPaymentService:", error);
            return null;
        }
    },
    getAllPaymentService:async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Payment.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllPaymentService:", error);
            return null;
        }
    },
    updatePaymentService:async(payment_id, order_id, method, status, amount)=>{
        try {
            let result = await Payment.updateOne({payment_id:payment_id},{order_id, method, status, amount})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deletePaymentService:async (payment_id)=>{
        try {
            let result = await Payment.deleteOne({"payment_id": payment_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayPaymentService:async(arrIds)=>{
        try {
            let result = await Payment.deleteMany({payment_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
}