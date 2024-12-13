const mongoose = require("mongoose")
const mongoose_delete = require ("mongoose-delete")

const orderSchema = new mongoose.Schema({
    order_id:{
        type : String,
        index : true
    },
    customer_id :{
        type: String,
        ref : "Customer",
        required:true
    },
    total_amount :{
        type: Number,
        required: true,
        default : 0
    },
    status :{
        type : String,
        required : true,
        enum: ['Đang xử lý', 'Đã hoàn thành', 'Đã hủy'], 
        default: 'Đã hoàn thành',
    },
    paymentMethod:{
        type : String,
        required : true,
        enum: ['Online', 'Offline' ], 
        default: 'Offline',
    }
},
{
    timestamps: true
}
)
orderSchema.plugin(mongoose_delete,{overrideMethods:"all"});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
