import mongoose from 'mongoose';

// MongoDB connection string
const connectionString = 'mongodb://localhost:27017';
// Database name
const databaseName = 'ibm_project';

// Connecting MongoDB
mongoose.connect(`${connectionString}/${databaseName}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));