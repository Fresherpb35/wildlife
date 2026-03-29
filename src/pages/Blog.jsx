// ─── PAGE: BLOG (API-integrated newsletter) ───────────────────────────────────
// BlogPage already uses subscribeNewsletter correctly via '../api/newsletterApi'.
// This version keeps full parity with the uploaded BlogPage while ensuring the
// import path matches the project's api/ folder structure.

import React, { useState } from 'react';
import { subscribeNewsletter } from '../api/newsletterApi';
import '../blog.css';

const POSTS = [
  { id: 1, category: 'Wildlife',     tag: 'Tiger Sighting', date: 'March 12, 2025',    readTime: '5 min read', title: 'The Golden Hour: Spotting Bengal Tigers at Dawn in Ranthambore',               excerpt: 'There is a silence before sunrise in Zone 3 that feels ancient — the kind of stillness that predates language. We share what it means to witness a tigress and her cubs at first light.', image: '🐯', color: '#c8501a' },
  { id: 2, category: 'Travel Guide', tag: 'Seasonal Tips',  date: 'February 28, 2025', readTime: '7 min read', title: 'Best Time to Visit Ranthambore: A Month-by-Month Breakdown',                  excerpt: 'October through June, each month paints a different portrait of the park. We decode the seasons — monsoon closures, peak sighting windows, and the magical shoulder months.',           image: '🌿', color: '#2d7a4f' },
  { id: 3, category: 'Conservation', tag: 'Project Tiger',  date: 'February 10, 2025', readTime: '6 min read', title: "India's Tiger Population Crosses 3,000 — What This Means for Wildlife Tourism", excerpt: 'A landmark conservation victory decades in the making. We explore how Project Tiger transformed Ranthambore and what responsible tourism looks like in a thriving ecosystem.',         image: '🦁', color: '#D4AF37' },
  { id: 4, category: 'Wildlife',     tag: 'Chambal River',  date: 'January 22, 2025',  readTime: '4 min read', title: "Gharials of the Chambal: India's Most Critically Endangered Crocodilian",      excerpt: 'The Chambal River shelters one of the last wild populations of the gharial. A boat safari here is a journey through prehistoric time — and a critical conservation story.',           image: '🐊', color: '#1a6b8a' },
  { id: 5, category: 'Photography',  tag: 'Camera Gear',    date: 'January 8, 2025',   readTime: '8 min read', title: 'Wildlife Photography in Ranthambore: Gear, Settings & Ethics',                  excerpt: 'From telephoto choices to the unwritten code of conduct in a jeep — a pro wildlife photographer shares everything you need to return home with images that tell a story.',              image: '📷', color: '#7a4f2d' },
  { id: 6, category: 'Culture',      tag: 'Local Heritage', date: 'December 18, 2024', readTime: '5 min read', title: 'Beyond the Tiger: Ranthambore Fort and the History Hiding in Plain Sight',      excerpt: 'A UNESCO World Heritage Site sits inside the tiger reserve itself. The ancient fort, overlooking three lakes, has watched over this land for over a thousand years.',                   image: '🏰', color: '#8a4f7a' },
];

const CATEGORIES = ['All', 'Wildlife', 'Travel Guide', 'Conservation', 'Photography', 'Culture'];

