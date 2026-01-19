import  User from  "../models/user.model.js"
import  bcrypt from "bcryptjs"
import  jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// for login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        // password:user.password
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfiles = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================ Change Password =================
export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Alternative if you have mongoose middleware for hashing:
    // user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get user Info
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update user profile (only username)
export const updateUserProfile = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "username is required" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 5-day restriction
    const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    const now = new Date();
    const lastChange = user.username_last_changed_at || user.createdAt;

    if (now - new Date(lastChange) < FIVE_DAYS_MS) {
      const daysLeft = Math.ceil(
        (FIVE_DAYS_MS - (now - new Date(lastChange))) / (1000 * 60 * 60 * 24)
      );
      return res.status(400).json({
        success: false,
        message: `You can only change your username after ${daysLeft} more day(s).`,
      });
    }

    // Update username and last changed timestamp
    user.username = username;
    user.username_last_changed_at = now;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User info updated successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const updateRole = async (req, res) => {
  const selectedID = req.params.selectedid;
  const id = req.user.id;

  try {
    // 1. Prevent self-upgrading
    if (id === selectedID) {
      return res.status(403).json({ message: "You cannot change your own role" });
    }

    const userToUpdate = await User.findById(selectedID);
    const requestUser = await User.findById(id);

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Logic for Admin
    if (requestUser.role === "admin") {
      // Toggle logic: if user -> moderator, else (is moderator) -> user
      userToUpdate.role = userToUpdate.role === "user" ? "moderator" : "user";
    } 
    
    // 3. Logic for Moderator
    else if (requestUser.role === "moderator") {
      // Moderators can only toggle other users between user/moderator
      userToUpdate.role = userToUpdate.role === "moderator" ? "user" : "moderator";
    } 
    
    else {
      return res.status(401).json({ message: "Unauthorized: Insufficient permissions" });
    }

    // 4. Save and Send Response
    await userToUpdate.save();
    return res.status(200).json({ 
      message: "Role updated successfully", 
      user: userToUpdate 
    });

  } catch (error) {
    console.error("Update Role Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getallUsers = async(req,res)=>{
          console.log("request ")
         try{
           const users =await User.find().select('-createdAt -updatedAt -username_last_changed_at');
           res.status(200).json(users);
          }
          catch(error) {
          res.status(401).json({message:"Internal server error"});
          }
} 

