import UserModel from "../models/user.model.js";

class AuthController {
  constructor() { }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email not registered."
        });
      }

      if (user && user.password !== password) {
        return res.status(401).json({
          success: false,
          message: "Password did not match."
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
}

export default AuthController;
