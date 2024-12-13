const {createPaymentService, createArrayPaymentService, getAllPaymentService, updatePaymentService, deletePaymentService, deleteArrayPaymentService} = require("../services/paymentService")

module.exports = {
    postCreatePayment: async (req, res) => {
        let {
            payment_id,
            order_id,
            method,
            status,
            amount
        } = req.body
        console.log(payment_id, order_id, method, status, amount)
        let dataPayment = {
            payment_id,
            order_id,
            method,
            status,
            amount
        }
        let payment = await createPaymentService(dataPayment)
        return res.status(200).json({errorCode: 0, data: payment})
    },
    postCreateArrayPayment: async (req, res) => {
        try {
            const dataPayment = req.body.payments;
            if (!Array.isArray(dataPayment) || dataPayment.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid payments array."});
            }

            let payments = await createArrayPaymentService(dataPayment);
            if (payments) {
                return res.status(200).json({errorCode: 0, data: payments});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid payments to insert."});
            }
        } catch (error) {
            console.error("Error in postCreateArrayPayment:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getAllPayment: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const payments = await getAllPaymentService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: payments});
        } catch (error) {
            console.error("Error in getAllPayment:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    putPayment: async (req, res) => {
        let {
            payment_id,
            order_id,
            method,
            status,
            amount
        } = req.body
        let payment = await updatePaymentService(payment_id, order_id, method, status, amount)
        return res.status(200).json({errorCode: 0, data: payment})
    },
    deletePayment: async (req, res) => {
        let payment_id = req.body.payment_id
        let payment = await deletePaymentService(payment_id)
        return res.status(200).json({errorCode: 0, data: payment})
    },
    deleteArrayPayment: async (req, res) => {
        let payment = await deleteArrayPaymentService(req.body.paymentIds)
        return res.status(200).json({errorCode: 0, data: payment})
    }
}
