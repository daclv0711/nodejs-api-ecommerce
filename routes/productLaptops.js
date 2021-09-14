import express from "express";
import * as laptop from "../controllers/productLaptops.js";

const router = express.Router()

router.get('/', laptop.getLaptops)

router.post('/', laptop.postLaptop)

router.put('/:id', laptop.updateLaptop)

router.patch('/:id', laptop.patchLaptop)

router.delete('/:id', laptop.deleteLaptop)

export default router