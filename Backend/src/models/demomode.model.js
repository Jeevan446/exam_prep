import mongoose from "mongoose";

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

export default mongoose.model('demo',demoSchema)