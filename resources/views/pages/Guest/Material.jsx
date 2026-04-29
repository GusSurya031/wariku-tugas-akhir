import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Shared: Fonts + Base Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Caveat:wght@700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fafaf8; color: #1a1a1a; }
    .font-handwrite { font-family: 'Caveat', cursive; }

    /* Navbar */
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 2px; background: #F59E0B; transition: width 0.3s;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Hero */
    .hero-material {
      background: linear-gradient(135deg, #fef9e7 0%, #fdf4ca 50%, #fef3e2 100%);
      overflow: hidden;
    }

    /* Material Card */
    .material-card {
      background: #ffffff;
      border: 1px solid #f0ede6;
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
      cursor: pointer;
    }
    .material-card:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 24px 48px rgba(0,0,0,0.10);
    }
    .material-card:hover .card-btn { background: #F59E0B; color: #fff; }
    .card-thumbnail {
      background: linear-gradient(135deg, #fef9e7, #fff7ed);
      min-height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .card-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 16px; border-radius: 999px;
      background: #FEF3C7; color: #92400e;
      font-size: 12px; font-weight: 700;
      border: none; cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    /* Category badge */
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
    }

    /* CTA purple section */
    .cta-purple {
      background: linear-gradient(135deg, #5B21B6 0%, #7C3AED 60%, #6D28D9 100%);
    }

    /* Load more btn */
    .btn-outline-dark {
      border: 2px solid #374151; border-radius: 999px;
      padding: 10px 32px; font-weight: 700; font-size: 14px;
      background: transparent; color: #374151; cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .btn-outline-dark:hover { background: #374151; color: #fff; }

    /* Filter pill */
    .filter-pill {
      padding: 6px 18px; border-radius: 999px; font-size: 13px; font-weight: 600;
      border: 2px solid #e5e7eb; background: #fff; color: #6b7280;
      cursor: pointer; transition: all 0.2s;
    }
    .filter-pill.active, .filter-pill:hover {
      border-color: #F59E0B; background: #FEF3C7; color: #92400e;
    }
    .filter-pill.active { background: #F59E0B; color: #fff; border-color: #F59E0B; }

    /* Animations */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .float-sm { animation: float 5s ease-in-out infinite; }
    .float-sm:nth-child(2) { animation-duration: 7s; animation-delay: 1s; }
    .spin-slow { animation: spinSlow 20s linear infinite; }

    /* Scroll fade-in */
    .fade-in-ready {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in-ready.visible { opacity: 1; transform: none; }
  `}</style>
);

// ─────────────────────────────────────────────
//  Shared: Logo SVG
// ─────────────────────────────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#F5A623" strokeWidth="2" />
    <path d="M8 10 Q14 6 20 10 Q14 14 8 10Z" fill="#F5A623" />
    <path d="M8 14 Q14 10 20 14 Q14 18 8 14Z" fill="#4A90D9" opacity="0.7" />
    <path d="M8 18 Q14 14 20 18 Q14 22 8 18Z" fill="#F5A623" opacity="0.5" />
  </svg>
);

// ─────────────────────────────────────────────
//  Shared: Social Icons
// ─────────────────────────────────────────────
const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const TwIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);

// ─────────────────────────────────────────────
//  Shared: useInView scroll hook
// ─────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─────────────────────────────────────────────
//  Reusable: Math Thumbnail Illustration
// ─────────────────────────────────────────────
const MathThumbnail = ({ color = "#6366F1", accentColor = "#F59E0B", size = "md" }) => {
  const numbers = ["1","2","3","4","5","6","7","8","9","0"];
  const ops = ["+","−","×","÷","="];
  const colors = ["#EF4444","#3B82F6","#10B981","#F59E0B","#8B5CF6","#EC4899","#06B6D4"];
  const sz = size === "sm" ? 0.75 : 1;

  return (
    <div style={{ width: `${160*sz}px`, height: `${120*sz}px`, position: "relative", userSelect: "none" }}>
      {/* Scattered numbers */}
      {numbers.map((n, i) => (
        <div key={n} style={{
          position: "absolute",
          fontSize: `${(14 + (i % 3) * 4) * sz}px`,
          fontWeight: 900,
          color: colors[i % colors.length],
          left: `${(i * 17) % 80}%`,
          top: `${(i * 23 + 5) % 70}%`,
          textShadow: "0 2px 4px rgba(0,0,0,0.12)",
          transform: `rotate(${(i * 13 - 20)}deg)`,
          lineHeight: 1,
        }}>{n}</div>
      ))}
      {/* Operators */}
      {ops.map((op, i) => (
        <div key={op} style={{
          position: "absolute",
          fontSize: `${11 * sz}px`,
          fontWeight: 700,
          color: colors[(i + 3) % colors.length],
          left: `${(i * 19 + 5) % 85}%`,
          top: `${(i * 17 + 15) % 75}%`,
          transform: `rotate(${(i * -11)}deg)`,
        }}>{op}</div>
      ))}
      {/* MATH text */}
      <div style={{
        position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)",
        fontSize: `${22 * sz}px`, fontWeight: 900, color: "#1D4ED8",
        textShadow: `2px 2px 0 #93C5FD, -1px -1px 0 #BFDBFE`,
        letterSpacing: "3px", whiteSpace: "nowrap",
      }}>MATH</div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ✅ REUSABLE COMPONENT: MaterialCard
// ─────────────────────────────────────────────
/**
 * Props:
 *  - title      {string}  Card title
 *  - description{string}  Short description text
 *  - category   {string}  Badge label (e.g. "Dasar", "Menengah")
 *  - categoryColor{string} Tailwind-style hex for badge bg
 *  - level      {number}  Difficulty 1-3
 *  - duration   {string}  e.g. "45 Menit"
 *  - thumbnail  {ReactNode} Optional custom thumbnail
 *  - onSelect   {fn}      Click handler
 *  - delay      {number}  Animation stagger delay in seconds
 */
const MaterialCard = ({
  title = "Penjumlahan Dasar",
  description = "Pelajari konsep dasar penjumlahan sebagai fondasi dalam memahami operasi matematika.",
  category = "Dasar",
  categoryColor = "#D97706",
  level = 1,
  duration = "30 Menit",
  thumbnail,
  onSelect,
  delay = 0,
}) => {
  const [ref, visible] = useInView(0.1);
  const levelDots = [1, 2, 3];

  return (
    <div
      ref={ref}
      className="material-card fade-in-ready"
      style={{
        transitionDelay: `${delay}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
      }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
    >
      {/* Thumbnail */}
      <div className="card-thumbnail">
        {thumbnail || <MathThumbnail />}
        {/* Category badge overlay */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: categoryColor, color: "#fff",
          borderRadius: "999px", padding: "3px 10px",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em",
        }}>{category}</div>
        {/* Duration badge */}
        <div style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
          borderRadius: "999px", padding: "3px 10px",
          fontSize: "11px", fontWeight: 600, color: "#374151",
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {duration}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px 18px" }}>
        {/* Difficulty dots */}
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {levelDots.map((d) => (
            <div key={d} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: d <= level ? "#F59E0B" : "#E5E7EB",
            }} />
          ))}
          <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 4, fontWeight: 500 }}>
            {level === 1 ? "Pemula" : level === 2 ? "Menengah" : "Lanjut"}
          </span>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#111827", marginBottom: 6, lineHeight: 1.3 }}>
          {title}
        </h3>
        <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.6, marginBottom: 14 }}>
          {description}
        </p>

        <button className="card-btn">
          Selengkapnya
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  Hero Book Illustration (CSS 3D-style)
// ─────────────────────────────────────────────
const BookIllustration = () => (
  <div style={{ position: "relative", width: 280, height: 220 }}>
    {/* Open book base */}
    <div style={{
      position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
      width: 200, height: 140,
      background: "linear-gradient(135deg, #f8f8f8, #ececec)",
      borderRadius: "4px 4px 8px 8px",
      boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
    }}>
      {/* Pages left */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "50%",
        background: "linear-gradient(to right, #f0f0f0, #f8f8f8)",
        borderRadius: "4px 0 0 8px",
        borderRight: "1px solid #e0e0e0",
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            height: 2, background: "#ddd", margin: `${14 + i * 14}px 12px ${0}px`,
            borderRadius: 2, width: `${65 + (i % 3) * 10}%`,
          }} />
        ))}
      </div>
      {/* Pages right */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "50%",
        background: "linear-gradient(to left, #f0f0f0, #f8f8f8)",
        borderRadius: "0 4px 8px 0",
      }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            height: 2, background: "#ddd", margin: `${14 + i * 14}px 12px`,
            borderRadius: 2, width: `${60 + (i % 2) * 15}%`,
          }} />
        ))}
      </div>
      {/* Spine */}
      <div style={{
        position: "absolute", left: "50%", top: 0, bottom: 0,
        width: 4, background: "#ccc", transform: "translateX(-50%)",
      }} />
    </div>

    {/* Pink book (back) */}
    <div className="float-sm" style={{
      position: "absolute", top: 20, left: 10,
      width: 60, height: 80, background: "linear-gradient(135deg, #EC4899, #F472B6)",
      borderRadius: 4, boxShadow: "0 6px 16px rgba(236,72,153,0.3)",
      transform: "rotate(-15deg)",
    }} />

    {/* Orange book */}
    <div className="float-sm" style={{
      position: "absolute", top: 10, right: 20,
      width: 55, height: 70, background: "linear-gradient(135deg, #F97316, #FB923C)",
      borderRadius: 4, boxShadow: "0 6px 16px rgba(249,115,22,0.3)",
      transform: "rotate(12deg)",
      animationDelay: "1.5s",
    }} />

    {/* Green book */}
    <div className="float-sm" style={{
      position: "absolute", top: 50, right: 5,
      width: 45, height: 60, background: "linear-gradient(135deg, #10B981, #34D399)",
      borderRadius: 4, boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
      transform: "rotate(20deg)",
      animationDelay: "0.8s",
    }} />

    {/* Stars */}
    {[
      { top: 5, left: 80, size: 18, color: "#F59E0B" },
      { top: 30, right: 80, size: 14, color: "#FBBF24" },
      { bottom: 30, left: 40, size: 12, color: "#FCD34D" },
      { top: 60, left: 150, size: 16, color: "#F59E0B" },
    ].map((s, i) => (
      <div key={i} className="float-sm" style={{
        position: "absolute", ...s, color: s.color,
        fontSize: s.size, animationDelay: `${i * 0.7}s`,
      }}>★</div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
//  CTA Illustration
// ─────────────────────────────────────────────
const ThinkingGirl = () => (
  <div style={{ position: "relative", width: 200, height: 200 }}>
    {/* Books tower */}
    <div style={{ position: "absolute", bottom: 0, left: 20 }}>
      {[
        { w: 80, h: 14, bg: "#92400E" },
        { w: 70, h: 14, bg: "#D97706" },
        { w: 75, h: 14, bg: "#B45309" },
        { w: 65, h: 14, bg: "#78350F" },
        { w: 80, h: 14, bg: "#92400E" },
      ].map((b, i) => (
        <div key={i} style={{
          width: b.w, height: b.h, background: b.bg,
          borderRadius: 3, marginBottom: 1,
          boxShadow: "1px 2px 4px rgba(0,0,0,0.2)",
        }} />
      ))}
    </div>
    {/* Bookshelf poles */}
    <div style={{ position: "absolute", bottom: 0, left: 10, width: 6, height: 110, background: "#6B3D14", borderRadius: 3 }} />
    <div style={{ position: "absolute", bottom: 0, left: 105, width: 6, height: 110, background: "#6B3D14", borderRadius: 3 }} />

    {/* Girl */}
    <div style={{ position: "absolute", bottom: 0, right: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Head */}
      <div style={{ width: 44, height: 44, background: "#FBBF24", borderRadius: "50%", position: "relative", marginBottom: -2 }}>
        {/* Hair */}
        <div style={{ position: "absolute", top: -4, left: -4, right: -4, height: 26, background: "#DC2626", borderRadius: "50% 50% 0 0" }} />
        {/* Hair sides */}
        <div style={{ position: "absolute", top: 10, left: -8, width: 10, height: 24, background: "#DC2626", borderRadius: "0 0 8px 8px" }} />
        <div style={{ position: "absolute", top: 10, right: -8, width: 10, height: 24, background: "#DC2626", borderRadius: "0 0 8px 8px" }} />
        {/* Face eyes */}
        <div style={{ position: "absolute", top: 18, left: 10, width: 7, height: 7, background: "#374151", borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: 18, right: 10, width: 7, height: 7, background: "#374151", borderRadius: "50%" }} />
        {/* Blush */}
        <div style={{ position: "absolute", top: 26, left: 6, width: 8, height: 4, background: "#FCA5A5", borderRadius: "50%", opacity: 0.7 }} />
        <div style={{ position: "absolute", top: 26, right: 6, width: 8, height: 4, background: "#FCA5A5", borderRadius: "50%", opacity: 0.7 }} />
        {/* Hand on cheek */}
        <div style={{ position: "absolute", bottom: -4, right: -10, width: 12, height: 12, background: "#FBBF24", borderRadius: "50%" }} />
      </div>
      {/* Body */}
      <div style={{ width: 50, height: 60, background: "#7C3AED", borderRadius: "0 0 16px 16px", position: "relative" }}>
        {/* Open book on lap */}
        <div style={{
          position: "absolute", bottom: -5, left: -20, width: 45, height: 28,
          background: "#FEF3C7", borderRadius: 4,
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
          display: "flex",
        }}>
          <div style={{ flex: 1, borderRight: "1px solid #D1D5DB" }}>
            {[...Array(3)].map((_, i) => <div key={i} style={{ height: 2, background: "#D1D5DB", margin: "4px 4px" }} />)}
          </div>
          <div style={{ flex: 1 }}>
            {[...Array(3)].map((_, i) => <div key={i} style={{ height: 2, background: "#D1D5DB", margin: "4px 4px" }} />)}
          </div>
        </div>
      </div>
    </div>

    {/* Light bulb */}
    <div className="float-sm" style={{ position: "absolute", top: 0, right: 30 }}>
      <div style={{ width: 28, height: 28, background: "#FEF08A", borderRadius: "50%", boxShadow: "0 0 20px #FDE047, 0 0 40px #FEF08A80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>💡</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  DATA: Materials list
// ─────────────────────────────────────────────
const CATEGORIES = ["Semua", "Dasar", "Menengah", "Lanjut", "Geometri", "Statistik"];

const MATERIALS = [
  { id: 1, title: "Penjumlahan Dasar", description: "Pelajari konsep dasar penjumlahan sebagai fondasi dalam memahami operasi matematika.", category: "Dasar", categoryColor: "#16A34A", level: 1, duration: "30 Menit" },
  { id: 2, title: "Pengurangan Bilangan", description: "Pelajari teknik pengurangan bilangan bulat dan desimal dengan latihan bertahap.", category: "Dasar", categoryColor: "#16A34A", level: 1, duration: "25 Menit" },
  { id: 3, title: "Perkalian & Pembagian", description: "Kuasai operasi perkalian dan pembagian dasar untuk memperkuat fondasi matematikamu.", category: "Dasar", categoryColor: "#16A34A", level: 1, duration: "40 Menit" },
  { id: 4, title: "Pecahan & Desimal", description: "Memahami konsep pecahan biasa, campuran, dan desimal serta konversinya.", category: "Menengah", categoryColor: "#D97706", level: 2, duration: "45 Menit" },
  { id: 5, title: "Persamaan Linear", description: "Belajar menyelesaikan persamaan linear satu dan dua variabel secara sistematis.", category: "Menengah", categoryColor: "#D97706", level: 2, duration: "50 Menit" },
  { id: 6, title: "Bilangan Bulat Negatif", description: "Operasi bilangan bulat negatif dalam garis bilangan dan konteks nyata.", category: "Menengah", categoryColor: "#D97706", level: 2, duration: "35 Menit" },
  { id: 7, title: "Aljabar Dasar", description: "Pengenalan variabel, ekspresi aljabar, dan cara menyederhanakan bentuk aljabar.", category: "Lanjut", categoryColor: "#7C3AED", level: 3, duration: "60 Menit" },
  { id: 8, title: "Fungsi & Grafik", description: "Memahami konsep fungsi matematika dan cara menggambar grafiknya di bidang koordinat.", category: "Lanjut", categoryColor: "#7C3AED", level: 3, duration: "55 Menit" },
  { id: 9, title: "Luas & Keliling Bangun Datar", description: "Hitung luas dan keliling berbagai bangun datar: persegi, segitiga, lingkaran, dan trapesium.", category: "Geometri", categoryColor: "#0369A1", level: 2, duration: "40 Menit" },
];

// ─────────────────────────────────────────────
//  Shared: Navbar (same as Landing)
// ─────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo />
            <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>Wariku</span>
          </div>
          {/* Desktop */}
          <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
            {["Home", "Material", "About"].map(item => (
              <a key={item} href="#" className={`nav-link ${item === "Material" ? "active" : ""}`} style={{
                fontSize: 14, fontWeight: item === "Material" ? 700 : 500,
                color: item === "Material" ? "#111827" : "#6B7280",
                textDecoration: "none", transition: "color 0.2s",
              }}>{item}</a>
            ))}
          </div>
          <div className="desktop-nav" style={{ display: "flex", gap: 12 }}>
            <a href="#" style={{ padding: "8px 20px", borderRadius: 999, border: "2px solid #2563EB", color: "#2563EB", fontWeight: 700, fontSize: 13, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "#2563EB"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#2563EB"; }}>
              Login
            </a>
            <a href="#" style={{ padding: "8px 20px", borderRadius: 999, background: "#FBBF24", color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none", boxShadow: "0 4px 12px rgba(251,191,36,0.3)" }}>
              Register
            </a>
          </div>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="mobile-menu-btn"
          >
            <div style={{ width: 20, height: 2, background: "#374151", marginBottom: 4, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: "#374151", marginBottom: 4, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 20, height: 2, background: "#374151", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "12px 0 16px", borderRadius: "0 0 16px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
            {["Home", "Material", "About"].map(item => (
              <a key={item} href="#" style={{ display: "block", padding: "10px 16px", color: "#374151", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{item}</a>
            ))}
            <div style={{ display: "flex", gap: 12, padding: "10px 16px", borderTop: "1px solid #f3f4f6", marginTop: 8 }}>
              <a href="#" style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 999, border: "2px solid #2563EB", color: "#2563EB", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Login</a>
              <a href="#" style={{ flex: 1, textAlign: "center", padding: "8px 0", borderRadius: 999, background: "#FBBF24", color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Register</a>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

// ─────────────────────────────────────────────
//  Shared: Footer
// ─────────────────────────────────────────────
const Footer = () => (
  <footer style={{ background: "#fff", borderTop: "1px solid #f3f4f6", padding: "48px 24px 32px" }}>
    <div style={{ maxWidth: 1152, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Logo />
            <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>Wariku</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div>
            {["Home", "Material", "About", "Contact"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#6B7280", fontSize: 13, textDecoration: "none", marginBottom: 8 }}>{l}</a>
            ))}
          </div>
          <div>
            {["Media", "News", "Support Us"].map(l => (
              <a key={l} href="#" style={{ display: "block", color: "#6B7280", fontSize: 13, textDecoration: "none", marginBottom: 8 }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[IgIcon, FbIcon, TwIcon].map((Icon, i) => (
            <a key={i} href="#" style={{
              width: 38, height: 38, borderRadius: "50%", background: "#F3F4F6",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6B7280", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#FBBF24"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#F3F4F6"; e.currentTarget.style.color = "#6B7280"; }}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 12 }}>© 2026 Wariku. All rights reserved.</p>
    </div>
  </footer>
);

// ─────────────────────────────────────────────
//  PAGE: Material Page
// ─────────────────────────────────────────────
export default function MaterialPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [visibleCount, setVisibleCount] = useState(9);
  const [heroRef, heroVisible] = useInView(0.1);

  const filtered = activeFilter === "Semua"
    ? MATERIALS
    : MATERIALS.filter(m => m.category === activeFilter);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
      <GlobalStyles />
      <Navbar />

      {/* ══ HERO ══════════════════════════════════════ */}
      <section className="hero-material" style={{ paddingTop: 96, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
            {/* Text */}
            <div
              ref={heroRef}
              style={{
                maxWidth: 480,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "none" : "translateX(-32px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
              }}
            >
              {/* Eyebrow */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", border: "1px solid #E5E7EB",
                borderRadius: 999, padding: "4px 14px", marginBottom: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}>
                <span style={{ fontSize: 14 }}>📚</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#D97706" }}>Materi Pembelajaran</span>
              </div>

              <h1 style={{
                fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900,
                color: "#111827", lineHeight: 1.2, marginBottom: 16,
              }}>
                Jelajahi Materi{" "}
                <span style={{
                  fontFamily: "'Caveat', cursive",
                  color: "#F59E0B",
                  fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
                  display: "inline-block",
                  position: "relative",
                }}>
                  Pembelajaran
                  {/* Underline decoration */}
                  <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%" }} height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                    <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p style={{ color: "#6B7280", fontSize: 15, lineHeight: 1.7, maxWidth: 400 }}>
                Temukan berbagai materi matematika dasar yang dirancang secara bertahap sesuai tingkat pemahaman kamu
              </p>
            </div>

            {/* Illustration */}
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateX(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              <BookIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MATERIALS GRID ════════════════════════════ */}
      <section style={{ padding: "64px 24px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 900, color: "#111827", marginBottom: 10 }}>
              Pilih Materi Belajarmu
            </h2>
            <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" }}>
              Mulai dari konsep dasar hingga tingkat lanjut, setiap materi disusun untuk membantu kamu belajar secara bertahap dan terarah.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 40 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                onClick={() => { setActiveFilter(cat); setVisibleCount(9); }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div style={{ marginBottom: 24, color: "#9CA3AF", fontSize: 13, textAlign: "center" }}>
            Menampilkan <strong style={{ color: "#374151" }}>{Math.min(visibleCount, filtered.length)}</strong> dari <strong style={{ color: "#374151" }}>{filtered.length}</strong> materi
          </div>

          {/* Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {visible.map((mat, idx) => (
              <MaterialCard
                key={mat.id}
                title={mat.title}
                description={mat.description}
                category={mat.category}
                categoryColor={mat.categoryColor}
                level={mat.level}
                duration={mat.duration}
                delay={(idx % 3) * 0.1}
                onSelect={() => console.log("Selected:", mat.title)}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <button className="btn-outline-dark" onClick={() => setVisibleCount(v => v + 6)}>
                Lihat Lebih Banyak
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════════ */}
      <section className="cta-purple" style={{ padding: "64px 24px", margin: "0 24px 64px", borderRadius: 24, maxWidth: 1152, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32, maxWidth: 1104, margin: "0 auto" }}>
          {/* Illustration */}
          <div style={{ flexShrink: 0 }}>
            <ThinkingGirl />
          </div>
          {/* Quote */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 64, lineHeight: 0.6, marginBottom: 16, fontFamily: "Georgia, serif" }}>"</div>
            <p style={{
              color: "#fff", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              fontWeight: 700, lineHeight: 1.6, maxWidth: 440,
            }}>
              Belajar bukan tentang seberapa cepat kamu memahami, tetapi tentang seberapa konsisten kamu mencoba.
            </p>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 64, lineHeight: 0.6, marginTop: 12, textAlign: "right", maxWidth: 440, fontFamily: "Georgia, serif" }}>"</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
