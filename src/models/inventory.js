const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const InventorySchema = new mongoose.Schema({
    inventory_id: {
        type: String,
        required: true,
        unique: true
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true
    },
    purchaseOrder_id: {
        type: String,
        ref: 'PurchaseOrder',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    remaining_stock: {
        type: Number,
        required: true
    }
}, {timestamps: true});
InventorySchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Inventory = mongoose.model('Inventory', InventorySchema);
module.exports = Inventory;
