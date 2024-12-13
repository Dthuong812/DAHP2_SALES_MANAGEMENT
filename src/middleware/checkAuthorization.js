const fs = require('fs')
const jwt = require('jsonwebtoken'); 
module.exports ={
    checkAuthorization: async (req, res, next) => {
        try {
            console.log(req.headers.token)
            const token = req.headers.token; 
            if (!token) {
                return res.status(403).send("Forbidden");
            }

            // Đọc public key
            const cert = fs.readFileSync('./jwtKey/jwtRS256.key.pub');

            // Xác minh token
            const decoded = jwt.verify(token, cert, { algorithms: ['RS256'] });

            console.log("Decoded token:", decoded);
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(403).send("Forbidden");
        }
    }
}