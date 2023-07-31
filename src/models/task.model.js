import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  start_date: Date,
  end_date: Date,
  status: {
    type: String,
    enum: ['todo', 'inProgress', 'inReview', 'done'],
    default: 'todo',
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
    trim: true
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the 'Project' model
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the 'User' model
  }
});

export default mongoose.model('Task', taskSchema);
