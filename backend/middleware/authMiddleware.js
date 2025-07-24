const rateLimit = require('express-rate-limit')
const { JWT_SECRET } = require('../config/env')
const jwt = require('jsonwebtoken')

function authenticateToken(req,res,next){
    let authHeader = req.headers.authorization

    if(!authHeader) res.status(401).json({message:"Token missing!"})

    let token = authHeader.split(' ')[1]

    try{
        const user = jwt.verify(token,JWT_SECRET)
        req.user = user
        next()
    }catch(err){
        res.status(401).json({message:"invalid or expired token!"})
    }
}

let limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Too many requests, try again after 1 min",
    statusCode:429
})

module.exports = {
   authenticateToken,
   limiter
}