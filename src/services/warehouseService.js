const Warehouse = require('../models/Warehouse');
const aqp = require ('api-query-params');
module.exports={
    CreateWareHouse:async(dataWareHouse)=>{
        try {
            const prefix = "Ad";
            const lastWarehouse = await Warehouse.findOne().sort({ warehouse_id: -1 });
            let newId
            if (!lastWarehouse) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastWarehouse.warehouse_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            dataWareHouse.warehouse_id = newId
            let result = await Warehouse.create(dataWareHouse)
            return result
        } catch (error) {
            console.log(error)
        }
    },
    createArrayWareHouseService:async(arr)=>{
        try {
            const prefix = "Ad";
            const lastWarehouse = await Warehouse.findOne().sort({ warehouse_id: -1 });
            let lastIdNumber = lastWarehouse ? parseInt(lastWarehouse.warehouse_id.slice(2), 10) : 0;
    
            const validWareHouses = arr.filter(warehouse => {
                return warehouse.name && warehouse.location && warehouse.status;
            });
            validWareHouses.forEach(warehouse => {
                lastIdNumber += 1;
                warehouse.warehouse_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
            if (validWareHouses.length > 0) {
                const result = await Warehouse.insertMany(validWareHouses);
                return result;
            } else {
                console.log("No valid warehouse to insert.");
                return null;
            }
        } catch (error) {
            console.error("Error in createArrayWareHouseService:", error);
            return null;
        }
    },
    getAllWareHouseService:async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Warehouse.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllWareHouseService:", error);
            return null;
        }
    },
    updateWareHouseService:async(warehouse_id, name, location, status)=>{
        try {
            let result = await Warehouse.updateOne({warehouse_id:warehouse_id},{name, location, status})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteWareHouseService:async(warehouse_id)=>{
        try {
            let result = await Warehouse.deleteOne({"warehouse_id": warehouse_id})
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    deleteArrayWarehouseService:async(arrIds)=>{
        try {
            let result = await Warehouse.deleteMany({warehouse_id: {$in : arrIds}})
            return result
        } catch (error) {
            console.log(error)
            
        }
    }
}