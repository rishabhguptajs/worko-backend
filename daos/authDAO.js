import User from "../dtos/models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthDAO {
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async comparePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async generateToken(user) {
        return await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

export default new AuthDAO();