import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'doctor'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    const endpoint = role === 'patient' ? 'http://localhost:3008/signin' : 'http://localhost:3000/signin';
    localStorage.clear();
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (role === 'patient') {
          navigate('/doctor');
        } else {
          navigate('/dashboard');
        }
        console.log('Sign-in successful:', data);
        // Store user info and token in local storage
        localStorage.setItem('user', JSON.stringify(data.userInfo));
        localStorage.setItem('idToken', data.idToken);
      } else {
        console.error('Sign-in error:', data.error);
        setError(data.error); // Set error message
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An error occurred while signing in.'); // Set generic error message
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>} {/* Render error message if error exists */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
