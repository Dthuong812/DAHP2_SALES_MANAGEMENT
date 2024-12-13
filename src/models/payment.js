const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const PaymentSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: true,
        unique: true
    },
    order_id: {
        type: String,
        ref: 'Order',
        required: true
    },
    method: {
        type: String,
        enum: [
            'Tiền mặt', 'Chuyển khoản', 'Credit card'
        ],
        required: true
    },
    status: {
        type: String,
        enum: [
            'Đang chờ xử lý', 'Đã thanh toán', 'Không thành công'
        ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {timestamps: true});
PaymentSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
