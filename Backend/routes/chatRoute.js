import express from 'express';
import { handleChat } from '../controllers/chatController.js';
import { apiLimiter } from '../middlewares/rateLimiter.js';

const chatRouter = express.Router();

chatRouter.post('/', apiLimiter, handleChat);

export default chatRouter;
