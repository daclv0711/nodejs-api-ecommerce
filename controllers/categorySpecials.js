import CategorySpecial from "../models/CategorySpecial.js";
import * as categorySpecials from "./index.js";

export const getCategorySpecial = categorySpecials.getDatas(CategorySpecial)

export const postCategorySpecial = categorySpecials.postData(CategorySpecial)

export const updateCategorySpecial = categorySpecials.putData(CategorySpecial)

export const patchCategorySpecial = categorySpecials.patchData(CategorySpecial)

export const deleteCategorySpecial = categorySpecials.deleteData(CategorySpecial)