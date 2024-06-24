import userController from '../controllers/userController.js';
import userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import { createUserSchema, updateUserSchema, validateIdSchema } from "../utils/validator.js";

jest.mock('../services/userService.js');
jest.mock('jsonwebtoken');
jest.mock('../utils/validator.js');

describe('User Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('listUsers', () => {
        it('should return a list of users', async () => {
            const users = [{ id: 1, name: 'John Doe' }];
            userService.getAllUsers.mockResolvedValue(users);

            await userController.listUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ users, message: 'Users retrieved successfully!' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Something went wrong';
            userService.getAllUsers.mockRejectedValue(new Error(errorMessage));

            await userController.listUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            const user = { id: 1, name: 'John Doe' };
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.getUserById.mockResolvedValue(user);

            await userController.getUserById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ user, message: 'User retrieved successfully!' });
        });

        it('should return 400 if ID is invalid', async () => {
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: { details: [{ message: 'Invalid ID' }] } });

            await userController.getUserById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
        });

        it('should return 404 if user not found', async () => {
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.getUserById.mockResolvedValue(null);

            await userController.getUserById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found!' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Something went wrong';
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.getUserById.mockRejectedValue(new Error(errorMessage));

            await userController.getUserById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
            const token = 'token';
            req.body = user;
            createUserSchema.validate.mockReturnValue({ error: null });
            userService.createUser.mockResolvedValue(user);
            jwt.sign.mockReturnValue(token);

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ user, token });
        });

        it('should return 400 if validation fails', async () => {
            req.body = {};
            createUserSchema.validate.mockReturnValue({ error: { details: [{ message: 'Validation failed' }] } });

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Something went wrong';
            req.body = { name: 'John Doe' };
            createUserSchema.validate.mockReturnValue({ error: null });
            userService.createUser.mockRejectedValue(new Error(errorMessage));

            await userController.createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const user = { id: 1, name: 'John Doe' };
            req.params = { id: '1' };
            req.body = { name: 'John Doe' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            updateUserSchema.validate.mockReturnValue({ error: null });
            userService.updateUser.mockResolvedValue(user);

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ user, message: 'User updated successfully!' });
        });

        it('should return 400 if ID is invalid', async () => {
            req.params = { id: '1' };
            req.body = { name: 'John Doe' };
            validateIdSchema.validate.mockReturnValue({ error: { details: [{ message: 'Invalid ID' }] } });

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
        });

        it('should return 400 if validation fails', async () => {
            req.params = { id: '1' };
            req.body = { name: 'John Doe' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            updateUserSchema.validate.mockReturnValue({ error: { details: [{ message: 'Validation failed' }] } });

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
        });

        it('should return 404 if user not found', async () => {
            req.params = { id: '1' };
            req.body = { name: 'John Doe' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            updateUserSchema.validate.mockReturnValue({ error: null });
            userService.updateUser.mockResolvedValue(null);

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found!' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Something went wrong';
            req.params = { id: '1' };
            req.body = { name: 'John Doe' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            updateUserSchema.validate.mockReturnValue({ error: null });
            userService.updateUser.mockRejectedValue(new Error(errorMessage));

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.deleteUser.mockResolvedValue(true);

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully!' });
        });

        it('should return 400 if ID is invalid', async () => {
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: { details: [{ message: 'Invalid ID' }] } });

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID' });
        });

        it('should return 404 if user not found', async () => {
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.deleteUser.mockResolvedValue(null);

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found!' });
        });

        it('should handle errors', async () => {
            const errorMessage = 'Something went wrong';
            req.params = { id: '1' };
            validateIdSchema.validate.mockReturnValue({ error: null });
            userService.deleteUser.mockRejectedValue(new Error(errorMessage));

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
});
