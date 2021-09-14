import express from "express";
import * as slides from "../controllers/slides.js";

const router = express.Router()

router.get('/', slides.getSlide)

router.post('/', slides.postSlide)

router.put('/:id', slides.updateSlide)

router.patch('/:id', slides.patchSlide)

router.delete('/:id', slides.deleteSlide)

export default router