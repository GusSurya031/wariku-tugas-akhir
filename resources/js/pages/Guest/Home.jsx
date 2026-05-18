import { useState, useEffect, useRef } from "react";
import { Link, Head } from "@inertiajs/react";
import "@/../css/app.css";
// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemFadeIn from "@/components/ItemFadeIn";
// assets
import Logo from "@/assets/icon/logo.svg";
import VectorCircle from "@/assets/icon/VectorCircle";
import VectorBlub from "@/assets/icon/VectorBlub";
import VectorDot from "@/assets/icon/VectorDot";
import AssetsIconKiri from "@/assets/icon/AssetsIconKiri";
import AssetsIconKanan from "@/assets/icon/AssetsIconKanan";
import LineHero from "@/assets/icon/LineHero";
import LineElement from "@/assets/icon/LineElement";
import LineElement2 from "@/assets/icon/LineElement2";
// images
import IconAdaptive from "@/assets/images/adaptation.png";
import IconBali from "@/assets/images/bali.png";
import IconAnalysis from "@/assets/images/circuit.png";
import IlustrasiKiri from "@/assets/images/ilustrasi-kiri.png";
import IlustrasiKanan from "@/assets/images/ilustrasi-kanan.png";
import Education from "@/assets/images/education.png";
import IconBook1 from "@/assets/images/icon-book-1.png";
import IconBook2 from "@/assets/images/icon-book-2.png";
import AssetCards1 from "@/assets/images/asset-card-1.png";
import AssetCards2 from "@/assets/images/asset-card-2.png";
import AssetCards3 from "@/assets/images/asset-card-3.png";
import AssetCards4 from "@/assets/images/asset-card-4.png";

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

const features = [
    {
        number: "01",
        title: "Materi Adaptif",
        description:
            "Materi yang ditampilkan di sistem akan disesuaikan dengan performa kamu agar lebih adaptif",
        imageSrc: AssetCards1,
        imageAlt: "Materi Adaptif Preview",
        colspan: true,
        lgColspan: "lg:col-span-1",
    },
    {
        number: "02",
        title: "Budaya Lokal Bali",
        description:
            "Pendekatan holistik berbasis kearifan lokal Bali khususnya mengenai Wariga pada komponen wewaran",
        imageSrc: AssetCards2,
        imageAlt: "Budaya Lokal Bali Preview",
        colspan: true,
        lgColspan: "lg:col-span-2",
    },
    {
        number: "03",
        title: "Analisis Performa",
        description:
            "Setiap latihan yang kamu kerjakan dianalisis berdasarkan tingkat ketepatan dan waktu pengerjaan untuk dapat menentukan tingkat pemahamanmu",
        imageSrc: AssetCards3,
        imageAlt: "Analisis Performa Preview",
        colspan: true,
        lgColspan: "lg:col-span-2",
    },
    {
        number: "04",
        title: "Rekomendasi Cerdas",
        description:
            "Rekomendasi materi yang sesuai dari hasil performa kamu agar kamu masih bisa tetap belajar",
        imageSrc: AssetCards4,
        imageAlt: "Rekomendasi Cerdas Preview",
        colspan: true,
        lgColspan: "lg:col-span-1",
    },
];

