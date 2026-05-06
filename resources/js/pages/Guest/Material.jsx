import { useState, useEffect, useRef } from "react";
// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemFadeIn from "@/components/ItemFadeIn";
import MaterialCard from "@/components/CardMaterial";
import { useInView } from "@/components/useInView";
// assets
import "@/../css/app.css";
import HeroMaterial from "@/assets/images/hero-material.png";
import QuoteMaterial from "@/assets/images/quotes-material.png";
import MathThumbnailImg from "@/assets/images/thumbnail-card.png";

// ─────────────────────────────────────────────
//  DATA: Materials list
// ─────────────────────────────────────────────
const CATEGORIES = ["Semua", "Dasar", "Menengah", "Lanjut"];

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
                        <ItemFadeIn direction="left" className="md:w-5/12 z-10">
                            <div
                                ref={heroRef}
                                className="max-w-[480px]"
                                style={{
                                    opacity: heroVisible ? 1 : 0,
                                    transform: heroVisible
                                        ? "none"
                                        : "translateX(-32px)",
                                    transition:
                                        "opacity 0.7s ease, transform 0.7s ease",
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
                                    style={{
                                        fontSize: "clamp(2rem, 5vw, 3rem)",
                                    }}
                                >
                                    Jelajahi Materi{" "}
                                    <span
                                        className="text-amber-400 inline-block relative"
                                        style={{
                                            fontFamily: "'Caveat', cursive",
                                            fontSize:
                                                "clamp(2.2rem, 5.5vw, 3.4rem)",
                                        }}
                                    >
                                        Pembelajaran
                                        <svg
                                            className="absolute -bottom-1 left-0 w-full"
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
                                    Temukan berbagai materi matematika dasar
                                    yang dirancang secara bertahap sesuai
                                    tingkat pemahaman kamu
                                </p>
                            </div>
                        </ItemFadeIn>

                        <ItemFadeIn direction="right" delay={0.15} className="absolute right-0 -bottom-20">
                            <img src={HeroMaterial} alt="Hero Material" className="w-lg" />
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
                            Mulai dari konsep dasar hingga tingkat lanjut,
                            setiap materi disusun untuk membantu kamu belajar
                            secara bertahap dan terarah.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-[10px] justify-center mb-10">
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
                                // onSelect={() => console.log("Selected:", mat.title)}
                            />
                        ))}
                    </div>

                    {/* Load more */}
                    {hasMore && (
                        <div className="text-center mt-12">
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

            {/* ══ CTA BANNER ════════════════════════════════ */}
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
                                "Belajar bukan tentang seberapa cepat kamu
                                memahami, tetapi tentang seberapa konsisten kamu
                                mencoba."
                            </h2>
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
