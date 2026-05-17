import { useState, useEffect, useRef, useMemo } from "react";
import { Link, router } from "@inertiajs/react";
import ItemFadeIn from "@/components/ItemFadeIn";
import Navbar from "@/components/Navbar";
import useInView from "@/components/useInView";
import Footer from "@/components/Footer";
import MaterialContent from "@/components/MaterialContent";
import "@/../css/app.css";
import LineHero from "@/assets/icon/LineHero";
import LineElement from "@/assets/icon/ellipse.svg";
import ThumbnailCard from "@/assets/images/thumbnail_card.png";

// ─────────────────────────────────────────────
//  Global Styles
// ─────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`

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
      display: flex; gap: 12px;
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
//  Reusable: MaterialCard (same as MaterialPage)
// ─────────────────────────────────────────────
const MaterialCard = ({
    title = "",
    description = "",
    sub_description = "",
    category = "",
    categoryColor = "",
    duration = "",
    thumbnail = ThumbnailCard,
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
            <div
                className="card-thumbnail"
                style={{ background: `url(${thumbnail}) center/cover` }}
            >
                {/* <img src={thumbnail} alt="" className="w-3/4 h-full object-fit" /> */}

                {/* Category badge */}
                <div
                    className="absolute top-3 left-3 text-white rounded-full px-[10px] py-[3px] text-[11px] font-bold tracking-wide"
                    style={{ background: categoryColor }}
                >
                    {category}
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-[10px] py-[3px] text-[11px] font-semibold text-gray-700 flex items-center gap-1">
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
                    {duration} Menit
                </div>
            </div>

            {/* Body */}
            <div className="px-[18px] pt-4 pb-[18px]">
                <h3 className="text-[15px] font-extrabold text-gray-900 mb-1.5 leading-tight">
                    {title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3.5">
                    {sub_description}
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
//  Helpers
// ─────────────────────────────────────────────
const TOPIC_COLOR = { geometri: "#16A34A", statistik: "#7C3AED" };
const TOPIC_LABEL = { geometri: "Geometri", statistik: "Statistik" };
const DIFFICULTY_LABEL = { easy: "Pemula", medium: "Menengah", hard: "Lanjut" };
const DIFFICULTY_ABBR = { easy: "P", medium: "M", hard: "L" };
const DIFFICULTY_COLOR = {
    easy: "#10B981",
    medium: "#F59E0B",
    hard: "#EF4444",
};

const STATIC_TOOLS = [
    { icon: "📝", label: "Alat tulis untuk mencatat dan berhitung" },
    { icon: "⏰", label: "Fokus dan waktu belajar yang cukup" },
];

const STATIC_METHODS = [
    "Penjelasan konsep dasar",
    "Contoh soal yang mudah dipahami",
    "Latihan bertahap sesuai level",
    "Evaluasi pemahaman di akhir sesi",
];

// ─────────────────────────────────────────────
//  Tab: Deskripsi
// ─────────────────────────────────────────────
const DeskripsiTab = ({ material }) => {
    const [ref, visible] = useInView(0.05);

    return (
        <div
            ref={ref}
            className="tab-content grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
            {/* Left: description */}
            <div className="min-w-0 lg:col-span-8">
                <h2 className="mb-5 text-[clamp(1.3rem,2.5vw,1.6rem)] font-black text-gray-900">
                    Tentang Materi Ini
                </h2>

                <MaterialContent
                    className=""
                    html={material?.description ?? ""}
                />
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col gap-5 lg:col-span-4">
                {/* Tools */}
                <div className="sidebar-card">
                    <h3 className="mb-1.5 text-[15px] font-extrabold text-gray-900">
                        Peralatan Belajar
                    </h3>

                    <p className="text-[12.5px] text-gray-400">
                        Sebelum memulai, pastikan kamu telah menyiapkan:
                    </p>

                    {material.tools.map((t, i) => (
                        <div key={i} className="tool-item items-center">
                            <span className="shrink-0 text-xl">{t.icon}</span>

                            <span className="text-[13px] leading-normal text-gray-700">
                                {t.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Methods */}
                <div className="sidebar-card">
                    <h3 className="mb-1.5 text-[15px] font-extrabold text-gray-900">
                        Metode Pembelajaran
                    </h3>

                    <p className="mb-4 text-[12.5px] text-gray-400">
                        Materi disampaikan melalui pendekatan bertahap yang
                        mencakup:
                    </p>

                    {material.methods.map((m, i) => (
                        <div key={i} className="mb-3 flex items-start gap-2.5">
                            <div className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-100">
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

                            <span className="text-[13px] leading-normal text-gray-700">
                                {m}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  Tab: Silabus
// ─────────────────────────────────────────────
const SilabusTab = ({ syllabus, time }) => {
    const [openWeek, setOpenWeek] = useState(0);

    return (
        <div className="tab-content grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Accordion */}
            <div className="min-w-0 lg:col-span-8">
                <h2 className="mb-5 text-[clamp(1.3rem,2.5vw,1.6rem)] font-black text-gray-900">
                    Silabus Materi
                </h2>

                <div className="flex flex-col gap-3">
                    {syllabus.map((week, wi) => {
                        const isOpen = openWeek === wi;
                        const doneCount = week.topics.filter(
                            (t) => t.done,
                        ).length;

                        return (
                            <div
                                key={wi}
                                className={`overflow-hidden rounded-2xl border-[1.5px] transition-all duration-200 ${
                                    isOpen
                                        ? "border-amber-300 bg-amber-50"
                                        : "border-[#F0EDE6] bg-white"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setOpenWeek(isOpen ? -1 : wi)
                                    }
                                    className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-5 py-4 text-left"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200 ${
                                                isOpen
                                                    ? "bg-amber-500"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            <span
                                                className={`text-[13px] font-black ${
                                                    isOpen
                                                        ? "text-white"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {week.abbr ?? week.week}
                                            </span>
                                        </div>

                                        <div>
                                            <div className="text-sm font-extrabold text-gray-900">
                                                {week.title}
                                            </div>
                                            <div className="mt-0.5 text-xs text-gray-400">
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
                                        className={`shrink-0 transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="flex flex-col gap-2 px-3.5 pb-3.5">
                                        {week.topics.map((topic, ti) => (
                                            <div
                                                key={topic.id}
                                                className={`syllabus-item ${
                                                    topic.done ? "done" : ""
                                                }`}
                                                style={{
                                                    transitionDelay: `${ti * 0.05}s`,
                                                }}
                                            >
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                    <span className="text-xs font-bold text-gray-400">
                                                        {ti + 1}
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="text-[13px] font-bold text-gray-700">
                                                        {topic.title}
                                                    </div>
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
            <div className="flex flex-col gap-5 lg:col-span-4">
                <div className="sidebar-card">
                    <h3 className="mb-4 text-[15px] font-extrabold text-gray-900">
                        Ringkasan Silabus
                    </h3>

                    {[
                        {
                            label: "Total Level",
                            value: syllabus.length,
                            icon: "🎯",
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
                            label: "Estimasi Waktu",
                            value: time + " Menit",
                            icon: "⏱️",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 py-2.5 ${
                                i < 3 ? "border-b border-gray-100" : ""
                            }`}
                        >
                            <span className="text-lg">{s.icon}</span>
                            <div className="flex-1">
                                <div className="text-[11px] font-medium text-gray-400">
                                    {s.label}
                                </div>
                                <div className="text-base font-extrabold text-gray-900">
                                    {s.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
//  PAGE: Detail Material
// ─────────────────────────────────────────────
export default function DetailMaterialPage({ material = {}, related = [] }) {
    const [activeTab, setActiveTab] = useState("deskripsi");
    const [heroRef, heroVisible] = useInView(0.05);
    const [relRef, relVisible] = useInView(0.05);

    const variants = material.variants ?? [];
    const totalChapters = useMemo(
        () => variants.reduce((sum, v) => sum + (v.chapters?.length ?? 0), 0),
        [variants],
    );

    // One accordion section per difficulty variant
    const silabusData = useMemo(
        () =>
            variants.map((v, i) => ({
                week: i + 1,
                abbr: DIFFICULTY_ABBR[v.difficulty] ?? `${i + 1}`,
                color: DIFFICULTY_COLOR[v.difficulty] ?? "#F59E0B",
                title: DIFFICULTY_LABEL[v.difficulty] ?? v.difficulty,
                topics: (v.chapters ?? []).map((c) => ({
                    id: c.id,
                    title: c.title,
                    duration: "—",
                    done: false,
                })),
            })),
        [variants],
    );

    const materialForTab = {
        description: material.description,
        progress: 0,
        totalTopics: totalChapters,
        tools: STATIC_TOOLS,
        methods: STATIC_METHODS,
    };
    const topicKey = material.topic?.toLowerCase() ?? "";
    const catLabel = TOPIC_LABEL[topicKey] ?? material.topic ?? "—";
    const catColor = TOPIC_COLOR[topicKey] ?? "#D97706";
    const diffLabel = DIFFICULTY_LABEL[material.difficulty] ?? "Pemula";

    const relatedNorm = related.map((m) => ({
        ...m,
        category: TOPIC_LABEL[m.topic?.toLowerCase()] ?? m.topic,
        categoryColor: TOPIC_COLOR[m.topic?.toLowerCase()] ?? "#D97706",
        level: 1,
    }));

    return (
        <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
            <GlobalStyles />
            <LineHero className="absolute z-10" />

            <Navbar />

            {/* ══ HERO ════════════════════════════ */}
            <section className="hero-bg relative">
                <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between items-center mb-14 relative">
                            <ItemFadeIn
                                direction="left"
                                className="md:w-6/12 z-10"
                            >
                                {/* Back btn */}
                                <Link
                                    href="/material"
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
                                </Link>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-snug font-serif mb-2">
                                    <span className="inline-block relative">
                                        {material.title ?? ""}
                                        <img
                                            src={LineElement}
                                            alt="Line Element"
                                            className="absolute -bottom-2 left-0 w-3/4 -z-10"
                                        />
                                    </span>
                                </h1>

                                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                    {material.sub_description ??
                                        "Subdeskripsi belum tersedia."}
                                </p>
                                <span
                                    className="rounded-full px-6 py-2 text-sm font-bold"
                                    style={{
                                        background: catColor,
                                        color: "#fff",
                                        marginTop: 12,
                                        display: "inline-block",
                                    }}
                                >
                                    {catLabel}
                                </span>
                            </ItemFadeIn>
                            <ItemFadeIn
                                direction="right"
                                className="md:w-1/2 flex justify-end"
                            >
                                <img
                                    src={ThumbnailCard}
                                    alt=""
                                    className="rounded-2xl"
                                />
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>
            </section>

            <section className="py-8 bg-white relative z-10">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                    {/* ══ TABS ══════════════════════════════════════ */}
                    <div className="flex gap-2 bg-[#F3F4F6] rounded-full p-1 w-max">
                        {[
                            {
                                key: "deskripsi",
                                label: "Deskripsi",
                                icon: "📄",
                            },
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
                </div>
            </section>

            <section className=" bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                    {activeTab === "deskripsi" && (
                        <DeskripsiTab material={materialForTab} />
                    )}
                    {activeTab === "silabus" &&
                        (silabusData.length > 0 ? (
                            <SilabusTab syllabus={silabusData} time = {material.duration} />
                        ) : (
                            <p
                                style={{
                                    color: "#9CA3AF",
                                    fontSize: 14,
                                    padding: "32px 0",
                                }}
                            >
                                Silabus belum tersedia.
                            </p>
                        ))}
                </div>
            </section>

            {/* ══ RELATED MATERIALS ═════════════════════════ */}
            <section className="py-16 md:py-20 bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                    {relatedNorm.length > 0 && (
                        <div
                            ref={relRef}
                            style={{
                                marginBottom: 64,
                                opacity: relVisible ? 1 : 0,
                                transform: relVisible
                                    ? "none"
                                    : "translateY(24px)",
                                transition:
                                    "opacity 0.7s ease, transform 0.7s ease",
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
                                    Materi Lainnya
                                </h2>
                                <Link
                                    href="/material"
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
                                    Lihat Semua
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
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {relatedNorm.map((mat, i) => (
                                    <MaterialCard
                                        key={mat.id}
                                        {...mat}
                                        delay={i * 0.1}
                                        onSelect={() =>
                                            router.visit(`/material/${mat.id}`)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
