const express =  require('express')
const noteModel = require('./models/note.model')

const app = express()

app.use(express.json())
//POST /api/notes
app.post('/api/notes' ,async (req , res)=>{

    const {title , description} = req.body

   const note = await noteModel.create({
        title ,description
    })

    res.status(201).json({
        message :"Note created successfully"
    })

})

//GET /api/notes
app.get('/api/notes' , async (re , res)=>{

  const notes = await  noteModel.find()

  res.status(200).json({
    message:"Note Fetched successfully",
    notes
  })

})

//DELETE /api/notes/:id
app.delete('/api/notes/:id' , async (req ,res)=>{
     const id = req.params.id

    await noteModel.findByIdAndDelete(id)

     res.status(200).json({
        message :"Note deleted successfully"
     })
     
})


//PATCH /api/notes/:id
app.patch('/api/notes/:id' , async (req , res)=>{
    const id = req.params.id
    const {description} = req.body

   await noteModel.findByIdAndUpdate(id ,{description})

   res.status(200).json({
    message :"Note Updated Successfully"
   })
})


module.exports = app