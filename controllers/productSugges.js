import ProductSugges from "../models/ProductSugges.js";
import * as ProductSuggess from "./index.js";

export const getProductSugges = ProductSuggess.getDatas(ProductSugges)

export const postProductSugges = ProductSuggess.postData(ProductSugges)

export const updateProductSugges = ProductSuggess.putData(ProductSugges)

export const patchProductSugges = ProductSuggess.patchData(ProductSugges)

export const deleteProductSugges = ProductSuggess.deleteData(ProductSugges)