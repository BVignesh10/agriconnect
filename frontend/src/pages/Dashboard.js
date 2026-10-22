import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '24px' }}>
      
      {/* Top Navigation Bar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#065f46', padding: '16px 32px', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🌾</span>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>AgriConnect Smart Ecosystem</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#a7f3d0' }}>AI Powered Precision Farming & Marketplace</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '14px', fontWeight: '600' }}>{user?.fullName || 'Farmer Partner'}</span>
            <span style={{ fontSize: '11px', color: '#d1fae5' }}>{user?.email || 'farmer@agriconnect.com'}</span>
          </div>
          <button onClick={handleLogout} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' }}>
            Logout
          </button>
        </div>
      </header>

      {/* Hero Quick Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '28px 0' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', borderLeft: '5px solid #10b981', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Registered Farmland</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#111827' }}>2 Fields (9.5 Acres)</h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', borderLeft: '5px solid #3b82f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Active Produce Listed</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#111827' }}>1 Listing (Red Chilli)</h3>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '14px', borderLeft: '5px solid #f59e0b', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <span style={{ color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Local Crop Advisory</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '24px', color: '#111827' }}>31°C • Light Rain Alert</h3>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Farm Management Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
              🌱
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#065f46', fontSize: '20px' }}>Farm Land Registry</h3>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>Manage soil analysis reports, acre bounds, and land ownership documentation seamlessly.</p>
          </div>
          <button onClick={() => navigate('/farms')} style={{ marginTop: '20px', backgroundColor: '#059669', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', width: '100%' }}>
            Manage Farm Lands →
          </button>
        </div>

        {/* Marketplace Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
              🛒
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e40af', fontSize: '20px' }}>Farmer Marketplace</h3>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>List harvested crops directly to verified regional wholesale buyers at fair market value.</p>
          </div>
          <button onClick={() => navigate('/marketplace')} style={{ marginTop: '20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', width: '100%' }}>
            Open Marketplace →
          </button>
        </div>

        {/* AI Advisory & Live Weather Card */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '28px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
              🤖
            </div>
            <h3 style={{ margin: '0 0 8px 0', color: '#92400e', fontSize: '20px' }}>AI Leaf Scanner & Weather</h3>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>Upload or capture leaf photos using camera for instant AI disease detection & real GPS weather alerts.</p>
          </div>
          <button onClick={() => navigate('/advisory')} style={{ marginTop: '20px', backgroundColor: '#d97706', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', width: '100%' }}>
            Launch AI Advisory →
          </button>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;