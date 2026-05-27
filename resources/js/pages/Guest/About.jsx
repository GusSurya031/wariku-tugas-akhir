import { useState } from "react";
import { Head } from "@inertiajs/react";
// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ItemFadeIn from "@/components/ItemFadeIn";
import TechCard from "@/components/TechCard";
import FAQItem from "@/components/FAQItem";
import { FAQS, TECH_CARDS } from "@/constants/Material";
// Assets
import LineHero from "@/assets/icon/LineHero";
import IlustrasiKiri from "@/assets/images/ilustrasi-kiri.png";
import IlustrasiKanan from "@/assets/images/ilustrasi-kanan.png";
import HeroAbout from "@/assets/images/hero_about.png";
import Ellipse from "@/assets/icon/Ellipse";

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>Wariku - About</title>
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
                        <div
                            className="pointer-events-none absolute inset-0 hidden bg-right bg-no-repeat md:block md:bg-size-[80%] lg:bg-contain"
                            style={{ backgroundImage: `url(${HeroAbout})` }}
                        />
                        <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                            <div className="relative mb-14 flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-20">
                                <ItemFadeIn
                                    direction="left"
                                    className="z-10 md:w-6/12"
                                >
                                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 px-4 shadow-sm">
                                        <span className="text-sm">🏫</span>
                                        <span className="text-xs font-bold text-amber-600">
                                            Tentang Wariku
                                        </span>
                                    </div>

                                    <h1 className="mb-2 font-serif text-4xl leading-snug md:text-5xl lg:text-6xl">
                                        Tentang Sistem{" "}
                                        <span className="relative inline-block">
                                            Pembelajaran ini
                                            <Ellipse className="absolute -bottom-2 left-0 -z-10 w-3/4" />
                                        </span>
                                    </h1>

                                    <p className="text-base leading-relaxed text-gray-500 md:text-lg">
                                        Sistem ini dikembangkan untuk membantu
                                        siswa belajar melalui analisis kemampuan
                                        belajar dan pendekatan berbasis Wariga
                                        Bali.
                                    </p>
                                </ItemFadeIn>
                            </div>
                        </div>
                    </section>
                </section>

                {/* ══ FEATURE 1 ═══════════════════════════════════ */}
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
                            <ItemFadeIn
                                direction="left"
                                className="flex justify-center md:w-1/2"
                            >
                                <img src={IlustrasiKiri} alt="" />
                            </ItemFadeIn>

                            <ItemFadeIn
                                direction="right"
                                delay={0.2}
                                className="md:w-1/2"
                            >
                                <h2 className="mb-4 font-serif text-3xl leading-tight text-gray-900 md:text-4xl">
                                    Kenalan dulu dengan Sistem Wariku
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                                    Sistem ini juga mengintegrasikan pendekatan
                                    berbasis Wariga Bali untuk memahami
                                    preferensi belajar siswa. Dengan
                                    menggabungkan teknologi dan kearifan lokal,
                                    sistem ini diharapkan mampu memberikan
                                    pengalaman belajar yang lebih personal dan
                                    efektif.
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                                    <p className="text-sm text-gray-500 md:text-base">
                                        Materi disesuaikan dengan karakteristik
                                        belajarmu secara otomatis
                                    </p>
                                </div>
                                <div className="mt-3 flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                                    <p className="text-sm text-gray-500 md:text-base">
                                        Pendekatan holistik berbasis kearifan
                                        lokal Bali
                                    </p>
                                </div>
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>

                {/* ══ FEATURE 2 ═══════════════════════════════════ */}
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="max-w-360 mx-auto px-6 sm:px-8 lg:px-16">
                        <div className="flex flex-col-reverse items-center gap-12 md:flex-row md:gap-20">
                            <ItemFadeIn
                                direction="right"
                                delay={0.2}
                                className="md:w-1/2"
                            >
                                <h2 className="mb-4 font-serif text-3xl leading-tight text-gray-900 md:text-4xl">
                                    Pengembangan Sistem yang Adaptif
                                </h2>
                                <p className="text-sm leading-relaxed text-gray-500 md:text-base">
                                    Menggabungkan analisis data, kecerdasan
                                    buatan, dan pendekatan budaya lokal, sistem
                                    ini bertujuan untuk meningkatkan efektivitas
                                    belajar serta membantu siswa memahami materi
                                    dengan cara yang lebih sesuai dengan
                                    dirinya.
                                </p>
                                <div className="mt-6 flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />
                                    <p className="text-sm text-gray-500 md:text-base">
                                        Analisis real-time berdasarkan performa
                                        latihan kamu
                                    </p>
                                </div>
                                <div className="mt-3 flex gap-3">
                                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                                    <p className="text-sm text-gray-500 md:text-base">
                                        Rekomendasi cerdas untuk materi
                                        selanjutnya
                                    </p>
                                </div>
                            </ItemFadeIn>

                            <ItemFadeIn
                                direction="left"
                                className="flex justify-center md:w-1/2"
                            >
                                <img src={IlustrasiKanan} alt="" />
                            </ItemFadeIn>
                        </div>
                    </div>
                </section>

                {/* ══ PEMANFAATAN TEKNOLOGI ════════════════════════ */}
                <section className="bg-[#F5F3F0] px-6 py-18">
                    <div className="mx-auto max-w-6xl">
                        <ItemFadeIn
                            direction="up"
                            className="mb-18 text-center"
                        >
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                                <span className="text-[13px]">⚙️</span>
                                <span className="text-xs font-bold text-violet-600">
                                    Teknologi Kami
                                </span>
                            </div>

                            <h2 className="mb-3 font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-gray-900">
                                Pemanfaatan Teknologi
                            </h2>

                            <p className="mx-auto max-w-110 text-sm leading-[1.7] text-gray-500">
                                Mengkombinasikan algoritma berikut untuk bisa
                                memberikan analisis yang sesuai dengan kemampuan
                                siswa
                            </p>
                        </ItemFadeIn>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {TECH_CARDS.map((card, i) => (
                                <TechCard key={i} card={card} index={i} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══ FAQ ═══════════════════════════════════════════ */}
                <section id="faq" className="mx-auto max-w-6xl px-6 py-18">
                    <ItemFadeIn direction="up" className="mb-12 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                            <span className="text-[13px]">💬</span>
                            <span className="text-xs font-bold text-amber-600">
                                Bantuan
                            </span>
                        </div>

                        <h2 className="mb-2.5 text-[clamp(2rem,4vw,2.8rem)] font-black text-gray-900">
                            FAQ
                        </h2>

                        <p className="text-sm text-gray-500">
                            Pertanyaan yang sering ditanyakan
                        </p>
                    </ItemFadeIn>

                    <div className="mx-auto flex max-w-180 flex-col gap-3">
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
            </main>
            <Footer />
        </>
    );
}
