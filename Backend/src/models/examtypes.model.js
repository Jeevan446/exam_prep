const mongoose = require('mongoose');

const examTypeSchema = new mongoose.Schema({
  name:{
     type:String,
     required:true,
  } ,
  
  subjects: {
    type: [String],  
    required: true,
  },
});

module.exports = mongoose.model('ExamType', examTypeSchema);
