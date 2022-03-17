import { Router } from "express";

import UserControllers from "../controllers/user.js";

const useRouter = Router();

useRouter.post("", (req, res) => UserControllers.createUser(req, res));
useRouter.get("", (req, res) => UserControllers.getAllUsers(req, res));
useRouter.get("/:id", (req, res) => UserControllers.getUserById(req, res));
useRouter.patch("/:id", (req, res) => UserControllers.updateUser(req, res));
useRouter.delete("/:id", (req, res) => UserControllers.deleteUser(req, res));

export default useRouter;
