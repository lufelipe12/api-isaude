import express from "express";

import useRouter from "./routes/user.js";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());

app.use("/user", useRouter);

export default app;
