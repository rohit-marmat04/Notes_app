import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // adjust path

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("No token provided or header is malformed.");
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log("✅ Extracted Token:", token);
    console.log("🔐 JWT_SECRET:", process.env.JWT_SECRET);

    // Try to decode + verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // <- Are you seeing this?

    // Fetch user from DB
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.role.toLowerCase() !== 'admin') {
      console.log("❌ Forbidden: Not admin", user.role);
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    console.log("✅ Admin verified:", user.name);
    req.user = user;
    next();

  } catch (err) {
    console.error("❌ JWT Verify Error:", err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
