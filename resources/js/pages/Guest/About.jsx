import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LineHero from "@/assets/icon/LineHero";

import "@/../css/app.css";
import ItemFadeIn from "@/components/ItemFadeIn";
import IlustrasiKiri from "@/assets/images/ilustrasi-kiri.png";
import IlustrasiKanan from "@/assets/images/ilustrasi-kanan.png";
import HeroAbout from "@/assets/images/hero_about.png";
import LineElement from "@/assets/icon/ellipse.svg";

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

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────
const TECH_CARDS = [
    {
        num: 1,
        title: "Rule-Based System",
        desc: "Menggunakan interpretasi Wariga Bali untuk memahami preferensi belajar siswa secara lebih personal dan budaya-kontekstual.",
        icon: "📜",
        color: "#065F46",
    },
    {
        num: 2,
        title: "Learning Analytics",
        desc: "Menganalisis performa & hasil evaluasi siswa untuk memahami tingkat pemahaman secara lebih akurat.",
        icon: "🧠",
        color: "#312E81",
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

export default function AboutPage() {
    const techHead = useInView("fade-up", 0);
    const faqHead = useInView("fade-up", 0);

    return (
        <div className="bg-linear-to-b from-[#F8F6F1] to-white">
            <LineHero className="absolute" />
            <GlobalStyles />
            <Navbar />

            {/* ══ HERO ════════════════════════════ */}
            <section className="hero-bg">
                <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                    {/* Background */}
                    <div
                        className="hidden md:block absolute inset-0 bg-no-repeat md:bg-[length:80%] lg:bg-contain  bg-right pointer-events-none"
                        style={{
                            backgroundImage: `url(${HeroAbout})`,
                        }}
                    />
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between items-center mb-14 relative">
                            <ItemFadeIn
                                direction="left"
                                className="md:w-6/12 z-10"
                            >
                                {/* Eyebrow */}
                                <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full py-1.5 px-4 mb-4 shadow-sm">
                                    <span className="text-sm">🏫</span>
                                    <span className="text-xs font-bold text-amber-600">
                                        Tentang Wariku
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-snug font-serif mb-2">
                                    Tentang Sistem{" "}
                                    <span className="inline-block relative">
                                        Pembelajaran ini
                                        <img
                                            src={LineElement}
                                            alt="Line Element"
                                            className="absolute -bottom-2 left-0 w-3/4 -z-10"
                                        />
                                    </span>
                                </h1>

                                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                    Sistem ini dikembangkan untuk membantu siswa
                                    belajar melalui analisis kemampuan belajar
                                    dan pendekatan berbasis Wariga Bali.
                                </p>
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>
            </section>

            {/* ══════════════════════════════════════════ FEATURE 1 ══ */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
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
                                Kenalan dulu dengan Sistem Wariku
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Sistem ini juga mengintegrasikan pendekatan
                                berbasis Wariga Bali untuk memahami preferensi
                                belajar siswa. Dengan menggabungkan teknologi
                                dan kearifan lokal, sistem ini diharapkan mampu
                                memberikan pengalaman belajar yang lebih
                                personal dan efektif.
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
                <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
                        <ItemFadeIn
                            direction="right"
                            delay={0.2}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight mb-4 font-serif">
                                Pengembangan Sistem yang Adaptif
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Menggabungkan analisis data, kecerdasan buatan,
                                dan pendekatan budaya lokal, sistem ini
                                bertujuan untuk meningkatkan efektivitas belajar
                                serta membantu siswa memahami materi dengan cara
                                yang lebih sesuai dengan dirinya.
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
            <section className="bg-[#F5F3F0] px-6 py-[72px] mb-0">
                <div className="mx-auto max-w-6xl">
                    <div ref={techHead} className="mb-[52px] text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                            <span className="text-[13px]">⚙️</span>
                            <span className="text-xs font-bold text-violet-600">
                                Teknologi Kami
                            </span>
                        </div>

                        <h2 className="mb-3 text-[clamp(1.6rem,3vw,2.2rem)] font-serif text-gray-900">
                            Pemanfaatan Teknologi
                        </h2>

                        <p className="mx-auto max-w-[440px] text-sm leading-[1.7] text-gray-500">
                            Mengkombinasikan algoritma berikut untuk bisa
                            memberikan analisis yang sesuai dengan kemampuan
                            siswa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                                            background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)`,
                                        }}
                                    >
                                        {card.num}
                                    </div>

                                    <div className="mb-3 text-[32px]">
                                        {card.icon}
                                    </div>

                                    <h3 className="mb-2.5 text-base font-extrabold text-gray-900">
                                        {card.title}
                                    </h3>

                                    <p className="text-[13px] leading-[1.75] text-gray-500">
                                        {card.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══ FAQ ═══════════════════════════════════════ */}
            <section id="faq" className="mx-auto max-w-6xl px-6 py-[72px]">
                <div ref={faqHead} className="mb-12 text-center">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                        <span className="text-[13px]">💬</span>
                        <span className="text-xs font-bold text-amber-600">
                            Bantuan
                        </span>
                    </div>

                    <h2 className="mb-2.5 font-['Plus_Jakarta_Sans',sans-serif] text-[clamp(2rem,4vw,2.8rem)] font-black text-gray-900">
                        FAQ
                    </h2>

                    <p className="text-sm text-gray-500">
                        Pertanyaan yang sering ditanyakan
                    </p>
                </div>

                <div className="mx-auto flex max-w-[720px] flex-col gap-3">
                    {FAQS.map((faq, i) => (
                        <FAQItem
                            key={i}
                            question={faq.q}
                            answer={faq.a}
                            index={i}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
