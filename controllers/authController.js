import User from "../dtos/models/userModel.js";
import authDAO from "../daos/authDAO.js";
import userDAO from "../daos/userDAO.js";

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const isMatch = await authDAO.comparePassword(user, password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        const token = await authDAO.generateToken(user);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error!', error: error.message });
    }
}

const register = async (req, res) => {
    try {
        const { email, password, name, age, city, zipCode } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        const hashedPassword = await authDAO.hashPassword(password);

        const newUser = await userDAO.createUser({
            email,
            password: hashedPassword,
            name,
            age,
            city,
            zipCode
        });

        const token = await authDAO.generateToken(newUser);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error!', error: error.message });
    }
}

export default {
    login,
    register
};