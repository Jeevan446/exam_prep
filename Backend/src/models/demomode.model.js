const mongoose=require('mongoose')

const demoSchema=mongoose.Schema({
    examType:{
      type:String,
      required:true
    },
    subject:{
        type:String,
        required:true
    },
    chapter:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('demo',demoSchema)