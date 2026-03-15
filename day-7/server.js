const app = require('./src/app')
require('dotenv').config()

const mongoose =  require('mongoose');
const connectToDb = require('./src/config/database');


connectToDb()

app.listen(3000 , ()=>{
    console.log("server is running port 3000");
    
})