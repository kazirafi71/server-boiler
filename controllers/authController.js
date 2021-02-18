const User=require('../models/UserModel')
var bcrypt = require('bcryptjs');
const {SECRET_KEY}=require('../config/keys')
var jwt = require('jsonwebtoken');

module.exports.
     registerController = async (req,res,next)=>{
        let {name,email,password,confirmPassword}=req.body

        if(!name || !email || !password || !confirmPassword){
            return res.status(401).json({
                error:" Please provide all information"
            })
        }

        if(password != confirmPassword){
            return res.status(401).json({
                error:" password not matched"
            })
        }

        

        try {

            let user=await User.findOne({email})
            if(user){
                return res.status(401).json({
                    error:"User already exists"
                })
            }

            let hash= await bcrypt.hash(password,10)
            
            let userInfo=new User({
                name,
                email,
                password: hash
            })

            userInfo.save()
            .then(result=>{
                return res.status(201).json({
                    user: result,
                    text:"User created Successfully"
                })
            })
            .catch(err=>{
                console.log(err)
            })


        } catch (error) {
            console.log(error)
            next(error)
        }

}

module.exports.loginController=async (req,res,next)=>{

    let {email,password}=req.body

        if(!email || !password) {
            return res.status(401).json({
                error:" Please provide all information"
            })
        }

        try {

            let user=await User.findOne({email})
            
            if(!user){
                return res.status(401).json({
                    error:"User not exists"
                })
            }

            bcrypt.compare(password, user.password, function(err, result) {
                if(!result){
                    return res.status(401).json({
                        error:"Password not matched"
                    })
                }

                var token = jwt.sign({ _id: user._id },SECRET_KEY );
                let {_id,email,name}=user
                return res.status(201).json({
                    user:{_id,email,name},
                    token,
                    text:"Login Successfully"
                })
            })

        } catch (error) {
            console.log(error)
            next(error)
        }
}