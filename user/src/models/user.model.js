import mongoose from "mongoose";

// Defining the schema for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Name of the user
    },
    username: {
        type: String,
        required: true,
        unique: true // Username of the user (must be unique)
    },
    email: {
        type: String,
        required: true // Email of the user
    },
    password: {
        type: String,
        required: true // Password of the user
    },
    phone: {
        type: Number,
        required: true // Phone number of the user
    },
    designation: {
        type: String // Designation of the user
    },
    role: {
        type: String,
        enum: ['Citizen', 'Employee'], // Role of the user (Citizen or Employee)
        required: true,
        default: 'Citizen' // Default role is Citizen
    },
    registrationDate: {
        type: Date,
        default: Date.now // Date when the user registered
    }
});

// Create the User model based on the userSchema
const User = mongoose.model('User', userSchema);

export default User;