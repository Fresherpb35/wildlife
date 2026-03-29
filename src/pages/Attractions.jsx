// ─── PAGE SECTION: ATTRACTIONS ────────────────────────────────────────────────
import React, { useState } from 'react';
import { useBreakpoint } from '../utils/styles';
import '../attractions.css';

// ── Local images (place these files in your /public/images/ or /src/assets/ folder) ──
import imgSafari from '../assets/leesa-charlotte-qWeDY3isTUY-unsplash (1).jpg';
import imgFort  from '../assets/istockphoto-1445341348-612x612.jpg';
import imgChambal from '../assets/chambal.jpeg'
import imgKachida from '../assets/gettyimages-1957671515-612x612.jpg';
import imgPadam from '../assets/padam-talao.jpeg';
import imgJogi from '../assets/jogi-mahal.jpeg';
import imgGanesh from '../assets/istockphoto-1727264460-612x612.jpg';

const ATTRACTIONS = [
  {
    title: 'Safari Experience',
    img: imgSafari,
    desc: 'Embark on thrilling jeep or canter safaris through rich habitats of wildlife, plants, and birds.',
  },
  {
    title: 'Ranthambore Fort',
    img: imgFort,
    desc: 'Explore the 10th-century UNESCO-listed fort, a symbol of imperial heritage and breathtaking views.',
  },
   {
    title: 'Chambal Safari',
    img: imgChambal,
    desc: 'Explore the 10th-century UNESCO-listed fort, a symbol of imperial heritage and breathtaking views.',
  },
  {
    title: 'Kachida Valley',
    img: imgKachida,
    desc: 'A picturesque valley with lush greenery, rocky outcrops, and serene lakes — a haven for nature lovers.',
  },
  {
    title: 'Padam Talao',
    img: imgPadam,
    desc: "The park's largest lake adorned with water lilies, a key water source and bird-watching hotspot.",
  },
  {
    title: 'Jogi Mahal',
    img: imgJogi,
    desc: 'A former royal hunting retreat, now a serene forest rest house beside the scenic Padam Talao.',
  },
  {
    title: 'Trinetra Ganesh Temple',
    img: imgGanesh,
    desc: "One of Rajasthan's oldest temples, nestled within Ranthambore Fort, featuring the unique Pratham Ganesha idol.",
  },
];

export default function Attractions() {
  const [active, setActive] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const isNarrow = isMobile || isTablet;

  return (
    <section className="attractions">
      <div className="attractions__inner">

        {/* Header */}
        <div className="attractions__header">
          <p className="attractions__eyebrow">Ranthambore Tiger Reserve</p>
          <h2 className="attractions__title">
            Witness the <em>Majesty</em> of Ranthambore
          </h2>
        </div>

        {isNarrow ? (
          /* ── Mobile/Tablet: stacked layout ── */
          <div className="attractions__layout-mobile">
            <div className="attractions__mobile-img-wrap">
              <img
                key={active}
                src={ATTRACTIONS[active].img}
                alt={ATTRACTIONS[active].title}
                className="attractions__mobile-img"
              />
              <div className="attractions__mobile-overlay">
                <h3 className="attractions__mobile-title">{ATTRACTIONS[active].title}</h3>
                <p className="attractions__mobile-desc">{ATTRACTIONS[active].desc}</p>
              </div>
            </div>

            {/* Horizontal scrollable tab list */}
            <div className="attractions__tab-scroll">
              {ATTRACTIONS.map((a, i) => (
                <button
                  key={a.title}
                  onClick={() => setActive(i)}
                  className={`attractions__tab-btn${i === active ? ' attractions__tab-btn--active' : ''}`}
                >
                  {a.title}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Desktop: side-by-side layout ── */
          <div className="attractions__layout-desktop">
            {/* Sidebar list */}
            <div className="attractions__sidebar">
              {ATTRACTIONS.map((a, i) => (
                <button
                  key={a.title}
                  onClick={() => setActive(i)}
                  className={`attractions__sidebar-btn${i === active ? ' attractions__sidebar-btn--active' : ''}`}
                >
                  <span className="attractions__sidebar-num">0{i + 1}</span>
                  <span className="attractions__sidebar-label">{a.title}</span>
                  <span className="attractions__sidebar-arrow">→</span>
                </button>
              ))}
            </div>

            {/* Active display */}
            <div className="attractions__display">
              <img
                key={active}
                src={ATTRACTIONS[active].img}
                alt={ATTRACTIONS[active].title}
                className="attractions__display-img"
              />
              <div className="attractions__display-overlay">
                <h3 className="attractions__display-title">{ATTRACTIONS[active].title}</h3>
                <p className="attractions__display-desc">{ATTRACTIONS[active].desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


