import Complaint from "../models/complaint.model.js";

/**
 * Fetches all complaints.
 * @returns {Promise<Array>} - Array of complaints
 */
const getAllComplaints = async () => {
    console.log('complaint service')
    try {
        const complaints = await Complaint.find().populate('creator','name email')
        return complaints;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch complaints');
    }
};

/**
 * Fetches a complaint by its ID.
 * @param {string} id - ID of the complaint
 * @returns {Promise<Object>} - Complaint object
 */
const getComplaintById = async (id) => {
    try {
        const complaint = await Complaint.findById(id);
        return complaint;
    } catch (error) {
        throw new Error('Failed to fetch complaint by ID');
    }
};

/**
 * Fetches a complaint by its complaint ID.
 * @param {string} complaintId - Complaint ID
 * @returns {Promise<Object>} - Complaint object
 */
const getComplaintByComplaintId = async (complaintId) => {
    try {
        const complaint = await Complaint.findOne({complaintId: complaintId}).populate('creator','name')
        console.log(complaint)
        return complaint;
    } catch (error) {
        throw new Error('Failed to fetch complaint by complaint ID');
    }
};

/**
 * Fetches complaints created by a specific user.
 * @param {string} creatorId - ID of the complaint creator
 * @returns {Promise<Array>} - Array of complaints created by the user
 */
const getComplaintByCreatorId = async (creatorId) => {
    try {
        const complaint = await Complaint.find({creator: creatorId})
        return complaint;
    } catch (error) {
        throw new Error('Failed to fetch complaint by creator ID');
    }
};

/**
 * Creates a new complaint.
 * @param {Object} complaintData - Data for the new complaint
 * @returns {Promise<Object>} - Created complaint object
 */
const createComplaint = async (complaintData) => {
    try {
        const complaint = new Complaint(complaintData);
        const complaintId = Math.random().toString(36).substring(2, 10);
        complaint.complaintId = complaintId
        await complaint.save();
        return complaint;
    } catch (error) {
        if (error.message.includes('duplicate key')) {
            throw new Error(`COMPLAINT_ALREADY_EXIST: COMPLAINT with ${complaintData.complaintId} already exist!`);
        } else {
            throw new Error('Registration failed. Please try again.');
        }
    }
};

/**
 * Updates an existing complaint.
 * @param {string} id - ID of the complaint to update
 * @param {Object} updatedData - Updated data for the complaint
 * @returns {Promise<Object>} - Updated complaint object
 */
const updateComplaint = async (id, updatedData) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(id, updatedData, { new: true });
        if (!complaint) {
            throw new Error('Complaint not found');
        }
        return complaint;
    } catch (error) {
        throw new Error('Failed to update complaint');
    }
};

const complaintService = {
    getAllComplaints,
    getComplaintById,
    getComplaintByComplaintId,
    getComplaintByCreatorId,
    createComplaint,
    updateComplaint
};

export default complaintService;