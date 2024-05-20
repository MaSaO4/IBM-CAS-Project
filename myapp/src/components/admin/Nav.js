import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
  // Check if admin is logged in
  const isLoggedIn = useSelector(status => status.admin.isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Display login link if admin is not logged in */}
            {!isLoggedIn && (
              <li className="nav-item active">
                <Link className="nav-link" to={'/admin/login'}>Login <span className="sr-only">(current)</span></Link>
              </li>
            )}
            {/* Display list employees link if admin is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={'/admin/emplist'}>List Employees</Link>
              </li>
            )}
            {/* Display add employee link if admin is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={'/admin/addemp'}>Add Employee</Link>
              </li>
            )}
            {/* Display profile link if admin is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={'/admin/profile'}>Profile</Link>
              </li>
            )}
            {/* Display logout link if admin is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to={'/admin/logout'}>Log out</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
