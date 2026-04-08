// ─── PAGE: HOTELS ─────────────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { eyebrowStyle, pageTitleStyle, ghostBtnStyle, useBreakpoint } from '../utils/styles';

const DEFAULT_HOTELS = [
  {
    id: 'default-1',
    name: 'Tiger Haven Resort',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
    tag: 'Luxury',
    desc: 'Opulent rooms with forest views, private pool, and world-class dining in the heart of wilderness.',
  },
  {
    id: 'default-2',
    name: 'Forest Edge Lodge',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80',
    tag: 'Boutique',
    desc: 'A charming boutique lodge with handcrafted interiors, curated experiences, and warm hospitality.',
  },
  {
    id: 'default-3',
    name: 'Wilderness Camp',
    img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=700&q=80',
    tag: 'Adventure',
    desc: 'Authentic glamping under the stars — the closest you can sleep to the wild in Ranthambore.',
  },
  {
    id: 'default-4',
    name: 'Padam Lake View',
    img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=700&q=80',
    tag: 'Scenic',
    desc: 'Breathtaking lakeside property with morning mist views and unmatched bird-watching from your balcony.',
  },
];

export default function HotelsPage({ navigate }) {
  const { isMobile } = useBreakpoint();

  const [dbHotels, setDbHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/hotels');
        
        if (!res.ok) {
          throw new Error('Failed to fetch hotels');
        }

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          setDbHotels(result.data);
        }
      } catch (err) {
        console.log("Could not fetch dynamic hotels from backend:", err);
        setError("Additional hotels could not be loaded");
      } finally {
        setLoading(false);        // ← Yeh hamesha chalna chahiye
      }
    };

    fetchHotels();
  }, []);

  // Combine Default + Database hotels
  const allHotels = [...DEFAULT_HOTELS, ...dbHotels];

  // Show loading only for first 800ms (better UX)
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a08', paddingTop: '90px', color: '#f5efe0', textAlign: 'center' }}>
        <p style={{ padding: '4rem', fontSize: '1.1rem' }}>Loading curated hotels...</p>
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
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem', 
          marginTop: '3rem',
        }}>
          {allHotels.map(h => (
            <div key={h.id} style={{
              background: '#111109',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '14px', 
              overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={h.img} 
                  alt={h.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transition: 'transform 0.4s' 
                  }}
                  onMouseOver={e => (e.target.style.transform = 'scale(1.07)')}
                  onMouseOut={e => (e.target.style.transform = 'scale(1)')}
                />
                <span style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'rgba(10,10,8,0.8)', color: '#D4AF37',
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em', 
                  textTransform: 'uppercase',
                  padding: '4px 12px', 
                  borderRadius: '20px',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}>
                  {h.tag}
                </span>
              </div>

              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  color: '#f5efe0', 
                  fontSize: '1.1rem', 
                  marginBottom: '0.6rem' 
                }}>
                  {h.name}
                </h3>
                <p style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  color: '#a89060', 
                  fontSize: '0.9rem', 
                  lineHeight: 1.7, 
                  marginBottom: '1.2rem' 
                }}>
                  {h.desc}
                </p>
                <button
                  onClick={() => { navigate('contact'); window.scrollTo(0, 0); }}
                  style={{ ...ghostBtnStyle, padding: '6px 16px', fontSize: '0.85rem' }}
                >
                  Enquire →
                </button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <p style={{ color: '#e07a5f', textAlign: 'center', marginTop: '1rem' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}