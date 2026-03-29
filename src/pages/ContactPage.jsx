import React, { useState } from 'react';
import { eyebrowStyle, pageTitleStyle, labelStyle, inputStyle, goldBtnStyle, useBreakpoint } from '../utils/styles';

const CONTACT_DETAILS = [
  { icon: '📧', label: 'Email',   value: 'info@wildlifesafariindia.com', href: 'mailto:info@wildlifesafariindia.com' },
  { icon: '📞', label: 'Phone',   value: '+91 8368868187',               href: 'https://wa.me/918368868187'          },
  { icon: '📞', label: 'Phone',   value: '+91 9229841090',               href: 'https://wa.me/919229841090'          },
  { icon: '📍', label: 'Address', value: 'Saidulajaib Saket, New Delhi 110017', href: null                           },
];

const WHATSAPP_NUMBER = '918368868187';

export default function ContactPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Build WhatsApp Message
  const buildWaText = () => [
    `🌿 *New Message — Wildlife Safari India*`,
    ``,
    `👤 *Name:* ${form.name}`,
    `📧 *Email:* ${form.email}`,
    ``,
    `💬 *Message:*`,
    form.message || 'No message provided',
    ``,
    `_Sent via wildlifesafariindia.com_`,
  ].join('\n');

  // Open WhatsApp directly
  const openWhatsApp = () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in Name, Email and Message');
      return false;
    }

    const text = buildWaText();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    return true;
  };

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = openWhatsApp();

    if (success) {
      // Reset form after WhatsApp opens
      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setIsSubmitting(false);
      }, 800);
    } else {
      setIsSubmitting(false);
    }
  };

  const WaIcon = ({ size = 16, color = '#4ade80' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

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
          marginTop: '3rem', 
          alignItems: 'start',
        }}>

          {/* Contact Details */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#f5efe0', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
              Our Details
            </h3>

            {CONTACT_DETAILS.map(({ icon, label, value, href }, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', marginTop: '2px' }}>{icon}</span>
                <div>
                  <div style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    color: '#D4AF37', 
                    fontSize: '0.75rem', 
                    letterSpacing: '0.15em', 
                    textTransform: 'uppercase', 
                    marginBottom: '2px' 
                  }}>
                    {label}
                  </div>
                  {href ? (
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

            {/* WhatsApp Quick Link */}
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginTop: '1.5rem', 
                padding: '0.6rem 1.1rem',
                background: 'rgba(37,211,102,0.08)', 
                border: '1px solid rgba(37,211,102,0.25)',
                borderRadius: '8px', 
                textDecoration: 'none',
                fontFamily: "'Cormorant Garamond', serif", 
                color: '#4ade80', 
                fontSize: '0.9rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.08)'}
            >
              <WaIcon size={14} />
              Chat on WhatsApp
            </a>

            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.5rem', 
              background: 'rgba(212,175,55,0.05)', 
              border: '1px solid rgba(212,175,55,0.12)', 
              borderRadius: '12px' 
            }}>
              <p style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                color: '#a89060', 
                fontSize: '0.85rem', 
                lineHeight: 1.8 
              }}>
                <strong style={{ color: '#D4AF37' }}>Note:</strong> This website is not the official
                website of Ranthambore National Park. We are a private travel agency — Wildlife Safari India.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit}>
            <h3 style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: '#f5efe0', 
              marginBottom: '0.4rem', 
              fontSize: '1.2rem' 
            }}>
              Send a Message
            </h3>
            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              color: '#a89060', 
              fontSize: '0.85rem', 
              marginBottom: '1.4rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem' 
            }}>
              <WaIcon size={13} />
              Message will be sent directly via WhatsApp
            </p>

            {[
              { label: 'Your Name',     name: 'name',  type: 'text',  placeholder: 'Full Name'      },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
            ].map(f => (
              <div key={f.name} style={{ marginBottom: '1.2rem' }}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  value={form[f.name]}
                  onChange={handleChange}
                  placeholder={f.placeholder}
                  required
                  style={inputStyle}
                  disabled={isSubmitting}
                />
              </div>
            ))}

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                required
                style={{ ...inputStyle, resize: 'vertical' }}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...goldBtnStyle, 
                width: '100%', 
                justifyContent: 'center',
                padding: '0.9rem', 
                borderRadius: '8px', 
                gap: '0.5rem',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? (
                <>⏳ Opening WhatsApp...</>
              ) : (
                <>
                  <WaIcon size={15} /> Send Message via WhatsApp
                </>
              )}
            </button>

            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              color: '#6b5f4a', 
              fontSize: '0.78rem', 
              textAlign: 'center', 
              marginTop: '0.75rem' 
            }}>
              Sends to +91 83688 68187 · Typically replies within 1 hour
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}