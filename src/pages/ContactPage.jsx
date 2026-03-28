// ─── PAGE: CONTACT ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import { eyebrowStyle, pageTitleStyle, labelStyle, inputStyle, goldBtnStyle, useBreakpoint } from '../utils/styles';

const CONTACT_DETAILS = [
  { icon: '📧', label: 'Email',   value: 'info@wildlifesafariindia.com', href: 'mailto:info@wildlifesafariindia.com' },
  { icon: '📞', label: 'Phone',   value: '+91 8368868187',               href: 'https://wa.me/918368868187'          },
  { icon: '📞', label: 'Phone',   value: '+91 9229841090',               href: 'https://wa.me/919229841090'          },
  { icon: '📍', label: 'Address', value: 'Saidulajaib Saket, New Delhi 110017', href: null                           },
];

export default function ContactPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent]   = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const clickableValueStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    color: '#c8b89a',
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
    display: 'inline-block',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a08', paddingTop: '90px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 1.5rem)' }}>

        <p style={eyebrowStyle}>Get in Touch</p>
        <h1 style={pageTitleStyle}>
          Contact <em style={{ color: '#D4AF37', fontStyle: 'italic' }}>Us</em>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isNarrow ? '1fr' : '1fr 1.2fr',
          gap: isNarrow ? '2.5rem' : '4rem',
          marginTop: '3rem', alignItems: 'start',
        }}>

          {/* Contact details */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5efe0', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              Our Details
            </h3>
            {CONTACT_DETAILS.map(({ icon, label, value, href }, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D4AF37', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                  </div>
                  {href ? (
                    /* FIXED: Added the missing <a> tag here */
                    <a 
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={clickableValueStyle}
                      onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                      onMouseLeave={e => e.currentTarget.style.color = '#c8b89a'}
                    >
                      {value}
                    </a>
                  ) : (
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", color: '#c8b89a', fontSize: '1rem' }}>
                      {value}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div style={{
              marginTop: '2rem', padding: '1.5rem',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '12px',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#a89060', fontSize: '0.85rem', lineHeight: 1.8 }}>
                <strong style={{ color: '#D4AF37' }}>Note:</strong> This website is not the official
                website of Ranthambore National Park. We are a private travel agency — Wildlife Safari India.
              </p>
            </div>
          </div>

          {/* Message form */}
          <form onSubmit={submit}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5efe0', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              Send a Message
            </h3>
            {[
              { label: 'Your Name',     name: 'name',  type: 'text',  placeholder: 'Full Name'      },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  name={f.name} type={f.type} value={form[f.name]}
                  onChange={handle} placeholder={f.placeholder}
                  required style={inputStyle}
                />
              </div>
            ))}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message" value={form.message} onChange={handle}
                placeholder="How can we help you?" rows={5} required
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            <button type="submit" style={{ ...goldBtnStyle, width: '100%', justifyContent: 'center', padding: '0.9rem', borderRadius: '8px' }}>
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}