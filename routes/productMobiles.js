import express from "express";
import * as mobiles from "../controllers/productMobiles.js";

const router = express.Router()

router.get('/', mobiles.getMobile)

router.post('/', mobiles.postMobile)

router.put('/:id', mobiles.updateMobile)

router.patch('/:id', mobiles.patchMobile)

router.delete('/:id', mobiles.deleteMobile)

export default router