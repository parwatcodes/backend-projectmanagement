class UserController {
  constructor() { }

  static async getUsers(req, res, next) {
    console.log("inside controller")
    return res.send('ddd')
  }

  static async getAdmins() {

  }

  static async addUser() {

  }

  static async getUser() {

  }

  static async updateUser() {

  }

  static async deleteUser() {

  }
}

export default UserController;
