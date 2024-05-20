import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const EmployeeService = {
    // Get all employees
    getEmployees: async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/employees`)
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Update an employee
    updateEmployee: async (updateData) => {
        try {
            const resp = await axios.put(`${BASE_URL}/user/${updateData._id}`, updateData)
            return resp.data;
        } catch (error) {
            throw new Error("Failed to Update");
        }
    },

    // Delete an employee
    deleteEmployee: async (empId) => {
        try {
            const resp = await axios.delete(`${BASE_URL}/employee/${empId}`)
            return resp;
        } catch (error) {
            throw new Error("Failed to Delete");
        }
    },

    // Add a new employee
    addEmployee: async (employee) => {
        try {
            const resp = await axios.post(`${BASE_URL}/register`, employee)
            return resp.data;
        } catch (error) {
            throw new Error("Failed to add");
        }
    }
}

export default EmployeeService;
