import userService from '../services/userService.js';
import userDAO from '../daos/userDAO.js';
import UserRequestDTO from '../dtos/request/userRequestDTO.js';
import UserResponseDTO from '../dtos/response/userResponseDTO.js';

jest.mock('../daos/userDAO.js');

describe('User Service tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all users', async () => {
    const users = [
      { email: 'test1@example.com', name: 'Test User 1', age: 30, city: 'City1', zipCode: '12345' },
      { email: 'test2@example.com', name: 'Test User 2', age: 25, city: 'City2', zipCode: '67890' }
    ];
    
    userDAO.getUsers.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toEqual(users.map(user => new UserResponseDTO(user)));
    expect(userDAO.getUsers).toHaveBeenCalledTimes(1);
  });

  it('should get a user by id', async () => {
    const user = { email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345' };
    
    userDAO.getUserById.mockResolvedValue(user);

    const result = await userService.getUserById('1');

    expect(result).toEqual(new UserResponseDTO(user));
    expect(userDAO.getUserById).toHaveBeenCalledWith('1');
  });

  it('should return null if user not found by id', async () => {
    userDAO.getUserById.mockResolvedValue(null);

    const result = await userService.getUserById('1');

    expect(result).toBeNull();
    expect(userDAO.getUserById).toHaveBeenCalledWith('1');
  });

  it('should create a new user', async () => {
    const data = { email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345' };
    const createdUser = { ...data, _id: '1' };

    userDAO.createUser.mockResolvedValue(createdUser);

    const result = await userService.createUser(data);

    expect(result).toEqual(new UserResponseDTO(createdUser));
    expect(userDAO.createUser).toHaveBeenCalledWith(new UserRequestDTO(data));
  });

  it('should update a user by id', async () => {
    const data = { email: 'test@example.com', name: 'Test User Updated', age: 31, city: 'City Updated', zipCode: '54321' };
    const updatedUser = { ...data, _id: '1' };

    userDAO.updateUser.mockResolvedValue(updatedUser);

    const result = await userService.updateUser('1', data);

    expect(result).toEqual(new UserResponseDTO(updatedUser));
    expect(userDAO.updateUser).toHaveBeenCalledWith('1', new UserRequestDTO(data));
  });

  it('should return null if updated user not found', async () => {
    const data = { email: 'test@example.com', name: 'Test User Updated', age: 31, city: 'City Updated', zipCode: '54321' };

    userDAO.updateUser.mockResolvedValue(null);

    const result = await userService.updateUser('1', data);

    expect(result).toBeNull();
    expect(userDAO.updateUser).toHaveBeenCalledWith('1', new UserRequestDTO(data));
  });

  it('should delete a user by id', async () => {
    const deletedUser = { email: 'test@example.com', name: 'Test User', age: 30, city: 'City', zipCode: '12345', isDeleted: true };

    userDAO.deleteUser.mockResolvedValue(deletedUser);

    const result = await userService.deleteUser('1');

    expect(result).toEqual(new UserResponseDTO(deletedUser));
    expect(userDAO.deleteUser).toHaveBeenCalledWith('1');
  });

  it('should return null if deleted user not found', async () => {
    userDAO.deleteUser.mockResolvedValue(null);

    const result = await userService.deleteUser('1');

    expect(result).toBeNull();
    expect(userDAO.deleteUser).toHaveBeenCalledWith('1');
  });
});
