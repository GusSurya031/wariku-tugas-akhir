import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ItemFadeIn from "@/components/ItemFadeIn";
import LineElement from "@/assets/icon/line-element.svg";
import LineElement2 from "@/assets/icon/line-element2.svg";
import "@/../css/app.css";
import { Link } from "@inertiajs/react";
import IconAdaptive from "@/assets/images/adaptation.png";
import IconBali from "@/assets/images/bali.png";
import IconAnalysis from "@/assets/images/circuit.png";
import IlustrasiKiri from "@/assets/images/ilustrasi-kiri.png";
import IlustrasiKanan from "@/assets/images/ilustrasi-kanan.png";
import VectorLine from "@/assets/icon/vector-line.svg";
import VectorBlub from "@/assets/icon/vector-blub.svg";
import VectorDot from "@/assets/icon/vector-dot.svg";
import Education from "@/assets/images/education.png";
import IconBook1 from "@/assets/images/icon-book-1.png";
import IconBook2 from "@/assets/images/icon-book-2.png";
import Logo from "@/assets/icon/logo.svg";

const cardItems = [
    {
        icon: IconAdaptive,
        title: "Pembelajaran Adaptif",
        desc: "Materi disesuaikan secara otomatis berdasarkan tingkat pemahaman dan performa belajar kamu.",
        active: false,
    },
    {
        icon: IconBali,
        title: "Berbasis Wariga Bali",
        desc: "Menggunakan interpretasi Wariga untuk memahami preferensi belajar secara lebih personal.",
        active: true,
    },
    {
        icon: IconAnalysis,
        title: "Analisis Cerdas",
        desc: "Menggabungkan penilaian untuk memahami kemampuan kamu secara menyeluruh.",
        active: false,
    },
];

// ── Inline SVG Icons ──────────────────────────────────────────────

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
        <circle
            cx="12"
            cy="12"
            r="4"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
);

const TwitterIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
);

// ── Decorative 3D-style Illustrations (CSS-based) ─────────────────
const HeroIllustrationLeft = () => (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Calculator */}
        <div className="absolute top-8 left-4 w-20 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-xl transform -rotate-12 flex flex-col items-center justify-center">
            <div className="text-white text-xs font-bold mb-1">TAX</div>
            <div className="grid grid-cols-3 gap-1 p-2">
                {[...Array(9)].map((_, i) => (
                    <div
                        key={i}
                        className="w-3 h-2 bg-blue-200 rounded-sm opacity-80"
                    />
                ))}
            </div>
        </div>
        {/* Pencil */}
        <div className="absolute top-2 right-8 w-4 h-20 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-t-full shadow-lg transform rotate-45">
            <div className="absolute bottom-0 w-full h-4 bg-pink-300 rounded-b" />
        </div>
        {/* Magnifier */}
        <div className="absolute bottom-4 left-12 w-14 h-14">
            <div className="w-10 h-10 border-4 border-red-400 rounded-full bg-red-100 opacity-80" />
            <div className="absolute bottom-0 right-0 w-1.5 h-6 bg-red-400 rounded-full transform rotate-45" />
        </div>
    </div>
);

