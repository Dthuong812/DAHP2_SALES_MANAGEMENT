const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const PermissionResourcesSchema = new mongoose.Schema({
    permissionResources_id: {
        type: String,
        required: true,
        unique: true
    },
    role_id :{
        type : String,
        ref: 'Role',
        required : true,
    },
    resource_id: {
        type: String,
        ref: 'Resources',
        required: true
    }
}, 
{
    timestamps: true
});
PermissionResourcesSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const PermissionResources = mongoose.model('PermissionResources', PermissionResourcesSchema);
module.exports = PermissionResources;
