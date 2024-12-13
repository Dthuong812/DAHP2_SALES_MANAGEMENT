const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const ResourcesSchema = new mongoose.Schema({
    resources_id: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});
ResourcesSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Resources = mongoose.model('Resources', ResourcesSchema);
module.exports = Resources;
