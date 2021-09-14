import SearchSpecial from "../models/SearchSpecial.js";
import * as searchSpecials from "./index.js";

export const getSearchSpecial = searchSpecials.getDatas(SearchSpecial)

export const postSearchSpecial = searchSpecials.postData(SearchSpecial)

export const updateSearchSpecial = searchSpecials.putData(SearchSpecial)

export const patchSearchSpecial = searchSpecials.patchData(SearchSpecial)

export const deleteSearchSpecial = searchSpecials.deleteData(SearchSpecial)