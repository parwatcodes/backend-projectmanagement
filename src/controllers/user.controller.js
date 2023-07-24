import UserModel from "../models/user.model.js";

class UserController {
  constructor() { }

  static async getUsers(req, res, next) {
    try {
      let users = await UserModel.find();

      res.json({
        success: true,
        data: users
      })
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

      await newUser.save();

      return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email not registered."
        })
      }

      if (user && user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Password did not match."
        })
      }

      return res.json({
        success: true,
        data: user
      })
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  static async updateUser() {

  }

  static async deleteUser() {

  }
}

export default UserController;
