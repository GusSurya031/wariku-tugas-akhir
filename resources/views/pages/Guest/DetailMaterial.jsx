import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────
//  Global Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Caveat:wght@700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fafaf8; color: #1a1a1a; }
    .font-handwrite { font-family: 'Caveat', cursive; }

    /* Navbar */
    .nav-link { position: relative; text-decoration: none; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 2px; background: #F59E0B; transition: width 0.3s;
    }
    .nav-link:hover::after, .nav-link.active::after { width: 100%; }

    /* Hero bg */
    .hero-detail {
      background: linear-gradient(135deg, #fef9e7 0%, #fdf4ca 50%, #fef3e2 100%);
      border-radius: 24px;
      overflow: hidden;
    }

    /* Tab styles */
    .tab-btn {
      padding: 10px 28px; border-radius: 999px; font-size: 14px; font-weight: 700;
      border: none; cursor: pointer; transition: all 0.25s;
    }
    .tab-btn.active { background: #7C3AED; color: #fff; box-shadow: 0 4px 16px rgba(124,58,237,0.3); }
    .tab-btn.inactive { background: transparent; color: #6B7280; }
    .tab-btn.inactive:hover { background: #F3F4F6; color: #374151; }

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
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    .card-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 16px; border-radius: 999px;
      background: #FEF3C7; color: #92400e;
      font-size: 12px; font-weight: 700;
      border: none; cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }

    /* Syllabus item */
    .syllabus-item {
      display: flex; align-items: center; gap-14px;
      padding: 14px 18px; border-radius: 14px;
      border: 1px solid #F3F4F6; background: #FAFAF8;
      transition: all 0.2s; cursor: pointer; gap: 14px;
    }
    .syllabus-item:hover { border-color: #FBBF24; background: #FFFBEB; transform: translateX(4px); }
    .syllabus-item.done { border-color: #D1FAE5; background: #F0FDF4; }

    /* Back button */
    .back-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 18px; border-radius: 999px; border: 1.5px solid #E5E7EB;
      background: #fff; color: #374151; font-size: 13px; font-weight: 600;
      cursor: pointer; text-decoration: none;
      transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .back-btn:hover { border-color: #9CA3AF; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transform: translateX(-2px); }

    /* Tool/Method item */
    .tool-item {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 12px 0; border-bottom: 1px solid #F3F4F6;
    }
    .tool-item:last-child { border-bottom: none; }

    /* Animations */
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{opacity:0.6} 50%{opacity:1} 100%{opacity:0.6} }
    .float-sm { animation: float 5s ease-in-out infinite; }
    .float-sm-2 { animation: float 7s ease-in-out infinite; animation-delay: 1s; }

    .fade-in-ready {
      opacity: 0; transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in-ready.visible { opacity: 1; transform: none; }

    /* Tab content transition */
    .tab-content { animation: fadeSlideUp 0.35s ease; }

    /* Sidebar card */
    .sidebar-card {
      background: #fff; border: 1px solid #F0EDE6;
      border-radius: 20px; padding: 24px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }

    /* Tooltip progress */
    .progress-bar-wrap { background: #F3F4F6; border-radius: 999px; height: 6px; overflow: hidden; }
    .progress-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #F59E0B, #FBBF24); transition: width 1s ease; }

    /* Hero glow blob */
    .glow-blob {
      position: absolute; border-radius: 50%;
      filter: blur(60px); opacity: 0.35; pointer-events: none;
    }

    @media (max-width: 768px) {
      .desktop-nav { display: none !important; }
      .mobile-menu-btn { display: block !important; }
      .hero-cols { flex-direction: column !important; }
      .content-cols { flex-direction: column !important; }
      .related-grid { grid-template-columns: 1fr !important; }
    }
    @media (max-width: 1024px) {
      .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
//  Shared: Logo
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

// ─────────────────────────────────────────────
//  Shared: Social Icons
// ─────────────────────────────────────────────
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
//  Shared: useInView
// ─────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setVisible(true);
            },
            { threshold },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

// ─────────────────────────────────────────────
//  Math Thumbnail (same as MaterialPage)
// ─────────────────────────────────────────────
const MathThumbnail = ({ size = "md" }) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const ops = ["+", "−", "×", "÷"];
    const colors = [
        "#EF4444",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#8B5CF6",
        "#EC4899",
        "#06B6D4",
    ];
    const sz = size === "lg" ? 1.4 : size === "sm" ? 0.75 : 1;
    return (
        <div
            style={{
                width: `${160 * sz}px`,
                height: `${120 * sz}px`,
                position: "relative",
                userSelect: "none",
            }}
        >
            {numbers.map((n, i) => (
                <div
                    key={n}
                    style={{
                        position: "absolute",
                        fontSize: `${(14 + (i % 3) * 4) * sz}px`,
                        fontWeight: 900,
                        color: colors[i % colors.length],
                        left: `${(i * 17) % 80}%`,
                        top: `${(i * 23 + 5) % 70}%`,
                        textShadow: "0 2px 4px rgba(0,0,0,0.12)",
                        transform: `rotate(${i * 13 - 20}deg)`,
                        lineHeight: 1,
                    }}
                >
                    {n}
                </div>
            ))}
            {ops.map((op, i) => (
                <div
                    key={op}
                    style={{
                        position: "absolute",
                        fontSize: `${11 * sz}px`,
                        fontWeight: 700,
                        color: colors[(i + 3) % colors.length],
                        left: `${(i * 19 + 5) % 85}%`,
                        top: `${(i * 17 + 15) % 75}%`,
                        transform: `rotate(${i * -11}deg)`,
                    }}
                >
                    {op}
                </div>
            ))}
            <div
                style={{
                    position: "absolute",
                    bottom: "8%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: `${22 * sz}px`,
                    fontWeight: 900,
                    color: "#1D4ED8",
                    textShadow: `2px 2px 0 #93C5FD, -1px -1px 0 #BFDBFE`,
                    letterSpacing: "3px",
                    whiteSpace: "nowrap",
                }}
            >
                MATH
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Reusable: MaterialCard (same as MaterialPage)
// ─────────────────────────────────────────────
const MaterialCard = ({
    title,
    description,
    category,
    categoryColor = "#D97706",
    level = 1,
    duration = "30 Menit",
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
        >
            <div className="card-thumbnail">
                <MathThumbnail />
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: categoryColor,
                        color: "#fff",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                    }}
                >
                    {category}
                </div>
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 999,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#374151",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2.5"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    {duration}
                </div>
            </div>
            <div style={{ padding: "16px 18px 18px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                    {levelDots.map((d) => (
                        <div
                            key={d}
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                background: d <= level ? "#F59E0B" : "#E5E7EB",
                            }}
                        />
                    ))}
                    <span
                        style={{
                            fontSize: 11,
                            color: "#9CA3AF",
                            marginLeft: 4,
                            fontWeight: 500,
                        }}
                    >
                        {level === 1
                            ? "Pemula"
                            : level === 2
                              ? "Menengah"
                              : "Lanjut"}
                    </span>
                </div>
                <h3
                    style={{
                        fontSize: 15,
                        fontWeight: 800,
                        color: "#111827",
                        marginBottom: 6,
                        lineHeight: 1.3,
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: 12.5,
                        color: "#6B7280",
                        lineHeight: 1.6,
                        marginBottom: 14,
                    }}
                >
                    {description}
                </p>
                <button className="card-btn">
                    Selengkapnya{" "}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Shared: Navbar
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
                                className={`nav-link ${item === "Material" ? "active" : ""}`}
                                style={{
                                    fontSize: 14,
                                    fontWeight: item === "Material" ? 700 : 500,
                                    color:
                                        item === "Material"
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
//  Shared: Footer
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
const MATERIAL = {
    title: "Perkalian Dasar",
    category: "Dasar",
    categoryColor: "#16A34A",
    level: 1,
    duration: "45 Menit",
    totalTopics: 8,
    progress: 37,
    description: [
        "Materi ini dirancang untuk membantu kamu memahami konsep dasar perkalian secara menyeluruh, dimulai dari pengenalan konsep hingga penerapannya dalam berbagai bentuk soal. Pembelajaran disusun secara bertahap agar kamu dapat mengikuti alur materi dengan lebih mudah, terutama jika masih dalam tahap memahami dasar-dasar matematika.",
        "Selain itu, materi ini juga menekankan pada pemahaman konsep, bukan sekadar menghafal. Melalui kombinasi penjelasan, contoh soal, dan latihan, kamu akan dilatih untuk berpikir logis dan sistematis dalam menyelesaikan permasalahan matematika. Dengan pendekatan ini, diharapkan kamu tidak hanya mampu menyelesaikan soal, tetapi juga memahami konsep di balik setiap perhitungan.",
    ],
    tools: [
        { icon: "📝", label: "Alat tulis untuk mencatat dan berhitung" },
        { icon: "⏰", label: "Fokus dan waktu belajar yang cukup" },
    ],
    methods: [
        "Penjelasan konsep dasar",
        "Contoh soal yang mudah dipahami",
        "Latihan bertahap sesuai level",
        "Evaluasi pemahaman di akhir sesi",
    ],
    syllabus: [
        {
            week: 1,
            title: "Pengenalan Konsep Perkalian",
            topics: [
                {
                    id: 1,
                    title: "Apa itu Perkalian?",
                    duration: "10 mnt",
                    done: true,
                },
                {
                    id: 2,
                    title: "Perkalian sebagai Penjumlahan Berulang",
                    duration: "12 mnt",
                    done: true,
                },
                {
                    id: 3,
                    title: "Simbol dan Notasi Perkalian",
                    duration: "8 mnt",
                    done: false,
                },
            ],
        },
        {
            week: 2,
            title: "Tabel Perkalian 1–5",
            topics: [
                {
                    id: 4,
                    title: "Perkalian Bilangan 1 dan 2",
                    duration: "10 mnt",
                    done: false,
                },
                {
                    id: 5,
                    title: "Perkalian Bilangan 3 dan 4",
                    duration: "12 mnt",
                    done: false,
                },
                {
                    id: 6,
                    title: "Perkalian Bilangan 5",
                    duration: "10 mnt",
                    done: false,
                },
            ],
        },
        {
            week: 3,
            title: "Tabel Perkalian 6–10",
            topics: [
                {
                    id: 7,
                    title: "Perkalian Bilangan 6, 7, dan 8",
                    duration: "15 mnt",
                    done: false,
                },
                {
                    id: 8,
                    title: "Perkalian Bilangan 9 dan 10",
                    duration: "12 mnt",
                    done: false,
                },
            ],
        },
        {
            week: 4,
            title: "Latihan & Evaluasi",
            topics: [
                {
                    id: 9,
                    title: "Latihan Soal Campuran",
                    duration: "20 mnt",
                    done: false,
                },
                {
                    id: 10,
                    title: "Kuis Akhir Materi",
                    duration: "15 mnt",
                    done: false,
                },
            ],
        },
    ],
};

const RELATED = [
    {
        id: 1,
        title: "Penjumlahan Dasar",
        description:
            "Pelajari konsep dasar penjumlahan sebagai fondasi dalam memahami operasi matematika.",
        category: "Dasar",
        categoryColor: "#16A34A",
        level: 1,
        duration: "30 Menit",
    },
    {
        id: 2,
        title: "Pengurangan Bilangan",
        description:
            "Kuasai teknik pengurangan bilangan bulat dan desimal dengan latihan bertahap.",
        category: "Dasar",
        categoryColor: "#16A34A",
        level: 1,
        duration: "25 Menit",
    },
    {
        id: 3,
        title: "Pecahan & Desimal",
        description:
            "Memahami konsep pecahan biasa, campuran, dan desimal serta cara konversinya.",
        category: "Menengah",
        categoryColor: "#D97706",
        level: 2,
        duration: "45 Menit",
    },
];

// ─────────────────────────────────────────────
//  Tab: Deskripsi
// ─────────────────────────────────────────────
const DeskripsiTab = ({ material }) => {
    const [ref, visible] = useInView(0.05);
    return (
        <div
            ref={ref}
            className="tab-content content-cols"
            style={{
                display: "flex",
                gap: 40,
                alignItems: "flex-start",
                flexWrap: "wrap",
            }}
        >
            {/* Left: description */}
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
                <h2
                    style={{
                        fontSize: "clamp(1.3rem,2.5vw,1.6rem)",
                        fontWeight: 900,
                        color: "#111827",
                        marginBottom: 20,
                    }}
                >
                    Tentang Materi Ini
                </h2>
                {material.description.map((p, i) => (
                    <p
                        key={i}
                        style={{
                            color: "#6B7280",
                            fontSize: 14,
                            lineHeight: 1.85,
                            marginBottom: 16,
                        }}
                    >
                        {p}
                    </p>
                ))}

                {/* Progress bar */}
                <div
                    style={{
                        marginTop: 28,
                        padding: "18px 20px",
                        background: "#FFFBEB",
                        borderRadius: 16,
                        border: "1px solid #FDE68A",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 10,
                        }}
                    >
                        <span
                            style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#92400E",
                            }}
                        >
                            Progress Belajar
                        </span>
                        <span
                            style={{
                                fontSize: 13,
                                fontWeight: 800,
                                color: "#D97706",
                            }}
                        >
                            {material.progress}%
                        </span>
                    </div>
                    <div className="progress-bar-wrap">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: visible ? `${material.progress}%` : "0%",
                            }}
                        />
                    </div>
                    <p style={{ fontSize: 12, color: "#B45309", marginTop: 8 }}>
                        {Math.round(
                            (material.totalTopics * material.progress) / 100,
                        )}{" "}
                        dari {material.totalTopics} topik selesai
                    </p>
                </div>
            </div>

            {/* Right: sidebar */}
            <div
                style={{
                    flex: "0 0 280px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                }}
            >
                {/* Tools */}
                <div className="sidebar-card">
                    <h3
                        style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#111827",
                            marginBottom: 6,
                        }}
                    >
                        Peralatan Belajar
                    </h3>
                    <p
                        style={{
                            fontSize: 12.5,
                            color: "#9CA3AF",
                            marginBottom: 16,
                        }}
                    >
                        Sebelum memulai, pastikan kamu telah menyiapkan:
                    </p>
                    {material.tools.map((t, i) => (
                        <div key={i} className="tool-item">
                            <span style={{ fontSize: 20, flexShrink: 0 }}>
                                {t.icon}
                            </span>
                            <span
                                style={{
                                    fontSize: 13,
                                    color: "#374151",
                                    lineHeight: 1.5,
                                }}
                            >
                                {t.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Methods */}
                <div className="sidebar-card">
                    <h3
                        style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#111827",
                            marginBottom: 6,
                        }}
                    >
                        Metode Pembelajaran
                    </h3>
                    <p
                        style={{
                            fontSize: 12.5,
                            color: "#9CA3AF",
                            marginBottom: 16,
                        }}
                    >
                        Materi disampaikan melalui pendekatan bertahap yang
                        mencakup:
                    </p>
                    {material.methods.map((m, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 10,
                                marginBottom: 12,
                            }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: "50%",
                                    background: "#D1FAE5",
                                    border: "2px solid #10B981",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginTop: 1,
                                }}
                            >
                                <svg
                                    width="10"
                                    height="10"
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
                                    fontSize: 13,
                                    color: "#374151",
                                    lineHeight: 1.5,
                                }}
                            >
                                {m}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTA Start */}
                <button
                    style={{
                        width: "100%",
                        padding: "14px 0",
                        borderRadius: 999,
                        background: "linear-gradient(135deg,#F59E0B,#FBBF24)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 15,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(245,158,11,0.35)",
                        transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                            "0 10px 28px rgba(245,158,11,0.45)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "none";
                        e.target.style.boxShadow =
                            "0 6px 20px rgba(245,158,11,0.35)";
                    }}
                >
                    🚀 Mulai Belajar
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Tab: Silabus
// ─────────────────────────────────────────────
const SilabusTab = ({ syllabus }) => {
    const [openWeek, setOpenWeek] = useState(0);

    return (
        <div
            className="tab-content content-cols"
            style={{
                display: "flex",
                gap: 40,
                flexWrap: "wrap",
                alignItems: "flex-start",
            }}
        >
            {/* Accordion */}
            <div style={{ flex: "1 1 340px", minWidth: 0 }}>
                <h2
                    style={{
                        fontSize: "clamp(1.3rem,2.5vw,1.6rem)",
                        fontWeight: 900,
                        color: "#111827",
                        marginBottom: 20,
                    }}
                >
                    Silabus Materi
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    {syllabus.map((week, wi) => {
                        const isOpen = openWeek === wi;
                        const doneCount = week.topics.filter(
                            (t) => t.done,
                        ).length;
                        return (
                            <div
                                key={wi}
                                style={{
                                    border: `1.5px solid ${isOpen ? "#FBBF24" : "#F0EDE6"}`,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    background: isOpen ? "#FFFBEB" : "#fff",
                                    transition: "all 0.2s",
                                }}
                            >
                                {/* Week header */}
                                <button
                                    onClick={() =>
                                        setOpenWeek(isOpen ? -1 : wi)
                                    }
                                    style={{
                                        width: "100%",
                                        padding: "16px 20px",
                                        background: "transparent",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                        textAlign: "left",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 14,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 10,
                                                background: isOpen
                                                    ? "#F59E0B"
                                                    : "#F3F4F6",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                transition: "background 0.2s",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontWeight: 900,
                                                    fontSize: 13,
                                                    color: isOpen
                                                        ? "#fff"
                                                        : "#6B7280",
                                                }}
                                            >
                                                W{week.week}
                                            </span>
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: 800,
                                                    fontSize: 14,
                                                    color: "#111827",
                                                }}
                                            >
                                                {week.title}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 12,
                                                    color: "#9CA3AF",
                                                    marginTop: 2,
                                                }}
                                            >
                                                {doneCount}/{week.topics.length}{" "}
                                                topik selesai
                                            </div>
                                        </div>
                                    </div>
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth="2.5"
                                        style={{
                                            transform: isOpen
                                                ? "rotate(180deg)"
                                                : "none",
                                            transition: "transform 0.3s",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {/* Topics */}
                                {isOpen && (
                                    <div
                                        style={{
                                            padding: "0 14px 14px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 8,
                                        }}
                                    >
                                        {week.topics.map((topic, ti) => (
                                            <div
                                                key={topic.id}
                                                className={`syllabus-item ${topic.done ? "done" : ""}`}
                                                style={{
                                                    transitionDelay: `${ti * 0.05}s`,
                                                }}
                                            >
                                                {/* Index or check */}
                                                <div
                                                    style={{
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: 8,
                                                        background: topic.done
                                                            ? "#D1FAE5"
                                                            : "#F3F4F6",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    {topic.done ? (
                                                        <svg
                                                            width="13"
                                                            height="13"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#10B981"
                                                            strokeWidth="3"
                                                        >
                                                            <path d="M20 6L9 17l-5-5" />
                                                        </svg>
                                                    ) : (
                                                        <span
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 700,
                                                                color: "#9CA3AF",
                                                            }}
                                                        >
                                                            {topic.id}
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: topic.done
                                                                ? "#059669"
                                                                : "#374151",
                                                        }}
                                                    >
                                                        {topic.title}
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <svg
                                                        width="11"
                                                        height="11"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#9CA3AF"
                                                        strokeWidth="2"
                                                    >
                                                        <circle
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                        />
                                                        <path d="M12 6v6l4 2" />
                                                    </svg>
                                                    <span
                                                        style={{
                                                            fontSize: 11,
                                                            color: "#9CA3AF",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {topic.duration}
                                                    </span>
                                                </div>
                                                <div
                                                    style={{
                                                        width: 28,
                                                        height: 28,
                                                        borderRadius: 8,
                                                        background: "#F3F4F6",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <svg
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#6B7280"
                                                        strokeWidth="2.5"
                                                    >
                                                        <path d="M9 18l6-6-6-6" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: summary sidebar */}
            <div
                style={{
                    flex: "0 0 260px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                }}
            >
                {/* Summary stats */}
                <div className="sidebar-card">
                    <h3
                        style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#111827",
                            marginBottom: 16,
                        }}
                    >
                        Ringkasan Silabus
                    </h3>
                    {[
                        {
                            label: "Total Minggu",
                            value: syllabus.length,
                            icon: "📅",
                        },
                        {
                            label: "Total Topik",
                            value: syllabus.reduce(
                                (a, w) => a + w.topics.length,
                                0,
                            ),
                            icon: "📖",
                        },
                        {
                            label: "Topik Selesai",
                            value: syllabus.reduce(
                                (a, w) =>
                                    a + w.topics.filter((t) => t.done).length,
                                0,
                            ),
                            icon: "✅",
                        },
                        {
                            label: "Estimasi Waktu",
                            value: "~85 Mnt",
                            icon: "⏱️",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "10px 0",
                                borderBottom:
                                    i < 3 ? "1px solid #F3F4F6" : "none",
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{s.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "#9CA3AF",
                                        fontWeight: 500,
                                    }}
                                >
                                    {s.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 800,
                                        color: "#111827",
                                    }}
                                >
                                    {s.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="sidebar-card">
                    <h3
                        style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: "#111827",
                            marginBottom: 12,
                        }}
                    >
                        Keterangan Status
                    </h3>
                    {[
                        {
                            color: "#D1FAE5",
                            border: "#10B981",
                            icon: (
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="3"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            ),
                            label: "Topik selesai",
                        },
                        {
                            color: "#F3F4F6",
                            border: "#E5E7EB",
                            icon: null,
                            label: "Belum dikerjakan",
                        },
                    ].map((l, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: i === 0 ? 10 : 0,
                            }}
                        >
                            <div
                                style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: 6,
                                    background: l.color,
                                    border: `1.5px solid ${l.border}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {l.icon}
                            </div>
                            <span style={{ fontSize: 12.5, color: "#6B7280" }}>
                                {l.label}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    style={{
                        width: "100%",
                        padding: "14px 0",
                        borderRadius: 999,
                        background: "linear-gradient(135deg,#F59E0B,#FBBF24)",
                        color: "#fff",
                        fontWeight: 800,
                        fontSize: 15,
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0 6px 20px rgba(245,158,11,0.35)",
                        transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "none";
                    }}
                >
                    🚀 Lanjutkan Belajar
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  PAGE: Detail Material
// ─────────────────────────────────────────────
export default function DetailMaterialPage() {
    const [activeTab, setActiveTab] = useState("deskripsi");
    const [heroRef, heroVisible] = useInView(0.05);
    const [relRef, relVisible] = useInView(0.05);

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
                <div
                    ref={heroRef}
                    className="hero-detail"
                    style={{
                        padding: "40px 40px 48px",
                        marginBottom: 40,
                        position: "relative",
                        opacity: heroVisible ? 1 : 0,
                        transform: heroVisible ? "none" : "translateY(24px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    {/* Glow blobs */}
                    <div
                        className="glow-blob"
                        style={{
                            width: 300,
                            height: 300,
                            background: "#FEF08A",
                            top: -80,
                            left: -60,
                        }}
                    />
                    <div
                        className="glow-blob"
                        style={{
                            width: 200,
                            height: 200,
                            background: "#A5F3FC",
                            bottom: -40,
                            right: 200,
                        }}
                    />
                    <div
                        className="glow-blob"
                        style={{
                            width: 160,
                            height: 160,
                            background: "#FCA5A5",
                            top: 40,
                            right: 50,
                        }}
                    />

                    {/* Back btn */}
                    <a
                        href="#"
                        className="back-btn"
                        style={{
                            marginBottom: 28,
                            display: "inline-flex",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M19 12H5M5 12l7 7M5 12l7-7" />
                        </svg>
                        Kembali
                    </a>

                    <div
                        className="hero-cols"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 32,
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        {/* Left text */}
                        <div style={{ flex: "1 1 340px", minWidth: 0 }}>
                            {/* Category + level badges */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 8,
                                    marginBottom: 16,
                                    flexWrap: "wrap",
                                }}
                            >
                                <span
                                    style={{
                                        background: MATERIAL.categoryColor,
                                        color: "#fff",
                                        borderRadius: 999,
                                        padding: "4px 14px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}
                                >
                                    {MATERIAL.category}
                                </span>
                                <span
                                    style={{
                                        background: "#EFF6FF",
                                        color: "#1D4ED8",
                                        borderRadius: 999,
                                        padding: "4px 14px",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                    }}
                                >
                                    <svg
                                        width="11"
                                        height="11"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1D4ED8"
                                        strokeWidth="2.5"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 6v6l4 2" />
                                    </svg>
                                    {MATERIAL.duration}
                                </span>
                            </div>

                            {/* Title */}
                            <h1
                                style={{
                                    fontSize: "clamp(1.8rem,4vw,2.8rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    lineHeight: 1.2,
                                    marginBottom: 16,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        color: "#111827",
                                        position: "relative",
                                    }}
                                >
                                    Perkalian
                                    <svg
                                        style={{
                                            position: "absolute",
                                            bottom: -6,
                                            left: 0,
                                            width: "100%",
                                        }}
                                        height="10"
                                        viewBox="0 0 120 10"
                                        preserveAspectRatio="none"
                                    >
                                        <ellipse
                                            cx="60"
                                            cy="7"
                                            rx="58"
                                            ry="4"
                                            stroke="#F59E0B"
                                            strokeWidth="3"
                                            fill="none"
                                        />
                                    </svg>
                                </span>{" "}
                                Dasar
                            </h1>

                            <p
                                style={{
                                    color: "#6B7280",
                                    fontSize: 15,
                                    lineHeight: 1.75,
                                    maxWidth: 420,
                                }}
                            >
                                Pelajari konsep dasar perkalian untuk membantu
                                kamu memahami operasi hitung dengan lebih cepat
                                dan efisien.
                            </p>

                            {/* Meta row */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: 20,
                                    marginTop: 24,
                                    flexWrap: "wrap",
                                }}
                            >
                                {[
                                    {
                                        icon: "📚",
                                        label: `${MATERIAL.totalTopics} Topik`,
                                    },
                                    { icon: "⭐", label: "Pemula" },
                                    { icon: "👤", label: "1.2k Pelajar" },
                                ].map((m, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                        }}
                                    >
                                        <span style={{ fontSize: 15 }}>
                                            {m.icon}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: 13,
                                                fontWeight: 600,
                                                color: "#374151",
                                            }}
                                        >
                                            {m.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: thumbnail */}
                        <div style={{ flex: "0 0 auto" }}>
                            <div
                                className="float-sm"
                                style={{
                                    background: "#fff",
                                    borderRadius: 24,
                                    padding: "24px 28px",
                                    boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <MathThumbnail size="lg" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══ TABS ══════════════════════════════════════ */}
                <div
                    style={{
                        display: "flex",
                        gap: 4,
                        marginBottom: 36,
                        background: "#F3F4F6",
                        borderRadius: 999,
                        padding: 4,
                        width: "fit-content",
                    }}
                >
                    {[
                        { key: "deskripsi", label: "Deskripsi", icon: "📄" },
                        { key: "silabus", label: "Silabus", icon: "📋" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            className={`tab-btn ${activeTab === tab.key ? "active" : "inactive"}`}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                            }}
                        >
                            <span style={{ fontSize: 14 }}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ══ TAB CONTENT ═══════════════════════════════ */}
                <div style={{ marginBottom: 72 }}>
                    {activeTab === "deskripsi" && (
                        <DeskripsiTab material={MATERIAL} />
                    )}
                    {activeTab === "silabus" && (
                        <SilabusTab syllabus={MATERIAL.syllabus} />
                    )}
                </div>

                {/* ══ RELATED MATERIALS ═════════════════════════ */}
                <div
                    ref={relRef}
                    style={{
                        marginBottom: 64,
                        opacity: relVisible ? 1 : 0,
                        transform: relVisible ? "none" : "translateY(24px)",
                        transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 28,
                            flexWrap: "wrap",
                            gap: 12,
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "clamp(1.4rem,2.5vw,1.8rem)",
                                fontWeight: 900,
                                color: "#111827",
                            }}
                        >
                            Pilih Materi Belajarmu
                        </h2>
                        <a
                            href="#"
                            style={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: "#2563EB",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                            }}
                        >
                            Lihat Lainnya
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                    <div
                        className="related-grid"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3,1fr)",
                            gap: 24,
                        }}
                    >
                        {RELATED.map((mat, i) => (
                            <MaterialCard
                                key={mat.id}
                                {...mat}
                                delay={i * 0.1}
                                onSelect={() => {}}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
