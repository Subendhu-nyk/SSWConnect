const jwt=require('jsonwebtoken')
const User=require('../models/userProfile');

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')       
        const user=jwt.verify(token,'98sh856ru454t45izklk');        
        console.log('userID >>>> ',user.user_id)
        User.findByPk(user.user_id).then(user=>{
            console.log("user>>",user)
            console.log(JSON.stringify(user));
            req.user=user;            
             next();
        }).catch(err =>{ throw new Error(err)})        
        
    }
    catch(err){
        console.log("error"+err)
        return res.status(401).json({success:fail})
    }
}

module.exports={
    authenticate:authenticate
}