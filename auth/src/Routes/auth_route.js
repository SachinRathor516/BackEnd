const express = require('express')
const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const authRouter = express.Router()




authRouter.post('/register' ,async (req ,res)=>{

       const{name,email ,password}= req.body

       const isEmailExist = await userModel.findOne({email})

       if (isEmailExist) {
        return res.status(400).json({
            message:"Email already exist , choose another email"
        })
       }
       const user =  await  userModel.create(
        {
            name,
            email,
            password:crypto.createHash('sha256').update(password).digest('hex')
        }
    )

      const token = jwt.sign({
        id:user._id,
       },
       process.env.JWT_SECRET ,{expiresIn:"1h"}
    )

    res.cookie('token' , token)


    res.status(201).json({
        message:"user register successfully",
        user,
        token
    })


})

authRouter.get('/get-me' ,async(req ,res)=>{
    const token = req.cookies.token

  const decoded =  jwt.verify(token,process.env.JWT_SECRET)

const user =  await userModel.findById(decoded.id)


res.status(200).json({
    name:user.name,
    email:user.email
})
  
})

authRouter.post('/login', async(req ,res)=>{
    const {email ,password} = req.body

   const user = await userModel.findOne({email})

   if (!user) {
    return res.status(401).json({
        message:"user is not exist with this email address"
    })
   }

   const hash = crypto.createHash('sha256').update(password).digest('hex')

   const isPassword = hash ===user.password

   if(!isPassword){
   return res.status(400).json({
        message:"invalid password"
    })
   }

  const token = jwt.sign({
    id:user._id
   },process.env.JWT_SECRET , {expiresIn:"1h"})

   res.cookie('token',token)

   res.status(200).json({
    message:"user login successfully",
    user:{
        name:user.name,
        email:user.email
    }
   })
   
})

module.exports = authRouter