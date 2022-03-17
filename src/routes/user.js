import { Router } from "express";

import UserControllers from "../controllers/user.js";

const useRouter = Router();

useRouter.post("", (req, res) => UserControllers.createUser(req, res));
useRouter.get("", (req, res) => UserControllers.getAllUsers(req, res));

export default useRouter;
