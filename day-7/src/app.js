const express = require('express')
const noteModel = require('./models/notes.model')

const app = express()

app.use(express.json())

app.post('/notes' , async (req , res)=>{
    const {title , description}=req.body

   const note = await noteModel.create({
        title ,description
    })

    res.status(201).json({
        message : "note created successfully",
        note
    })
})

module.exports = app


//fL2c3HyftGZhO0yf  mongodb+srv://sachin:fL2c3HyftGZhO0yf@cluster0.q7vmfbb.mongodb.net/