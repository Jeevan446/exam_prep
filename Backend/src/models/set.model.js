import mongoose from "mongoose";

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

    setType: {
      type: String,
      enum: ["paid", "live", "free"],
      required: true,
    },

    startTime: {
      type: Date,
      required: function () {
        return this.setType === "live";
      },
    },

    endTime: {
      type: Date,
      required: function () {
        return this.setType === "live";
      },
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", 
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
      required: true,
      validate: {
        validator: (v) => v.length > 0,
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

export default mongoose.model("Set", SetSchema);
