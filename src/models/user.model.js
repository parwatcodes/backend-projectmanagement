import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    required: true,
  },
  project_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  hourlyRate: Number
});

export default mongoose.model('User', userSchema);
