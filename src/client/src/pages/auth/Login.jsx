import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import { login } from '../../helpers/auth/auth.helper.js';
import { useSupplier } from '../../context/supplierContext';

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const { loading, setLoading, darkMode } = useSupplier();

  useEffect(() => {
    if (auth?.user) {
      navigate('/home');
    }
  }, [auth]);

  const [userCreds, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(userCreds).finally(() => setLoading(false));
    const { message, user, token, status } = result;

    if (status === 200) {
      setAuth({
        ...auth,
        user,
        token,
      });
      toast(message, { type: 'success' });
      navigate('/home');
      return;
    }

    toast(message, { type: 'error' });
  };

  return (
    <div className={`container my-5 d-flex justify-content-center align-items-center ${darkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`} style={{ minHeight: '80vh' }}>
      <div className="col-md-8 col-lg-6 col-xl-5 p-5 shadow rounded">
        <h1 className={`display-4 mb-4 text-center ${darkMode ? 'text-light' : 'text-dark'}`}>Login</h1>
        <form onSubmit={handleSubmit} className="w-100">
          <div className="form-group mb-4">
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
          <div className="form-group mb-4">
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
          <div className="d-grid gap-2">
            <button disabled={loading} type="submit" className={`btn btn-${darkMode ? 'light' : 'primary'}`}>
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </div>
        </form>
        <hr className={`my-4 ${darkMode ? 'border-light' : 'border-dark'}`} />
        <p className={`text-center mb-0 ${darkMode ? 'text-light' : 'text-dark'}`}>
          Don't have an account?{' '}
          <Link to="/register" className={darkMode ? 'text-light' : 'text-primary'}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
