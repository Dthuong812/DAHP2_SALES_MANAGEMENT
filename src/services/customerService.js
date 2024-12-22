const Customer = require('../models/customer')
const aqp = require ('api-query-params');
module.exports ={
    createCustomerService : async(dataCustomer)=>{
        try {
            const prefix = "KH";
            const lastCustomer = await Customer.findOne().sort({ customer_id: -1 });
            let newId
            if (!lastCustomer) {
                newId = `${prefix}0001`;
            } else {
                const lastIdNumber = parseInt(lastCustomer.customer_id.slice(2), 10);
                const nextIdNumber = lastIdNumber + 1;
                newId = `${prefix}${String(nextIdNumber).padStart(4, "0")}`;
            }
            dataCustomer.customer_id = newId
            let result = await Customer.create(dataCustomer)
            return result
        } catch (error) {
            console.log(error)
            
        }
    },
    checkCustomerService: async (phone) => {
        try {
            const customer = await Customer.findOne({ phone });

            if (customer) {
                return {
                    success: true,
                    exists: true,
                    customer: {
                        customer_id: customer.customer_id,
                        name: customer.name,
                        address: customer.address,
                    },
                };
            } else {
                return { success: true, exists: false };
            }
        } catch (error) {
            console.error("Error in checkCustomerService:", error);
            return { success: false, message: error.message };
        }
    },
    createArrayCustomerService :async  (arr)=>{
        try {
            const prefix = "KH";
            const lastCustomer = await Customer.findOne().sort({ customer_id: -1 });
            let lastIdNumber = lastCustomer ? parseInt(lastCustomer.customer_id.slice(2), 10) : 0;
    
            const validCustomers = arr.filter((customer) => {
                if (!customer.name || typeof customer.name !== "string") return false;
                if (!customer.address || typeof customer.address !== "string") return false;
                if (!customer.phone || !/^\d{10}$/.test(customer.phone)) {
                    console.error(`Invalid phone number: ${customer.phone}`);
                    return false;
                }
                return true;
            });
    
            validCustomers.forEach((customer) => {
                lastIdNumber += 1;
                customer.customer_id = `${prefix}${String(lastIdNumber).padStart(4, "0")}`;
            });
    
            if (validCustomers.length > 0) {
                const result = await Customer.insertMany(validCustomers, { ordered: false });
                return result;
            } else {
                console.log("No valid customers to insert.");
                return null;
            }
        } catch (error) {
            if (error.name === "ValidationError") {
                console.error("Validation Error:", error.errors);
            } else {
                console.error("Error inserting customers:", error);
            }
            throw error;
        }
    },
    getAllCustomerService:async (limit,page,queryString)=>{
        try {
            let result = null;
            limit = parseInt(limit, 10); 
            page = parseInt(page, 10) ; 
    
            let offset = (page - 1) * limit;
    
            const { filter } = aqp(queryString); 
            delete filter.page;
            delete filter.limit;
    
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
            return result;
        } catch (error) {
            console.error("Error in getAllCustomerService:", error);
            return null;
        }
    },
    searchCustomerAPIService: async (searchKeyword, limit, page) => {
        try {
            const query = {
                $or: [
                    { name: { $regex: searchKeyword, $options: 'i' } }, 
                    { phone: { $regex: searchKeyword, $options: 'i' } } ,
                    { address: { $regex: searchKeyword, $options: 'i' } } 
                ]
            };
    
            limit = parseInt(limit, 10) || 10; 
            page = parseInt(page, 10) || 1; 
    
            const customers = await Customer.find(query)
                .limit(limit)
                .skip((page - 1) * limit)
                .exec();
    
            const total = await Customer.countDocuments(query);
    
            return {
                success: true,
                data: customers,
                total,
                page,
                limit
            };
        } catch (error) {
            console.error('Error in searchCustomerAPIService:', error);
            return { success: false, message: error.message };
        }
    },
    updateCustomerService:async (customer_id,name,phone,email,address)=>{
        try {
            let result = await Customer.updateOne({customer_id:customer_id},{name,phone,email,address})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteCustomerService:async(customer_id)=>{
        try {
            let result = await Customer.deleteOne({customer_id:customer_id})
            return result
        } catch (error) {
            console.log(error)
            return null;
        }
    },
    deleteArrayCustomerService:async (arrIds)=>{
        try {
            let result = await Customer.deleteMany({customer_id: { $in: arrIds }})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
}