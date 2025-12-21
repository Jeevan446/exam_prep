const mongoose=require('mongoose')

const subjectSchema=mongoose.Schema({
  
  examtype:{
    type:String,
    required:true
  },

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