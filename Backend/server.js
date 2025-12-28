require('dotenv').config();
const express=require('express');
const cors=require('cors')
const app=express()
const db=require('./src/db/config.db')
const demomodeRouter=require('./src/routers/demomode.router')
const  userRouter =require('./src/routers/user.router');
// const  questionRouter =require('./src/routers/question.router');
db(); 

app.use(cors())
app.use(express.json())
app.use('/api/demomode/',demomodeRouter);
app.use('/api/user',userRouter);
// app.use('/api/demomode/', questionRouter);

app.get('/home',(req,res)=>{
return res.status(200).json({mesage:"Hello world"});
})

app.listen(3000,()=>{
    console.log("App is listening at port 3000");

})