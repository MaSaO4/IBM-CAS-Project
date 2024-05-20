import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setAdminId, setToken, setLoggedIn } from '../../redux/AdminSlice';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import AdminService from '../../services/AdminService';

function AdminLogin(props) {
  // Initialize state variables
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Attempt to log in with provided credentials
      const response = await AdminService.login(loginData);

      if (response.status === 200) {
        // If login is successful, update Redux state and navigate to employee list page
        dispatch(setLoggedIn(true));
        dispatch(setAdminId(response.data.id));
        dispatch(setToken(response.data.token));
        navigate('/admin/emplist');
      } else {
        // If login fails, show error message
        toast.error('Invalid credentials');
      }
    } catch (error) {
      // If an error occurs during login, show error message and reset form fields
      toast.error('Invalid credentials');
      setLoginData({ username: '', password: '' });
      console.error('Login failed:', error.message);
    }
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png"
                style={{ width: '185px' }} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1"> </h4>
            </div>
            <p>Please login to your account</p>
            {/* Input fields for username and password */}
            <MDBInput wrapperClass='mb-4' label='username' id='form1' type='username' name='username' value={loginData.username} onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' value={loginData.password} onChange={handleChange} />
            {/* Button to submit login form */}
            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={handleSubmit}>Log In</MDBBtn>
              {/* Link to password recovery page */}
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
            </div>
          </div>
        </MDBCol>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 className="mb-4">We are more than just a company</h4>
              <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </MDBContainer>
  );
}

export default AdminLogin;