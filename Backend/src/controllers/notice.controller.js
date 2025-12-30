const noticeModel = require("../models/notice.model");

const createNotice = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const notice = await noticeModel.create({
      message,
      createdBy: req.user._id, // comes from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getNotice = async (req, res) => {
  try {
    const notices = await noticeModel
      .find()
      .populate("createdBy", "username email role "); //adding info of creater(name and email)
    console.log("Notices found:", notices.length);
    console.log("Notices data:", notices);

    if (!notices || notices.length === 0) {
      console.log("No notices found in database");
      return res.status(404).json({
        success: false,
        message: "No notices exist",
      });
    }

    res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    console.error("Error in getNotice:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createNotice, getNotice };
