import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Global Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Caveat:wght@700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fafaf8; color: #1a1a1a; }

    /* Navbar */
    .nav-link { position: relative; text-decoration: none; }
    .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#F59E0B; transition:width 0.3s; }
    .nav-link:hover::after, .nav-link.active::after { width:100%; }

    /* Hero */
    .hero-about {
      background: linear-gradient(135deg, #fef9e7 0%, #fdf4ca 55%, #fef3e2 100%);
      border-radius: 24px;
      overflow: hidden;
      position: relative;
    }

    /* Glow blob */
    .glow-blob { position:absolute; border-radius:50%; filter:blur(64px); opacity:0.30; pointer-events:none; }

    /* Tech card */
    .tech-card {
      background: #fff;
      border: 1px solid #F0EDE6;
      border-radius: 20px;
      padding: 32px 24px;
      text-align: center;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
      position: relative;
      overflow: hidden;
    }
    .tech-card::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
      opacity: 0;
      transition: opacity 0.3s;
      border-radius: inherit;
    }
    .tech-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.10); }
    .tech-card:hover::before { opacity: 1; }
    .tech-card > * { position: relative; z-index: 1; }

    /* FAQ */
    .faq-item {
      border: 1.5px solid #F0EDE6;
      border-radius: 16px;
      overflow: hidden;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .faq-item.open { border-color: #FBBF24; box-shadow: 0 4px 20px rgba(251,191,36,0.12); }
    .faq-btn {
      width: 100%; padding: 20px 24px; background: transparent; border: none;
      display: flex; align-items: center; justify-content: space-between;
      cursor: pointer; text-align: left; gap: 16px;
    }
    .faq-answer { padding: 0 24px 20px; }
    .faq-icon { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }

    /* Feature row */
    .feature-row { display: flex; align-items: center; gap: 48px; flex-wrap: wrap; }
    .feature-row.reverse { flex-direction: row-reverse; }

    /* Scroll fade */
    .fade-up { opacity:0; transform:translateY(28px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .fade-up.visible { opacity:1; transform:none; }
    .fade-left { opacity:0; transform:translateX(-32px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .fade-left.visible { opacity:1; transform:none; }
    .fade-right { opacity:0; transform:translateX(32px); transition:opacity 0.65s ease, transform 0.65s ease; }
    .fade-right.visible { opacity:1; transform:none; }

    /* Animations */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatAlt { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
    .float { animation: float 5s ease-in-out infinite; }
    .float-alt { animation: floatAlt 7s ease-in-out infinite; }
    .float-d1 { animation-delay:0.8s; }
    .float-d2 { animation-delay:1.6s; }

    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .spin { animation: spin-slow 20s linear infinite; }

    /* Number badge */
    .num-badge {
      width: 48px; height: 48px; border-radius: 14px;
      background: linear-gradient(135deg, #312E81, #4C1D95);
      color: #fff; font-size: 20px; font-weight: 900;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 6px 20px rgba(79,70,229,0.35);
      margin: 0 auto 16px;
    }

    @media(max-width:768px){
      .desktop-nav { display:none !important; }
      .mobile-menu-btn { display:block !important; }
      .feature-row, .feature-row.reverse { flex-direction:column !important; }
      .hero-cols { flex-direction:column !important; }
      .tech-grid { grid-template-columns:1fr !important; }
    }
    @media(max-width:1024px){
      .tech-grid { grid-template-columns:repeat(2,1fr) !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
//  Shared Icons
// ─────────────────────────────────────────────
const Logo = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#F5A623" strokeWidth="2" />
        <path d="M8 10 Q14 6 20 10 Q14 14 8 10Z" fill="#F5A623" />
        <path
            d="M8 14 Q14 10 20 14 Q14 18 8 14Z"
            fill="#4A90D9"
            opacity="0.7"
        />
        <path
            d="M8 18 Q14 14 20 18 Q14 22 8 18Z"
            fill="#F5A623"
            opacity="0.5"
        />
    </svg>
);
const IgIcon = () => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);
const FbIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
);
const TwIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
);

// ─────────────────────────────────────────────
//  useInView
// ─────────────────────────────────────────────
function useInView(cls = "fade-up", delay = 0) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.classList.add(cls);
        el.style.transitionDelay = `${delay}s`;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    el.classList.add("visible");
                    obs.disconnect();
                }
            },
            { threshold: 0.1 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [cls, delay]);
    return ref;
}

// ─────────────────────────────────────────────
//  CSS Illustrations — consistent with existing pages
// ─────────────────────────────────────────────

// Hero: decorative tile mosaic (matches the screenshot's gray tiles)
const HeroMosaic = () => (
    <div style={{ position: "relative", width: 260, height: 220 }}>
        {/* Mosaic grid of squares */}
        {[
            {
                top: 0,
                left: 60,
                w: 80,
                h: 80,
                bg: "#E5E7EB",
                r: 12,
                opacity: 0.9,
            },
            {
                top: 0,
                left: 150,
                w: 100,
                h: 80,
                bg: "#D1D5DB",
                r: 12,
                opacity: 0.7,
            },
            {
                top: 90,
                left: 0,
                w: 55,
                h: 55,
                bg: "#E5E7EB",
                r: 10,
                opacity: 0.6,
            },
            {
                top: 90,
                left: 65,
                w: 80,
                h: 80,
                bg: "#F3F4F6",
                r: 12,
                opacity: 0.95,
            },
            {
                top: 90,
                left: 155,
                w: 100,
                h: 80,
                bg: "#E5E7EB",
                r: 12,
                opacity: 0.8,
            },
            {
                top: 180,
                left: 60,
                w: 80,
                h: 40,
                bg: "#D1D5DB",
                r: 10,
                opacity: 0.6,
            },
            {
                top: 180,
                left: 155,
                w: 80,
                h: 40,
                bg: "#F3F4F6",
                r: 10,
                opacity: 0.7,
            },
        ].map((t, i) => (
            <div
                key={i}
                style={{
                    position: "absolute",
                    top: t.top,
                    left: t.left,
                    width: t.w,
                    height: t.h,
                    background: t.bg,
                    borderRadius: t.r,
                    opacity: t.opacity,
                }}
            />
        ))}
        {/* Yellow accent square */}
        <div
            className="float"
            style={{
                position: "absolute",
                top: 10,
                left: 0,
                width: 50,
                height: 50,
                background: "linear-gradient(135deg,#FDE68A,#FBBF24)",
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(251,191,36,0.35)",
            }}
        />
        {/* Small star decorations */}
        <div
            className="float float-d1"
            style={{
                position: "absolute",
                bottom: 20,
                left: 10,
                color: "#FBBF24",
                fontSize: 20,
            }}
        >
            ★
        </div>
        <div
            className="float float-d2"
            style={{
                position: "absolute",
                top: 50,
                right: 0,
                color: "#FDE68A",
                fontSize: 14,
            }}
        >
            ★
        </div>
    </div>
);

// Section 1 illustration: Girl reading (reused from Landing Page style)
const ReadingGirlAbout = () => (
    <div
        style={{ position: "relative", width: 240, height: 260, flexShrink: 0 }}
    >
        {/* Books stack behind */}
        <div style={{ position: "absolute", bottom: 0, left: 0 }}>
            {[
                {
                    w: 90,
                    h: 14,
                    bg: "linear-gradient(90deg,#FDE68A,#FBBF24)",
                    r: 4,
                },
                {
                    w: 80,
                    h: 14,
                    bg: "linear-gradient(90deg,#6EE7B7,#10B981)",
                    r: 4,
                },
                {
                    w: 85,
                    h: 14,
                    bg: "linear-gradient(90deg,#93C5FD,#3B82F6)",
                    r: 4,
                },
            ].map((b, i) => (
                <div
                    key={i}
                    style={{
                        width: b.w,
                        height: b.h,
                        background: b.bg,
                        borderRadius: b.r,
                        marginBottom: 2,
                        transform: `rotate(${(i - 1) * 3}deg)`,
                        boxShadow: "0 2px 6px rgba(0,0,0,0.10)",
                    }}
                />
            ))}
        </div>

        {/* Floating notebook */}
        <div
            className="float float-d1"
            style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 64,
                height: 80,
                background: "#FEF3C7",
                borderRadius: 8,
                boxShadow: "0 6px 16px rgba(0,0,0,0.10)",
                border: "1px solid #FDE68A",
            }}
        >
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        height: 2,
                        background: "#FDE68A",
                        margin: "8px 8px 0",
                        borderRadius: 2,
                    }}
                />
            ))}
        </div>

        {/* Pencils */}
        <div
            className="float"
            style={{
                position: "absolute",
                top: 0,
                right: 20,
                display: "flex",
                gap: 4,
                transform: "rotate(-10deg)",
            }}
        >
            {["#EF4444", "#3B82F6", "#10B981", "#F59E0B"].map((c, i) => (
                <div
                    key={i}
                    style={{
                        width: 6,
                        height: 56,
                        background: c,
                        borderRadius: "999px 999px 2px 2px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                />
            ))}
        </div>

        {/* Girl */}
        <div
            style={{
                position: "absolute",
                bottom: 30,
                right: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {/* Head */}
            <div
                style={{
                    width: 48,
                    height: 48,
                    background: "#FBBF24",
                    borderRadius: "50%",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -4,
                        left: -2,
                        right: -2,
                        height: 28,
                        background: "#1F2937",
                        borderRadius: "50% 50% 0 0",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        left: -6,
                        width: 10,
                        height: 22,
                        background: "#1F2937",
                        borderRadius: "0 0 8px 8px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: -6,
                        width: 10,
                        height: 22,
                        background: "#1F2937",
                        borderRadius: "0 0 8px 8px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        left: 10,
                        width: 7,
                        height: 7,
                        background: "#374151",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 10,
                        width: 7,
                        height: 7,
                        background: "#374151",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 30,
                        left: 8,
                        width: 8,
                        height: 4,
                        background: "#FCA5A5",
                        borderRadius: "50%",
                        opacity: 0.7,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 30,
                        right: 8,
                        width: 8,
                        height: 4,
                        background: "#FCA5A5",
                        borderRadius: "50%",
                        opacity: 0.7,
                    }}
                />
            </div>
            {/* Body */}
            <div
                style={{
                    width: 56,
                    height: 68,
                    background: "#8B5CF6",
                    borderRadius: "0 0 16px 16px",
                    marginTop: -2,
                    position: "relative",
                }}
            >
                {/* Open book in arms */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: -24,
                        width: 50,
                        height: 34,
                        background: "#fff",
                        borderRadius: 6,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        display: "flex",
                    }}
                >
                    <div style={{ flex: 1, borderRight: "1px solid #E5E7EB" }}>
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    height: 2,
                                    background: "#D1D5DB",
                                    margin: "5px 5px 0",
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ flex: 1 }}>
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    height: 2,
                                    background: "#D1D5DB",
                                    margin: "5px 5px 0",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Section 2 illustration: Girl with pencils
const WritingGirlAbout = () => (
    <div
        style={{ position: "relative", width: 240, height: 260, flexShrink: 0 }}
    >
        {/* Pencils fan (top right) */}
        <div
            className="float-alt"
            style={{ position: "absolute", top: 0, right: 10 }}
        >
            {[
                { color: "#FBBF24", rot: -20, h: 90 },
                { color: "#EF4444", rot: -5, h: 80 },
                { color: "#3B82F6", rot: 10, h: 85 },
                { color: "#10B981", rot: 25, h: 75 },
            ].map((p, i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        width: 10,
                        height: p.h,
                        background: p.color,
                        borderRadius: "999px 999px 2px 2px",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                        transformOrigin: "bottom center",
                        transform: `rotate(${p.rot}deg)`,
                        right: i * 14,
                        bottom: 0,
                    }}
                >
                    <div
                        style={{
                            height: 14,
                            background: "rgba(255,255,255,0.4)",
                            borderRadius: "999px 999px 0 0",
                        }}
                    />
                </div>
            ))}
        </div>

        {/* Eraser */}
        <div
            className="float float-d2"
            style={{
                position: "absolute",
                top: 30,
                left: 10,
                width: 50,
                height: 22,
                background: "linear-gradient(90deg,#FCA5A5,#F87171)",
                borderRadius: 6,
                boxShadow: "0 4px 10px rgba(248,113,113,0.3)",
            }}
        />

        {/* Notebook */}
        <div
            style={{
                position: "absolute",
                bottom: 80,
                left: 0,
                width: 70,
                height: 90,
                background: "#FEF3C7",
                borderRadius: 10,
                boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
                border: "3px solid #FBBF24",
            }}
        >
            <div
                style={{
                    width: 8,
                    height: "100%",
                    background: "#FBBF24",
                    borderRadius: "6px 0 0 6px",
                    position: "absolute",
                    left: 0,
                    top: 0,
                }}
            />
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        height: 2,
                        background: "#FDE68A",
                        margin: `${10 + i * 14}px 14px 0`,
                    }}
                />
            ))}
        </div>

        {/* Girl character */}
        <div
            style={{
                position: "absolute",
                bottom: 0,
                right: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: 44,
                    height: 44,
                    background: "#FBBF24",
                    borderRadius: "50%",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -4,
                        left: -2,
                        right: -2,
                        height: 26,
                        background: "#1F2937",
                        borderRadius: "50% 50% 0 0",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        left: -6,
                        width: 9,
                        height: 20,
                        background: "#1F2937",
                        borderRadius: "0 0 8px 8px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: -6,
                        width: 9,
                        height: 20,
                        background: "#1F2937",
                        borderRadius: "0 0 8px 8px",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 18,
                        left: 9,
                        width: 7,
                        height: 7,
                        background: "#374151",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 18,
                        right: 9,
                        width: 7,
                        height: 7,
                        background: "#374151",
                        borderRadius: "50%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 28,
                        left: 7,
                        width: 8,
                        height: 4,
                        background: "#FCA5A5",
                        borderRadius: "50%",
                        opacity: 0.7,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: 28,
                        right: 7,
                        width: 8,
                        height: 4,
                        background: "#FCA5A5",
                        borderRadius: "50%",
                        opacity: 0.7,
                    }}
                />
                {/* Smile */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 14,
                        height: 6,
                        borderBottom: "2px solid #92400E",
                        borderRadius: "0 0 8px 8px",
                    }}
                />
            </div>
            <div
                style={{
                    width: 52,
                    height: 64,
                    background: "#8B5CF6",
                    borderRadius: "0 0 16px 16px",
                    marginTop: -2,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        bottom: -8,
                        left: 6,
                        width: 14,
                        height: 20,
                        background: "#FBBF24",
                        borderRadius: 4,
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -8,
                        right: 6,
                        width: 14,
                        height: 20,
                        background: "#FBBF24",
                        borderRadius: 4,
                    }}
                />
                {/* Pencil in hand */}
                <div
                    style={{
                        position: "absolute",
                        top: 4,
                        right: -16,
                        width: 5,
                        height: 44,
                        background: "#FBBF24",
                        borderRadius: "999px 999px 2px 2px",
                        transform: "rotate(30deg)",
                        transformOrigin: "top center",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                >
                    <div
                        style={{
                            height: 8,
                            background: "rgba(255,255,255,0.4)",
                            borderRadius: "999px 999px 0 0",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            height: 6,
                            background: "#DC2626",
                            borderRadius: "0 0 2px 2px",
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────
//  Navbar
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
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.3s",
            }}
        >
            <div
                style={{ maxWidth: 1152, margin: "0 auto", padding: "0 24px" }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: 64,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <Logo />
                        <span
                            style={{
                                fontWeight: 800,
                                fontSize: 18,
                                color: "#111827",
                            }}
                        >
                            Wariku
                        </span>
                    </div>
                    <div
                        className="desktop-nav"
                        style={{ display: "flex", gap: 32 }}
                    >
                        {["Home", "Material", "About"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className={`nav-link ${item === "About" ? "active" : ""}`}
                                style={{
                                    fontSize: 14,
                                    fontWeight: item === "About" ? 700 : 500,
                                    color:
                                        item === "About"
                                            ? "#111827"
                                            : "#6B7280",
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div
                        className="desktop-nav"
                        style={{ display: "flex", gap: 12 }}
                    >
                        <a
                            href="#"
                            style={{
                                padding: "8px 20px",
                                borderRadius: 999,
                                border: "2px solid #2563EB",
                                color: "#2563EB",
                                fontWeight: 700,
                                fontSize: 13,
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = "#2563EB";
                                e.target.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "transparent";
                                e.target.style.color = "#2563EB";
                            }}
                        >
                            Login
                        </a>
                        <a
                            href="#"
                            style={{
                                padding: "8px 20px",
                                borderRadius: 999,
                                background: "#FBBF24",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 13,
                                textDecoration: "none",
                                boxShadow: "0 4px 12px rgba(251,191,36,0.3)",
                            }}
                        >
                            Register
                        </a>
                    </div>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 8,
                            display: "none",
                        }}
                        className="mobile-menu-btn"
                    >
                        <div
                            style={{
                                width: 20,
                                height: 2,
                                background: "#374151",
                                marginBottom: 4,
                                transition: "all 0.3s",
                                transform: menuOpen
                                    ? "rotate(45deg) translate(4px,4px)"
                                    : "none",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 2,
                                background: "#374151",
                                marginBottom: 4,
                                opacity: menuOpen ? 0 : 1,
                                transition: "all 0.3s",
                            }}
                        />
                        <div
                            style={{
                                width: 20,
                                height: 2,
                                background: "#374151",
                                transition: "all 0.3s",
                                transform: menuOpen
                                    ? "rotate(-45deg) translate(4px,-4px)"
                                    : "none",
                            }}
                        />
                    </button>
                </div>
                {menuOpen && (
                    <div
                        style={{
                            background: "#fff",
                            borderTop: "1px solid #f3f4f6",
                            padding: "12px 0 16px",
                            borderRadius: "0 0 16px 16px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        }}
                    >
                        {["Home", "Material", "About"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                style={{
                                    display: "block",
                                    padding: "10px 16px",
                                    color: "#374151",
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                {item}
                            </a>
                        ))}
                        <div
                            style={{
                                display: "flex",
                                gap: 12,
                                padding: "10px 16px",
                                borderTop: "1px solid #f3f4f6",
                                marginTop: 8,
                            }}
                        >
                            <a
                                href="#"
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    padding: "8px 0",
                                    borderRadius: 999,
                                    border: "2px solid #2563EB",
                                    color: "#2563EB",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                }}
                            >
                                Login
                            </a>
                            <a
                                href="#"
                                style={{
                                    flex: 1,
                                    textAlign: "center",
                                    padding: "8px 0",
                                    borderRadius: 999,
                                    background: "#FBBF24",
                                    color: "#fff",
                                    fontWeight: 700,
                                    fontSize: 13,
                                    textDecoration: "none",
                                }}
                            >
                                Register
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

// ─────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────
const Footer = () => (
    <footer
        style={{
            background: "#fff",
            borderTop: "1px solid #f3f4f6",
            padding: "48px 24px 32px",
        }}
    >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 32,
                    marginBottom: 40,
                }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <Logo />
                        <span
                            style={{
                                fontWeight: 800,
                                fontSize: 18,
                                color: "#111827",
                            }}
                        >
                            Wariku
                        </span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
                    <div>
                        {["Home", "Material", "About", "Contact"].map((l) => (
                            <a
                                key={l}
                                href="#"
                                style={{
                                    display: "block",
                                    color: "#6B7280",
                                    fontSize: 13,
                                    textDecoration: "none",
                                    marginBottom: 8,
                                }}
                            >
                                {l}
                            </a>
                        ))}
                    </div>
                    <div>
                        {["Media", "Support Us"].map((l) => (
                            <a
                                key={l}
                                href="#"
                                style={{
                                    display: "block",
                                    color: "#6B7280",
                                    fontSize: 13,
                                    textDecoration: "none",
                                    marginBottom: 8,
                                }}
                            >
                                {l}
                            </a>
                        ))}
                    </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    {[IgIcon, FbIcon, TwIcon].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            style={{
                                width: 38,
                                height: 38,
                                borderRadius: "50%",
                                background: "#F3F4F6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#6B7280",
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#FBBF24";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#F3F4F6";
                                e.currentTarget.style.color = "#6B7280";
                            }}
                        >
                            <Icon />
                        </a>
                    ))}
                </div>
            </div>
            <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: 12 }}>
                © 2026 Wariku. All rights reserved.
            </p>
        </div>
    </footer>
);

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const TECH_CARDS = [
    {
        num: 1,
        title: "Fuzzy Logic",
        desc: "Materi disesuaikan secara otomatis berdasarkan tingkat pemahaman dan performa belajar kamu dengan sistem logika fuzzy yang presisi.",
        icon: "🧠",
        color: "#312E81",
    },
    {
        num: 2,
        title: "Rule-Based System",
        desc: "Menggunakan interpretasi Wariga Bali untuk memahami preferensi belajar siswa secara lebih personal dan budaya-kontekstual.",
        icon: "📜",
        color: "#065F46",
    },
    {
        num: 3,
        title: "Adaptive Learning",
        desc: "Menggabungkan penilaian multidimensi untuk memahami kemampuan kamu secara menyeluruh dan memberikan jalur belajar optimal.",
        icon: "🔁",
        color: "#92400E",
    },
];

const FAQS = [
    {
        q: "Apa itu sistem pembelajaran adaptif?",
        a: "Sistem pembelajaran adaptif adalah sistem yang menyesuaikan konten dan metode belajar secara otomatis berdasarkan kemampuan, gaya belajar, dan kemajuan siswa. Wariku menggunakan pendekatan ini dikombinasikan dengan kearifan Wariga Bali untuk pengalaman yang lebih personal.",
    },
    {
        q: "Bagaimana Wariga Bali diintegrasikan ke dalam sistem ini?",
        a: "Wariga Bali adalah sistem kalender dan interpretasi karakter khas Bali. Sistem kami menerjemahkan prinsip-prinsip Wariga menjadi preferensi gaya belajar — misalnya waktu belajar yang optimal, pendekatan visual vs naratif, dan ritme penyampaian materi.",
    },
    {
        q: "Apakah saya perlu memahami Wariga Bali untuk menggunakan Wariku?",
        a: "Tidak sama sekali! Sistem secara otomatis menangani interpretasi Wariga di balik layar. Kamu cukup memasukkan informasi dasar, dan sistem akan memberikan rekomendasi belajar yang disesuaikan untukmu.",
    },
    {
        q: "Bagaimana cara sistem mengukur kemampuan saya?",
        a: "Sistem menganalisis hasil latihan, waktu pengerjaan, tingkat akurasi, dan konsistensi belajarmu. Data ini diproses menggunakan Fuzzy Logic untuk menghasilkan penilaian yang lebih nuansa dibanding sistem penilaian konvensional.",
    },
    {
        q: "Apakah data belajar saya tersimpan dengan aman?",
        a: "Ya, seluruh data belajarmu dienkripsi dan disimpan secara aman. Kami tidak membagikan data pribadi kepada pihak ketiga tanpa persetujuan. Privasi dan keamanan data pengguna adalah prioritas utama kami.",
    },
];

const STATS = [
    { value: "1.2K+", label: "Pelajar Aktif", icon: "👤" },
    { value: "50+", label: "Materi Tersedia", icon: "📚" },
    { value: "98%", label: "Tingkat Kepuasan", icon: "⭐" },
    { value: "24/7", label: "Akses Belajar", icon: "⏰" },
];

// ─────────────────────────────────────────────
//  FAQ Item Component
// ─────────────────────────────────────────────
const FAQItem = ({ question, answer, index }) => {
    const [open, setOpen] = useState(false);
    const ref = useInView("fade-up", index * 0.08);
    return (
        <div ref={ref} className={`faq-item ${open ? "open" : ""}`}>
            <button className="faq-btn" onClick={() => setOpen(!open)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                        style={{
                            color: "#9CA3AF",
                            fontSize: 14,
                            fontWeight: 600,
                        }}
                    >
                        •
                    </span>
                    <span
                        style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#111827",
                        }}
                    >
                        {question}
                    </span>
                </div>
                <div
                    className="faq-icon"
                    style={{ background: open ? "#FEF3C7" : "#F3F4F6" }}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={open ? "#D97706" : "#6B7280"}
                        strokeWidth="2.5"
                        style={{
                            transform: open ? "rotate(180deg)" : "none",
                            transition: "transform 0.3s",
                        }}
                    >
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </button>
            {open && (
                <div
                    className="faq-answer"
                    style={{ animation: "fadeSlideUp 0.3s ease" }}
                >
                    <p
                        style={{
                            fontSize: 13.5,
                            color: "#6B7280",
                            lineHeight: 1.8,
                        }}
                    >
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
//  PAGE: About
// ─────────────────────────────────────────────
export default function AboutPage() {
    // Section refs
    const heroRef = useInView("fade-up", 0);
    const kenalLeft = useInView("fade-left", 0);
    const kenalRight = useInView("fade-right", 0.15);
    const adaptLeft = useInView("fade-left", 0);
    const adaptRight = useInView("fade-right", 0.15);
    const techHead = useInView("fade-up", 0);
    const faqHead = useInView("fade-up", 0);
    const statRef = useInView("fade-up", 0);

    return (
        <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
            <GlobalStyles />
            <Navbar />

            <div
                style={{
                    maxWidth: 1152,
                    margin: "0 auto",
                    padding: "88px 24px 0",
                }}
            >
                {/* ══ HERO ══════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="hero-about"
                    style={{
                        padding: "56px 48px 64px",
                        marginBottom: 72,
                        minHeight: 280,
                    }}
                >
                    {/* Glow blobs */}
                    <div
                        className="glow-blob"
                        style={{
                            width: 320,
                            height: 320,
                            background: "#FEF08A",
                            top: -100,
                            left: -80,
                        }}
                    />
                    <div
                        className="glow-blob"
                        style={{
                            width: 200,
                            height: 200,
                            background: "#A5F3FC",
                            bottom: -60,
                            right: 160,
                        }}
                    />

                    <div
                        className="hero-cols"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 40,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {/* Text */}
                        <div style={{ flex: "1 1 380px", minWidth: 0 }}>
                            {/* Eyebrow */}
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    background: "#fff",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 999,
                                    padding: "4px 14px",
                                    marginBottom: 20,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span style={{ fontSize: 13 }}>🏫</span>
                                <span
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#D97706",
                                    }}
                                >
                                    Tentang Wariku
                                </span>
                            </div>

                            <h1
                                style={{
                                    fontSize: "clamp(1.9rem,4vw,2.9rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    lineHeight: 1.2,
                                    marginBottom: 20,
                                }}
                            >
                                Tentang Sistem{" "}
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        color: "#F59E0B",
                                        fontSize: "clamp(2.1rem,4.5vw,3.1rem)",
                                        position: "relative",
                                        display: "inline-block",
                                    }}
                                >
                                    Pembelajaran
                                    {/* oval underline */}
                                    <svg
                                        style={{
                                            position: "absolute",
                                            bottom: -8,
                                            left: 0,
                                            width: "100%",
                                        }}
                                        height="12"
                                        viewBox="0 0 220 12"
                                        preserveAspectRatio="none"
                                    >
                                        <ellipse
                                            cx="110"
                                            cy="8"
                                            rx="108"
                                            ry="5"
                                            stroke="#F59E0B"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    </svg>
                                </span>{" "}
                                Ini
                            </h1>

                            <p
                                style={{
                                    color: "#6B7280",
                                    fontSize: 15,
                                    lineHeight: 1.8,
                                    maxWidth: 440,
                                }}
                            >
                                Sistem ini dikembangkan untuk membantu siswa
                                belajar melalui analisis kemampuan belajar dan
                                pendekatan berbasis Wariga Bali.
                            </p>

                            {/* CTA row */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    marginTop: 28,
                                    flexWrap: "wrap",
                                }}
                            >
                                <a
                                    href="#"
                                    style={{
                                        padding: "10px 24px",
                                        borderRadius: 999,
                                        background:
                                            "linear-gradient(135deg,#F59E0B,#FBBF24)",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        textDecoration: "none",
                                        boxShadow:
                                            "0 6px 18px rgba(245,158,11,0.35)",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform =
                                            "translateY(-2px)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = "none";
                                    }}
                                >
                                    Mulai Belajar
                                </a>
                                <a
                                    href="#faq"
                                    style={{
                                        padding: "10px 24px",
                                        borderRadius: 999,
                                        border: "2px solid #374151",
                                        color: "#374151",
                                        fontWeight: 700,
                                        fontSize: 13,
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = "#374151";
                                        e.target.style.color = "#fff";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background =
                                            "transparent";
                                        e.target.style.color = "#374151";
                                    }}
                                >
                                    Lihat FAQ
                                </a>
                            </div>
                        </div>

                        {/* Mosaic illustration */}
                        <div style={{ flexShrink: 0 }}>
                            <HeroMosaic />
                        </div>
                    </div>
                </section>

                {/* ══ STATS ROW ════════════════════════════════ */}
                <section ref={statRef} style={{ marginBottom: 80 }}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(160px,1fr))",
                            gap: 16,
                        }}
                    >
                        {STATS.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    background: "#fff",
                                    border: "1px solid #F0EDE6",
                                    borderRadius: 20,
                                    padding: "24px 20px",
                                    textAlign: "center",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                                    transition: "transform 0.3s",
                                    transitionDelay: `${i * 0.07}s`,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "none";
                                }}
                            >
                                <div style={{ fontSize: 28, marginBottom: 8 }}>
                                    {s.icon}
                                </div>
                                <div
                                    style={{
                                        fontSize: "clamp(1.4rem,2.5vw,1.9rem)",
                                        fontWeight: 900,
                                        color: "#111827",
                                        marginBottom: 4,
                                    }}
                                >
                                    {s.value}
                                </div>
                                <div
                                    style={{
                                        fontSize: 12.5,
                                        color: "#6B7280",
                                        fontWeight: 600,
                                    }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ══ KENALAN DENGAN WARIKU ════════════════════ */}
                <section style={{ marginBottom: 80 }}>
                    <div className="feature-row">
                        {/* Illustration left */}
                        <div
                            ref={kenalLeft}
                            style={{
                                flex: "0 0 auto",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <ReadingGirlAbout />
                        </div>
                        {/* Text right */}
                        <div
                            ref={kenalRight}
                            style={{ flex: "1 1 320px", minWidth: 0 }}
                        >
                            <h2
                                style={{
                                    fontSize: "clamp(1.4rem,2.8vw,2rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    lineHeight: 1.3,
                                    marginBottom: 16,
                                }}
                            >
                                Kenalan dulu dengan{" "}
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        color: "#F59E0B",
                                        fontSize: "clamp(1.6rem,3vw,2.2rem)",
                                        position: "relative",
                                        display: "inline-block",
                                    }}
                                >
                                    Sistem Wariku
                                    <svg
                                        style={{
                                            position: "absolute",
                                            bottom: -6,
                                            left: 0,
                                            width: "100%",
                                        }}
                                        height="10"
                                        viewBox="0 0 180 10"
                                        preserveAspectRatio="none"
                                    >
                                        <ellipse
                                            cx="90"
                                            cy="7"
                                            rx="88"
                                            ry="4"
                                            stroke="#F59E0B"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    </svg>
                                </span>
                            </h2>
                            <p
                                style={{
                                    color: "#6B7280",
                                    fontSize: 14,
                                    lineHeight: 1.85,
                                    marginBottom: 16,
                                }}
                            >
                                Sistem ini juga mengintegrasikan pendekatan
                                berbasis Wariga Bali untuk memahami preferensi
                                belajar siswa. Dengan menggabungkan teknologi
                                dan kearifan lokal, sistem ini diharapkan mampu
                                memberikan pengalaman belajar yang lebih
                                personal dan efektif.
                            </p>
                            {/* Feature bullets */}
                            {[
                                "Analisis kemampuan berbasis data real-time",
                                "Pendekatan karakter berbasis Wariga Bali",
                                "Materi adaptif yang berkembang bersama kamu",
                            ].map((f, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: 6,
                                            background: "#D1FAE5",
                                            border: "1.5px solid #10B981",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <svg
                                            width="11"
                                            height="11"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#10B981"
                                            strokeWidth="3"
                                        >
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: 13.5,
                                            color: "#374151",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {f}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ PENGEMBANGAN ADAPTIF ═════════════════════ */}
                <section style={{ marginBottom: 80 }}>
                    <div className="feature-row reverse">
                        {/* Illustration right */}
                        <div
                            ref={adaptRight}
                            style={{
                                flex: "0 0 auto",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <WritingGirlAbout />
                        </div>
                        {/* Text left */}
                        <div
                            ref={adaptLeft}
                            style={{ flex: "1 1 320px", minWidth: 0 }}
                        >
                            <h2
                                style={{
                                    fontSize: "clamp(1.4rem,2.8vw,2rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    lineHeight: 1.3,
                                    marginBottom: 16,
                                }}
                            >
                                Pengembangan Sistem
                                <br />
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        color: "#7C3AED",
                                        fontSize: "clamp(1.6rem,3vw,2.2rem)",
                                    }}
                                >
                                    yang Adaptif
                                </span>
                            </h2>
                            <p
                                style={{
                                    color: "#6B7280",
                                    fontSize: 14,
                                    lineHeight: 1.85,
                                    marginBottom: 20,
                                }}
                            >
                                Menggabungkan analisis data, kecerdasan buatan,
                                dan pendekatan budaya lokal, sistem ini
                                bertujuan untuk meningkatkan efektivitas belajar
                                serta membantu siswa memahami materi dengan cara
                                yang lebih sesuai dengan dirinya.
                            </p>
                            {/* Pill tags */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 8,
                                }}
                            >
                                {[
                                    "AI-Powered",
                                    "Wariga Bali",
                                    "Fuzzy Logic",
                                    "Adaptif",
                                    "Personal",
                                    "Real-time",
                                ].map((tag, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            padding: "5px 14px",
                                            borderRadius: 999,
                                            background:
                                                i % 2 === 0
                                                    ? "#EDE9FE"
                                                    : "#FEF3C7",
                                            color:
                                                i % 2 === 0
                                                    ? "#7C3AED"
                                                    : "#D97706",
                                            fontSize: 12,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ══ PEMANFAATAN TEKNOLOGI ════════════════════ */}
            <section
                style={{
                    background: "linear-gradient(135deg,#fefce8,#fdf4ca)",
                    padding: "72px 24px",
                    marginBottom: 0,
                }}
            >
                <div style={{ maxWidth: 1152, margin: "0 auto" }}>
                    <div
                        ref={techHead}
                        style={{ textAlign: "center", marginBottom: 52 }}
                    >
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                background: "#fff",
                                border: "1px solid #E5E7EB",
                                borderRadius: 999,
                                padding: "4px 14px",
                                marginBottom: 16,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            }}
                        >
                            <span style={{ fontSize: 13 }}>⚙️</span>
                            <span
                                style={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: "#7C3AED",
                                }}
                            >
                                Teknologi Kami
                            </span>
                        </div>
                        <h2
                            style={{
                                fontSize: "clamp(1.6rem,3vw,2.2rem)",
                                fontWeight: 900,
                                color: "#111827",
                                marginBottom: 12,
                            }}
                        >
                            Pemanfaatan Teknologi
                        </h2>
                        <p
                            style={{
                                color: "#6B7280",
                                fontSize: 14,
                                lineHeight: 1.7,
                                maxWidth: 440,
                                margin: "0 auto",
                            }}
                        >
                            Mengkombinasikan algoritma berikut untuk bisa
                            memberikan analisis yang sesuai dengan kemampuan
                            siswa
                        </p>
                    </div>

                    <div
                        className="tech-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: 24,
                        }}
                    >
                        {TECH_CARDS.map((card, i) => {
                            const cardRef = useInView("fade-up", i * 0.12);
                            return (
                                <div
                                    key={i}
                                    ref={cardRef}
                                    className="tech-card"
                                >
                                    <div
                                        className="num-badge"
                                        style={{
                                            background: `linear-gradient(135deg,${card.color},${card.color}CC)`,
                                        }}
                                    >
                                        {card.num}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 32,
                                            marginBottom: 12,
                                        }}
                                    >
                                        {card.icon}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 800,
                                            color: "#111827",
                                            marginBottom: 10,
                                        }}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        style={{
                                            fontSize: 13,
                                            color: "#6B7280",
                                            lineHeight: 1.75,
                                        }}
                                    >
                                        {card.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ FAQ ═══════════════════════════════════════ */}
            <section
                id="faq"
                style={{
                    padding: "72px 24px",
                    maxWidth: 1152,
                    margin: "0 auto",
                }}
            >
                <div
                    ref={faqHead}
                    style={{ textAlign: "center", marginBottom: 48 }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#fff",
                            border: "1px solid #E5E7EB",
                            borderRadius: 999,
                            padding: "4px 14px",
                            marginBottom: 16,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}
                    >
                        <span style={{ fontSize: 13 }}>💬</span>
                        <span
                            style={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#D97706",
                            }}
                        >
                            Bantuan
                        </span>
                    </div>
                    <h2
                        style={{
                            fontSize: "clamp(2rem,4vw,2.8rem)",
                            fontWeight: 900,
                            color: "#111827",
                            marginBottom: 10,
                            fontFamily: "'Plus Jakarta Sans',sans-serif",
                        }}
                    >
                        FAQ
                    </h2>
                    <p style={{ color: "#6B7280", fontSize: 14 }}>
                        Pertanyaan yang sering ditanyakan
                    </p>
                </div>

                <div
                    style={{
                        maxWidth: 720,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    {FAQS.map((faq, i) => (
                        <FAQItem
                            key={i}
                            question={faq.q}
                            answer={faq.a}
                            index={i}
                        />
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div style={{ textAlign: "center", marginTop: 52 }}>
                    <div
                        style={{
                            display: "inline-block",
                            background: "#fff",
                            border: "1px solid #F0EDE6",
                            borderRadius: 20,
                            padding: "28px 36px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                        }}
                    >
                        <div style={{ fontSize: 32, marginBottom: 8 }}>🤝</div>
                        <h3
                            style={{
                                fontSize: 16,
                                fontWeight: 800,
                                color: "#111827",
                                marginBottom: 6,
                            }}
                        >
                            Masih ada pertanyaan?
                        </h3>
                        <p
                            style={{
                                fontSize: 13,
                                color: "#6B7280",
                                marginBottom: 16,
                            }}
                        >
                            Tim kami siap membantu kamu kapan saja
                        </p>
                        <a
                            href="#"
                            style={{
                                padding: "10px 28px",
                                borderRadius: 999,
                                background:
                                    "linear-gradient(135deg,#F59E0B,#FBBF24)",
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: 13,
                                textDecoration: "none",
                                boxShadow: "0 4px 14px rgba(245,158,11,0.3)",
                                display: "inline-block",
                            }}
                        >
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
