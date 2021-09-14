import express from "express";
import * as productSugges from "../controllers/productSugges.js";

const router = express.Router()

router.get('/', productSugges.getProductSugges)

router.post('/', productSugges.postProductSugges)

router.put('/:id', productSugges.updateProductSugges)

router.patch('/:id', productSugges.patchProductSugges)

router.delete('/:id', productSugges.deleteProductSugges)

export default router