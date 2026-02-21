import noticeModel  from "../models/notice.model.js"

export const createNotice = async (req, res) => {
  try {
    const { title, message } = req.body;

    // Validation
    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: "Title and message are required",
      });
    }

    // Create notice
    const notice = await noticeModel.create({
      title,
      message,
      createdBy: req.user._id, // from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.name === "ValidationError"
          ? error.message
          : "Server error",
      error: error.message,
    });
  }
};

export const getNotice = async (req, res) => {
  try {
    const notices = await noticeModel
      .find()
      .populate("createdBy", "username email role");

    if (!notices || notices.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No notices exist",
      });
    }

    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });
  } catch (error) {
    console.error("Error in getNotice:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await noticeModel.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
      data: deletedNotice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

