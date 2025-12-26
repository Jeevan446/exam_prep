const mongoose=require('mongoose')

const chapterSchema=mongoose.Schema({
    examtype:{
    type:String,
    required:true
    },
    subject:{
      type:String,
      required:true
    },
    name:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('chapter',chapterSchema)