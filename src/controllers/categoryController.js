const {createCategoryAPI ,getAllCategoryService,updateCategoryService,deleteCategoryService,createArrayCategoryService,deleteArrayCategoryService, searchCategoryAPIService} = require('../services/categoryService')
module.exports ={
    postCreateCategory :async(req,res)=>{
        let {category_id,name} = req.body
        console.log(category_id,name)
        let dataCategory = {category_id,name}
        let category = await createCategoryAPI(dataCategory)
        return res.status(200).json(
            {
                errorCode : 0,
                data : category
            }
        )
    },
    postCreateArrayCategory:async (req,res)=>{
        try {
            const dataCategory = req.body.categories;
    
            // Validate the incoming categories array
            if (!Array.isArray(dataCategory) || dataCategory.length === 0) {
                return res.status(400).json({ errorCode: 1, message: "Invalid categories array." });
            }
    
            const categories = await createArrayCategoryService(dataCategory);
            if (categories) {
                return res.status(200).json({ errorCode: 0, data: categories });
            } else {
                return res.status(400).json({ errorCode: 2, message: "No valid categories to insert." });
            }
        } catch (error) {
            console.error("Error in postCreateArrayCategory:", error);
            return res.status(500).json({ errorCode: 3, message: "Internal server error." });
        }
    },

    getAllCategory : async(req,res)=>{
        try {
            const { limit, page, ...queryString } = req.query; 
            const categories = await getAllCategoryService (limit, page, queryString);
    
            return res.status(200).json({ errorCode: 0, data: categories });
        } catch (error) {
            console.error("Error in getAllCategory:", error);
            return res.status(500).json({ errorCode: 1, message: "Internal Server Error" });
        }
    },
    searchCategoryAPI:async (req, res) => {
        const { name, limit, page } = req.query;
    
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword cannot be empty.'
            });
        }
    
        const result = await searchCategoryAPIService(name, parseInt(limit) || 10, parseInt(page) || 1);
    
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }
    },
    putCategory : async(req,res)=>{
        let {name,category_id} = req.body;
        let category = await updateCategoryService(name,category_id)
        return res.status(200).json(
            {
                errorCode : 0,
                data : category
            }
           )
    },
    deleteCategory :async (req,res)=>{
        let category_id = req.body.category_id;
        let category = await deleteCategoryService(category_id);
        return res.status(200).json(
            {
                errorCode : 0,
                data : category
            }
           )
    },
    deleteCreateArrayCategory:async(req,res)=>{
        let category = await deleteArrayCategoryService(req.body.categoryId)
        return res.status(200).json(
        {
            errorCode : 0,
            data : category
        }
       )
    }
}