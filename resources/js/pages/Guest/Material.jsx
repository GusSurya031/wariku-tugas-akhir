import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/../css/app.css";
import ItemFadeIn from "@/components/ItemFadeIn";
import HeroMaterial from "@/assets/images/hero-material.png";
import QuoteMaterial from "@/assets/images/quotes-material.png";



// ─────────────────────────────────────────────
//  Shared: Fonts + Base Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`

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
//  Shared: useInView scroll hook
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
//  Reusable: Math Thumbnail Illustration
// ─────────────────────────────────────────────
const MathThumbnail = ({
    color = "#6366F1",
    accentColor = "#F59E0B",
    size = "md",
}) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const ops = ["+", "−", "×", "÷", "="];
    const colors = [
        "#EF4444",
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#8B5CF6",
        "#EC4899",
        "#06B6D4",
    ];
    const sz = size === "sm" ? 0.75 : 1;

    return (
        <div
            style={{
                width: `${160 * sz}px`,
                height: `${120 * sz}px`,
                position: "relative",
                userSelect: "none",
            }}
        >
            {/* Scattered numbers */}
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
            {/* Operators */}
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
            {/* MATH text */}
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
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: categoryColor,
                        color: "#fff",
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                    }}
                >
                    {category}
                </div>
                {/* Duration badge */}
                <div
                    style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(4px)",
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "11px",
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

            {/* Body */}
            <div style={{ padding: "16px 18px 18px" }}>
                {/* Difficulty dots */}
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
                    Selengkapnya
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
//  DATA: Materials list
// ─────────────────────────────────────────────
const CATEGORIES = [
    "Semua",
    "Dasar",
    "Menengah",
    "Lanjut",
    "Geometri",
    "Statistik",
];

const MATERIALS = [
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
            "Pelajari teknik pengurangan bilangan bulat dan desimal dengan latihan bertahap.",
        category: "Dasar",
        categoryColor: "#16A34A",
        level: 1,
        duration: "25 Menit",
    },
    {
        id: 3,
        title: "Perkalian & Pembagian",
        description:
            "Kuasai operasi perkalian dan pembagian dasar untuk memperkuat fondasi matematikamu.",
        category: "Dasar",
        categoryColor: "#16A34A",
        level: 1,
        duration: "40 Menit",
    },
    {
        id: 4,
        title: "Pecahan & Desimal",
        description:
            "Memahami konsep pecahan biasa, campuran, dan desimal serta konversinya.",
        category: "Menengah",
        categoryColor: "#D97706",
        level: 2,
        duration: "45 Menit",
    },
    {
        id: 5,
        title: "Persamaan Linear",
        description:
            "Belajar menyelesaikan persamaan linear satu dan dua variabel secara sistematis.",
        category: "Menengah",
        categoryColor: "#D97706",
        level: 2,
        duration: "50 Menit",
    },
    {
        id: 6,
        title: "Bilangan Bulat Negatif",
        description:
            "Operasi bilangan bulat negatif dalam garis bilangan dan konteks nyata.",
        category: "Menengah",
        categoryColor: "#D97706",
        level: 2,
        duration: "35 Menit",
    },
    {
        id: 7,
        title: "Aljabar Dasar",
        description:
            "Pengenalan variabel, ekspresi aljabar, dan cara menyederhanakan bentuk aljabar.",
        category: "Lanjut",
        categoryColor: "#7C3AED",
        level: 3,
        duration: "60 Menit",
    },
    {
        id: 8,
        title: "Fungsi & Grafik",
        description:
            "Memahami konsep fungsi matematika dan cara menggambar grafiknya di bidang koordinat.",
        category: "Lanjut",
        categoryColor: "#7C3AED",
        level: 3,
        duration: "55 Menit",
    },
    {
        id: 9,
        title: "Luas & Keliling Bangun Datar",
        description:
            "Hitung luas dan keliling berbagai bangun datar: persegi, segitiga, lingkaran, dan trapesium.",
        category: "Geometri",
        categoryColor: "#0369A1",
        level: 2,
        duration: "40 Menit",
    },
];


