import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    
    if (!user) {
      // First time - check if admin credentials match
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Create admin user
        user = new User({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          role: 'admin'
        });
        await user.save();
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    } else {
      // User exists - verify password
      const isPasswordValid = await user.comparePassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

export default { login };