const HeroIllustrationRight = () => (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
        {/* Abacus */}
        <div className="absolute top-4 right-0 w-24 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-xl transform rotate-6 p-2">
            <div className="text-amber-800 text-xs font-bold mb-1 text-center">
                ABACUS
            </div>
            {[...Array(4)].map((_, row) => (
                <div key={row} className="flex items-center gap-1 mb-1">
                    <div className="w-1 h-3 bg-amber-600 rounded" />
                    {[...Array(5)].map((_, col) => (
                        <div
                            key={col}
                            className={`w-3 h-3 rounded-full ${col < 3 ? "bg-amber-500" : "bg-amber-300"} shadow-sm`}
                        />
                    ))}
                    <div className="w-1 h-3 bg-amber-600 rounded" />
                </div>
            ))}
        </div>
        {/* Coins */}
        <div className="absolute bottom-8 right-4 flex gap-1">
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg flex items-center justify-center text-yellow-700 text-xs font-bold`}
                    style={{ transform: `rotate(${i * 15}deg)` }}
                >
                    $
                </div>
            ))}
        </div>
        {/* Colorful pencils */}
        <div className="absolute top-0 left-2 flex gap-1 transform -rotate-12">
            {["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400"].map(
                (c, i) => (
                    <div
                        key={i}
                        className={`w-2 h-14 ${c} rounded-t-full shadow`}
                    />
                ),
            )}
        </div>
    </div>
);


// ── Main Component ────────────────────────────────────────────────
export default function Home() {
    return (
        <div className="min-h-screen font-sans text-gray-800 overflow-x-hidden">
            <Navbar />

            {/* ══════════════════════════════════════════ HERO ══ */}
            <section className="hero-bg min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center relative">
                        {/* Badge */}
                        <ItemFadeIn>
                            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full shadow-sm/5 mb-6 pr-4">
                                <span className="bg-[#F37EBE] text-white text-xs font-bold px-4 py-2 rounded-full">
                                    Smart
                                </span>
                                <span className="text-gray-600 text-sm font-bold">
                                    Learning Systems
                                </span>
                            </div>
                        </ItemFadeIn>

                        {/* Illustrations — shown beside headline on md+ */}
                        <div className="w-full flex relative items-center justify-center gap-8">
                            {/* Left illustration */}
                            <ItemFadeIn
                                direction="left"
                                delay={0.2}
                                className="hidden md:flex float-anim absolute left-0"
                            >
                                <HeroIllustrationLeft />
                            </ItemFadeIn>

                            {/* Headline */}
                            <div className="flex-1 max-w-3xl relative z-10 font-serif gap-8">
                                <ItemFadeIn delay={0.1}>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-snug text-gray-900 mb-4">
                                        Belajar Lebih{" "}
                                        <span className="text-yellow-400 font-handwriting text-5xl md:text-6xl lg:text-7xl font-extralight relative">
                                            Cerdas
                                            <img
                                                src={LineElement}
                                                alt="Line Element"
                                                className="absolute -bottom-2 left-0 w-full"
                                            />
                                        </span>
                                        <br />
                                        <span className="font-handwriting text-blue-500 text-5xl md:text-6xl lg:text-7xl italic font-extralight relative">
                                            Sesuai
                                            <img
                                                src={LineElement2}
                                                alt="Line Element"
                                                className="absolute -bottom-2 left-0 w-full"
                                            />
                                        </span>{" "}
                                        Dengan Dirimu
                                    </h1>
                                </ItemFadeIn>
                                <ItemFadeIn delay={0.25}>
                                    <p className="text-gray-500 text-base md:text-lg leading-relaxed my-6 max-w-lg md:max-w-2xl mx-auto font-sans font-medium">
                                        Sistem pembelajaran adaptif yang
                                        menggabungkan analisis kemampuan belajar
                                        dengan interpretasi Wariga Bali
                                    </p>
                                </ItemFadeIn>
                                <ItemFadeIn delay={0.35}>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center font-sans">
                                        <Link
                                            href="/"
                                            className="btn-primary px-7 py-3 rounded-full font-semibold text-white text-sm shadow-lg"
                                        >
                                            Mulai Belajar
                                        </Link>
                                        <Link
                                            href="#"
                                            className="btn-outline px-7 py-3 rounded-full font-semibold text-sm text-gray-700"
                                        >
                                            Lihat Selengkapnya
                                        </Link>
                                    </div>
                                </ItemFadeIn>
                            </div>

                            {/* Right illustration */}
                            <ItemFadeIn
                                direction="right"
                                delay={0.2}
                                className="hidden md:flex float-anim-slow absolute right-0"
                            >
                                <HeroIllustrationRight />
                            </ItemFadeIn>
                        </div>

                        {/* Mobile illustrations */}
                        <div className="flex md:hidden justify-center gap-8 mt-6">
                            <div className="float-anim">
                                <HeroIllustrationLeft />
                            </div>
                            <div className="float-anim-slow">
                                <HeroIllustrationRight />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ WHY SECTION ══ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between mb-14">
                        <ItemFadeIn direction="left" className="md:w-5/12">
                            <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-serif">
                                Kenapa Sistem <br/> Ini Berbeda?
                            </h2>
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="right"
                            delay={0.15}
                            className="md:w-6/12"
                        >
                            <p className="text-gray-500 leading-relaxed text-sm md:text-lg text-justify">
                                Sistem ini dirancang untuk memberikan{" "}
                                <strong className="text-gray-800">
                                    pengalaman belajar
                                </strong>{" "}
                                yang lebih personal dengan menggabungkan
                                analisis kemampuan siswa dan pendekatan berbasis
                                karakter.
                            </p>
                        </ItemFadeIn>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                        {cardItems.map((card, i) => (
                            <ItemFadeIn key={i} delay={i * 0.15}>
                                <div
                                    className={`card-hover h-full rounded-2xl p-6 shadow-md border ${card.active ? "feature-card-active border-yellow-400" : "bg-white border-gray-100"}`}
                                >
                                    <div className={`mb-4  p-3 rounded-full w-max ${card.active ?"bg-white" : "bg-[#311445]"}`}>
                                        <img src={card.icon} alt="" />
                                    </div>
                                    <h3
                                        className={`font-bold text-lg mb-2 ${card.active ? "text-white" : "text-gray-800"}`}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className={`text-sm md:text-base leading-relaxed ${card.active ? "text-yellow-50" : "text-gray-500"}`}
                                    >
                                        {card.desc}
                                    </p>
                                </div>
                            </ItemFadeIn>
                        ))}
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


            {/* ══════════════════════════════════════════ QUOTE ══ */}
            <section className="py-16 md:py-20 relative overflow-hidden bg-[#F4F3F0]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <img src={VectorDot} alt="" className="absolute -top-18 left-1/2 transform" />
                    <img src={VectorLine} alt="" className="absolute -left-50 transform" />
                    <img src={VectorBlub} alt="" className="absolute top-1/2 -right-50 transform" />
                    <ItemFadeIn>
                        <p className="text-black text-lg md:text-2xl font-semibold leading-relaxed">
                            " Sistem memahami preferensi belajarmu melalui
                            pendekatan Wariga Bali,
                            sehingga materi dapat disajikan dalam bentuk yang
                            lebih mudah kamu
                            pahami, baik visual, numerik, maupun naratif. "
                        </p>
                    </ItemFadeIn>
                </div>
            </section>

            {/* ══════════════════════════════════════════ CTA BANNER ══ */}
            <section className="py-12 md:py-16">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 bg-linear-to-r from-[#274F8E] to-[#4388F4] md:rounded-2xl shadow-lg">
                    <div className="flex justify-end relative min-h-56 md:min-h-96">
                        <ItemFadeIn
                            direction="left"
                            className="hidden lg:block lg:absolute left-0 -top-10"
                        >
                            <img src={Education} alt="Education" />
                        </ItemFadeIn>
                        <ItemFadeIn
                            direction="right"
                            delay={0.2}
                            className="relative self-center text-center md:text-left md:min-w-2xl"
                        >
                            <h2 className="text-2xl md:text-4xl text-white leading-tight mb-3 font-serif">
                                Mulai Perjalanan
                                <br />
                                Belajarmu Sekarang
                            </h2>
                            <p className="text-blue-200 text-sm md:text-base mb-6 md:min-w-md">
                                Kenali bagaimana sistem ini bekerja untuk
                                mendukung proses belajarmu.
                            </p>
                            <Link
                                href="#"
                                className="text-sm md:text-base inline-block px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200"
                            >
                                Mulai Sekarang
                            </Link>
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ BOTTOM CARDS ══ */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Lihat Materi */}
                        <ItemFadeIn direction="left">
                            <div className="card-hover bg-[#FFD25D] border border-gray-100 rounded-2xl p-8 md:p-16 shadow-md">
                                <div className="w-16 h-16 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center mb-4">
                                    <img src={IconBook1} alt="Lihat Materi" className="w-1/2 md:w-2/3" />
                                </div>
                                <h3 className="text-2xl md:text-4xl text-gray-900 mb-2 font-serif">
                                    Lihat Materi
                                </h3>
                                <p className="text-gray-900 text-sm md:text-base mb-6">
                                    Eksplorasi materi pembelajaran sesuai
                                    kebutuhanmu.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 border-b-2 border-white pb-0.5 hover:border-yellow-500 transition-colors"
                                >
                                    Lihat Selengkapnya
                                    <span className="text-white">↗</span>
                                </a>
                            </div>
                        </ItemFadeIn>

                        {/* Coba Latihan */}
                        <ItemFadeIn direction="right" delay={0.1}>
                            <div className="card-hover bg-[#F8F7F2] rounded-2xl p-8 md:p-16 shadow-md">
                                <div className="w-16 h-16 md:w-18 md:h-18 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                                    <img src={IconBook2} alt="Coba Latihan" className="w-1/2 md:w-2/3" />
                                </div>
                                <h3 className="text-2xl md:text-4xl text-gray-900 mb-2 font-serif">
                                    Coba Latihan
                                </h3>
                                <p className="text-gray-900 text-sm md:text-base mb-6">
                                    Mulai latihan dan temukan tingkat
                                    pemahamanmu saat ini.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 border-b-2 border-blue-300 pb-0.5 hover:border-white transition-colors"
                                >
                                    Lihat Selengkapnya
                                    <span>↗</span>
                                </a>
                            </div>
                        </ItemFadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ FOOTER ══ */}
            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between gap-10">
                        {/* Logo + copyright */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <img src={Logo} alt="Logo" className="w-24 md:w-32"/>
                            </div>
                            <p className="text-gray-400 text-xs mt-6">
                                © 2026 Wariku. All rights reserved.
                            </p>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                            <div>
                                {["Home", "Material", "About", "Contact"].map(
                                    (l) => (
                                        <a
                                            key={l}
                                            href="#"
                                            className="block text-gray-500 text-sm hover:text-gray-800 mb-2 transition-colors"
                                        >
                                            {l}
                                        </a>
                                    ),
                                )}
                            </div>
                            <div>
                                {["Media", "News", "Support Us"].map((l) => (
                                    <a
                                        key={l}
                                        href="#"
                                        className="block text-gray-500 text-sm hover:text-gray-800 mb-2 transition-colors"
                                    >
                                        {l}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Social */}
                        <div className="flex items-start gap-3">
                            {[
                                { icon: <InstagramIcon />, label: "Instagram" },
                                { icon: <FacebookIcon />, label: "Facebook" },
                                { icon: <TwitterIcon />, label: "Twitter" },
                            ].map(({ icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    className="w-10 h-10 bg-gray-100 hover:bg-yellow-400 hover:text-white text-gray-500 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
