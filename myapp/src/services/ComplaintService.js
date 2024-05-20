import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const ComplaintService = {
    // Get all complaints for a specific user
    getAllComplaints: async(userId)=>{
        try {
            const resp = await axios.get(`${BASE_URL}/complaints/${userId}`)
            return resp;
        } catch (error) {
            throw error
        }
    },

    // Get a complaint by its ID
    getComplaintByComplaintId: async (complaintId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/complaint-by-complaintId/${complaintId}`)
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Get complaints by creator ID
    getComplaintByCreatorId: async (creatorId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/complaint-by-creatorId/${creatorId}`)
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Create a new complaint
    createComplaint: async (complaintData) => {
        try {
            const resp = await axios.post(`${BASE_URL}/complaint`, complaintData)
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Update a complaint
    updateComplaint: async (id,complaintData) => {
        try {
            const resp = await axios.put(`${BASE_URL}/complaint/${id}`, complaintData)
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Send email response to citizen
    respondToCitizen: async (data) => {
        try {
            const resp = await axios.post(`${BASE_URL}/sendMail`,data)
            return resp
        } catch (error) {
            throw error
        }
    }
}

export default ComplaintService;