import mongoose from "mongoose";

// Defining an array of complaint types
const complaintTypes = ['Noise', 'Road Maintenance', 'Waste Management', 'Public Safety', 'Infrastructure', 'Environmental', 'Building Code', 'Traffic'];

// Defining the schema for complaints
const complaintSchema = new mongoose.Schema({
    complaintId: {
        type: String,
        required: true,
        unique: true
    }, // Unique identifier for the complaint
    title: { type: String, required: true }, // Title of the complaint
    description: { type: String, required: true }, // Description of the complaint
    status: { 
        type: String, 
        enum: ['open', 'in progress', 'resolved', 'dismissed'], 
        default: 'open'
    }, // Status of the complaint
    address: {
        addressLine1: { type: String }, // Address line 1
        state: { type: String }, // State
        city: { type: String }, // City
        pincode: { type: String } // Pincode
    }, // Address associated with the complaint
    complaintType: { 
        type: String, 
        enum: complaintTypes,
        required: true 
    }, // Type of complaint
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the complaint
    creationDate: { type: Date, default: Date.now }, // Date when the complaint was created
    lastUpdatedDate: { type: Date, default: Date.now } // Date when the complaint was last updated
});

// Create the Complaint model based on the complaintSchema
const Complaint = mongoose.model('Complaint', complaintSchema);

export default Complaint;