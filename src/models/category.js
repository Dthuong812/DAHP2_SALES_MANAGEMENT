const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    category_id : {
        type: String,
        require : true,
        prepareUnique: true,
        index: true
    },
    name: {
        type: String,
        require : true
    },
  },
  {
    timestamps : true,//creteAt,updateAt
  }
);
categorySchema.plugin(mongoose_delete,{overrideMethods:"all"});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
