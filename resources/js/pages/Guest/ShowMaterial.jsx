import { useState, useMemo } from "react";
import { Link, router, Head } from "@inertiajs/react";
// Components
import ItemFadeIn from "@/components/ItemFadeIn";
import Navbar from "@/components/Navbar";
import useInView from "@/components/useInView";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import DeskripsiTab from "@/components/DeskripsiTab";
import SilabusTab from "@/components/SylabusTab";
import {
    TOPIC_COLOR,
    TOPIC_LABEL,
    DIFFICULTY_LABEL,
    DIFFICULTY_ABBR,
    DIFFICULTY_COLOR,
    STATIC_TOOLS,
    STATIC_METHODS,
} from "@/constants/Material";
// Assets
import LineHero from "@/assets/icon/LineHero";
import Ellipse from "@/assets/icon/Ellipse";
import ThumbnailCard from "@/assets/images/thumbnail_card.png";

export default function ShowMaterial({ material = {}, related = [] }) {
    const [activeTab, setActiveTab] = useState("deskripsi");
    const [relRef, relVisible] = useInView(0.05);

    const variants = material.variants ?? [];
    const totalChapters = useMemo(
        () => variants.reduce((sum, v) => sum + (v.chapters?.length ?? 0), 0),
        [variants],
    );

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

    const relatedNorm = related.map((m) => ({
        ...m,
        category: TOPIC_LABEL[m.topic?.toLowerCase()] ?? m.topic,
        categoryColor: TOPIC_COLOR[m.topic?.toLowerCase()] ?? "#D97706",
        level: 1,
    }));

    return (
        <>
            <Head title={`Wariku - ${material?.title ?? "Materi"}`} />
            <Navbar />
            <main className="min-h-screen font-sans text-gray-800 overflow-x-hidden ">
                <LineHero className="absolute inset-0 h-full w-full pointer-events-none opacity-70" />

                {/* ══ HERO ════════════════════════════ */}
                <section className="hero-bg relative">
                    <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                        <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                            <div className="relative mb-14 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-20">
                                <ItemFadeIn
                                    direction="left"
                                    className="z-10 md:w-6/12"
                                >
                                    <Link
                                        href="/material"
                                        className="back-btn mb-7 relative z-1"
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

                                    <h1 className="mb-2 font-serif text-4xl leading-snug md:text-5xl lg:text-6xl">
                                        <span className="relative inline-block">
                                            {material.title ?? ""}
                                            <Ellipse className="absolute -bottom-2 left-0 -z-10 w-3/4" />
                                        </span>
                                    </h1>

                                    <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                                        {material.sub_description ??
                                            "Subdeskripsi belum tersedia."}
                                    </p>

                                    <span
                                        className="mt-3 inline-block rounded-full px-6 py-2 text-sm font-bold text-white"
                                        style={{ background: catColor }}
                                    >
                                        {catLabel}
                                    </span>
                                </ItemFadeIn>

                                <ItemFadeIn
                                    direction="right"
                                    className="flex justify-end md:w-1/2"
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

                {/* ══ TABS ══════════════════════════════════════ */}
                <section className="relative z-10 bg-white py-8">
                    <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                        <div className="flex w-max gap-2 rounded-full bg-white-100 p-1">
                            {[
                                {
                                    key: "deskripsi",
                                    label: "Deskripsi",
                                    icon: "📄",
                                },
                                {
                                    key: "silabus",
                                    label: "Silabus",
                                    icon: "📋",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`tab-btn ${activeTab === tab.key ? "active" : "inactive"}`}
                                    onClick={() => setActiveTab(tab.key)}
                                >
                                    <span className="text-sm">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ TAB CONTENT ═══════════════════════════════ */}
                <section className="bg-white">
                    <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                        {activeTab === "deskripsi" && (
                            <DeskripsiTab material={materialForTab} />
                        )}
                        {activeTab === "silabus" &&
                            (silabusData.length > 0 ? (
                                <SilabusTab
                                    syllabus={silabusData}
                                    time={material.duration}
                                />
                            ) : (
                                <p className="py-8 text-sm text-gray-400">
                                    Silabus belum tersedia.
                                </p>
                            ))}
                    </div>
                </section>

                {/* ══ RELATED MATERIALS ═════════════════════════ */}
                <section className="bg-white py-16 md:py-20">
                    <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16">
                        {relatedNorm.length > 0 && (
                            <div
                                ref={relRef}
                                className={`mb-16 fade-in-ready ${relVisible ? "visible" : ""}`}
                            >
                                <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                                    <h2 className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-black text-gray-900">
                                        Materi Lainnya
                                    </h2>
                                    <Link
                                        href="/material"
                                        className="flex items-center gap-1 text-[13px] font-bold text-blue-600 no-underline"
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

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {relatedNorm.map((mat, i) => (
                                        <MaterialCard
                                            key={mat.id}
                                            {...mat}
                                            delay={i * 0.1}
                                            onSelect={() =>
                                                router.visit(
                                                    `/material/${mat.id}`,
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
