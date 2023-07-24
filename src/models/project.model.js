import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

export default mongoose.model('Project', projectSchema);
