import mongoose from "mongoose";


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

export default mongoose.model('chapter',chapterSchema)