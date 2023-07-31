import TaskModel from "../models/task.model.js";

class TaskController {
  constructor() { }

  static async getTasks(req, res, next) {
    try {
      let tasks = await TaskModel.find().populate('project_id')

      res.json({
        success: true,
        data: tasks
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async addTask(req, res, next) {
    try {
      const newTask = new TaskModel(req.body);
      await newTask.save();

      return res.status(201).json({
        success: true,
        data: newTask,
        message: 'Task created successfully'
      });
    } catch (err) {
      console.log('error', err);
      return res.status(500).json({ error: err.toString() });
    }
  }

  static async getTask(req, res, next) {
    try {
      const { id } = req.params;
      const task = await TaskModel.findById(id);

      if (!task) {
        return res.status(401).json({
          success: false,
          message: "Task not found."
        });
      } else {
        return res.status(401).json({
          success: true,
          data: task
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async updateTask(req, res, next) {
    let { data } = req.body;
    let { id } = req.params;

    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(id, data, {
        new: true, // Return the modified document instead of the original one
        runValidators: true, // Run Mongoose validators for the updatedData
      });

      if (!updatedTask) {
        return res.status(401).json({
          success: false,
          message: "Task not found."
        });
      } else {
        return res.status(401).json({
          success: true,
          data: updatedTask
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async deleteTask() {

  }
}

export default TaskController;
