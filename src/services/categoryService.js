const Category = require('../models/category')
const aqp = require ('api-query-params');
module.exports ={
    createCategoryAPI : async(dataCategory )=>{
        try {
            const prefix = "DM";
            const lastCategory = await Category.findOne().sort({ category_id: -1 });
            let newId;
    
            if (!lastCategory) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastCategory.category_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
    
            dataCategory.category_id = newId;
    
            const result = await Category.create(dataCategory);
            return result;
        } catch (error) {
            console.error("Error in createCategoryAPI:", error);
            throw error; 
        }
    },
    createArrayCategoryService:async (arr)=>{
        try {
            const prefix = "DM";
            const lastCategory = await Category.findOne().sort({ category_id: -1 });
            let lastIdNumber = lastCategory ? parseInt(lastCategory.category_id.slice(2), 10) : 0;
    
            const validCategories = arr.filter((category) => {
                return category.name;
            });
    
            validCategories.forEach((category) => {
                lastIdNumber += 1;
                category.category_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
    
            if (validCategories.length > 0) {
                const result = await Category.insertMany(validCategories);
                return result;
            } else {
                console.log("No valid categories to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayCategoryService:", error);
            throw error; 
        }
    },
    getAllCategoryService : async (limit,page,queryString)=>{
        try {
            let result = null;
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Category.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllCategoryService:", error);
            return null;
        }
    },
    searchCategoryAPIService: async (searchKeyword, limit, page) => {
        try {
            const query = {
                     name: { $regex: searchKeyword, $options: 'i' } , 
            };
    
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            const categories = await Category.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            const total = await Category.countDocuments(query);
    
            return {
                success: true,
                data: categories,
                total,
                page,
                limit
            };
        } catch (error) {
            console.error('Error in searchCategoryAPIService:', error);
            return { success: false, message: error.message };
        }
    },
    updateCategoryService :async(name,category_id)=>{
        try {
            let result = await Category.updateOne({category_id:category_id},{name})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteCategoryService:async (category_id)=>{
        try {
            let result = await Category.deleteOne({"category_id" :category_id});
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteArrayCategoryService:async (arrIds)=>{
        try {
            let result = await Category.deleteMany({category_id: { $in: arrIds }})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}