import express from "express";
import { createProduct ,delteProduct,getProductById,getProducts, updateProduct} from "../controllers/productController.js";
import {upload} from '../middleware/uploadMiddleware.js'
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/add',protectRoute,upload.single('image'), createProduct)
router.get('/list',getProducts)
router.get('/:id',getProductById)

router.put('/update/:id',protectRoute,upload.single('image'),updateProduct)

router.delete('/delete/:id',delteProduct)

export default router