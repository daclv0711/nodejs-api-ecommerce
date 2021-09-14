import ProductLaptop from "../models/ProductLaptop.js";
import * as laptops from "./index.js";

export const getLaptops = laptops.getDatas(ProductLaptop)

export const postLaptop = laptops.postData(ProductLaptop)

export const updateLaptop = laptops.putData(ProductLaptop)

export const patchLaptop = laptops.putData(ProductLaptop)

export const deleteLaptop = laptops.deleteData(ProductLaptop)