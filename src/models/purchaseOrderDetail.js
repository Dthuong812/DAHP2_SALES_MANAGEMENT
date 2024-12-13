const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const PurchaseOrderDetailSchema = new mongoose.Schema({
    purchaseOrderDetail_id: {
        type: String,
        required: true,
        unique: true
    },
    purchaseOrder_id: {
        type: String,
        ref: 'PurchaseOrder',
        required: true
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_cost: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true,
        default: function () {
            return this.quantity * this.unit_cost;
        }
    }
}, {timestamps: true});
PurchaseOrderDetailSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const PurchaseOrderDetail = mongoose.model('PurchaseOrderDetail', PurchaseOrderDetailSchema);
module.exports = PurchaseOrderDetail;