export default function BlogPage() {
  const [active,   setActive]   = useState('All');
  const [featured, setFeatured] = useState(null);

  // Newsletter
  const [email,      setEmail]      = useState('');
  const [subStatus,  setSubStatus]  = useState('idle');  // idle | loading | success | error
  const [subMessage, setSubMessage] = useState('');

  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.category === active);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    setSubMessage('');
    try {
      const res = await subscribeNewsletter(email);
      setSubStatus('success');
      setSubMessage(res?.message || 'Subscribed! Welcome to the Wildlife Journal.');
      setEmail('');
    } catch (err) {
      setSubStatus('error');
      // Decode client.js error shape
      if (err.errors?.length) {
        setSubMessage(err.errors.map(e => (typeof e === 'string' ? e : e.message)).join(', '));
      } else if (err.data?.message) {
        setSubMessage(err.data.message);
      } else {
        setSubMessage(err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  // ── Article view ────────────────────────────────────────────────────────────
  if (featured) {
    const post = POSTS.find(p => p.id === featured);
    return (
      <div className="blog-article">
        <div className="blog-article__inner">
          <button className="blog-article__back" onClick={() => setFeatured(null)}>
            ← Back to Blog
          </button>
          <div
            className="blog-article__header"
            style={{
              background: `radial-gradient(ellipse at top left, ${post.color}22, transparent 60%), rgba(255,255,255,0.03)`,
              border: `1px solid ${post.color}33`,
            }}
          >
            <span className="blog-article__emoji">{post.image}</span>
            <span className="blog-article__meta" style={{ color: post.color }}>
              {post.category} · {post.tag}
            </span>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__date">{post.date} · {post.readTime}</p>
          </div>

          <div className="blog-article__body">
            <p>{post.excerpt}</p>
            <p>The wilderness does not reveal itself to the impatient. Every experienced guide will tell you the same: it is the quality of your silence, not the speed of your jeep, that determines what you witness.</p>
            <p>Ranthambore National Park sprawls across 1,334 square kilometres of dry deciduous forest in Rajasthan. It is not merely a destination — it is a living, breathing argument for conservation.</p>
            <blockquote
              className="blog-article__blockquote"
              style={{ borderLeft: `3px solid ${post.color}` }}
            >
              "The tiger is not something you find in a forest. It is something the forest reveals, when it decides you are ready."
            </blockquote>
            <p>Zone 3 and Zone 4 are widely considered the most reliable zones for tiger sightings, but veteran naturalists often prefer Zone 6 for its dramatic landscapes and golden afternoon light.</p>
          </div>
        </div>
      </div>
    );
  }

  // ── Blog listing view ───────────────────────────────────────────────────────
  return (
    <div className="blog">
      <div className="blog__inner">
        <div className="blog__header">
          <p className="blog__eyebrow">Stories from the Wild</p>
          <h1 className="blog__title">The Wildlife <em>Journal</em></h1>
          <p className="blog__subtitle">
            Field notes, conservation stories, travel guides, and the quiet revelations that only the forest can offer.
          </p>
        </div>

        {/* Category Filter */}
        <div className="blog__filter">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`blog__filter-btn${active === cat ? ' blog__filter-btn--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filtered.length > 0 && (
          <div
            className="blog__featured"
            onClick={() => setFeatured(filtered[0].id)}
            style={{
              background: `radial-gradient(ellipse at top left, ${filtered[0].color}18, transparent 60%), rgba(255,255,255,0.03)`,
              border: `1px solid ${filtered[0].color}30`,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = filtered[0].color + '80'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = filtered[0].color + '30'; e.currentTarget.style.transform = 'none'; }}
          >
            <div className="blog__featured-icon" style={{ background: `${filtered[0].color}20` }}>
              {filtered[0].image}
            </div>
            <div>
              <div className="blog__featured-meta">
                <span className="blog__featured-category" style={{ color: filtered[0].color }}>{filtered[0].category}</span>
                <span className="blog__featured-divider" />
                <span className="blog__featured-date">{filtered[0].date} · {filtered[0].readTime}</span>
              </div>
              <h2 className="blog__featured-title">{filtered[0].title}</h2>
              <p className="blog__featured-excerpt">{filtered[0].excerpt}</p>
              <span className="blog__featured-cta">Read Article →</span>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="blog__grid">
          {filtered.slice(1).map(post => (
            <div
              key={post.id}
              className="blog__card"
              onClick={() => setFeatured(post.id)}
              style={{
                background: `radial-gradient(ellipse at top right, ${post.color}14, transparent 60%), rgba(255,255,255,0.02)`,
                border: `1px solid ${post.color}28`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = post.color + '70'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = post.color + '28'; e.currentTarget.style.transform = 'none'; }}
            >
              <div className="blog__card-top">
                <div className="blog__card-icon" style={{ background: `${post.color}20` }}>{post.image}</div>
                <span className="blog__card-tag" style={{ color: post.color, background: `${post.color}15`, border: `1px solid ${post.color}30` }}>
                  {post.tag}
                </span>
              </div>
              <h3 className="blog__card-title">{post.title}</h3>
              <p className="blog__card-excerpt">{post.excerpt}</p>
              <div className="blog__card-footer">
                <span className="blog__card-date">{post.date}</span>
                <span className="blog__card-read">{post.readTime} →</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="blog__newsletter">
          <span className="blog__newsletter-icon">📬</span>
          <h3 className="blog__newsletter-title">Stories Delivered to You</h3>
          <p className="blog__newsletter-desc">
            Field notes, seasonal guides, and rare sighting reports — directly in your inbox.
          </p>

          {subStatus === 'success' ? (
            <p className="blog__newsletter-success">{subMessage}</p>
          ) : (
            <form className="blog__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="your@email.com"
                className="blog__newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={subStatus === 'loading'}
              />
              <button
                type="submit"
                className="blog__newsletter-btn"
                disabled={subStatus === 'loading'}
              >
                {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}

          {subStatus === 'error' && (
            <p className="blog__newsletter-error">{subMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}