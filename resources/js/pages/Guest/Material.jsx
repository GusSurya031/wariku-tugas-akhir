import { useState, useEffect, useRef } from "react";
import { router, Head } from "@inertiajs/react";
// compponents
import useInView from "@/components/useInView";
import Navbar from "@/components/Navbar";
import LineHero from "@/assets/icon/LineHero";
import Footer from "@/components/Footer";
import MaterialCard from "@/components/MaterialCard";
import { CATEGORIES, TOPIC_COLOR, TOPIC_LABEL } from "@/constants/Material";
// Assets
import "@/../css/app.css";
import Ellipse from "@/assets/icon/Ellipse";
import ItemFadeIn from "@/components/ItemFadeIn";
import HeroMaterial from "@/assets/images/hero_material.png";
import QuoteMaterial from "@/assets/images/quotes-material.png";
import ThumbnailCard from "@/assets/images/thumbnail_card.png";

export default function MaterialPage({ materials = [] }) {
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [visibleCount, setVisibleCount] = useState(6);
    const [heroRef, heroVisible] = useInView(0.1);
    const normalised = materials.map((m) => ({
        ...m,
        category: TOPIC_LABEL[m.topic?.toLowerCase()] ?? m.topic,
        categoryColor: TOPIC_COLOR[m.topic?.toLowerCase()] ?? "#D97706",
    }));

    const filtered =
        activeFilter === "Semua"
            ? normalised
            : normalised.filter((m) => m.category === activeFilter);

    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <>
            <Head>
                <title>Wariku - Material</title>
                <meta
                    name="description"
                    content="Wariku membantu siswa belajar matematika secara adaptif berdasarkan pendekatan Wariga, mood, dan performa belajar."
                />
            </Head>
            <Navbar />
            <main className="min-h-screen font-sans text-gray-800 overflow-x-hidden ">
                <LineHero className="absolute inset-0 h-full w-full pointer-events-none opacity-70" />

                {/* ══ HERO ════════════════════════════ */}
                <section className="hero-bg">
                    <section className="relative z-10 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
                        {/* Background */}
                        <div
                            className="hidden md:block absolute inset-0 bg-no-repeat md:bg-size-[80%] lg:bg-contain  bg-right pointer-events-none"
                            style={{
                                backgroundImage: `url(${HeroMaterial})`,
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
                                        <span className="text-sm">📚</span>
                                        <span className="text-xs font-bold text-amber-600">
                                            Materi Pembelajaran
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-snug font-serif mb-2">
                                        Jelajahi Materi{" "}
                                        <span className="inline-block relative">
                                            Pembelajaran
                                            <Ellipse className="absolute -bottom-2 left-0 w-3/4 -z-10" />
                                        </span>
                                    </h1>

                                    <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                                        Temukan berbagai materi matematika dasar
                                        yang dirancang secara bertahap sesuai
                                        tingkat pemahaman kamu
                                    </p>
                                </ItemFadeIn>
                            </div>
                        </div>
                    </section>
                </section>

                {/* ══ MATERIALS GRID ════════════════════════════ */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        {/* Section header */}
                        <div className="text-center mb-10">
                            <h2
                                className="font-black text-gray-900 mb-2.5"
                                style={{
                                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                                }}
                            >
                                Pilih Materi Belajarmu
                            </h2>
                            <p className="text-gray-500 text-sm leading-[1.7] max-w-120 mx-auto">
                                Mulai dari konsep dasar hingga tingkat lanjut,
                                setiap materi disusun untuk membantu kamu
                                belajar secara bertahap dan terarah.
                            </p>
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                                    onClick={() => {
                                        setActiveFilter(cat);
                                        setVisibleCount(6);
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Results count */}
                        <div className="mb-6 text-gray-400 text-[13px] text-center">
                            Menampilkan{" "}
                            <strong className="text-gray-700">
                                {Math.min(visibleCount, filtered.length)}
                            </strong>{" "}
                            dari{" "}
                            <strong className="text-gray-700">
                                {filtered.length}
                            </strong>{" "}
                            materi
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
                            {visible.map((mat, idx) => (
                                <MaterialCard
                                    key={mat.id}
                                    {...mat}
                                    delay={(idx % 3) * 0.1}
                                    onSelect={() =>
                                        router.visit(`/material/${mat.id}`)
                                    }
                                />
                            ))}
                        </div>

                        {/* Load more */}
                        {hasMore && (
                            <div className="text-center mt-12">
                                <button
                                    id="btn-more"
                                    className="btn-outline-dark"
                                    onClick={() =>
                                        setVisibleCount((v) => v + 6)
                                    }
                                >
                                    Lihat Lebih Banyak
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════════════════════════════════════ CTA BANNER ══ */}
                <section className="py-16 md:py-20 ">
                    <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16 bg-linear-to-r from-[#41278E] to-[#6F43F4] md:rounded-2xl shadow-lg">
                        <div className="grid grid-cols-2 relative min-h-56 md:min-h-96">
                            <ItemFadeIn
                                direction="left"
                                className="hidden md:block md:absolute -left-15 -top-20"
                            >
                                <img src={QuoteMaterial} alt="Education" />
                            </ItemFadeIn>
                            <ItemFadeIn
                                direction="right"
                                delay={0.2}
                                className="self-center col-span-2 text-white relative z-10 text-center md:text-right"
                            >
                                <h2 className="text-xl md:text-2xl text-white leading-tight mb-3 font-serif text-center md:text-right">
                                    "Belajar bukan tentang seberapa cepat kamu
                                    memahami, <br /> tetapi tentang seberapa
                                    konsisten kamu mencoba."
                                </h2>
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
