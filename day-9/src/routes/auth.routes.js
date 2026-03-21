const express = require('express')
const userModel = require('../models/user_model')
const jwt = require('jsonwebtoken')

const authRouter = express.Router()


authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User Already Exist , Choose another email address"
        })
    }


    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
    {
        id: user._id,
        email:user.email
    },
      process.env.JWT_SECRET
    )

    res.cookie('jwt_token' , token)

    res.status(201).json({
        message: "user created successfully",
        user,
        token
    })
})




module.exports = authRouter