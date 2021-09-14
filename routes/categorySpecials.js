import express from "express";
import * as categorySpecials from "../controllers/categorySpecials.js";

const router = express.Router()

router.get('/', categorySpecials.getCategorySpecial)

router.post('/', categorySpecials.postCategorySpecial)

router.put('/:id', categorySpecials.updateCategorySpecial)

router.patch('/:id', categorySpecials.patchCategorySpecial)

router.delete('/:id', categorySpecials.deleteCategorySpecial)

export default router