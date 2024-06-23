import userDAO from "../daos/userDAO.js";
import UserRequestDTO from "../dtos/request/userRequestDTO.js";
import UserResponseDTO from "../dtos/response/userResponseDTO.js";

const getAllUsers = async () => {
    const users = await userDAO.getUsers();
    return users.map(user => new UserResponseDTO(user));
}

const getUserById = async (id) => {
    const user = await userDAO.getUserById(id);
    if (user) {
        return new UserResponseDTO(user);
    }

    return null;
}

const createUser = async (data) => {
    const user = new UserRequestDTO(data);
    const newUser = await userDAO.createUser(user);

    return new UserResponseDTO(newUser);
}

const updateUser = async (id, data) => {
    const user = new UserRequestDTO(data);
    const updatedUser = await userDAO.updateUser(id, user);

    if (updatedUser) {
        return new UserResponseDTO(updatedUser);
    }

    return null;
}

const deleteUser = async (id) => {
    const deletedUser = await userDAO.deleteUser(id);

    if (deletedUser) {
        return new UserResponseDTO(deletedUser);
    }

    return null;
}

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}