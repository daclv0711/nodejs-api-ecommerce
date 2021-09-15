import express from "express";
import { login, register, validateRegister } from "../controllers/auth.js";

const router = express.Router()

router.post('/login', login)

router.post('/register', validateRegister, register)

export default router