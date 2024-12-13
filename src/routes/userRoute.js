const  express = require('express')
const userRoute = express.Router();
const {postLogin,getUser,createUser}= require('../controllers/userController')
const {checkAuthorization} = require('../middleware/checkAuthorization');
const { postUploadSingleFileAPI, postUploadMultipleFileAPI } = require('../controllers/fileController');



userRoute.post('/file', postUploadSingleFileAPI);
userRoute.post('/files', postUploadMultipleFileAPI);
userRoute.post('/login',postLogin)
userRoute.get('/login', checkAuthorization,getUser)
userRoute.post('/createUser', createUser)


module.exports = userRoute