import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      toast.success('Logged in successfully');
      navigate('/home'); // Redirect to home page
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signin;