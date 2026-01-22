export const checkPaidUser = async (req, res, next) => {
  try {
    const { setType } = req.params || req.body;

    // Only apply rule for PAID sets
    if (setType !== "paid") {
      return next();
    }

    // req.user comes from auth middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    //  User has not paid
    if (!req.user.hasPaid) {
      return res.status(403).json({
        success: false,
        message: "Payment required to upload paid exam sets",
      });
    }

    //  Paid user
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
