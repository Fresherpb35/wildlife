// ─── PAGE: BOOKING (API-integrated) ──────────────────────────────────────────
import React, { useState } from 'react';
import { useBreakpoint } from '../utils/styles';
import { submitBooking } from '../api/bookingApi';
import '../booking.css';

const WHATSAPP_NUMBER = '918368868187';

export default function BookingPage() {
  const { isMobile } = useBreakpoint();

  const [form, setForm] = useState({
    name: '', date: '', type: 'Gypsy',
    zone: 'Zone 1', time: 'Morning', email: '', phone: '',
  });

  const [status,   setStatus]   = useState('idle');   // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingId, setBookingId] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await submitBooking(form);

      // Support both { data: { id } } and { id } response shapes
      const id = res?.data?.id || res?.id || '';
      setBookingId(id);
      setStatus('success');

    } catch (err) {
      setStatus('error');

      // ── Decode error from client.js error shape ──────────────────────────
      if (err.errors?.length) {
        // Array of validation errors e.g. [{ message: "Invalid date" }]
        setErrorMsg(
          err.errors.map(e => (typeof e === 'string' ? e : e.message)).join(', ')
        );
      } else if (err.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg(err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  // ── WhatsApp fallback ─────────────────────────────────────────────────────
  const openWhatsApp = () => {
    const text = [
      `🌿 *Safari Booking Request — Wildlife Safari India*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📧 *Email:* ${form.email}`,
      `📞 *Phone:* ${form.phone || 'N/A'}`,
      `📅 *Date:* ${form.date}`,
      `🚙 *Type:* ${form.type}`,
      `📍 *Zone:* ${form.zone}`,
      `🕐 *Time:* ${form.time}`,
      ``,
      `_Sent via wildlifesafariindia.com_`,
    ].join('\n');
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank', 'noopener,noreferrer'
    );
  };

  // ── Success Screen ────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="booking">
        <div className="booking__inner" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐯</div>
          <p className="booking__eyebrow">Request Submitted</p>
          <h1 className="booking__title">Booking <em>Confirmed!</em></h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#c8b89a', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Thank you, <strong style={{ color: '#D4AF37' }}>{form.name}</strong>.
            Your safari request has been received.
          </p>
          {bookingId && (
            <p style={{
              fontFamily: 'monospace',
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: '8px', padding: '0.75rem 1.5rem',
              display: 'inline-block', color: '#D4AF37',
              fontSize: '0.9rem', marginTop: '0.75rem',
            }}>
              Booking ID: {bookingId}
            </p>
          )}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#a89060', fontSize: '0.95rem', marginTop: '1.5rem' }}>
            A confirmation has been sent to <strong>{form.email}</strong>.<br />
            Our team will contact you within 24 hours.
          </p>
          <button
            onClick={() => {
              setStatus('idle');
              setForm({ name: '', date: '', type: 'Gypsy', zone: 'Zone 1', time: 'Morning', email: '', phone: '' });
            }}
            style={{
              marginTop: '1.5rem', padding: '0.7rem 1.8rem',
              background: 'transparent', border: '1px solid rgba(212,175,55,0.3)',
              borderRadius: '8px', color: '#D4AF37', cursor: 'pointer',
              fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem',
            }}
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="booking__inner">

        <p className="booking__eyebrow">Reserve Your Spot</p>
        <h1 className="booking__title">Book a <em>Safari</em></h1>

        {/* ── Error Banner ── */}
        {status === 'error' && (
          <div style={{
            background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)',
            borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem',
            fontFamily: "'Cormorant Garamond', serif", color: '#fca5a5', fontSize: '1rem',
            display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
          }}>
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <div>
              <div>{errorMsg}</div>
              <button
                onClick={openWhatsApp}
                style={{
                  marginTop: '0.5rem', background: 'none', border: 'none',
                  color: '#4ade80', cursor: 'pointer', padding: 0,
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem',
                  textDecoration: 'underline',
                }}
              >
                Book via WhatsApp instead →
              </button>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="booking__form">
          <div className={`booking__grid${isMobile ? ' booking__grid--mobile' : ''}`}>

            {/* Text & Date Inputs */}
            {[
              { label: 'Full Name',    name: 'name',  type: 'text',  placeholder: 'Your Name'       },
              { label: 'Safari Date',  name: 'date',  type: 'date'                                  },
              { label: 'Email',        name: 'email', type: 'email', placeholder: 'your@email.com'  },
              { label: 'Phone Number', name: 'phone', type: 'text',  placeholder: '+91 XXXXX XXXXX' },
            ].map(f => (
              <div key={f.name} className="booking__field">
                <label className="booking__label">{f.label}</label>
                <input
                  name={f.name} type={f.type} value={form[f.name]}
                  onChange={handle} placeholder={f.placeholder}
                  required={['name', 'date', 'email'].includes(f.name)}
                  disabled={status === 'loading'}
                  className="booking__input"
                />
              </div>
            ))}

            {/* Select Dropdowns */}
            {[
              { label: 'Safari Type', name: 'type', opts: ['Gypsy', 'Canter'] },
              { label: 'Safari Zone', name: 'zone', opts: [1,2,3,4,5,6,7,8,9,10].map(z => `Zone ${z}`) },
              { label: 'Safari Time', name: 'time', opts: ['Morning', 'Evening'] },
            ].map(s => (
              <div key={s.name} className="booking__field">
                <label className="booking__label">{s.label}</label>
                <select
                  name={s.name} value={form[s.name]} onChange={handle}
                  disabled={status === 'loading'}
                  className="booking__select"
                >
                  {s.opts.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="booking__submit-btn"
            style={{ opacity: status === 'loading' ? 0.7 : 1 }}
          >
            {status === 'loading' ? '⏳ Submitting…' : 'Submit Booking Request'}
          </button>

          {/* WhatsApp alternative */}
          <p style={{
            textAlign: 'center', marginTop: '0.75rem',
            fontFamily: "'Cormorant Garamond', serif", color: '#6b5f4a', fontSize: '0.85rem',
          }}>
            Prefer to book directly?{' '}
            <button
              type="button"
              onClick={openWhatsApp}
              style={{
                background: 'none', border: 'none', padding: 0,
                color: '#4ade80', cursor: 'pointer',
                fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
                textDecoration: 'underline',
              }}
            >
              Send via WhatsApp
            </button>
          </p>

          {/* Google Map Section — unchanged */}
          <div className="booking__location">
            <p className="booking__location-eyebrow">Find Us</p>
            <p className="booking__location-desc">
              Safari by Mirza — Ranthambore Safari Booking, Sawai Madhopur, Rajasthan
            </p>
            <div className="booking__map-embed">
              <div className="booking__map-embed-label">Sawai Madhopur · Rajasthan</div>
              <iframe
                title="Safari by Mirza Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.123456789!2d76.3629!3d26.0173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3971c9e9af9d9f4b%3A0x1234567890abcdef!2sSafari%20by%20mirza%20-%20Ranthambore%20Safari%20booking!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="380"
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="booking__map-embed-footer">
                <div className="booking__map-place">
                  <span className="booking__map-place-icon">📍</span>
                  <div>
                    <div className="booking__map-place-name">Safari by Mirza</div>
                    <div className="booking__map-place-addr">Ranthambore Safari Booking, Sawai Madhopur</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>📞</span>
                  <span className="booking__map-phone">+91 8368868187</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/ranthambore"
                  target="_blank" rel="noopener noreferrer"
                  className="booking__map-open-link"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}