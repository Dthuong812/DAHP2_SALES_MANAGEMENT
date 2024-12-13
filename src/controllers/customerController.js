const {createCustomerService,createArrayCustomerService,getAllCustomerService,updateCustomerService,deleteCustomerService,deleteArrayCustomerService, checkCustomerService, searchCustomerAPIService} = require("../services/customerService")
module.exports = {
    postCreateCustomerAPI : async (req,res)=>{
        let {customer_id,name,phone,email,address} = req.body
        console.log(customer_id,name,phone,email,address)
        let dataCustomer = {customer_id,name,phone,email,address}
        let customer = await createCustomerService(dataCustomer)
        return res.status(200).json(
            {
                errorCode : 0,
                data : customer
            }
        )
    },
    postCreateArrayCustomerAPI : async(req,res)=>{
        try {
            const dataCustomer = req.body.customers;

            if (!Array.isArray(dataCustomer) || dataCustomer.length === 0) {
                return res.status(400).json({ errorCode: 1, message: "Invalid customers array." });
            }
    
            const customers = await createArrayCustomerService(dataCustomer);
            if (customers) {
                return res.status(200).json({ errorCode: 0, data: customers });
            } else {
                return res.status(400).json({ errorCode: 2, message: "No valid customers to insert." });
            }
        } catch (error) {
            console.error("Error in postCreateArrayCustomerAPI:", error);
            return res.status(500).json({ errorCode: 3, message: "Internal server error." });
        }
    },
    getCustomerAPI : async (req,res)=>{
        try {
            const { limit, page, ...queryString } = req.query; 
            const customers = await getAllCustomerService(limit, page, queryString);
    
            return res.status(200).json({ errorCode: 0, data: customers });
        } catch (error) {
            console.error("Error in getAllCustomer:", error);
            return res.status(500).json({ errorCode: 1, message: "Internal Server Error" });
        }
    },
    searchCustomerAPI:async (req, res) => {
        const { name, limit, page } = req.query;
    
        if (!name || name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword cannot be empty.'
            });
        }
    
        const result = await searchCustomerAPIService(name, parseInt(limit) || 10, parseInt(page) || 1);
    
        if (result.success) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }
    },
    putCustomerAPI :async(req,res)=>{
        let {customer_id,name,phone,email,address} = req.body;
        let customer  = await updateCustomerService(customer_id,name,phone,email,address)
        return res.status(200).json(
            {
                errorCode : 0,
                data : customer 
            }
        )
    },
    deleteCustomerAPI:async(req,res)=>{
        let {customer_id} = req.body;
        let customer  = await deleteCustomerService(customer_id)
        return res.status(200).json(
            {
                errorCode : 0,
                data : customer 
            }
        )
    },
    deleteArrayCustomerAPI :async (req,res)=>{
        let customers = await deleteArrayCustomerService(req.body.customerIDs)
        return res.status(200).json(
            {
                errorCode : 0,
                data : customers 
            }
        )
    },
    checkCustomerController: async (req, res) => {
        try {
            const { phone } = req.query;
            if (!phone) {
                return res.status(400).json({ success: false, message: "Phone number is required" });
            }
            const result = await checkCustomerService(phone);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error) {
            console.error("Error in checkCustomerController:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    },
}