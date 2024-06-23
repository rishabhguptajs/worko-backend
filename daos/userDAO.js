import User from '../dtos/models/userModel.js'

class UserDAO {
    // this is used in order to get all the users
    async getUsers(){
        return await User.find({ isDeleted: false });
    }

    // this is used in order to get the user by id
    async getUserById(id){
        return await User.findById(id).where('isDeleted').equals(false);
    }

    // this is used in order to create a new user
    async createUser(user){
        const newUser = new User(user);
        return await newUser.save();
    }

    // this is used in order to update the user
    async updateUser(id, user){
        return await User.findByIdAndUpdate(id, user, { new: true }).where('isDeleted').equals(false);
    }

    // this is used in order to softly delete the user, so as to not lose the data
    async deleteUser(id){
        return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    }
}

export default new UserDAO();