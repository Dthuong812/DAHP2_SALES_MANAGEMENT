const Product = require('../models/product')
const aqp = require ('api-query-params');
module.exports ={
    createProductService :async(productData)=>{
        try {
            const prefix = "SP";
            const lastProduct = await Product.findOne().sort({ product_id: -1 });
            let newId
            if (!lastProduct) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastProduct.product_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            productData.product_id = newId
            let result = await Product.create(productData)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArrayProductService: async (arr) => {
        try {
            const prefix = "SP";
            const lastProduct = await Product.findOne().sort({ product_id: -1 });
            let lastIdNumber = lastProduct ? parseInt(lastProduct.product_id.slice(2), 10) : 0;
    
            const validProducts = arr.filter(product => {
                return product.name && product.price && product.stock_quantity && product.category_id;
            });
            validProducts.forEach(product => {
                lastIdNumber += 1;
                product.product_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
            if (validProducts.length > 0) {
                const result = await Product.insertMany(validProducts);
                return result;
            } else {
                console.log("No valid products to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayProductService:", error);
            return null;
        }
    },
    getAllProductService :async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) ; 
            page = parseInt(page, 10) ; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Product.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllProductService:", error);
            return null;
        }
    },
    searchProductsService:async (searchKeyword, limit , page ) => {
        try {
            const query = {
                name: { $regex: searchKeyword, $options: 'i' } 
            };
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
            const products = await Product.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            const total = await Product.countDocuments(query);
    
            return {
                success: true,
                data: products,
                total,
                page,
                limit
            };
        } catch (error) {
            console.error('Error in searchProductsService:', error);
            return { success: false, message: error.message };
        }
    },
    updateProductService:async (product_id,name,price,stock_quantity,category_id ,image,description,discount,discount_start,discount_end)=>{
        try {
            let result = await Product.updateOne({product_id:product_id},{name,price,stock_quantity,category_id ,image,description,discount,discount_start,discount_end})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteProductService:async(product_id)=>{
        try {
            let result = await Product.deleteOne({"product_id": product_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayProductService:async(arrIds)=>{
        try {
            let result = await Product.deleteMany({product_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
}
