const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const WarehouseSchema = new mongoose.Schema({
    warehouse_id: {
        type : String,
        index : true

    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            'Hoạt động', 'Không hoạt động'
        ],
        default: 'Hoạt động',
        required: true
    }
}, {timestamps: true});
WarehouseSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
module.exports = Warehouse;
