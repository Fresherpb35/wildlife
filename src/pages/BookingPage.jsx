import React, { useState } from 'react';
import { useBreakpoint } from '../utils/styles';
import '../booking.css';

const WHATSAPP_NUMBER = '918368868187';

export default function BookingPage() {
  const { isMobile } = useBreakpoint();

  const [form, setForm] = useState({
    name: '',
    date: '',
    type: 'Gypsy',
    zone: 'Zone 1',
    time: 'Morning',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open WhatsApp directly with form data
  const openWhatsApp = () => {
    if (!form.name || !form.date || !form.email) {
      alert('Please fill Name, Date and Email');
      return false;
    }

    const message = `🌿 *Safari Booking Request — Wildlife Safari India*

👤 Name: ${form.name}
📧 Email: ${form.email}
📞 Phone: ${form.phone || 'N/A'}
📅 Date: ${form.date}
🚙 Type: ${form.type}
📍 Zone: ${form.zone}
🕐 Time: ${form.time}

_Sent via Wildlife Safari India Website_`;

    const isMobileDevice = /iPhone|Android|iPad/i.test(navigator.userAgent);

    const url = isMobileDevice
      ? `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`
      : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = openWhatsApp();

    if (success) {
      setTimeout(() => {
        setForm({
          name: '',
          date: '',
          type: 'Gypsy',
          zone: 'Zone 1',
          time: 'Morning',
          email: '',
          phone: '',
        });
        setIsSubmitting(false);
      }, 800);
    } else {
      setIsSubmitting(false);
    }
  };

  // Integrated Fields Configuration
  const fields = [
    // Text Inputs
    { label: 'Full Name', name: 'name', type: 'text', required: true },
    { label: 'Safari Date', name: 'date', type: 'date', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Phone Number', name: 'phone', type: 'tel', required: false },

    // Dropdowns
    {
      label: 'Safari Type',
      name: 'type',
      type: 'select',
      options: ['Gypsy', 'Canter'],
    },
    {
      label: 'Safari Zone',
      name: 'zone',
      type: 'select',
      options: Array.from({ length: 10 }, (_, i) => `Zone ${i + 1}`),
    },
    {
      label: 'Safari Time',
      name: 'time',
      type: 'select',
      options: ['Morning', 'Evening'],
    },
  ];

  return (
    <div className="booking">
      <div className="booking__inner">
        <p className="booking__eyebrow">Reserve Your Spot</p>
        <h1 className="booking__title">
          Book a <em>Safari</em>
        </h1>

        <form onSubmit={handleSubmit} className="booking__form">
          <div
            className={`booking__grid${
              isMobile ? ' booking__grid--mobile' : ''
            }`}
          >
            {/* Single Integrated Map for all fields */}
            {fields.map((field) => (
              <div key={field.name} className="booking__field">
                <label className="booking__label">{field.label}</label>

                {field.type === 'select' ? (
                  // Dropdown Field
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="booking__select"
                    disabled={isSubmitting}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  // Input Field
                  <input
                    name={field.name}
                    type={field.type}
                    value={form[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="booking__input"
                    disabled={isSubmitting}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="booking__submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Opening WhatsApp...' : 'Submit Booking Request'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
            Prefer direct booking?{' '}
            <button
              type="button"
              onClick={openWhatsApp}
              style={{
                background: 'none',
                border: 'none',
                color: '#25D366',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
              disabled={isSubmitting}
            >
              Send via WhatsApp
            </button>
          </p>
        </form>
        
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
      </div>
    </div>
  );
}