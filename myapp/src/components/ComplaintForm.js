import React, { useState } from 'react';
import ComplaintService from '../services/ComplaintService';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

const complaintTypes = ['Noise', 'Road Maintenance', 'Waste Management', 'Public Safety', 'Infrastructure', 'Environmental', 'Building Code', 'Traffic'];

const ComplaintForm = () => {
  const userId = useSelector(store => store.user.currentUser._id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    creator: '',
    address: {
      addressLine1: '',
      state: '',
      city: '',
      pincode: ''
    },
    complaintType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = { ...formData, 'creator': userId };
    try {
      const complaint = await ComplaintService.createComplaint(newFormData);
      if (complaint.status === 201) {
        setFormData({
          title: '',
          description: '',
          status: 'open',
          creator: '',
          address: {
            addressLine1: '',
            state: '',
            city: '',
            pincode: ''
          },
          complaintType: ''
        });
        toast.success('Complaint created');
      }
    } catch (error) {
      toast.error('Please try again later!');
    }
  };

  return (
    <div className="container">
      <h2>Complaint Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="complaintType" className="form-label">Complaint Type</label>
          <select className="form-select" id="complaintType" name="complaintType" value={formData.complaintType} onChange={handleChange} required>
            <option value="">Select Complaint Type</option>
            {complaintTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        {/* Other form inputs */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ComplaintForm;
