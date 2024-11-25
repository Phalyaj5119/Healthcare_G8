const jwt= require("jsonwebtoken");

const generateJwtToken=(userData) => {
    return jwt.sign(userData,process.env.PRIVATEKEY,{expiresIn:400000});
}

const validateJwtToken= (req, res, next) => {
    const tokenCheck = req.headers.authorization;
    if(!tokenCheck){
        return res.status(401).json({err:"token not available"});
    }
    const token = req.header.authorization.split(' ')[i];
    if(!token){
        return res.status(401).json({err:"Invalid token"});
    }
    try{
        const validateToken=jwt.verifytoken(process.env.PRIVATEKEY);
        req.user = validateJwtToken;
        next();
    }
    catch(err){
        return res.status(401).json({err,message});
    }
}

module.exports={generateJwtToken,validateJwtToken};