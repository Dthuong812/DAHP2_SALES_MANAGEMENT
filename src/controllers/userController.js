const fs = require('fs')
const jwt = require('jsonwebtoken'); 
module.exports = {
    //authentication
    postLogin:async(req,res,next)=>{
        if(req.body.email == "admin@gmail.com" && req.body.password =='123456')
        {
            const cert = fs.readFileSync('./jwtKey/jwtRS256.key', 'utf8');
            const jwtPayLoad = { email: req.body.email };
            const token = jwt.sign(jwtPayLoad, cert, {  algorithm: 'RS256', expiresIn: "30s" });
            res.status(200).send(token)
        }else{
            res.status(400).send("Bad request")
        }
    },
    // authoriztion
    getUser: async (req, res, next) => {
        res.status(200).json({
            errorCode: 0,
            message: "Access granted",
            user: { email: "admin@gmail.com" },
        });
    },
    createUser:async(req,res)=>{
        
    }
}

