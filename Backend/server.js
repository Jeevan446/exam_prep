const express=require('express');
const app=express()
const db=require('./src/db/config.db')
const demomodeRouter=require('./src/routers/demomode.router')
require('dotenv').config();
db();


app.use('/api/demomode/',demomodeRouter);
app.get('/home',(req,res)=>{
return res.status(200).json({mesage:"Hello world"});
})

app.listen(3000,()=>{
    console.log("App is listening at port 3000");

})