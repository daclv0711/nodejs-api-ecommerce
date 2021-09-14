import express from "express";
import * as categoryMenus from "../controllers/categoryMenus.js";

const router = express.Router()

router.get('/', categoryMenus.getCategoryMenu)

router.post('/', categoryMenus.postCategoryMenu)

router.put('/:id', categoryMenus.updateCategoryMenu)

router.patch('/:id', categoryMenus.patchCategoryMenu)

router.delete('/:id', categoryMenus.deleteCategoryMenu)

export default router