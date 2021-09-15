import express from "express";
import { getAccount, login, register, validateRegister } from "../controllers/auth.js";

const router = express.Router()

router.get('/', getAccount)

router.post('/login', login)

router.post('/register', validateRegister, register)

export default router