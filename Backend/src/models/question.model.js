import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    examType: { 
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
    },

    chapter: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
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
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
