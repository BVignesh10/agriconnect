import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Rentals = () => {
  const [equipments, setEquipments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    equipmentType: 'Tractor',
    rentRate: '',
    rateUnit: 'Per Hour',
    availableTimings: '6:00 AM - 6:00 PM (Available Today)',
    location: '',
    ownerName: '',
    ownerPhone: '',
    imageUrl: '',
    isAvailable: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/equipments');
      setEquipments(res.data);
    } catch (err) {
      console.error('Failed to load equipments', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/equipments', {
        ...formData,
        rentRate: parseFloat(formData.rentRate)
      });
      alert('Machinery / Vehicle Service Published Successfully! 🚜');
      setShowForm(false);
      fetchEquipments();
    } catch (err) {
      alert('Error publishing machinery service.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: 'linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)', minHeight: '100vh', padding: '28px' }}>
      
      {/* Back Button */}
      <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#1e293b', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' }}>
        ← Back to Dashboard
      </button>

      {/* Colorful Header */}
      <div style={{ background: 'linear-gradient(135deg, #16a34a 0%, #0284c7 100%)', padding: '24px 32px', borderRadius: '20px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '28px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800' }}>🚜 Agri Equipment & Transport Service Hub</h2>
          <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: '#e0f2fe' }}>
            List your idle Tractors, Autos, Sprayers & Harvesters or book nearby services instantly.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#facc15', color: '#713f12', border: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '15px', boxShadow: '0 4px 15px rgba(250, 204, 21, 0.4)' }}>
          {showForm ? 'Close Form' : '+ List Your Machine / Service'}
        </button>
      </div>

      {/* Upload Service Form */}
      {showForm && (
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', marginBottom: '32px', border: '3px solid #86efac', maxWidth: '700px' }}>
          <h3 style={{ marginTop: 0, color: '#15803d', fontSize: '22px' }}>📝 List Available Machine / Auto Transport</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Equipment / Service Title</label>
              <input type="text" required placeholder="e.g. Mahindra 575 Tractor + Rotavator / Crop Auto Transport" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Category</label>
              <select value={formData.equipmentType} onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                <option value="Tractor">Tractor (Ploughing/Rotavator)</option>
                <option value="Auto Transport">Crop Transport Auto/Mini-Truck</option>
                <option value="Sprayer Machine">Battery/Engine Spraying Machine</option>
                <option value="Combine Harvester">Combine Harvester</option>
                <option value="Agricultural Drone">Spraying Drone</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Rental Rate (₹)</label>
              <input type="number" required placeholder="800" value={formData.rentRate} onChange={(e) => setFormData({ ...formData, rentRate: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Pricing Unit</label>
              <select value={formData.rateUnit} onChange={(e) => setFormData({ ...formData, rateUnit: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}>
                <option value="Per Hour">Per Hour</option>
                <option value="Per Acre">Per Acre</option>
                <option value="Per Trip">Per Trip (Auto Transport)</option>
                <option value="Per Day">Per Day</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Available Timings & Slots</label>
              <input type="text" required placeholder="e.g. 6:00 AM - 2:00 PM (Free Today)" value={formData.availableTimings} onChange={(e) => setFormData({ ...formData, availableTimings: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Location / Village Radius</label>
              <input type="text" required placeholder="e.g. Tenali, Guntur (Within 15 KM)" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Driver/Owner Name & Phone</label>
              <input type="text" required placeholder="Name" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} style={{ width: '50%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              <input type="text" required placeholder="Phone Number" value={formData.ownerPhone} onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })} style={{ width: '50%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#334155' }}>Upload Machine / Vehicle Photo</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', marginTop: '6px' }} />
              {imagePreview && <img src={imagePreview} alt="Machine Preview" style={{ marginTop: '10px', maxHeight: '140px', borderRadius: '10px', border: '2px solid #16a34a' }} />}
            </div>

            <button type="submit" style={{ gridColumn: 'span 2', padding: '14px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}>
              Publish Available Service
            </button>
          </form>
        </div>
      )}

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {equipments.map((eq) => (
          <div key={eq.id} style={{ backgroundColor: '#ffffff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.06)', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {eq.imageUrl ? (
              <img src={eq.imageUrl} alt={eq.title} style={{ width: '100%', height: '190px', objectFit: 'cover' }} />
            ) : (
              <div style={{ height: '150px', background: 'linear-gradient(135deg, #bbf7d0 0%, #93c5fd 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🚜</div>
            )}

            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '19px' }}>{eq.title}</h3>
                <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '800' }}>
                  {eq.equipmentType}
                </span>
              </div>

              <div style={{ margin: '14px 0', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #0284c7' }}>
                <span style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>Rate / Price</span>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#dc2626' }}>₹{eq.rentRate}</span>
                <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600' }}> / {eq.rateUnit || 'Hour'}</span>
              </div>

              <p style={{ margin: '6px 0', fontSize: '13px', color: '#334155' }}>⏰ Available Slot: <b>{eq.availableTimings || '6:00 AM - 6:00 PM'}</b></p>
              <p style={{ margin: '6px 0', fontSize: '13px', color: '#334155' }}>📍 Working Area: <b>{eq.location}</b></p>
              <p style={{ margin: '6px 0', fontSize: '13px', color: '#334155' }}>👤 Owner/Driver: <b>{eq.ownerName}</b></p>

              <a href={`tel:${eq.ownerPhone}`} style={{ marginTop: '16px', display: 'block', textAlign: 'center', backgroundColor: '#16a34a', color: '#fff', padding: '12px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}>
                📞 Call & Book Service ({eq.ownerPhone})
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Rentals;