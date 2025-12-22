const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  examtype:{
    type:String,
    required:true
  },
  subject:{
type:String,
required:true
  },
  chapter: {
    type: String, 
    required: true,
  },
  level: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  options: {
    type: [String], 
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number, 
    required: true,
  },
  
  creator: {
    type: String,
  },
}, { timestamps: true }); 


module.exports = mongoose.model("question", questionSchema);