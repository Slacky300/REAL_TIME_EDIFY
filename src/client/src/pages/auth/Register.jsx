import React, { useState, useEffect } from 'react';
import { register } from '../../helpers/auth/auth.helper.js';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSupplier } from '../../context/supplierContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { auth, loading, setLoading, darkMode } = useSupplier();

  const [userCreds, setUser] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  useEffect(() => {
    if (auth) {
      navigate('/home');
    }
  }, [auth]);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userCreds.username.length < 3) {
      toast.warning('Username must be at least 3 characters long');
      return;
    } else if (userCreds.password.length < 6) {
      toast.warning('Password must be at least 6 characters long');
      return;
    } else if (userCreds.username.length > 10) {
      toast.warning('Username must be less than 10 characters long');
      return;
    }

    setLoading(true);
    const result = await register(userCreds).finally(() => setLoading(false));
    if (result.status === 201) {
      toast.success(result.message);
      navigate('/');
    } else if (result.status === 400) {
      toast.warning(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`container my-5 d-flex justify-content-center align-items-center ${darkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`} style={{ minHeight: '80vh' }}>
      <div className="col-md-8 col-lg-6 col-xl-5 p-5 shadow rounded">
        <h1 className={`display-4 mb-4 text-center ${darkMode ? 'text-light' : 'text-dark'}`}>Register</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group mb-3">
            <label htmlFor="username" className={darkMode ? 'text-light' : 'text-dark'}>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={userCreds.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email" className={darkMode ? 'text-light' : 'text-dark'}>Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={userCreds.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className={darkMode ? 'text-light' : 'text-dark'}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={userCreds.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid gap-2 my-3">
            <button type="submit" disabled={loading} className={`btn btn-${darkMode ? 'light' : 'primary'}`}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <hr className={`my-4 ${darkMode ? 'border-light' : 'border-dark'}`} />
        <p className={`text-center ${darkMode ? 'text-light' : 'text-dark'}`}>
          Already have an account?{' '}
          <Link to="/" className={darkMode ? 'text-light' : 'text-primary'}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
