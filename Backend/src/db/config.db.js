const mongoose=require('mongoose') ;

async function connectDb(){
try{
await mongoose.connect(process.env.MONGO_URI) ;
console.log("Connected to database") ;
}
catch(err){
    console.log("Error while connectiong with database",err) ;
}
}


module.exports=connectDb ;