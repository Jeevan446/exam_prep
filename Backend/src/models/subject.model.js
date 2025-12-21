const mongoose=require('mongoose')

const subjectSchema=mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    chapters:{
        type:[String],
        required:true
    },
    
})

module.exports=mongoose.model('subject',subjectSchema)