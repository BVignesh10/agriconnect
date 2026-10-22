import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed! Check credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '24px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '20px' }}>AgriConnect Login</h2>
      
      {error && <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '6px', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email Address</label>
          <input
            type="email"
            required
            placeholder="farmer@agriconnect.com"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account? <Link to="/register" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Register here</Link>
      </p>
    </div>
  );
};

export default Login;