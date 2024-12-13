const mongoose_delete = require('mongoose-delete');
const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,  
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true    
    },
    price: {
        type: Number,
        required: true    
    },
    stock_quantity: {
        type: Number,
        required: true    
    },
    category_id: {
        type: String,
        ref: 'Category',
        required: true    
    },
    image: String,
    description: String,
    discount : Number,
    discount_start: Date,
    discount_end : Date
  },
  {
    timestamps: true,  // createdAt, updatedAt
  }
);


productSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;