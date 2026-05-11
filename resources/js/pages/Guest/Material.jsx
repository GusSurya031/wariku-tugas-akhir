import { useState, useEffect, useRef } from "react";
import { router } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/../css/app.css";
import ItemFadeIn from "@/components/ItemFadeIn";
import HeroMaterial from "@/assets/images/hero-material.png";
import QuoteMaterial from "@/assets/images/quotes-material.png";

// ─────────────────────────────────────────────
//  Shared: useInView scroll hook
// ─────────────────────────────────────────────
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
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
const MathThumbnail = ({ size = "md" }) => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const ops = ["+", "−", "×", "÷", "="];
    const colors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"];
    const sz = size === "sm" ? 0.75 : 1;

    return (
        <div style={{ width: `${160 * sz}px`, height: `${120 * sz}px`, position: "relative", userSelect: "none" }}>
            {numbers.map((n, i) => (
                <div key={n} style={{ position: "absolute", fontSize: `${(14 + (i % 3) * 4) * sz}px`, fontWeight: 900, color: colors[i % colors.length], left: `${(i * 17) % 80}%`, top: `${(i * 23 + 5) % 70}%`, textShadow: "0 2px 4px rgba(0,0,0,0.12)", transform: `rotate(${i * 13 - 20}deg)`, lineHeight: 1 }}>
                    {n}
                </div>
            ))}
            {ops.map((op, i) => (
                <div key={op} style={{ position: "absolute", fontSize: `${11 * sz}px`, fontWeight: 700, color: colors[(i + 3) % colors.length], left: `${(i * 19 + 5) % 85}%`, top: `${(i * 17 + 15) % 75}%`, transform: `rotate(${i * -11}deg)` }}>
                    {op}
                </div>
            ))}
            <div style={{ position: "absolute", bottom: "8%", left: "50%", transform: "translateX(-50%)", fontSize: `${22 * sz}px`, fontWeight: 900, color: "#1D4ED8", textShadow: `2px 2px 0 #93C5FD, -1px -1px 0 #BFDBFE`, letterSpacing: "3px", whiteSpace: "nowrap" }}>
                MATH
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Reusable: MaterialCard
// ─────────────────────────────────────────────
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
            className="material-card"
            style={{
                transitionDelay: `${delay}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
            }}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
        >
            {/* Thumbnail */}
            <div className="card-thumbnail">
                {thumbnail || <MathThumbnail />}

                {/* Category badge */}
                <div
                    className="absolute top-3 left-3 text-white rounded-full px-[10px] py-[3px] text-[11px] font-bold tracking-wide"
                    style={{ background: categoryColor }}
                >
                    {category}
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-[10px] py-[3px] text-[11px] font-semibold text-gray-700 flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    {duration}
                </div>
            </div>

            {/* Body */}
            <div className="px-[18px] pt-4 pb-[18px]">
                {/* Difficulty dots */}
                <div className="flex items-center gap-1 mb-2">
                    {levelDots.map((d) => (
                        <div
                            key={d}
                            className="w-2 h-2 rounded-full"
                            style={{ background: d <= level ? "#F59E0B" : "#E5E7EB" }}
                        />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-1 font-medium">
                        {level === 1 ? "Pemula" : level === 2 ? "Menengah" : "Lanjut"}
                    </span>
                </div>

                <h3 className="text-[15px] font-extrabold text-gray-900 mb-1.5 leading-tight">
                    {title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3.5">
                    {description}
                </p>

                <button className="card-btn">
                    Selengkapnya
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  DATA: Filter & topic helpers
// ─────────────────────────────────────────────
const CATEGORIES = ["Semua", "Geometri", "Statistik"];

const TOPIC_COLOR = { geometri: "#16A34A", statistik: "#7C3AED" };
const TOPIC_LABEL = { geometri: "Geometri", statistik: "Statistik" };

// ─────────────────────────────────────────────
//  PAGE: Material Page
// ─────────────────────────────────────────────
export default function MaterialPage({ materials = [] }) {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [visibleCount, setVisibleCount] = useState(9);
    const [heroRef, heroVisible] = useInView(0.1);

    // Normalise each DB material to the shape MaterialCard expects
    const normalised = materials.map((m) => ({
        ...m,
        category:      TOPIC_LABEL[m.topic?.toLowerCase()] ?? m.topic,
        categoryColor: TOPIC_COLOR[m.topic?.toLowerCase()] ?? "#D97706",
    }));

    const filtered = activeFilter === "Semua"
        ? normalised
        : normalised.filter((m) => m.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <div className="bg-linear-to-b from-[#F8F6F1] to-white">
            <Navbar />

            {/* ══ HERO ══════════════════════════════════════ */}
            <section className="py-16 md:pt-24 md:pb-20">
                <div className="max-w-360 mx-auto pl-4 sm:pl-6 lg:pl-16 bg-white rounded-4xl">
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between items-center mb-14 relative">
                        <ItemFadeIn direction="left" className="md:w-5/12 z-10">
                            <div
                                ref={heroRef}
                                className="max-w-[480px]"
                                style={{
                                    opacity: heroVisible ? 1 : 0,
                                    transform: heroVisible ? "none" : "translateX(-32px)",
                                    transition: "opacity 0.7s ease, transform 0.7s ease",
                                }}
                            >
                                {/* Eyebrow */}
                                <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-[14px] py-1 mb-4 shadow-sm">
                                    <span className="text-sm">📚</span>
                                    <span className="text-xs font-bold text-amber-600">
                                        Materi Pembelajaran
                                    </span>
                                </div>

                                <h1
                                    className="font-black text-gray-900 leading-tight mb-4 font-serif"
                                    style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
                                >
                                    Jelajahi Materi{" "}
                                    <span
                                        className="text-amber-400 inline-block relative"
                                        style={{
                                            fontFamily: "'Caveat', cursive",
                                            fontSize: "clamp(2.2rem, 5.5vw, 3.4rem)",
                                        }}
                                    >
                                        Pembelajaran
                                        <svg
                                            className="absolute -bottom-1 left-0 w-full"
                                            height="8"
                                            viewBox="0 0 200 8"
                                            preserveAspectRatio="none"
                                        >
                                            <path d="M0 6 Q50 0 100 5 Q150 10 200 4" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                </h1>

                                <p className="text-base">
                                    Temukan berbagai materi matematika dasar yang dirancang secara bertahap sesuai tingkat pemahaman kamu
                                </p>
                            </div>
                        </ItemFadeIn>

                        <ItemFadeIn direction="right" delay={0.15}>
                            <img src={HeroMaterial} alt="Hero Material" />
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            {/* ══ MATERIALS GRID ════════════════════════════ */}
            <section>
                <div className="max-w-6xl mx-auto px-4">
                    {/* Section header */}
                    <div className="text-center mb-10">
                        <h2
                            className="font-black text-gray-900 mb-2.5"
                            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                        >
                            Pilih Materi Belajarmu
                        </h2>
                        <p className="text-gray-500 text-sm leading-[1.7] max-w-[480px] mx-auto">
                            Mulai dari konsep dasar hingga tingkat lanjut, setiap materi disusun untuk membantu kamu belajar secara bertahap dan terarah.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-[10px] justify-center mb-10">
                        {CATEGORIES.map((cat) => (
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
                    <div className="mb-6 text-gray-400 text-[13px] text-center">
                        Menampilkan{" "}
                        <strong className="text-gray-700">{Math.min(visibleCount, filtered.length)}</strong>{" "}
                        dari{" "}
                        <strong className="text-gray-700">{filtered.length}</strong>{" "}
                        materi
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                        {visible.map((mat, idx) => (
                            <MaterialCard
                                key={mat.id}
                                {...mat}
                                delay={(idx % 3) * 0.1}
                                onSelect={() => router.visit(`/material/${mat.id}`)}
                            />
                        ))}
                    </div>

                    {/* Load more */}
                    {hasMore && (
                        <div className="text-center mt-12">
                            <button className="btn-outline-dark" onClick={() => setVisibleCount((v) => v + 6)}>
                                Lihat Lebih Banyak
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ══ CTA BANNER ════════════════════════════════ */}
            <section className="py-12 md:py-20">
                <div className="max-w-360 mx-auto pr-4 sm:pr-6 lg:pr-16 bg-linear-to-tr from-[#41278E] to-[#6F43F4] md:rounded-2xl shadow-lg">
                    <div className="flex justify-end relative min-h-56 md:min-h-96">
                        <ItemFadeIn direction="left" className="hidden md:block md:absolute left-0 -top-20">
                            <img src={QuoteMaterial} alt="Education" />
                        </ItemFadeIn>
                        <ItemFadeIn direction="right" delay={0.2} className="relative self-center text-center md:text-left md:max-w-xl">
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
