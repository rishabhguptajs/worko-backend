import express from 'express'
import userController from '../controllers/userController.js';
import { authenticate } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, userController.listUsers);

router.get('/:id', authenticate, userController.getUserById);

router.post('/', userController.createUser);

router.put('/:id', authenticate, userController.updateUser);

router.patch('/:id', authenticate, userController.updateUser);

router.delete('/:id', authenticate, userController.deleteUser);

export default router;