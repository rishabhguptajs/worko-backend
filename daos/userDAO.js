import User from '../dtos/models/userModel.js'

class UserDAO {
    async getUsers(){
        return await User.find({ isDeleted: false });
    }

    async getUserById(id){
        return await User.findById(id).where('isDeleted').equals(false);
    }

    async createUser(user){
        const newUser = new User(user);
        return await newUser.save();
    }

    async updateUser(id, user){
        return await User.findByIdAndUpdate(id, user, { new: true }).where('isDeleted').equals(false);
    }

    async deleteUser(id){
        return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

export default new UserDAO();