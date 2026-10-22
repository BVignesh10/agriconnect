import React, { useState, useEffect } from 'react';
import { addFarm, getFarmsByOwner } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Farms = () => {
  const [farms, setFarms] = useState([]);
  const [formData, setFormData] = useState({
    farmName: '',
    location: '',
    areaInAcres: '',
    soilType: 'Red Soil',
    ownerEmail: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      const email = user.email || 'farmer@gmail.com';
      setFormData((prev) => ({ ...prev, ownerEmail: email }));
      fetchFarms(email);
    }
  }, [navigate]);

  const fetchFarms = async (email) => {
    try {
      const res = await getFarmsByOwner(email);
      setFarms(res.data);
    } catch (err) {
      console.error('Failed to load farms', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const payload = {
        ...formData,
        areaInAcres: parseFloat(formData.areaInAcres),
        ownerEmail: formData.ownerEmail || user?.email || 'farmer@gmail.com'
      };
      
      console.log('Sending Payload:', payload);
      const res = await addFarm(payload);
      console.log('Response:', res.data);
      
      setMessage('Farm added successfully! 🌱');
      setFormData({ farmName: '', location: '', areaInAcres: '', soilType: 'Red Soil', ownerEmail: payload.ownerEmail });
      fetchFarms(payload.ownerEmail);
    } catch (err) {
      console.error('Add Farm Error Details:', err.response || err);
      setMessage(err.response?.data?.message || err.response?.data || 'Failed to add farm. Check console/logs.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '30px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      <h2 style={{ color: '#2e7d32' }}>🌱 My Farm Land Details</h2>

      {message && <div style={{ padding: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '6px', marginBottom: '15px', maxWidth: '500px' }}>{message}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {/* Add Farm Form */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: '0', color: '#333' }}>Register New Farm</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Farm Name</label>
              <input
                type="text"
                required
                placeholder="Green Valley Acres"
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Location / Village</label>
              <input
                type="text"
                required
                placeholder="Guntur, AP"
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Area Size (in Acres)</label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="4.5"
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                value={formData.areaInAcres}
                onChange={(e) => setFormData({ ...formData, areaInAcres: e.target.value })}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Soil Type</label>
              <select
                style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              >
                <option value="Red Soil">Red Soil</option>
                <option value="Black Cotton Soil">Black Cotton Soil</option>
                <option value="Alluvial Soil">Alluvial Soil</option>
                <option value="Sandy Soil">Sandy Soil</option>
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Save Farm Details
            </button>
          </form>
        </div>

        {/* Registered Farms List */}
        <div>
          <h3 style={{ marginTop: '0', color: '#333' }}>Your Registered Fields ({farms.length})</h3>
          {farms.length === 0 ? (
            <p style={{ color: '#666' }}>No farms added yet. Register your first farm land using the form.</p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {farms.map((f) => (
                <div key={f.id} style={{ backgroundColor: '#fff', padding: '15px 20px', borderRadius: '8px', borderLeft: '5px solid #2e7d32', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#2e7d32' }}>{f.farmName}</h4>
                  <p style={{ margin: '3px 0', fontSize: '14px', color: '#555' }}>📍 Location: {f.location}</p>
                  <p style={{ margin: '3px 0', fontSize: '14px', color: '#555' }}>📐 Area: {f.areaInAcres} Acres</p>
                  <p style={{ margin: '3px 0', fontSize: '14px', color: '#555' }}>🪨 Soil: {f.soilType}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farms;