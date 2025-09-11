import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
console.log("YE login side jwt hai",JWT_SECRET);
 // replace with environment variable in production

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

   

    // Access token (short-lived)
    const accessToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Refresh token (longer-lived)
    console.log("JWT at login ", JWT_SECRET)
    const refreshToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store refreshToken in httpOnly cookie (secure way)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(200).json({
      message: "Login successful",
      accessToken,
      user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const logoutUserController = (req, res) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: 'strict',
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

// Middleware to get user profile using token
export const getUserProfileController = async (req, res) => {
  try {
    // Get token from Authorization header: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select("-__v");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,// ✅ hashed password (optional, not recommended to send)
        token: token,            // ✅ return the same token (optional)
        mobile: user.mobile,
        college: user.college,
        degree: user.degree,
        year: user.year,
        semester: user.semester,
      }
    });

  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Middleware to update user profile
export const updateUserProfileController = async (req, res) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Fields from body
    const { mobile, college, degree, year, semester } = req.body;

    // Find and update user
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    if (mobile !== undefined) user.mobile = mobile;
    if (college !== undefined) user.college = college;
    if (degree !== undefined) user.degree = degree;
    if (year !== undefined) user.year = year;
    if (semester !== undefined) user.semester = semester;

    // Save changes
    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        college: user.college,
        degree: user.degree,
        year: user.year,
        semester: user.semester,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};