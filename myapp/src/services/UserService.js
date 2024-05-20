import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const UserService = {
    // User login
    login: async (credentials) => {
        try {
            const resp = await axios.post(`${BASE_URL}/login`, credentials);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Get user by ID
    getUser: async (userId, token) => {
        try {
            const resp = await axios.get(`${BASE_URL}/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Forgot password
    forgotPassword: async (username) => {
        try {
            const resp = await axios.post(`${BASE_URL}/get-pass`, username);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Register a new user
    registerUser: async (newUser) => {
        try {
            const resp = await axios.post(`${BASE_URL}/register`, newUser);
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Update user information
    updateUser: async (userId, token, updateData) => {
        try {
            const resp = await axios.put(`${BASE_URL}/user/${userId}`, updateData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;