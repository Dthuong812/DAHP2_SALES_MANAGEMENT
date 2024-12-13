const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const InventorySchema = new mongoose.Schema({
    inventory_id: {
        type: String,
        required: true,
        unique: true
    },
    warehouse_id: {
        type: String,
        ref : "Warehouse",
        required: true
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true
    },
    change_type: {
        type: String,
        enum: [
            'Nhập', 'Bán'
        ],
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
