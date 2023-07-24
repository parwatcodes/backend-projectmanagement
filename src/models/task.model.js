const mongoose = require('mongoose');

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
    enum: ['in progress', 'completed', 'pending'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
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
