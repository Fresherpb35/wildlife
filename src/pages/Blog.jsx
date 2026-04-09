import React, { useState, useEffect } from 'react';
import { subscribeNewsletter } from '../api/newsletterApi';
import '../blog.css';

const STATIC_POSTS = [
  { 
    id: 'static-1', 
    category: 'Wildlife',     
    tag: 'Tiger Sighting', 
    date: 'March 12, 2025',    
    readTime: '5 min read', 
    title: 'The Golden Hour: Spotting Bengal Tigers at Dawn in Ranthambore',               
    excerpt: 'There is a silence before sunrise in Zone 3 that feels ancient — the kind of stillness that predates language.',
    image: '🐯', 
    color: '#c8501a' 
  },
  { 
    id: 'static-2', 
    category: 'Travel Guide', 
    tag: 'Seasonal Tips', 
    date: 'February 28, 2025', 
    readTime: '7 min read', 
    title: 'Best Time to Visit Ranthambore: A Month-by-Month Breakdown', 
    excerpt: 'October through June, each month paints a different portrait of the park.', 
    image: '🌿', 
    color: '#2d7a4f' 
  },
  { id: 'static-3', category: 'Conservation', tag: 'Project Tiger', date: 'February 10, 2025', readTime: '6 min read', title: "India's Tiger Population Crosses 3,000...", excerpt: '...', image: '🦁', color: '#D4AF37' },
  { id: 'static-4', category: 'Wildlife', tag: 'Chambal River', date: 'January 22, 2025', readTime: '4 min read', title: "Gharials of the Chambal...", excerpt: '...', image: '🐊', color: '#1a6b8a' },
  { id: 'static-5', category: 'Photography', tag: 'Camera Gear', date: 'January 8, 2025', readTime: '8 min read', title: 'Wildlife Photography in Ranthambore...', excerpt: '...', image: '📷', color: '#7a4f2d' },
  { id: 'static-6', category: 'Culture', tag: 'Local Heritage', date: 'December 18, 2024', readTime: '5 min read', title: 'Beyond the Tiger: Ranthambore Fort...', excerpt: '...', image: '🏰', color: '#8a4f7a' },
];

const CATEGORIES = ['All', 'Wildlife', 'Travel Guide', 'Conservation', 'Photography', 'Culture'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const [featured, setFeatured] = useState(null);
  const [dynamicPosts, setDynamicPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Newsletter states
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('idle');
  const [subMessage, setSubMessage] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // ✅ Vite .env Support + Fallback
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/blogs?published=true`);

        // ✅ JSON Validation Check
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response from server (HTML instead of JSON)");
        }

        const result = await res.json();
        const blogsArray = result.blogs || result.data;

        if (result.success && Array.isArray(blogsArray)) {
          const mapped = blogsArray.map(blog => ({
            id: blog.id || blog._id,
            category: blog.category || 'Wildlife',
            tag: blog.tag || 'New Story',
            date: new Intl.DateTimeFormat('en-US', { 
              month: 'long', day: 'numeric', year: 'numeric' 
            }).format(new Date(blog.publishedAt || blog.createdAt)),
            readTime: blog.readTime || '6 min read',
            title: blog.title,
            excerpt: blog.excerpt || (blog.content ? blog.content.substring(0, 160) + '...' : ''),
            image: blog.imageEmoji || '🌿',
            color: blog.color || '#2d7a4f',
            fullContent: blog.content
          }));
          setDynamicPosts(mapped);
        }
      } catch (err) {
        console.error("❌ Blog Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ NEW BLOGS (Dynamic) + OLD BLOGS (Static)
  const allPosts = [...dynamicPosts, ...STATIC_POSTS];

  const filtered = active === 'All' 
    ? allPosts 
    : allPosts.filter(p => p.category === active);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('loading');
    try {
      const res = await subscribeNewsletter(email);
      setSubStatus('success');
      setSubMessage(res?.message || 'Subscribed! Welcome to the Wildlife Journal.');
      setEmail('');
    } catch (err) {
      setSubStatus('error');
      setSubMessage(err.message || 'Something went wrong.');
    }
  };

  // Article View
  if (featured) {
    const post = allPosts.find(p => p.id === featured);
    if (!post) return <div className="blog-article">Post not found</div>;

    return (
      <div className="blog-article">
        <div className="blog-article__inner">
          <button className="blog-article__back" onClick={() => setFeatured(null)}>
            ← Back to Blog
          </button>

          <div className="blog-article__header" style={{
            background: `radial-gradient(ellipse at top left, ${post.color}22, transparent 60%), rgba(255,255,255,0.03)`,
            border: `1px solid ${post.color}33`,
          }}>
            <span className="blog-article__emoji">{post.image}</span>
            <span className="blog-article__meta" style={{ color: post.color }}>
              {post.category} · {post.tag}
            </span>
            <h1 className="blog-article__title">{post.title}</h1>
            <p className="blog-article__date">{post.date} · {post.readTime}</p>
          </div>

          <div className="blog-article__body">
            {post.fullContent ? (
              <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
            ) : (
              <>
                <p>{post.excerpt}</p>
                <p>The wilderness does not reveal itself to the impatient. Every experienced guide will tell you the same: it is the quality of your silence...</p>
                <blockquote className="blog-article__blockquote" style={{ borderLeft: `3px solid ${post.color}` }}>
                  "The tiger is not something you find in a forest. It is something the forest reveals, when it decides you are ready."
                </blockquote>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog">
      <div className="blog__inner">
        <div className="blog__header">
          <p className="blog__eyebrow">Stories from the Wild</p>
          <h1 className="blog__title">The Wildlife <em>Journal</em></h1>
          <p className="blog__subtitle">Field notes, conservation stories, and travel guides from the heart of the forest.</p>
        </div>

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

        {loading && <p style={{ textAlign: 'center', padding: '2rem', color: '#a89060' }}>Loading latest stories...</p>}

        {/* List View */}
        <div className="blog__grid" style={{ marginTop: '2rem' }}>
          {filtered.map(post => (
            <div
              key={post.id}
              className="blog__card"
              onClick={() => setFeatured(post.id)}
              style={{
                background: `radial-gradient(ellipse at top right, ${post.color}14, transparent 60%), rgba(255,255,255,0.02)`,
                border: `1px solid ${post.color}28`,
                cursor: 'pointer'
              }}
            >
              <div className="blog__card-top">
                <div className="blog__card-icon" style={{ background: `${post.color}20` }}>
                  {post.image}
                </div>
                <span className="blog__card-tag" style={{ color: post.color, border: `1px solid ${post.color}30` }}>
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

        {/* Newsletter */}
        <div className="blog__newsletter" style={{ marginTop: '4rem' }}>
          <span className="blog__newsletter-icon">📬</span>
          <h3 className="blog__newsletter-title">Stories Delivered to You</h3>
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
              />
              <button type="submit" className="blog__newsletter-btn" disabled={subStatus === 'loading'}>
                {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}