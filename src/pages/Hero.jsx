// ─── PAGE: HERO (Home top section) ────────────────────────────────────────────
import React from 'react';
import { goldBtnStyle, ghostBtnStyle, eyebrowStyle, useBreakpoint } from '../utils/styles';

export default function Hero({ navigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const go = (pg) => { navigate(pg); window.scrollTo(0, 0); };

  return (
    <section style={{
      position: 'relative', height: '100vh', minHeight: '560px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <img
        src="https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1600&q=80"
        alt="Bengal Tiger"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,8,0.55) 0%, rgba(10,10,8,0.78) 100%)',
      }} />

      <div style={{
        position: 'relative', textAlign: 'center',
        padding: '0 clamp(1rem, 5vw, 2rem)',
        maxWidth: '780px', width: '100%',
      }}>
        <p
  style={{
    ...eyebrowStyle,
    color: '#D4AF37',
    fontSize: '2.5rem',   // increased size
    fontWeight: 900,      // extra bold
    letterSpacing: '2px', // makes it look bigger visually
  }}
>
  — Ranthambore National Park —
</p>
        <h1 style={{
  fontFamily: "'Playfair Display', serif",
  fontSize: 'clamp(2.4rem, 8vw, 6rem)',
  lineHeight: 1.1, 
  color: '#f5efe0',
  margin: '0 0 1.2rem', 
  fontWeight: 700, 
  letterSpacing: '-0.02em', 
}}>
          Into the{' '}
          <em style={{ fontStyle: 'italic', color: '#D4AF37' }}>Heart of</em>
          <br />Tiger Territory
        </h1>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#c8b89a', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.8,
          maxWidth: '540px', margin: '0 auto 2rem',
        }}>
          Experience thrilling safaris, iconic wildlife, and the historical charm of
          Ranthambore — home to India's most majestic Bengal tigers.
        </p>
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
          padding: '0 1rem',
        }}>
          <button onClick={() => go('booking')} style={goldBtnStyle}>Book Safari</button>
          <button onClick={() => go('home')}    style={ghostBtnStyle}>Discover More ↓</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        background: 'rgba(10,10,8,0.7)', backdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        overflowX: 'auto',
      }}>
        {[['10+', 'Years Expertise'], ['5K+', 'Happy Travelers'], ['99%', 'Positive Reviews']].map(([num, label]) => (
          <div key={label} style={{
            padding: isMobile ? '0.9rem 1.5rem' : '1.2rem 3rem',
            borderRight: '1px solid rgba(212,175,55,0.15)',
            textAlign: 'center', flex: 1, maxWidth: '220px', minWidth: '90px',
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? '1.3rem' : '1.8rem', color: '#D4AF37', fontWeight: 700 }}>{num}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: '#a89060', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
