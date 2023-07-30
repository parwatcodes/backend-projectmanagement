import UserModel from "../models/user.model.js";

class UserController {
  constructor() { }

  static async getUsers(req, res, next) {
    try {
      let users = await UserModel.find();

      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async getAdmins() {

  }

  static async addUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const newUser = new UserModel(req.body);
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found."
        });
      }

      return res.json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async updateUser(req, res, next) {
    let { data } = req.body;
    let { id } = req.params;

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
        new: true, // Return the modified document instead of the original one
        runValidators: true, // Run Mongoose validators for the updatedData
      });

      if (!updatedUser) {
        return res.status(401).json({
          success: false,
          message: "User not found."
        });
      } else {
        return res.json({
          success: true,
          data: updatedUser
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async deleteUser() {

  }
}

export default UserController;
