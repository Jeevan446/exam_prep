import mongoose from "mongoose";

const examTypeSchema = new mongoose.Schema({
  name:{
     type:String,
     required:true,
  } ,
  
  subjects: {
    type: [String],  
    required: true,
  },
  
   discription:{
     type:String,
     required:true,
   }
});

export default mongoose.model('ExamType', examTypeSchema);
