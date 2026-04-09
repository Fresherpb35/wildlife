import React, { useState, useEffect } from 'react';
import { eyebrowStyle, pageTitleStyle, ghostBtnStyle, useBreakpoint } from '../utils/styles';

const DEFAULT_HOTELS = [
  {
    id: 'default-1',
    name: 'Tiger Haven Resort',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
    tag: 'Luxury',
    desc: 'Opulent rooms with forest views, private pool, and world-class dining in the heart of wilderness.',
  }
];

export default function HotelsPage({ navigate }) {
  const { isMobile } = useBreakpoint();
  const [dbHotels, setDbHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/api/hotels`);
        
        if (!res.ok) throw new Error('Failed to fetch');

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          // 🔥 Mapping: Backend fields (image, description) -> Frontend (img, desc)
          const mappedData = result.data.map(h => ({
            id: h.id || h._id,
            name: h.name,
            img: h.image || h.img || 'https://via.placeholder.com/700x450?text=Hotel+Image', 
            tag: h.tag || 'Luxury',
            desc: h.description || h.desc || 'Experience the comfort of our premium safari stay.',
          }));
          setDbHotels(mappedData);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Dynamic hotels could not be loaded");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const allHotels = [...DEFAULT_HOTELS, ...dbHotels];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a08', paddingTop: '90px', color: '#f5efe0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontSize: '1.1rem', letterSpacing: '0.1em' }}>LOADING CURATED HOTELS...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a08', paddingTop: '90px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem)' }}>
        <p style={eyebrowStyle}>Where to Stay</p>
        <h1 style={pageTitleStyle}>
          Curated <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Hotels</em> Near Ranthambore
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem', 
          marginTop: '3rem',
        }}>
          {allHotels.map(h => (
            <div key={h.id} style={{
              background: '#111109',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '14px', 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={h.img} 
                  alt={h.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'rgba(10,10,8,0.85)', color: '#D4AF37',
                  fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: '20px', border: '1px solid rgba(212,175,55,0.3)',
                }}>
                  {h.tag}
                </span>
              </div>

              <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5efe0', fontSize: '1.2rem', marginBottom: '0.7rem' }}>
                  {h.name}
                </h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#a89060', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {h.desc}
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <button
                    onClick={() => { navigate('contact'); window.scrollTo(0, 0); }}
                    style={{ ...ghostBtnStyle, padding: '8px 20px', fontSize: '0.8rem' }}
                  >
                    Enquire Now →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}