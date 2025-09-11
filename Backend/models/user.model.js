import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  // ✅ New editable fields
  mobile: {
    type: String,
    trim: true
  },
  college: {
    type: String,
    trim: true
  },
  degree: {
    type: String,
    trim: true
  },
  year: {
    type: String,
    trim: true
  },
  semester: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
