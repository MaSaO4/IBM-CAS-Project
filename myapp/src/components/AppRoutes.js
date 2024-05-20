import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import ComplaintForm from './ComplaintForm';
import ShowComplaint from './ShowComplaint';
import SuggestionForm from './SuggestionForm';
import ShowSuggestion from './ShowSuggestion';
import Logout from './Logout';

const AppRoutes = () => {
  // Check if user is logged in using useSelector hook from Redux
  const isLoggedIn = useSelector(status => status.user.isLoggedIn);

  return (
    <>
      {/* Wrap all routes in BrowserRouter */}
      <BrowserRouter>
        {/* Render navigation bar */}
        <NavBar />
        {/* Define routes */}
        <Routes>
          {/* Route for login */}
          <Route path='/login' element={<Login />} />
          {/* Route for sign up */}
          <Route path='/signup' element={<SignUp />} />
          {/* Route for profile, accessible only if logged in */}
          {isLoggedIn && <Route path='/profile' element={<Profile />} />}
          {/* Route for raising complaint, accessible only if logged in */}
          {isLoggedIn && <Route path='/raise-complaint' element={<ComplaintForm />} />}
          {/* Route for showing complaints, accessible only if logged in */}
          {isLoggedIn && <Route path='/show-complaint' element={<ShowComplaint />} />}
          {/* Route for showing all complaints, accessible only if logged in */}
          {isLoggedIn && <Route path='/all-complaints' element={<ShowComplaint />} />}
          {/* Route for submitting suggestion, accessible only if logged in */}
          {isLoggedIn && <Route path='/submit-suggestion' element={<SuggestionForm />} />}
          {/* Route for showing suggestion, accessible only if logged in */}
          {isLoggedIn && <Route path='/show-suggestion' element={<ShowSuggestion />} />}
          {/* Route for showing user's suggestions, accessible only if logged in */}
          {isLoggedIn && <Route path='/my-suggestions' element={<ShowSuggestion mySuggestion={true} />} />}
          {/* Route for logout, accessible only if logged in */}
          {isLoggedIn && <Route path='/logout' element={<Logout />} />}
          {/* Default route for handling unknown paths, redirect to login */}
          <Route path='*' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
