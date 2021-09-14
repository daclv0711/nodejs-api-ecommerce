import express from "express";
import * as preferents from "../controllers/preferents.js";

const router = express.Router()

router.get('/', preferents.getPreferent)

router.post('/', preferents.postPreferent)

router.put('/:id', preferents.updatePreferent)

router.patch('/:id', preferents.patchPreferent)

router.delete('/:id', preferents.deletePreferent)

export default router