const express=require('express');
const app=express()


app.get('/home',(req,res)=>{
return res.status(200).json({mesage:"Hello worldsssssssss"});
})
app.listen(3000,()=>{
    console.log("App is listening at port 3000");
    console.log("fsdf");
})