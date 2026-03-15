const express = require("express")

const app = express()

app.use(express.json())

const notes =[
    // {
    //     title:"test title 1",
    //     description:"test description 1"
    // },
    // {
    //     title:"test title 2",
    //     description:"test description 2"
    // },
]


app.get('/' ,(req ,res )=>{
    res.send("good baby")
    
})

app.post('/notes',(req , res)=>{
    notes.push(req.body)
    
    res.send('notes created')
})

app.get('/notes',(req , res)=>{
        res.send(notes)
})

app.delete("/notes/:index" , (req , res)=>{
    
    delete notes[req.params.index]

    res.send("Note deleted successfully")
    
})

app.patch('/notes/:index' , (req , res)=>{
    notes [req.params.index].content = req.body.content

    res.send("note updated successfully")
})

module.exports = app