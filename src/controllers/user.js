import User from "../models/user.js";

class UserControllers {
  static async createUser(req, res) {
    try {
      const {
        name,
        avatarUrl,
        createdAt,
        email,
        gender,
        dob,
        state,
        city,
        cpf,
        password,
        vaccines,
      } = req.body;

      const user = await User.create({
        name,
        avatarUrl,
        createdAt,
        email,
        gender,
        dob,
        state,
        city,
        cpf,
        password,
        vaccines,
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();

      res.json({ users });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Algo deu errado." });
    }
  }
}

export default UserControllers;
