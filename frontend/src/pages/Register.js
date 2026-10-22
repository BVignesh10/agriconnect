import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'FARMER',
    preferredLanguage: 'en'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(formData);
      alert('Registration Successful! Please Login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed! Try again.');
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '50px auto', padding: '24px', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2e7d32', textAlign: 'center', marginBottom: '20px' }}>Join AgriConnect</h2>
      {error && <div style={{ padding: '10px', backgroundColor: '#ffebee', color: '#c62828', borderRadius: '6px', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Full Name</label>
          <input
            type="text"
            required
            placeholder="John Doe"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Email</label>
          <input
            type="email"
            required
            placeholder="farmer@agriconnect.com"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Phone Number</label>
          <input
            type="text"
            required
            placeholder="9876543210"
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          />
        </div>
        <div style={{ marginBottom: '12px' }}>
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
        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontWeight: 'bold', fontSize: '14px' }}>I am a:</label>
          <select
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="FARMER">Farmer</option>
            <option value="BUYER">Buyer / Wholesaler</option>
            <option value="EXPERT">Agri Expert</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Create Account
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ color: '#2e7d32', fontWeight: 'bold' }}>Login here</Link>
      </p>
    </div>
  );
};

export default Register;