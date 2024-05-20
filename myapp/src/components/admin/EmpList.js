import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import EmployeeService from '../../services/EmployeeService';
import { useDispatch, useSelector } from 'react-redux';
import { setEmpList } from '../../redux/EmpSlice';

const EmpList = () => {
  // State variables
  const [show, setShow] = useState(false); // For showing the update modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // For showing the delete confirmation modal
  const [updateData, setUpdateData] = useState({}); // For storing the updated employee data
  const [selectedData, setSelectedData] = useState({}); // For storing the selected employee data
  const [searchValue, setSearchValue] = useState(''); // For storing the search input value
  const [searchedData, setSearchedData] = useState([]); // For storing the filtered data based on search

  // Redux store data
  const data = useSelector(store => store.emp.empList); // Employee list from Redux store
  const dispatch = useDispatch();

  // Fetch employees on component mount
  useEffect(() => {
    EmployeeService.getEmployees().then((resp) => {
      dispatch(setEmpList(resp));
    }).catch((error) => {
      toast.error(error.message);
    });
  }, []);

  // Function to handle closing the update modal
  const handleClose = () => setShow(false);

  // Function to handle closing the delete confirmation modal
  const handleCloseDelete = () => setShowDeleteModal(false);

  // Function to handle showing the update modal and setting data to be updated
  const handleShow = (e) => {
    setSelectedData(e);
    setUpdateData({
      _id: e._id,
      name: e.name,
      email: e.email,
      username: e.username,
      phone: e.phone,
      designation: e.designation
    });
    setShow(true);
  };

  // Function to handle input change in the update modal
  const handleInputChange = (event) => {
    setUpdateData({ ...updateData, [event.target.name]: event.target.value });
  };

  // Function to handle submission of the update form
  const handleSubmit = () => {
    EmployeeService.updateEmployee(updateData).then((resp) => {
      dispatch(setEmpList(data.map(item => item._id === selectedData._id ? updateData : item)));
      toast.success("Record Updated");
    }).catch((error) => {
      toast.error(error.message);
    });
    setShow(false);
  };

  // Function to remove an employee
  const removeItem = (id) => {
    setSelectedData({ employeeId: id });
    setShowDeleteModal(true);
  };

  // Function to confirm deletion of an employee
  const confirmDelete = () => {
    EmployeeService.deleteEmployee(selectedData.employeeId).then((resp) => {
      dispatch(setEmpList(data.filter(item => item._id !== selectedData.employeeId)));
      toast.success("Employee Deleted");
    }).catch((error) => {
      toast.error(error.message);
    });
    setShowDeleteModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Effect to filter data based on search input
  useEffect(() => {
    setSearchedData(data.filter((emp) => emp.name.toLowerCase().startsWith(searchValue.toLowerCase())));
  }, [searchValue]);

  return (
    <>
      {/* Employee list section */}
      <h2>Employees:</h2>
      <input className="form-control me-2" name='search' type="search" value={searchValue} placeholder="Search" aria-label="Search" onChange={handleSearchChange}></input>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Phone</th>
            <th scope="col">Designation</th>
          </tr>
        </thead>
        <tbody>
          {/* Displaying searched data or all data based on search input */}
          {searchValue ? searchedData.map((e) => (
            <tr key={searchedData.indexOf(e) + 1}>
              <th scope="row">{searchedData.indexOf(e) + 1}</th>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.username}</td>
              <td>{e.phone}</td>
              <td>{e.designation}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(e._id)}>Delete</button></td>
              <td><button className='btn-sm' variant="primary" onClick={() => handleShow(e)}>Update</button></td>
            </tr>
          )) : data.map((e) => (
            <tr key={data.indexOf(e) + 1}>
              <th scope="row">{data.indexOf(e) + 1}</th>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.username}</td>
              <td>{e.phone}</td>
              <td>{e.designation}</td>
              <td><button className="btn btn-sm btn-danger" onClick={() => removeItem(e._id)}>Delete</button></td>
              <td><Button className='btn-sm' variant="primary" onClick={() => handleShow(e)}>Update</Button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Employee Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form fields to update employee data */}
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={updateData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" value={updateData.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="salary">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="salary" value={updateData.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aadhaar">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="aadhaar" value={updateData.phone} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aadhaar">
              <Form.Label>Designation</Form.Label>
              <Form.Control type="text" name="aadhaar" value={updateData.designation} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Buttons to close modal or submit changes */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          {/* Buttons to cancel or confirm deletion */}
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default EmpList;
