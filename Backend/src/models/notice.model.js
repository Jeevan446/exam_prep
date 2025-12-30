const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Notice', noticeSchema);
