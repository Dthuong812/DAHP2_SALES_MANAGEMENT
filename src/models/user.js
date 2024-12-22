const mongoose = require("mongoose")
const mongoose_delete = require ("mongoose-delete")
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    user_id:{
        type : String,
        required : true,
        unique : true,
        index : true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Vui lòng nhập đúng email"
        },
        required: true,
    },
    password :{
        type: String,
         required: true
    },
},
{
    timestamps: true
}
)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const User = mongoose.model('User', userSchema);
module.exports = User;
