// ─── FOOTER COMPONENT ─────────────────────────────────────────────────────────
import React from 'react';
import '../footer.css';

const FOOTER_LINKS = [
  { label: 'Home',           page: 'home'    },
  { label: 'Safari Booking', page: 'booking' },
  { label: 'Chambal Safari', page: 'chambal' },
  { label: 'Hotels',         page: 'hotels'  },
  { label: 'Contact',        page: 'contact' },
];

const CONTACT_ITEMS = [
  {
    label: '📧 info@wildlifesafariindia.com',
    href: 'mailto:info@wildlifesafariindia.com',
  },
  {
    label: '📞 +91 9815585834',
    href: 'https://wa.me/9815585834',
  },
  {
    label: '📞 +91 9229841090',
    href: 'https://wa.me/919229841090',
  },
  {
    label: '📍 New Delhi 110017',
    href: null, // not clickable
  },
];

export default function Footer({ navigate }) {
  const go = (pg) => { 
    navigate(pg); 
    window.scrollTo(0, 0); 
  };

  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div>
          <div className="footer__brand-logo" onClick={() => go('home')} style={{ cursor: 'pointer' }}>
            <span className="footer__brand-logo-icon">🐯</span>
            <div>
              <div className="footer__brand-name">WILDLIFE</div>
              <div className="footer__brand-sub">Safari India</div>
            </div>
          </div>
          <p className="footer__brand-desc">
            Private travel agency specializing in hotel bookings, safari bookings, and tour packages.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer__nav-heading">Navigation</h4>
          <div className="footer__nav-grid">
            {FOOTER_LINKS.map(({ page, label }) => (
              <button key={page} onClick={() => go(page)} className="footer__nav-link">
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="footer__contact-heading">Contact</h4>
          {CONTACT_ITEMS.map(({ label, href }) =>
            href ? (
              /* FIXED: Added the missing 'a' tag here */
              <a 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__contact-line footer__contact-link"
                style={{ display: 'block' }} 
              >
                {label}
              </a>
            ) : (
              <p key={label} className="footer__contact-line">{label}</p>
            )
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <p className="footer__copyright">© 2025 Wildlife Safari India. All rights reserved.</p>
        <div className="footer__legal-links">
          {['Privacy Policy', 'Terms', 'Cancellation'].map(l => (
            <span key={l} className="footer__legal-link">{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}