// ─── PAGE SECTION: WHY US ─────────────────────────────────────────────────────
import React from 'react';
import { eyebrowStyle, sectionTitleStyle, goldBtnStyle, useBreakpoint } from '../utils/styles';

const FEATURES = [
  { icon: '🦁', title: 'Gypsy & Canter Safaris',  desc: "Exclusive wildlife safaris for an up-close encounter with Ranthambore's majestic tigers." },
  { icon: '🧭', title: 'Expert Local Guides',     desc: 'Knowledgeable guides enrich your experience with fascinating wildlife insights.'           },
  { icon: '💰', title: 'Affordable Pricing',      desc: 'Competitive rates with zero compromise on service quality or experience.'                   },
  { icon: '📱', title: 'Easy Online Booking',     desc: 'Convenient and secure booking process for all your trips and stays.'                        },
];

export default function WhyUs({ navigate }) {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;

  return (
    <section style={{ background: '#0d0d0b', padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isNarrow ? '1fr' : '1fr 1fr',
        gap: isNarrow ? '2.5rem' : '5rem',
        alignItems: 'center',
      }}>

        {/* Left copy */}
        <div>
          <p style={eyebrowStyle}>Why Choose Us</p>
          <h2 style={sectionTitleStyle}>
            Experience the{' '}
            <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Wilderness</em>{' '}
            of Ranthambore
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#a89060', fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '2rem' }}>
            With over a decade of expertise, we specialize in crafting personalized
            travel experiences to Ranthambore National Park.
          </p>
          <button onClick={() => { navigate('booking'); window.scrollTo(0, 0); }} style={goldBtnStyle}>
            Plan Your Safari
          </button>
        </div>

        {/* Right feature cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '12px', padding: '1.4rem',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#f5efe0', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{title}</h4>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#a89060', fontSize: '0.85rem', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
