import { Router } from "express";

import UserControllers from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("", (req, res) => UserControllers.createUser(req, res));
userRouter.post("/login", (req, res) => UserControllers.login(req, res));
userRouter.post(
  "/:id/vaccines",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.createVaccineForUser(req, res)
);

userRouter.get(
  "",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.getAllUsers(req, res)
);
userRouter.get(
  "/:id/vaccines",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.getAllUsersVaccines(req, res)
);
userRouter.get("/:userId/vaccines/:vaccineId", (req, res) =>
  UserControllers.getOneVaccine(req, res)
);
userRouter.get("/:id", (req, res) => UserControllers.getUserById(req, res));

userRouter.patch(
  "/:id",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.updateUser(req, res)
);
userRouter.patch(
  "/:userId/vaccines/:vaccineId",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.updateOneVaccine(req, res)
);

userRouter.delete(
  "/:id",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.deleteUser(req, res)
);
userRouter.delete(
  "/:userId/vaccines/:vaccineId",
  (req, res, next) => isAuthenticated(req, res, next),
  (req, res) => UserControllers.deleteVaccine(req, res)
);

export default userRouter;
