const { default: aqp } = require('api-query-params');
const Inventory = require('../models/inventory');

module.exports = {
    createInventoryService: async (inventoryData) => {
        try {
            const prefix = "INV";
            const lastInventory = await Inventory.findOne().sort({ inventory_id: -1 });
            let newId;
            if (!lastInventory) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastInventory.inventory_id.slice(3), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            inventoryData.inventory_id = newId;
            const result = await Inventory.create(inventoryData);
            return { success: true, data: result };
        } catch (error) {
            console.error("Error in createInventoryService:", error);
            return { success: false, message: error.message };
        }
    },

    createArrayInventoryService: async (arr) => {
        try {
            const prefix = "INV";
            const lastInventory = await Inventory.findOne().sort({ inventory_id: -1 });
            let lastIdNumber = lastInventory ? parseInt(lastInventory.inventory_id.slice(3), 10) : 0;

            const validInventories = arr.filter(inv => {
                return inv.warehouse_id && inv.product_id && inv.change_type && inv.quantity !== undefined && inv.remaining_stock !== undefined;
            });

            validInventories.forEach(inv => {
                lastIdNumber += 1;
                inv.inventory_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });

            if (validInventories.length > 0) {
                const result = await Inventory.insertMany(validInventories);
                return { success: true, data: result };
            } else {
                return { success: false, message: "No valid data to insert." };
            }
        } catch (error) {
            console.error("Error in createArrayInventoryService:", error);
            return { success: false, message: error.message };
        }
    },

    getInventoryService: async (limit, page, queryString) => {
        try {
            let result = null;
            limit = parseInt(limit, 10) ; 
            page = parseInt(page, 10); 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Inventory.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getInventoryService:", error);
            return null;
        }
    },

    updateInventoryService: async (inventory_id, updatedData) => {
        try {
            const existingInventory = await Inventory.findOne({ inventory_id });
            if (!existingInventory) {
                throw new Error(`Inventory with id ${inventory_id} not found.`);
            }
            if (updatedData.quantity !== undefined) {
                const quantityChange = updatedData.quantity - existingInventory.quantity;
                updatedData.remaining_stock = existingInventory.remaining_stock + quantityChange;
            }

            const result = await Inventory.updateOne({ inventory_id }, updatedData);
            return { success: true, data: result };
        } catch (error) {
            console.error("Error in updateInventoryService:", error);
            return { success: false, message: error.message };
        }
    },

    deleteInventoryService: async (inventory_id) => {
        try {
            const result = await Inventory.delete({ inventory_id });
            return { success: true, data: result };
        } catch (error) {
            console.error("Error in deleteInventoryService:", error);
            return { success: false, message: error.message };
        }
    },

    deleteArrayInventoryService: async (arrIds) => {
        try {
            let result = await Inventory.deleteMany({ inventory_id: { $in: arrIds } });
            return  result ;
        } catch (error) {
            console.log(error)
        }
    }
};
