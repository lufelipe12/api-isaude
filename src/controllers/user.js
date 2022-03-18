import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Vaccine from "../models/vaccines.js";

class UserControllers {
  static async createUser(req, res) {
    try {
      const {
        name,
        avatarUrl,
        createdAt,
        email,
        gender,
        dateOfBirth,
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
        dateOfBirth,
        state,
        city,
        cpf,
        password,
        vaccines,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.find();

      return res.json({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      return res.json({ user });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { avatarUrl, password, vaccines } = req.body;

      const userUpdated = await User.findByIdAndUpdate(id, {
        avatarUrl,
        password,
        vaccines,
        new: true,
      });

      return res.status(200).json(userUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      await User.findByIdAndRemove(id);

      return res.status(204).json({});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
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

      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "aconteceu algo de errado." });
    }
  }

  static async createVaccineForUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      const { name, manufacturer, batch, applicationDate, location, nextShot } =
        req.body;

      const vaccine = await Vaccine.create({
        name,
        manufacturer,
        batch,
        applicationDate,
        location,
        nextShot,
      });

      const userVaccines = user.vaccines;

      const newVaccines = await User.findByIdAndUpdate(id, {
        vaccines: [...userVaccines, vaccine],
      });

      return res.status(200).json(newVaccines);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "aconteceu algo de errado." });
    }
  }

  static async getAllUsersVaccines(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);
      const userVaccines = user.vaccines;

      return res.json(userVaccines);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async getOneVaccine(req, res) {
    try {
      const { userId, vaccineId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const vaccine = await Vaccine.findById(vaccineId);

      if (!vaccine) {
        return res.status(404).json({ error: "Vacina não encontrado." });
      }

      return res.json(vaccine);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async updateOneVaccine(req, res) {
    try {
      const { userId, vaccineId } = req.params;

      const { name, manufacturer, batch, applicationDate, location, nextShot } =
        req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const vaccine = await Vaccine.findById(vaccineId);

      if (!vaccine) {
        return res.status(404).json({ error: "Vacina não encontrada." });
      }

      const newVaccines = [...user.vaccines];

      for (let i = 0; i < newVaccines.length; i++) {
        if (newVaccines[i]._id.toString() === vaccineId) {
          newVaccines[i].name = name !== undefined ? name : newVaccines[i].name;
          newVaccines[i].manufacturer =
            manufacturer !== undefined
              ? manufacturer
              : newVaccines[i].manufacturer;
          newVaccines[i].batch =
            batch !== undefined ? batch : newVaccines[i].batch;
          newVaccines[i].applicationDate =
            applicationDate !== undefined
              ? applicationDate
              : newVaccines[i].applicationDate;
          newVaccines[i].location =
            location !== undefined ? location : newVaccines[i].location;
          newVaccines[i].nextShot =
            nextShot !== undefined ? nextShot : newVaccines[i].nextShot;
        }
      }

      const userUpdated = await User.findByIdAndUpdate(userId, {
        vaccines: [...newVaccines],
        new: true,
      });

      return res.json(userUpdated);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }

  static async deleteVaccine(req, res) {
    try {
      const { userId, vaccineId } = req.params;

      const user = await User.findById(userId);

      console.log(user.vaccines);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      const newVaccinesList = user.vaccines.filter(
        (vaccine) => vaccine._id.toString() !== vaccineId
      );

      await User.findByIdAndUpdate(userId, {
        vaccines: [...newVaccinesList],
      });

      return res.status(204).json({});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Algo deu errado." });
    }
  }
}

export default UserControllers;
