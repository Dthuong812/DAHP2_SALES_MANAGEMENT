require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine');
const fileUpload = require('express-fileupload');
const productRoutes = require('./routes/productRoute');
const customerRoutes = require('./routes/customerRoute');
const categoryRoutes = require('./routes/categoryRoute');
const orderRoutes = require('./routes/orderRoute');
const userRoutes = require('./routes/userRoute');
const detailOrderRoutes = require('./routes/detailOrderRoute');
const inventoryRoutes = require('./routes/inventoryRoute');
const supplierRoutes = require('./routes/supplierRoute');
const paymentRoutes = require('./routes/paymentRoute');
const purchaseOrderDetailRoutes = require('./routes/purchaseOrderDetailRoute');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoute');
const app = express(); // app express
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

// modal

const Product = require('./models/product');
const Category = require('./models/category');
const Customer = require('./models/customer');
const Order = require('./models/order');
const User = require('./models/user');
const Role = require('./models/role');
const PermissionResources = require('./models/permissionResources');
const Resources = require('./models/resources');





// 


// config req.body
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.urlencoded({extended: true}))

// config template engine
configViewEngine(app);

// config file upload
app.use(fileUpload());

// khai báo route
app.use('/v1/product/', productRoutes);
app.use('/v1/category/', categoryRoutes);
app.use('/v1/customer/', customerRoutes);
app.use('/v1/order/', orderRoutes);
app.use('/v1/user/', userRoutes);
app.use('/v1/detailOrder/',detailOrderRoutes);
app.use('/v1/inventory/',inventoryRoutes);
app.use('/v1/supplier/',supplierRoutes);
app.use('/v1/payment/',paymentRoutes );
app.use('/v1/purchaseOrderDetail/',purchaseOrderDetailRoutes );
app.use('/v1/purchaseOrder/',purchaseOrderRoutes );

(async () => {
    try { // using mongoose
        await connection();

        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
