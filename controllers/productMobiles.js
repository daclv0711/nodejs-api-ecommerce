import productMobiles from "../models/ProductMobiles.js";
import * as mobiles from "./index.js";

export const getMobile = mobiles.getDatas(productMobiles)

export const postMobile = mobiles.postData(productMobiles)

export const updateMobile = mobiles.putData(productMobiles)

export const patchMobile = mobiles.putData(productMobiles)

export const deleteMobile = mobiles.deleteData(productMobiles)