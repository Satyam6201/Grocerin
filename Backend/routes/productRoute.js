import express from 'express';
import authSeller from '../middlewares/authSeller.js';
import { upload } from '../configs/multer.js';
import { addProduct, changeStock, deleteProduct, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array("images"), authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.all('/id', productById);
productRouter.post('/stock', authSeller, changeStock);
productRouter.post('/delete', authSeller, deleteProduct);

export default productRouter;
