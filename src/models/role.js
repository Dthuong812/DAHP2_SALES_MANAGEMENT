const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const RoleSchema = new mongoose.Schema({
    role_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});
RoleSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Role = mongoose.model('Role', RoleSchema);
module.exports = Role;