// ── Main Component ────────────────────────────────────────────────
export default function Home() {
    return (
        <>
            <Head>
                <title>Wariku - LMS Adaptif Berbasis Wariga</title>
                <meta
                    name="description"
                    content="Wariku membantu siswa belajar matematika secara adaptif berdasarkan pendekatan Wariga, mood, dan performa belajar."
                />
            </Head>
            <Navbar />
            <main className="min-h-screen font-sans text-gray-800 overflow-x-hidden ">
                <LineHero className="absolute inset-0 h-full w-full pointer-events-none opacity-70" />
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
                                    className="hidden md:flex float-anim absolute md:-left-40 lg:-left-25"
                                >
                                    <AssetsIconKiri />
                                </ItemFadeIn>

                                {/* Headline */}
                                <div className="flex-1 max-w-3xl relative z-10 font-serif gap-12">
                                    <ItemFadeIn delay={0.1}>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-snug text-gray-900 mb-4">
                                            Belajar Lebih{" "}
                                            <span className="text-yellow-400 font-handwriting text-5xl md:text-6xl lg:text-7xl font-extralight relative">
                                                Cerdas
                                                <LineElement className="absolute -bottom-2 left-0 w-full" />
                                            </span>
                                            <br />
                                            <span className="font-handwriting text-blue-500 text-5xl md:text-6xl lg:text-7xl italic font-extralight relative">
                                                Sesuai
                                                <LineElement2 className="absolute -bottom-2 left-0 w-full" />
                                            </span>{" "}
                                            Dengan Dirimu
                                        </h1>
                                    </ItemFadeIn>
                                    <ItemFadeIn delay={0.25}>
                                        <p className="text-gray-500 text-base md:text-lg leading-relaxed my-6 max-w-lg md:max-w-2xl mx-auto font-sans font-medium">
                                            Sistem pembelajaran adaptif yang
                                            menggabungkan analisis kemampuan
                                            belajar dengan interpretasi Wariga
                                            Bali
                                        </p>
                                    </ItemFadeIn>
                                    <ItemFadeIn delay={0.35}>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center font-sans">
                                            <Link
                                                href="/login"
                                                className="btn-primary px-7 py-3 rounded-full font-semibold text-white text-sm shadow-lg"
                                            >
                                                Mulai Belajar
                                            </Link>
                                            <a
                                                href="#detail"
                                                className="btn-outline px-7 py-3 rounded-full font-semibold text-sm text-gray-700"
                                            >
                                                Lihat Selengkapnya
                                            </a>
                                        </div>
                                    </ItemFadeIn>
                                </div>

                                {/* Right illustration */}
                                <ItemFadeIn
                                    direction="right"
                                    delay={0.2}
                                    className="hidden md:flex float-anim-slow absolute md:-right-40 lg:-right-30"
                                >
                                    <AssetsIconKanan />
                                </ItemFadeIn>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════ WHY SECTION ══ */}
                <section className="py-16 md:py-24 bg-white ">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-20 md:justify-between mb-6 md:mb-14">
                            <ItemFadeIn direction="left" className="md:w-5/12">
                                <h2
                                    id="detail"
                                    className="text-3xl md:text-4xl text-gray-900 leading-tight font-serif scroll-mt-16 md:scroll-mt-36"
                                >
                                    Kenapa Sistem <br /> Ini Berbeda?
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
                                    analisis kemampuan siswa dan pendekatan
                                    berbasis karakter.
                                </p>
                            </ItemFadeIn>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
                            {cardItems.map((card, i) => (
                                <ItemFadeIn key={i} delay={i * 0.15}>
                                    <div
                                        className={`card-hover h-full rounded-2xl p-6 shadow-md border ${card.active ? "feature-card-active border-yellow-400" : "bg-white border-gray-100"}`}
                                    >
                                        <div
                                            className={`mb-4  p-3 rounded-full w-max ${card.active ? "bg-white" : "bg-primary-purple"}`}
                                        >
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

                {/* ══════════════════════════════════════════ FEATURE CARDS ══ */}
                <section className="py-16 md:py-24 bg-white ">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col md:flex-row gap-4 md:gap-20 md:justify-between mb-6 md:mb-14">
                            <ItemFadeIn direction="left" className="md:w-5/12">
                                <h2
                                    id="detail"
                                    className="text-3xl md:text-4xl text-gray-900 leading-tight font-serif scroll-mt-16 md:scroll-mt-36"
                                >
                                    Belajar Sesuai Gaya <br /> dan Preferensimu
                                </h2>
                            </ItemFadeIn>
                            <ItemFadeIn
                                direction="right"
                                delay={0.15}
                                className="md:w-6/12"
                            >
                                <p className="text-gray-500 leading-relaxed text-sm md:text-lg text-justify">
                                    Sistem memahami preferensi belajarmu melalui
                                    pendekatan{" "}
                                    <strong className="text-gray-800">
                                        Wariga Bali,
                                    </strong>{" "}
                                    sehingga materi dapat disajikan dalam bentuk
                                    yang lebih mudah kamu pahami, baik visual,
                                    numerik, maupun naratif.
                                </p>
                            </ItemFadeIn>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, idx) => (
                                <ItemFadeIn
                                    key={idx}
                                    delay={idx * 0.15}
                                    className={`${feature.colspan === true ? feature.lgColspan : ""}`}
                                >
                                    <div className="bg-white h-full rounded-2xl p-6 flex flex-col gap-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                        {/* Card Header */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-800 shrink-0">
                                                <span className="text-sm font-semibold text-gray-800 leading-none">
                                                    {feature.number}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold leading-tight">
                                                {feature.title}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed text-justify">
                                            {feature.description}
                                        </p>

                                        {/* Image Preview Area */}
                                        <div className="w-full rounded-xl overflow-hidden bg-gray-50 min-h-40 flex items-center justify-center">
                                            <img
                                                id={`feature-image-${idx}`}
                                                src={feature.imageSrc}
                                                alt={feature.imageAlt}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </ItemFadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════ QUOTE ══ */}
                <section className="py-16 md:py-20 relative overflow-hidden bg-[#F4F3F0]">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16 text-center relative z-10">
                        <VectorBlub className="absolute -top-10 -left-10 w-32 opacity-50 -z-10 " />
                        <VectorCircle className="absolute -bottom-10 -right-10 w-48 opacity-50 -z-10 " />
                        <VectorDot className="absolute -top-18 left-1/2 transform -z-10 " />
                        <ItemFadeIn>
                            <p className="text-black text-md md:text-2xl font-semibold leading-relaxed">
                                " Sistem memahami preferensi belajarmu melalui
                                pendekatan Wariga Bali, sehingga materi dapat
                                disajikan dalam bentuk yang lebih mudah kamu
                                pahami, baik visual, numerik, maupun naratif. "
                            </p>
                        </ItemFadeIn>
                    </div>
                </section>

                {/* ══════════════════════════════════════════ CTA BANNER ══ */}
                <section className="py-16 md:py-20 ">
                    <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-16 bg-linear-to-r from-[#274F8E] to-[#4388F4] md:rounded-2xl shadow-lg">
                        <div className="grid grid-cols-2 relative min-h-56 md:min-h-96">
                            <ItemFadeIn
                                direction="left"
                                className="hidden md:block md:absolute md:-left-30 lg:left-0 lg:-top-10"
                            >
                                <img
                                    id="education-illustration"
                                    src={Education}
                                    alt="Education"
                                    className="md:w-3/4 lg:w-full"
                                />
                            </ItemFadeIn>
                            <ItemFadeIn
                                direction="right"
                                delay={0.2}
                                className="self-center col-span-2 text-white relative z-10 text-center md:text-right"
                            >
                                <h2 className="text-2xl md:text-4xl text-white leading-tight mb-3 font-serif">
                                    Mulai Perjalanan
                                    <br />
                                    Belajarmu Sekarang
                                </h2>
                                <p className="text-white text-sm md:text-base mb-6 md:min-w-md">
                                    Kenali bagaimana sistem ini bekerja untuk{" "}
                                    <br />
                                    mendukung proses belajarmu.
                                </p>
                                <Link
                                    href="/login"
                                    className="text-sm md:text-base inline-block px-8 py-3 bg-white text-primary-blue font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200"
                                >
                                    Mulai Sekarang
                                </Link>
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════ BOTTOM CARDS ══ */}
                <section className="py-16 md:py-20 bg-white">
                    <div className="max-w-360 mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Lihat Materi */}
                            <ItemFadeIn direction="left">
                                <div className="w-full card-hover bg-[#FFD25D] border border-gray-100 rounded-2xl p-8 lg:p-16 shadow-md">
                                    <div className="w-16 h-16 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center mb-4">
                                        <img
                                            src={IconBook1}
                                            alt="Lihat Materi"
                                            className="w-1/2 md:w-2/3"
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl text-gray-900 mb-2 font-serif">
                                        Lihat Materi
                                    </h3>
                                    <p className="text-gray-900 text-sm md:text-base mb-6">
                                        Eksplorasi materi pembelajaran sesuai
                                        kebutuhanmu.
                                    </p>
                                    <Link
                                        href="/material"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 border-b-2 border-white pb-0.5 hover:border-yellow-500 transition-colors"
                                    >
                                        Lihat Selengkapnya
                                        <span className="text-white">↗</span>
                                    </Link>
                                </div>
                            </ItemFadeIn>

                            {/* Coba Latihan */}
                            <ItemFadeIn direction="right" delay={0.1}>
                                <div className="w-full card-hover bg-[#F8F7F2] rounded-2xl p-8 lg:p-16 shadow-md">
                                    <div className="w-16 h-16 md:w-18 md:h-18 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                                        <img
                                            src={IconBook2}
                                            alt="Coba Latihan"
                                            className="w-1/2 md:w-2/3"
                                        />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl text-gray-900 mb-2 font-serif">
                                        Coba Latihan
                                    </h3>
                                    <p className="text-gray-900 text-sm md:text-base mb-6">
                                        Mulai latihan dan temukan tingkat
                                        pemahamanmu saat ini.
                                    </p>
                                    <Link
                                        href="/exercise"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-500 border-b-2 border-blue-300 pb-0.5 hover:border-white transition-colors"
                                    >
                                        Lihat Selengkapnya
                                        <span>↗</span>
                                    </Link>
                                </div>
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
