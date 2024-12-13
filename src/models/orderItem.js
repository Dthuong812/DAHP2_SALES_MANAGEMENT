const mongoose = require("mongoose")
const mongoose_delete = require("mongoose-delete")

const orderItemSchema = new mongoose.Schema({
    orderItem_id: {
        type: String,
        required: true,
        index: true
    },
    order_id: {
        type: String,
        ref: "Order",
        required: true
    },
    product_id: 
        {
            type: String,
            ref: 'Product',
            required: true
        }
    ,
    note: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    unit_price: {
        type: Number,
        required: true
    }
}, {timestamps: true})
orderItemSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;
