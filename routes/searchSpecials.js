import express from "express";
import * as searchSpecials from "../controllers/searchSpecials.js";

const router = express.Router()

router.get('/', searchSpecials.getSearchSpecial)

router.post('/', searchSpecials.postSearchSpecial)

router.put('/:id', searchSpecials.updateSearchSpecial)

router.patch('/:id', searchSpecials.patchSearchSpecial)

router.delete('/:id', searchSpecials.deleteSearchSpecial)

export default router