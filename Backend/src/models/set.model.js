const mongoose = require("mongoose");

const ExamConfigSchema = new mongoose.Schema(
  {
    examType: {
      type: String, 
      required: true,
      trim: true,
    },

    examTime: {
      type: Number, 
      required: true,
      min: 1,
    },

    fullMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: true,
      },
    ],
  },
  { _id: false }
);

const SetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    exams: {
      type: [ExamConfigSchema],
      validate: {
        validator: v => v.length > 0,
        message: "At least one exam configuration is required",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Set", SetSchema);

 //json data for setSchema
// {
//   "_id": "66b5e2f91a9c4f0012a3b456",
//   "name": "Engineering Entrance Set 2026",
//   "exams": [
//     {
//       "examType": "ioe",
//       "examTime": 180,
//       "fullMarks": 100,
//       "questions": [
//         {
//           "_id": "66b5e301aa12bc0012aa0001",
//           "name": "What is Ohm's Law?",
//           "examtype": "ioe",
//           "subject": "Physics",
//           "chapter": "Electricity",
//           "level": "Easy",
//           "options": ["V=IR", "P=VI", "F=ma", "E=mc²"],
//           "answer": "V=IR",
//           "marks": 2
//         },
//         {
//           "_id": "66b5e301aa12bc0012aa0002",
//           "name": "2 + 2 = ?",
//           "examtype": "ioe",
//           "subject": "Math",
//           "chapter": "Algebra",
//           "level": "Easy",
//           "options": ["3", "4", "5", "6"],
//           "answer": "4",
//           "marks": 1
//         }
//       ]
//     },
//     {
//       "examType": "bdc",
//       "examTime": 120,
//       "fullMarks": 80,
//       "questions": [
//         {
//           "_id": "66b5e301aa12bc0012aa0010",
//           "name": "Define Newton's 2nd law",
//           "examtype": "bdc",
//           "subject": "Physics",
//           "chapter": "Mechanics",
//           "level": "Medium",
//           "options": ["F=ma", "E=mc²", "V=IR", "P=VI"],
//           "answer": "F=ma",
//           "marks": 3
//         }
//       ]
//     }
//   ],
//   "createdBy": "66b5e1aa99bc4f0012999999",
//   "createdAt": "2026-01-09T15:40:10.123Z",
//   "updatedAt": "2026-01-09T15:40:10.123Z"
// }
