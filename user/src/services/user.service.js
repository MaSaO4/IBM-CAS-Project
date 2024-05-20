import User from '../models/user.model.js';

/**
 * Retrieves all users with role 'Citizen'
 * @returns {Promise} Promise object representing the list of citizen users
 */
const getAllCitizenUsers = async () => {
    try {
        const users = await User.find({ role: 'Citizen' });
        return users;
    } catch (error) {
        throw new Error('Failed to fetch citizen users');
    }
};

/**
 * Retrieves all users with role 'Employee'
 * @returns {Promise} Promise object representing the list of employee users
 */
const getAllEmployees = async () => {
    try {
        const users = await User.find({ role: 'Employee' });
        return users;
    } catch (error) {
        throw new Error('Failed to fetch employees');
    }
};

/**
 * Retrieves a user by their ID
 * @param {string} userId - The ID of the user to retrieve
 * @returns {Promise} Promise object representing the user
 */
const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user by ID');
    }
};

/**
 * Retrieves a user by their username
 * @param {string} username - The username of the user to retrieve
 * @returns {Promise} Promise object representing the user
 */
const getUserByUserName = async (username) => {
    try {
        const user = await User.findOne({ username });
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user by username');
    }
};

/**
 * Registers a new user
 * @param {object} userData - Data of the user to register
 * @returns {Promise} Promise object representing the registered user
 */
const registerUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (error) {
        if (error.message.includes('duplicate key')) {
            throw new Error(`USER_ALREADY_EXIST: User with username ${userData.username} already exists!`);
        } else {
            throw new Error('Registration failed. Please try again.');
        }
    }
};

/**
 * Authenticates a user during login
 * @param {object} credentials - User login credentials
 * @returns {Promise} Promise object representing the authenticated user
 */
const loginUser = async (credentials) => {
    const { username, password } = credentials;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            throw new Error('Invalid username or password');
        }
        return user;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

/**
 * Updates the profile of a user
 * @param {string} userId - The ID of the user to update
 * @param {object} updatedData - Updated user data
 * @returns {Promise} Promise object representing the updated user
 */
const updateUserProfile = async (userId, updatedData) => {
    try {
        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Failed to update user profile');
    }
};

/**
 * Deletes an employee user by their ID
 * @param {string} employeeId - The ID of the employee to delete
 * @returns {Promise} Promise object representing the deletion status
 */
const deleteEmployee = async (employeeId) => {
    try {
        const resp = await User.findByIdAndDelete(employeeId)
        return resp
    } catch (error) {
        throw new Error('Failed to delete employee');
    }
};

// Define service object with all user-related functions
const userService = {
    getAllCitizenUsers,
    getAllEmployees,
    getUserById,
    getUserByUserName,
    registerUser,
    loginUser,
    updateUserProfile,
    deleteEmployee
};

export default userService;