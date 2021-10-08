import express from "express";
import { getUser } from "../controllers/user.js";
import { checkToken } from "../middlewares/auth.js";

const router = express.Router()

router.get('/', checkToken, getUser)

export default router