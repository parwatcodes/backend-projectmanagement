import ProjectModel from "../models/project.model.js";

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
        return res.status(401).json({
          success: true,
          data: project
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
        return res.status(401).json({
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
}

export default ProjectController;
