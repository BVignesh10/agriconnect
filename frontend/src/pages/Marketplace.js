import React, { useState, useEffect } from 'react';
import { addCrop, getAllCrops } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [userRole, setUserRole] = useState('BUYER'); // BUYER or FARMER
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState('ALL'); // ALL, LOW_PRICE, HIGH_QUALITY
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    cropName: '',
    cropCategory: 'Commercial Crops',
    quantityInQuintals: '',
    pricePerQuintal: '',
    location: '',
    sellerEmail: '',
    imageUrl: '',
    qualityGrade: 'Grade A+ (Premium)'
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      setFormData((prev) => ({ ...prev, sellerEmail: user.email || 'farmer@gmail.com' }));
      setUserRole(user.role || 'BUYER');
      fetchCrops();
    }
  }, [navigate]);

  const fetchCrops = async () => {
    try {
      const res = await getAllCrops();
      setCrops(res.data);
      setFilteredCrops(res.data);
    } catch (err) {
      console.error('Failed to fetch crops', err);
    }
  };

  // Image Upload Handler (Convert to DataURL for storage/rendering)
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

  // Buyer Filtering Logic (Lowest Price & Highest Quality)
  const applyFilter = (type) => {
    setFilterType(type);
    let list = [...crops];
    if (type === 'LOW_PRICE') {
      list.sort((a, b) => a.pricePerQuintal - b.pricePerQuintal);
    } else if (type === 'HIGH_QUALITY') {
      list = list.filter((c) => c.qualityGrade?.includes('Grade A+'));
    }
    setFilteredCrops(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantityInQuintals: parseFloat(formData.quantityInQuintals),
        pricePerQuintal: parseFloat(formData.pricePerQuintal)
      };
      await addCrop(payload);
      setMessage('Crop Produce & Photo Listed Successfully! 🌾');
      setShowForm(false);
      fetchCrops();
    } catch (err) {
      setMessage('Failed to list crop produce.');
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <button onClick={() => navigate('/dashboard')} style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
        ← Back to Dashboard
      </button>

      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', backgroundColor: '#fff', padding: '20px 28px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <div>
          <h2 style={{ color: '#0f172a', margin: 0, fontSize: '26px' }}>🛒 Direct Agricultural Produce Marketplace</h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>
            Logged in as: <b style={{ color: '#0284c7' }}>{userRole}</b> | Buy directly from farmers at transparent prices.
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          {showForm ? 'Close Form' : '+ List Your Produce (Farmer)'}
        </button>
      </div>

      {message && <div style={{ padding: '12px', backgroundColor: '#dcfce7', color: '#15803d', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold' }}>{message}</div>}

      {/* Seller Form with Photo Upload */}
      {showForm && (
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', marginBottom: '30px', maxWidth: '650px', border: '2px solid #bbf7d0' }}>
          <h3 style={{ marginTop: 0, color: '#166534' }}>🌾 Post Produce Listing with Photo</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Crop Name</label>
              <input type="text" required placeholder="Red Chilli / Cotton / Rice" value={formData.cropName} onChange={(e) => setFormData({ ...formData, cropName: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Category</label>
              <select value={formData.cropCategory} onChange={(e) => setFormData({ ...formData, cropCategory: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                <option value="Commercial Crops">Commercial Crops</option>
                <option value="Grains & Cereals">Grains & Cereals</option>
                <option value="Pulses & Oilseeds">Pulses & Oilseeds</option>
                <option value="Vegetables & Fruits">Vegetables & Fruits</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Quantity (Quintals)</label>
              <input type="number" required placeholder="50" value={formData.quantityInQuintals} onChange={(e) => setFormData({ ...formData, quantityInQuintals: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Price per Quintal (₹)</label>
              <input type="number" required placeholder="18000" value={formData.pricePerQuintal} onChange={(e) => setFormData({ ...formData, pricePerQuintal: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Quality Grade</label>
              <select value={formData.qualityGrade} onChange={(e) => setFormData({ ...formData, qualityGrade: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }}>
                <option value="Grade A+ (Premium)">Grade A+ (Premium Export)</option>
                <option value="Grade A (Standard Market)">Grade A (Standard Market)</option>
                <option value="Organic Certified">Organic Certified</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Market Yard / Location</label>
              <input type="text" required placeholder="Guntur Yard, AP" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
            </div>

            {/* Produce Photo Upload Area */}
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>Upload Crop Produce Photo</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', marginTop: '6px' }} />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: '10px', maxHeight: '120px', borderRadius: '8px' }} />}
            </div>

            <button type="submit" style={{ gridColumn: 'span 2', padding: '12px', backgroundColor: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
              Publish Produce Listing
            </button>
          </form>
        </div>
      )}

      {/* BUYER FILTER BAR */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#475569' }}>🔍 Buyer Filters:</span>
        <button onClick={() => applyFilter('ALL')} style={{ backgroundColor: filterType === 'ALL' ? '#0284c7' : '#e2e8f0', color: filterType === 'ALL' ? '#fff' : '#334155', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          All Produce ({crops.length})
        </button>
        <button onClick={() => applyFilter('LOW_PRICE')} style={{ backgroundColor: filterType === 'LOW_PRICE' ? '#0284c7' : '#e2e8f0', color: filterType === 'LOW_PRICE' ? '#fff' : '#334155', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          💰 Lowest Price First
        </button>
        <button onClick={() => applyFilter('HIGH_QUALITY')} style={{ backgroundColor: filterType === 'HIGH_QUALITY' ? '#0284c7' : '#e2e8f0', color: filterType === 'HIGH_QUALITY' ? '#fff' : '#334155', border: 'none', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>
          ⭐ Premium Grade A+ Only
        </button>
      </div>

      {/* Buyer Marketplace Feed Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredCrops.map((c) => (
          <div key={c.id} style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* Produce Photo Banner */}
            {c.imageUrl ? (
              <img src={c.imageUrl} alt={c.cropName} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            ) : (
              <div style={{ height: '140px', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🌾</div>
            )}

            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '20px' }}>{c.cropName}</h3>
                <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                  {c.qualityGrade || 'Grade A+'}
                </span>
              </div>
              <p style={{ margin: '8px 0 4px 0', fontSize: '13px', color: '#64748b' }}>Category: {c.cropCategory}</p>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#334155' }}>📦 Available: <b>{c.quantityInQuintals} Quintals</b></p>
              <p style={{ margin: '8px 0', fontSize: '22px', color: '#dc2626', fontWeight: 'bold' }}>₹{c.pricePerQuintal} <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 'normal' }}>/ Quintal</span></p>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748b' }}>📍 Yard: {c.location}</p>
              <p style={{ margin: '4px 0', fontSize: '12px', color: '#94a3b8' }}>👤 Seller: {c.sellerEmail}</p>

              {/* Buyer Action Button */}
              <button onClick={() => alert(`Order Request Sent to Seller: ${c.sellerEmail} for ${c.cropName}`)} style={{ marginTop: '16px', width: '100%', backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                🛒 Buy / Place Order Request
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;