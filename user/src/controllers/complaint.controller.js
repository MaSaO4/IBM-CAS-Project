import complaintService from "../services/complaint.service.js";
import userService from '../services/user.service.js';
import { sendEmail } from "../services/email.service.js";

// Controller function to get all complaints
const getAllComplaints = async (req, res) => {
    console.log('controller');
    try {
        const complaints = await complaintService.getAllComplaints();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a complaint by ID
const getComplaintById = async (req, res) => {
    console.log('controller');
    const id = req.params.id;
    try {
        const complaint = await complaintService.getComplaintById(id)
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a complaint by complaint ID
const getComplaintByComplaintId = async (req, res) => {
    console.log('controller');
    const complaintId = req.params.id;
    try {
        const complaint = await complaintService.getComplaintByComplaintId(complaintId)
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get complaints by creator ID
const getComplaintByCreatorId = async (req, res) => {
    console.log('controller');
    const creatorId = req.params.id;
    try {
        const complaint = await complaintService.getComplaintByCreatorId(creatorId)
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new complaint
const createComplaint = async (req, res) => {
    console.log('controller');
    console.log(req.body);
    try {
        const complaint = await complaintService.createComplaint(req.body);
        const user = await userService.getUserById(req.body.creator);
        sendEmail(user, 'Complaint Registration Confirmation', 'complaintRegistration', complaint.complaintId);
        res.status(201).json(complaint);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update a complaint
const updateComplaint = async (req, res) => {
    console.log('controller');
    console.log(req.body);
    console.log(req.params.id);
    const id = req.params.id;
    const updatedData = req.body;
    try {
        const updatedComplaint = await complaintService.updateComplaint(id, updatedData);
        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to respond to a citizen regarding a complaint
const respondToCitizen = async (req, res) => {
    try {
        const data = req.body.user;
        console.log(data);
        const resp = await sendEmail(data, 'Ref to your complaint', 'respondToCitizen', data.content);
        res.status(200).json(resp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { getAllComplaints, getComplaintById, getComplaintByComplaintId, getComplaintByCreatorId, createComplaint, updateComplaint, respondToCitizen };