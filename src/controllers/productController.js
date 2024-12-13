const {uploadSingleFile} = require('../services/fileService');
const {
    createProductService,
    getAllProductService,
    createArrayProductService,
    updateProductService,
    deleteProductService,
    deleteArrayProductService,
    searchProductsService
} = require('../services/productService');


module.exports = {
    postCreateProduct: async (req, res) => {
        let {
            product_id,
            name,
            price,
            stock_quantity,
            category_id,
            description,
            discount,
            discount_start,
            discount_end
        } = req.body;
        let imageUrl = "";


        console.log(product_id, name, price, stock_quantity, category_id, description, discount, discount_start, discount_end);
        if (!req.files || Object.keys(req.files).length === 0) {} else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path
        }
        let productData = {
            product_id,
            name,
            price,
            stock_quantity,
            category_id,
            description,
            discount,
            discount_start,
            discount_end,
            image: imageUrl
        }
        let product = await createProductService(productData)
        return res.status(200).json({errorCode: 0, data: product})
    },
    postCreateArrayProduct: async (req, res) => {
        try {
            const productData = req.body.products;
            if (!Array.isArray(productData) || productData.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid products array."});
            }

            let products = await createArrayProductService(productData);
            if (products) {
                return res.status(200).json({errorCode: 0, data: products});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid products to insert."});
            }
        } catch (error) {
            console.error("Error in postCreateArrayProduct:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const products = await getAllProductService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: products});
        } catch (error) {
            console.error("Error in getAllProduct:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    searchProductsController:async (req, res) => {
        const { name, limit, page } = req.query;
    
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword cannot be empty.'
            });
        }
    
        const result = await searchProductsService(name, parseInt(limit) || 10, parseInt(page) || 1);
    
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }
    },
    putProduct: async (req, res) => {
        let {
            product_id,
            name,
            price,
            stock_quantity,
            category_id,
            description,
            discount,
            discount_start,
            discount_end
        } = req.body;
        let imageUrl = "";
        console.log(product_id, name, price, stock_quantity, category_id, description, discount, discount_start, discount_end)
        if (!req.files || Object.keys(req.files).length === 0) {} else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path
        }
        let product = await updateProductService(product_id, name, price, stock_quantity, category_id, imageUrl, description, discount, discount_start, discount_end)
        return res.status(200).json({errorCode: 0, data: product})
    },
    deleteProduct: async (req, res) => {
        let product_id = req.body.product_id
        let product = await deleteProductService(product_id)
        return res.status(200).json({errorCode: 0, data: product})
    },
    deleteArrayProduct: async (req, res) => {
        let product = await deleteArrayProductService(req.body.productIds)
        return res.status(200).json({errorCode: 0, data: product})
    }
};
