const Supplier = require('../models/supplier');
const aqp = require ('api-query-params');
module.exports={
    CreateSupplier:async(dataSupplier)=>{
        try {
            const prefix = "Ad";
            const lastSupplier = await Supplier.findOne().sort({ supplier_id: -1 });
            let newId
            if (!lastSupplier) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastSupplier.supplier_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            dataSupplier.supplier_id = newId
            let result = await Supplier.create(dataSupplier)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArraySupplierService:async(arr)=>{
        try {
            const prefix = "Ad";
            const lastSupplier = await Supplier.findOne().sort({ supplier_id: -1 });
            let lastIdNumber = lastSupplier ? parseInt(lastSupplier.supplier_id.slice(2), 10) : 0;
    
            const validSuppliers = arr.filter(Supplier => {
                return Supplier.name && Supplier.location && Supplier.status;
            });
            validSuppliers.forEach(Supplier => {
                lastIdNumber += 1;
                Supplier.supplier_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
            if (validSuppliers.length > 0) {
                const result = await Supplier.insertMany(validSuppliers);
                return result;
            } else {
                console.log("No valid Supplier to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArraySupplierService:", error);
            return null;
        }
    },
    getAllSupplierService:async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) ; 
            page = parseInt(page, 10) ; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Supplier.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllSupplierService:", error);
            return null;
        }
    },
    searchSupplierAPIService:async (searchKeyword, limit, page) => {
        try {
            const query = {
                $or: [
                    { supplier_id: { $regex: searchKeyword, $options: 'i' } }, 
                    { name: { $regex: searchKeyword, $options: 'i' } }, 
                    { phone: { $regex: searchKeyword, $options: 'i' } } ,
                    { location: { $regex: searchKeyword, $options: 'i' } } 
                ]
            };
    
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            const suppliers = await Supplier.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            const total = await Supplier.countDocuments(query);
    
            return {
                success: true,
                data: suppliers,
                total,
                page,
                limit
            };
        } catch (error) {
            console.error('Error in searchCustomerAPIService:', error);
            return { success: false, message: error.message };
        }
    },
    updateSupplierService:async(supplier_id, name, location, phone)=>{
        try {
            let result = await Supplier.updateOne({supplier_id:supplier_id},{name, location, phone})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteSupplierService:async(supplier_id)=>{
        try {
            let result = await Supplier.deleteOne({"supplier_id": supplier_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArraySupplierService:async(arrIds)=>{
        try {
            let result = await Supplier.deleteMany({supplier_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
}