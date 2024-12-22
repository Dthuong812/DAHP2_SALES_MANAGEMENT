const mongoose = require('mongoose');
const mongoose_delete = require("mongoose-delete")
const SupplierSchema = new mongoose.Schema({
    supplier_id: {
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
    phone :{
        type : String,
        validate: {
            validator: function(phone) {
                if(phone.length === 10) return true;
                return /\d{10}/.test(phone);
            },
            message: props => `${props.value} is not a valid phone number!`
        } ,  
        required : true,
        unique : true,
        index : true
    },

}, {timestamps: true});
SupplierSchema.plugin(mongoose_delete, {overrideMethods: "all"});
const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports = Supplier;
