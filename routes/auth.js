import express from "express";
import { existed, getAccount, login, logOut, refreshToken, register } from "../controllers/auth.js";
import { validateRegister } from "../middlewares/auth.js";

const router = express.Router()

router.get('/', getAccount)

router.post('/login', login)

router.post('/exist', existed)

router.post('/register', validateRegister, register)

router.post('/token', refreshToken)

router.post('/logout', logOut)

export default router