import CategoryMenu from "../models/CategoryMenu.js";
import * as categoryMenus from "./index.js";

export const getCategoryMenu = categoryMenus.getDatas(CategoryMenu)

export const postCategoryMenu = categoryMenus.postData(CategoryMenu)

export const updateCategoryMenu = categoryMenus.putData(CategoryMenu)

export const patchCategoryMenu = categoryMenus.patchData(CategoryMenu)

export const deleteCategoryMenu = categoryMenus.deleteData(CategoryMenu)