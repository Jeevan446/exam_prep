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
      enum: ["paid", "live", "offline"], // allowed values
      required: true,
    },

    startTime: {
      type: Date,
      required: function () {
        return this.setType === "live"; // only required for live exams
      },
    },

    endTime: {
      type: Date,
      required: function () {
        return this.setType === "live"; // only required for live exams
      },
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
