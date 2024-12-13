const express = require('express');
const paymentRoute = express.Router();

const { postCreatePayment ,getAllPayment, postCreateArrayPayment,putPayment,deletePayment,deleteArrayPayment} = require('../controllers/paymentController');



paymentRoute.post('/api', postCreatePayment);
paymentRoute.post('/api-many', postCreateArrayPayment);
paymentRoute.get('/api', getAllPayment);
paymentRoute.put('/api', putPayment);
paymentRoute.delete('/api', deletePayment);
paymentRoute.delete('/api-many', deleteArrayPayment);




module.exports = paymentRoute;