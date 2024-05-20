import axios from "axios";

const BASE_URL = 'http://localhost:8090';

const AdminService =  {

    login: async (credentials) => {
        try {
            const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
            return response;
        } catch (error) {
            throw error;
        }
    },

    getAdmin: async (adminId, token) =>{
        try {
            const resp = await axios.get(`${BASE_URL}/admin/${adminId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    updateAdmin: async (adminId, updateData) => {
        try {
            const resp = await axios.put(`${BASE_URL}/admin/${adminId}`, updateData);
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
};

export default AdminService;