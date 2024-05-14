import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../Config/axiosInstance';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('auth/signup', { email, password });
      console.log(response)
      if (response.status === 201) {
        toast.success('User created successfully');
        setEmail('');
        setPassword('');
      }
    } catch (error) {
        console.log(error);
      toast.error(error.response?.data?.message || 'Error signing up');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Signup</h1>
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

export default Signup;
