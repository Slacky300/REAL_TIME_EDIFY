import React, { useState, useEffect } from 'react';
import { getLocalStorageWithExpiry, register } from '../../helpers/auth/auth.helper.js';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSupplier } from '../../context/supplierContext.jsx';

const Register = () => {

    const navigate = useNavigate();
    const { loading, setLoading } = useSupplier()
    const token = getLocalStorageWithExpiry('auth')?.token;


    const [userCreds, setUser] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    });


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
        }
        else if (result.status === 400) {
            toast.warning(result.message);
        } else {
            toast.error(result.message);
        }
    };

    return (
        <>
            <div className="container my-5" style={{ maxWidth: '50em' }}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-6 d-flex justify-content-center align-items-center">
                        <h1 className='display-3'>REGISTER</h1>
                    </div>
                </div>
                <div className="row my-5 d-flex justify-content-center align-items-center" >
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className='form-control'>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={userCreds.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={userCreds.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={userCreds.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="my-3 d-flex justify-content-end">
                                <button type="submit" disabled={loading} className="btn btn-primary">
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </form>
                        <hr />
                        <p className="my-3 text-center">
                            Already have an account?{' '}
                            <Link to="/">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;