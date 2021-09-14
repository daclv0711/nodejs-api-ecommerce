import Slide from "../models/Slide.js";
import * as slides from "./index.js";

export const getSlide = slides.getDatas(Slide)

export const postSlide = slides.postData(Slide)

export const updateSlide = slides.putData(Slide)

export const patchSlide = slides.patchData(Slide)

export const deleteSlide = slides.deleteData(Slide)