// ─────────────────────────────────────────────
//  PAGE: Material Page
// ─────────────────────────────────────────────
export default function MaterialPage() {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [visibleCount, setVisibleCount] = useState(9);
    const [heroRef, heroVisible] = useInView(0.1);

    const filtered =
        activeFilter === "Semua"
            ? MATERIALS
            : MATERIALS.filter((m) => m.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <div className="bg-linear-to-b from-[#F8F6F1] to-white">
            <GlobalStyles />
            <Navbar />

            {/* ══ HERO ══════════════════════════════════════ */}
            <section className="py-16 md:pt-24 md:pb-20">
                <div className="max-w-360 mx-auto pl-4 sm:pl-6 lg:pl-16 bg-white rounded-4xl">
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between items-center mb-14 relative">
                        <ItemFadeIn direction="left" className="md:w-5/12 z-10">
                        {/* Text */}
                        <div
                            ref={heroRef}
                            style={{
                                maxWidth: 480,
                                opacity: heroVisible ? 1 : 0,
                                transform: heroVisible
                                    ? "none"
                                    : "translateX(-32px)",
                                transition:
                                    "opacity 0.7s ease, transform 0.7s ease",
                            }}
                        >
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
                                    marginBottom: 16,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                }}
                            >
                                <span style={{ fontSize: 14 }}>📚</span>
                                <span
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#D97706",
                                    }}
                                >
                                    Materi Pembelajaran
                                </span>
                            </div>

                            <h1
                                style={{
                                    fontSize: "clamp(2rem, 5vw, 3rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    lineHeight: 1.2,
                                    marginBottom: 16,
                                }} className="font-serif"
                            >
                                Jelajahi Materi{" "}
                                <span
                                    style={{
                                        fontFamily: "'Caveat', cursive",
                                        color: "#F59E0B",
                                        fontSize:
                                            "clamp(2.2rem, 5.5vw, 3.4rem)",
                                        display: "inline-block",
                                        position: "relative",
                                    }}
                                >
                                    Pembelajaran
                                    {/* Underline decoration */}
                                    <svg
                                        style={{
                                            position: "absolute",
                                            bottom: -4,
                                            left: 0,
                                            width: "100%",
                                        }}
                                        height="8"
                                        viewBox="0 0 200 8"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0 6 Q50 0 100 5 Q150 10 200 4"
                                            stroke="#F59E0B"
                                            strokeWidth="3"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </h1>
                            <p className="text-base">
                                Temukan berbagai materi matematika dasar yang
                                dirancang secara bertahap sesuai tingkat
                                pemahaman kamu
                            </p>
                        </div>
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="right"
                            delay={0.15}
                            className=""
                        >
                            <img src={HeroMaterial} alt="Hero Material" />
                        </ItemFadeIn>
                        {/* <div className="absolute w-100 h-100 bg-[#F7D55D] rounded-full blur-3xl -left-40 -top-40"></div> */}
                    </div>
                </div>
            </section>

            {/* ══ MATERIALS GRID ════════════════════════════ */}
            <section>
                <div style={{ maxWidth: 1152, margin: "0 auto" }}>
                    {/* Section header */}
                    <div style={{ textAlign: "center", marginBottom: 40 }}>
                        <h2
                            style={{
                                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                                fontWeight: 900,
                                color: "#111827",
                                marginBottom: 10,
                            }}
                        >
                            Pilih Materi Belajarmu
                        </h2>
                        <p
                            style={{
                                color: "#6B7280",
                                fontSize: 14,
                                lineHeight: 1.7,
                                maxWidth: 480,
                                margin: "0 auto",
                            }}
                        >
                            Mulai dari konsep dasar hingga tingkat lanjut,
                            setiap materi disusun untuk membantu kamu belajar
                            secara bertahap dan terarah.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                            justifyContent: "center",
                            marginBottom: 40,
                        }}
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                                onClick={() => {
                                    setActiveFilter(cat);
                                    setVisibleCount(9);
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <div
                        style={{
                            marginBottom: 24,
                            color: "#9CA3AF",
                            fontSize: 13,
                            textAlign: "center",
                        }}
                    >
                        Menampilkan{" "}
                        <strong style={{ color: "#374151" }}>
                            {Math.min(visibleCount, filtered.length)}
                        </strong>{" "}
                        dari{" "}
                        <strong style={{ color: "#374151" }}>
                            {filtered.length}
                        </strong>{" "}
                        materi
                    </div>

                    {/* Cards Grid */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: 24,
                        }}
                    >
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
                                onSelect={() =>
                                    console.log("Selected:", mat.title)
                                }
                            />
                        ))}
                    </div>

                    {/* Load more */}
                    {hasMore && (
                        <div style={{ textAlign: "center", marginTop: 48 }}>
                            <button
                                className="btn-outline-dark"
                                onClick={() => setVisibleCount((v) => v + 6)}
                            >
                                Lihat Lebih Banyak
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════════════════════════════════════ CTA BANNER ══ */}
            <section className="py-12 md:py-20">
                <div className="max-w-360 mx-auto pr-4 sm:pr-6 lg:pr-16 bg-linear-to-tr from-[#41278E] to-[#6F43F4] md:rounded-2xl shadow-lg">
                    <div className="flex justify-end relative min-h-56 md:min-h-96">
                        <ItemFadeIn
                            direction="left"
                            className="hidden md:block md:absolute left-0 -top-20"
                        >
                            <img src={QuoteMaterial} alt="Education" />
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="right"
                            delay={0.2}
                            className="relative self-center text-center md:text-left md:max-w-xl"
                        >
                            <h2 className="text-xl md:text-2xl text-white leading-tight mb-3 font-serif text-center md:text-right">
                                "Belajar bukan tentang seberapa cepat kamu memahami, tetapi tentang seberapa konsisten kamu mencoba."
                            </h2>
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
