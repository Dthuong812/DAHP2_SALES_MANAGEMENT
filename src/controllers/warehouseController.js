const {CreateWareHouse, createArrayWareHouseService, getAllWareHouseService, updateWareHouseService, deleteWareHouseService, deleteArrayWarehouseService} = require("../services/warehouseService")

module.exports = {
    createWarehouseController: async (req, res) => {
        let {warehouse_id, name, location, status} = req.body
        console.log(warehouse_id, name, location, status)
        let dataWareHouse = {warehouse_id, name, location, status}
        let warehouse = await CreateWareHouse(dataWareHouse)
        return res.status(200).json({errorCode: 0, data: warehouse})
    },
    createArrayWarehouseController:async(req,res)=>{
        try {
            const dataWareHouse = req.body.warehouses;
            if (!Array.isArray(dataWareHouse) || dataWareHouse.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid warehouses array."});
            }

            let warehouses = await createArrayWareHouseService(dataWareHouse);
            if (warehouses) {
                return res.status(200).json({errorCode: 0, data: warehouses});
            } else {
                return res.status(400).json({errorCode: 2, message: "No valid warehouses to insert."});
            }
        } catch (error) {
            console.error("Error in createArrayWarehouseController:", error);
            return res.status(500).json({errorCode: 3, message: "Internal server error."});
        }
    },
    getWarehouseController:async(req,res)=>{
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const products = await getAllWareHouseService(limit, page, queryString);

            return res.status(200).json({errorCode: 0, data: products});
        } catch (error) {
            console.error("Error in getWarehouseController:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },
    updateWarehouseController:async(req,res)=>{
        let {warehouse_id, name, location, status} = req.body
        let warehouse = await updateWareHouseService(warehouse_id, name, location, status)
        return res.status(200).json({errorCode: 0, data:  warehouse})
    },
    deleteWarehouseController:async(req,res)=>{
        let warehouse_id = req.body.warehouse_id
        let warehouse = await deleteWareHouseService(warehouse_id)
        return res.status(200).json({errorCode: 0, data: warehouse})
    },
    deleteArrayWarehouseController:async(req,res)=>{
        let warehouse = await deleteArrayWarehouseService(req.body.warehouseIds)
        return res.status(200).json({errorCode: 0, data: warehouse})
    }
    

}
