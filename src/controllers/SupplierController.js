const {CreateSupplier, createArraySupplierService, getAllSupplierService, updateSupplierService, deleteSupplierService, deleteArraySupplierService, searchSupplierAPIService} = require("../services/supplierService")

module.exports = {
    createSupplierController: async (req, res) => {
        let {supplier_id, name, location, phone} = req.body
        console.log(supplier_id, name, location, phone)
        let dataSupplier = {supplier_id, name, location, phone}
        let supplier = await CreateSupplier(dataSupplier)
        return res.status(200).json({errorCode: 0, data: supplier})
    },
    createArraySupplierController:async(req,res)=>{
        try {
            const dataSupplier = req.body.suppliers;
            if (!Array.isArray(dataSupplier) || dataSupplier.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid suppliers array."});
            }

            let suppliers = await createArraySupplierService(dataSupplier);
            if (suppliers) {
                return res.status(200).json({errorCode: 0, data: suppliers});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid suppliers to insert."});
            }
        } catch (error) {
            console.error("Error in createArraySupplierController:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getSupplierController:async(req,res)=>{
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const products = await getAllSupplierService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: products});
        } catch (error) {
            console.error("Error in getSupplierController:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    searchSupplierControllerI:async (req, res) => {
        const { name, limit, page } = req.query;
    
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword cannot be empty.'
            });
        }
    
        const result = await searchSupplierAPIService(name, parseInt(limit) || 10, parseInt(page) || 1);
    
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }
    },
    updateSupplierController:async(req,res)=>{
        let {supplier_id, name, location, phone} = req.body
        let supplier = await  updateSupplierService(supplier_id, name, location, phone)
        return res.status(200).json({errorCode: 0, data:  supplier})
    },
    deleteSupplierController:async(req,res)=>{
        let supplier_id = req.body.supplier_id
        let supplier = await deleteSupplierService(supplier_id)
        return res.status(200).json({errorCode: 0, data: supplier})
    },
    deleteArraySupplierController:async(req,res)=>{
        let supplier = await deleteArraySupplierService(req.body.supplierIds)
        return res.status(200).json({errorCode: 0, data: supplier})
    }
    

}
