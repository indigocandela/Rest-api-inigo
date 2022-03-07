const Joi=require('joi');
const jwt=require('jsonwebtoken');

//Used for validation the registration and the login

//Registration
const registerValidation=(data)=>{
    const schema=Joi.object(
        {
            name:Joi.string().min(6).max(255).required(),
            email:Joi.string().min(6).max(255).required(),
            password:Joi.string().min(8).max(255).required(),
        });
        return schema.validate(data);
}


//Login

const loginValidation=(data)=>{
    const schema=Joi.object(
        {
            email:Joi.string().min(6).max(255).required(),
            password:Joi.string().min(8).max(255).required(),
        });
        return schema.validate(data);
}

//token verification
const verifyToken=(req,res,next)=>{
    const token=req.header("auth-token");
        if(!token)return res.status(401).json({error:"Access Denied"});
    try {
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.tamer=verified;
        next();
        } 
    catch (error) {
        res.status(400).json({error:"Token is not valid"})
    }

}


module.exports={registerValidation,loginValidation,verifyToken};