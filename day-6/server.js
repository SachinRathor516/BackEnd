 const app = require('./src/app')

 const mongoose = require("mongoose")

 function connectToDb(){
    mongoose.connect('mongodb+srv://sachinrathor516_db_user:p3fYa9gP9qulOnxg@cluster0.seu3nzl.mongodb.net/day-6')

    .then(()=>{
        console.log("connected to database");
        
    })
 }
 connectToDb()



 app.listen(3000 , ()=>{
    console.log("server is running port 3000");
    
 })