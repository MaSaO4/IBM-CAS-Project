import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import EmpList from './EmpList';
import AddEmp from './AddEmp';
import LogOut from './LogOut';
import AdminProfile from './AdminProfile';
import { useSelector } from 'react-redux';
import AdminLogin from './Login';

const AdminAppRoutes = () => {
  // Check if the admin is logged in
  const isLoggedIn = useSelector((status) => status.admin.isLoggedIn);

  return (
    <>
      {/* Navigation component */}
      <Nav />
      <Routes>
        {/* Route for AdminLogin component if not logged in */}
        {!isLoggedIn && <Route path='/login' element={<AdminLogin />} />}
        {/* Default route to AdminLogin component */}
        <Route path='*' component={AdminLogin} />
        {/* Routes accessible only if logged in */}
        {isLoggedIn && <Route path='/emplist' element={<EmpList />} />}
        {isLoggedIn && <Route path='/addemp' component={AddEmp} />}
        {isLoggedIn && <Route path='/profile' element={<AdminProfile />} />}
        {/* Route for logging out */}
        <Route path='/logout' element={<LogOut />} />
      </Routes>
    </>
  );
};

export default AdminAppRoutes;
