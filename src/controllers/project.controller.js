import ProjectModel from "../models/project.model.js";
import TaskModel from "../models/task.model.js";
import UserModel from "../models/user.model.js";

class ProjectController {
  constructor() { }

  static async getProjects(req, res, next) {
    try {
      let projects = await ProjectModel.find();

      res.json({
        success: true,
        data: projects
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async addProject(req, res, next) {
    try {
      const newProject = new ProjectModel(req.body);
      await newProject.save();

      return res.status(201).json({
        success: true,
        data: newProject,
        message: 'Project created successfully'
      });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProject(req, res, next) {
    try {
      const { id } = req.params;
      const project = await ProjectModel.findById(id);


      if (!project) {
        return res.status(401).json({
          success: false,
          message: "Project not found."
        });
      } else {
        let projectMembers = [];

        if (req.query?.all) {
          projectMembers = await UserModel.find({ project_id: { $in: [id] } });
        }

        return res.json({
          success: true,
          data: {
            project,
            projectMembers
          }
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async updateProject(req, res, next) {
    let { data } = req.body;
    let { id } = req.params;

    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(id, data, {
        new: true, // Return the modified document instead of the original one
        runValidators: true, // Run Mongoose validators for the updatedData
      });

      if (!updatedProject) {
        return res.status(401).json({
          success: false,
          message: "Project not found."
        });
      } else {
        return res.json({
          success: true,
          data: updatedProject
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async deleteProject() {

  }

  static async getProjectTasks(req, res, next) {
    let { id } = req.params;

    try {
      let data = await TaskModel.find({ project_id: id })
        .populate('project_id');

      return res.json({
        success: true,
        data
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async getProjectMembers(req, res, next) {
    let { id } = req.params;

    try {
      let data = await UserModel.find({ project_id: id })
        .populate('project_id');

      return res.json({
        success: true,
        data
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
}

export default ProjectController;
