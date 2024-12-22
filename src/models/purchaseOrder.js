const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const PurchaseOrderSchema = new mongoose.Schema({
    purchaseOrder_id: {
        type: String,
        required: true,
        unique: true
    },
    supplier_id: {
        type: String,
        ref : "Supplier",
        required:true
    },
    total_amount: {
        type: Number,
        required: true
    },
}, {timestamps: true});
PurchaseOrderSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const PurchaseOrder = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
module.exports = PurchaseOrder;
