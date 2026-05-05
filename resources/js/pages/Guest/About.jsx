import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/../css/app.css";
import ItemFadeIn from "@/components/ItemFadeIn";
import IlustrasiKiri from "@/assets/images/ilustrasi-kiri.png";
import IlustrasiKanan from "@/assets/images/ilustrasi-kanan.png";

// ─────────────────────────────────────────────
//  Global Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`

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
        <div className="bg-linear-to-b from-[#F8F6F1] to-white">
            <GlobalStyles />
            <Navbar />

            {/* ══ HERO ══════════════════════════════════════ */}
            <section
                ref={heroRef}
                className="hero-about py-16 md:pt-24 md:pb-20"
            >
                <div className="max-w-360 mx-auto pl-4 sm:pl-6 lg:pl-16 ">
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
                        <ItemFadeIn>
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
                                            fontSize:
                                                "clamp(2.1rem,4.5vw,3.1rem)",
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
                                    belajar melalui analisis kemampuan belajar
                                    dan pendekatan berbasis Wariga Bali.
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
                                            e.target.style.background =
                                                "#374151";
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
                        </ItemFadeIn>

                        {/* Mosaic illustration */}
                        <div style={{ flexShrink: 0 }}>
                            <HeroMosaic />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ FEATURE 1 ══ */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <ItemFadeIn
                            direction="left"
                            className="md:w-1/2 flex justify-center"
                        >
                            <img src={IlustrasiKiri} alt="" />
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="right"
                            delay={0.2}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-serif">
                                Belajar Sesuai Gaya dan Preferensimu
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Sistem memahami preferensi belajarmu melalui
                                pendekatan Wariga Bali, sehingga materi dapat
                                disajikan dalam bentuk yang lebih mudah kamu
                                pahami, baik visual, numerik, maupun naratif.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                                <p className="text-sm md:text-base text-gray-500">
                                    Materi disesuaikan dengan karakteristik
                                    belajarmu secara otomatis
                                </p>
                            </div>
                            <div className="mt-3 flex gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                <p className="text-sm md:text-base text-gray-500">
                                    Pendekatan holistik berbasis kearifan lokal
                                    Bali
                                </p>
                            </div>
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ FEATURE 2 ══ */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <ItemFadeIn
                            direction="right"
                            delay={0.2}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-serif">
                                Latihan yang Menyesuaikan Kemampuanmu
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Setiap latihan yang kamu kerjakan dianalisis
                                berdasarkan tingkat ketepatan dan waktu
                                pengerjaan. Sistem kemudian menentukan tingkat
                                pemahamanmu untuk memberikan rekomendasi materi
                                yang sesuai.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                                <p className="text-sm md:text-base text-gray-500">
                                    Analisis real-time berdasarkan performa
                                    latihan kamu
                                </p>
                            </div>
                            <div className="mt-3 flex gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                <p className="text-sm md:text-base text-gray-500">
                                    Rekomendasi cerdas untuk materi selanjutnya
                                </p>
                            </div>
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="left"
                            className="md:w-1/2 flex justify-center"
                        >
                            <img src={IlustrasiKanan} alt="" />
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

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
