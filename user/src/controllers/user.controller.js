import userService from '../services/user.service.js';
import { generateToken } from '../services/auth.service.js';
import { sendEmail } from '../services/email.service.js';

// Controller function to get all citizen users
const getAllCitizens = async (req, res,) => {
    console.log('controller');
    try {
        const users = await userService.getAllCitizenUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get all employee users
const getAllEmployees = async (req, res,) => {
    console.log('controller');
    try {
        const users = await userService.getAllEmployees();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a user by ID
const getUserById = async (req, res) => {
    console.log('controller');
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach user object to req
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a user by username
const getUserByUserName = async (req, res) => {
    console.log('controller');
    try {
        console.log(req)
        const user = await userService.getUserByUserName(req.body.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newPassword = Math.random().toString(36).substring(2, 12);
        const updatedUser = await userService.updateUserProfile(user.id,{password: newPassword});
        sendEmail(updatedUser,'Your Password Has Been Successfully Reset','forgotPassword', updatedUser)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to register a new user
const registerUser = async (req, res) => {
    console.log('controller');
    console.log(req.body);
    try {
        const user = await userService.registerUser(req.body);
        sendEmail(user,'Welcome to City Administration System!','welcome', user)
        res.status(201).json(user);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
};

// Controller function to login a user
const loginUser = async (req, res) => {
    console.log('controller');
    console.log(req.body);
    try {
        const user = await userService.loginUser(req.body);
        const token = generateToken(user);
        res.status(200).json({ user, token,'registration:':user.registrationDate.getFullYear});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

// Controller function to update a user's profile
const updateUserProfile = async (req, res) => {
    console.log('controller');
    console.log(req.body);
    console.log(req.params.id); 
    const userId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedUser = await userService.updateUserProfile(userId, updatedData);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete an employee
const deleteEmployee = async (req,res)=>{
    const employeeId = req.params.id;
    try {
        const resp = await userService.deleteEmployee(employeeId)
        res.status(200).json(resp)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export {getAllCitizens, getAllEmployees,getUserById,getUserByUserName, registerUser, loginUser, updateUserProfile, deleteEmployee };