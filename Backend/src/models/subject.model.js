import mongoose from "mongoose";
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

export default mongoose.model('subject',subjectSchema)