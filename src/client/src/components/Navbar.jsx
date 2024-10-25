import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import DarkModeButton from './DarkModeButton/DarkModeButton.jsx';
import { useSupplier } from '../context/supplierContext.jsx';

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const {darkMode} = useSupplier();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      user: null,
      token: null,
    });
    navigate('/');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className="container-fluid">
        <NavLink className={`navbar-brand ${darkMode ? 'text-light' : 'text-dark'}`} to="/">
          RealTimeEdify
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {auth.user ? (
              <>
              <li className="nav-item">
                  <DarkModeButton />
                </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <DarkModeButton />
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${darkMode ? 'text-light' : 'text-dark'}`}
                    to="/"
                    activeclassname="active"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={`nav-link ${darkMode ? 'text-light' : 'text-dark'}`}
                    to="/register"
                    activeclassname="active"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
