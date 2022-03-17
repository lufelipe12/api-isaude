import User from "../models/user.js";
import jwt from "jsonwebtoken";

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
        // vaccines,
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
        // vaccines,
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

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      res.json({ user });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { avatarUrl, password, vaccines } = req.body;

      const userUpdated = await User.findByIdAndUpdate(id, {
        avatarUrl,
        password,
        // vaccines,
        new: true,
      });

      res.status(200).json(userUpdated);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await User.findByIdAndRemove(id);

      res.status(204).json({});
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      }).select("+password");

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (user.password !== password) {
        throw new Error("Senha inválida.");
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "aconteceu algo de errado." });
    }
  }
}

export default UserControllers;
