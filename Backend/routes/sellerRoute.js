import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', authLimiter, sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', authSeller, sellerLogout);

export default sellerRouter;
