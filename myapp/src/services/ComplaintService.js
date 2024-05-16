import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const ComplaintService = {

    getAllComplaints: async(userId)=>{

        try {
            const resp = await axios.get(`${BASE_URL}/complaints/${userId}`)
            return resp;
        } catch (error) {
            throw error
        }
    },

    getComplaintByComplaintId: async (complaintId) => {

        try {

            const resp = await axios.get(`${BASE_URL}/complaint-by-complaintId/${complaintId}`)
            return resp;

        } catch (error) {

            throw error;

        }

    },

    getComplaintByCreatorId: async (creatorId) => {

        try {

            const resp = await axios.get(`${BASE_URL}/complaint-by-creatorId/${creatorId}`)
            return resp;

        } catch (error) {

            throw error;

        }

    },

    createComplaint: async (complaintData) => {

        try {
            console.log(complaintData)

            const resp = await axios.post(`${BASE_URL}/complaint`, complaintData)
            return resp;

        } catch (error) {

            throw error;

        }

    },

    updateComplaint: async (id,complaintData) => {

        try {

            const resp = await axios.put(`${BASE_URL}/complaint/${id}`, complaintData)
            return resp;

        } catch (error) {

            throw error;

        }

    }

}

export default ComplaintService;