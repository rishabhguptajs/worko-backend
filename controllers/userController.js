import userService from "../services/userService.js";
import jwt from 'jsonwebtoken';
import { createUserSchema, updateUserSchema, validateIdSchema } from "../utils/validator.js";

const listUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ 
            users,
            message: 'Users retrieved successfully!'
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = validateIdSchema.validate({ id });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ 
            user,
            message: 'User retrieved successfully!'
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const { error } = createUserSchema.validate(data);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await userService.createUser(data);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        let { error } = validateIdSchema.validate({ id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        ({ error } = updateUserSchema.validate(data));
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await userService.updateUser(id, data);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ user, message: 'User updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = validateIdSchema.validate({ id });

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await userService.deleteUser(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    listUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};