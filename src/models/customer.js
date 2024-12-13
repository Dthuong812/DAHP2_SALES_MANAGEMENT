const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    customer_id :{
        type: String,
        required : true,
        index : true,
        unique :true,
    },
    name :{
        type : String,
        required : true
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
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
    },
    address : String
    },
    {
        timestamps : true,
    }
);
customerSchema.plugin(mongoose_delete,{overrideMethods:"all"})
const Customer= mongoose.model('Customer',customerSchema)
module.exports = Customer
