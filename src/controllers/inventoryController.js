const { createInventoryService, createArrayInventoryService, getInventoryService, updateInventoryService, deleteInventoryService, deleteArrayInventoryService } = require('../services/invenroryService');


module.exports = {
    // Create a new inventory record
    createInventoryController: async (req, res) => {
        try {
            const inventoryData = req.body;
            const result = await createInventoryService(inventoryData);
            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in createInventoryController:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Create multiple inventory records
    createArrayInventoryController: async (req, res) => {
        try {
            const inventoryData = req.body.inventories;
            if (!Array.isArray(inventoryData) || inventoryData.length === 0) {
                return res.status(400).json({errorCode: 1, message: "Invalid products array."});
            }

            const result = await createArrayInventoryService(inventoryData);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in createArrayInventoryController:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getInventoryController: async (req, res) => {
        try {
            const {
                limit,
                page,
                ...queryString
            } = req.query;
            const inventory = await getInventoryService(limit,page,queryString);
            return res.status(200).json({errorCode: 0, data: inventory});
        } catch (error) {
            console.error("Error in getInventoryController:", error);
            return res.status(500).json({errorCode: 1, message: "Internal Server Error"});
        }
    },

    // Update an inventory record
    updateInventoryController: async (req, res) => {
        try {
            const { inventory_id, ...updatedData } = req.body;
            const result = await updateInventoryService(inventory_id, updatedData);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in updateInventoryController:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Delete an inventory record
    deleteInventoryController: async (req, res) => {
        try {
            const { inventory_id } = req.body;
            const result = await deleteInventoryService(inventory_id);
            if (result.success) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } catch (error) {
            console.error("Error in deleteInventoryController:", error);
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Delete multiple inventory records
    deleteArrayInventoryController: async (req, res) => {
        let inventory = await deleteArrayInventoryService(req.body.inventoryIds)
        return res.status(200).json({errorCode: 0, data: inventory})
    }
};