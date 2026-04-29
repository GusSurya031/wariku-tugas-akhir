// import { Link } from "@inertiajs/react";
// import logo from "../../../../public/images/logo.svg";

// export default function Home() {
//     return (
//         <div className="bg-linear-to-b from-[#F8F6F1] to-white">
//             {/* Navbar Dekstop */}
//             <nav className="max-w-360 w-full mx-auto pt-8 ">
//                 <div className="bg-white mx-6 p-6 rounded-4xl flex justify-between items-center shadow-xl/4">
//                     {/* Logo */}
//                     <figure className="max-w-35">
//                         <img src={logo} alt="" className="w-full" />
//                     </figure>
//                     {/* Navigation Link */}
//                     <div className="flex gap-12">
//                         <Link href="/" className="px-4 md:px-6 py-2">
//                             Home
//                         </Link>
//                         <Link href="/" className="px-4 md:px-6 py-2">
//                             Material
//                         </Link>
//                         <Link href="/" className="px-4 md:px-6 py-2">
//                             About
//                         </Link>
//                     </div>
//                     {/* Button Login */}
//                     <div className="flex gap-2">
//                         <Link
//                             href="/"
//                             className="px-4 md:px-6 py-2 bg-[#F6CF46] rounded-full"
//                         >
//                             Login
//                         </Link>
//                         <Link
//                             href="/"
//                             className="px-4 md:px-6 py-2 bg-[#4388F4] rounded-full text-white"
//                         >
//                             Register
//                         </Link>
//                     </div>
//                 </div>
//             </nav>
//             <div className="h-screen">
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//                 <div>
//                     <div></div>
//                     <h1>Belajar Lebih Cerdas Sesuai Dengan Dirimu</h1>
//                     <p>Sistem pembelajaran adaptif yang menggabungkan analisis kemampuan belajar dengan interpretasi Wariga Bali </p>
//                     <div>
//                         <Link></Link>
//                         <Link></Link>
//                     </div>
//                 </div>
//                 <div>
//                     <img src="" alt="" />
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect, useRef } from "react";

// ── Inline SVG Icons ──────────────────────────────────────────────
const Logo = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" stroke="#F5A623" strokeWidth="2" />
        <path d="M8 10 Q14 6 20 10 Q14 14 8 10Z" fill="#F5A623" />
        <path
            d="M8 14 Q14 10 20 14 Q14 18 8 14Z"
            fill="#4A90D9"
            opacity="0.7"
        />
        <path
            d="M8 18 Q14 14 20 18 Q14 22 8 18Z"
            fill="#F5A623"
            opacity="0.5"
        />
    </svg>
);

const BookIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
            x="4"
            y="4"
            width="24"
            height="24"
            rx="3"
            fill="#6C63FF"
            opacity="0.15"
        />
        <path d="M8 8h7v16H8a2 2 0 01-2-2V10a2 2 0 012-2z" fill="#6C63FF" />
        <path
            d="M17 8h7a2 2 0 012 2v12a2 2 0 01-2 2h-7V8z"
            fill="#6C63FF"
            opacity="0.6"
        />
    </svg>
);

const StarIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#F5A623" opacity="0.15" />
        <path
            d="M16 7l2.3 6.3H25l-5.4 3.9 2.1 6.4L16 19.7l-5.7 3.9 2.1-6.4L7 13.3h6.7L16 7z"
            fill="#F5A623"
        />
    </svg>
);

const BrainIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#10B981" opacity="0.15" />
        <path
            d="M12 12c0-2.2 1.8-4 4-4s4 1.8 4 4c2.2 0 4 1.8 4 4s-1.8 4-4 4H12c-2.2 0-4-1.8-4-4s1.8-4 4-4z"
            fill="#10B981"
        />
    </svg>
);

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

const ReadingGirl = () => (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80">
        {/* Books stack */}
        <div className="absolute bottom-4 left-4">
            {["bg-yellow-300", "bg-blue-300", "bg-red-300"].map((c, i) => (
                <div
                    key={i}
                    className={`w-20 h-4 ${c} rounded shadow-md`}
                    style={{
                        marginBottom: "-2px",
                        transform: `rotate(${(i - 1) * 3}deg)`,
                    }}
                />
            ))}
        </div>
        {/* Girl character */}
        <div className="flex flex-col items-center">
            {/* Head */}
            <div className="w-16 h-16 bg-amber-200 rounded-full shadow-lg relative">
                <div className="absolute top-3 left-2 w-4 h-6 bg-gray-800 rounded-full" />
                <div className="absolute top-3 right-2 w-4 h-6 bg-gray-800 rounded-full" />
                {/* Hair */}
                <div className="absolute -top-2 left-0 right-0 h-8 bg-gray-900 rounded-t-full" />
                <div className="absolute top-6 -left-3 w-4 h-10 bg-gray-900 rounded-full" />
                <div className="absolute top-6 -right-3 w-4 h-10 bg-gray-900 rounded-full" />
            </div>
            {/* Body */}
            <div className="w-20 h-24 bg-purple-400 rounded-b-3xl rounded-t-xl mt-1 shadow-lg relative">
                {/* Book in hand */}
                <div className="absolute -right-12 top-4 w-14 h-10 bg-white rounded shadow-md border-l-4 border-blue-400 transform rotate-12" />
            </div>
        </div>
    </div>
);

const WritingGirl = () => (
    <div className="relative flex items-center justify-center w-64 h-64 md:w-72 md:h-72">
        {/* Pencils background */}
        <div className="absolute top-0 right-0 flex gap-1 transform rotate-12">
            {["bg-yellow-400", "bg-red-400", "bg-blue-400"].map((c, i) => (
                <div
                    key={i}
                    className={`w-3 h-20 ${c} rounded-t-full shadow-md`}
                />
            ))}
        </div>
        {/* Girl character */}
        <div className="flex flex-col items-center mt-8">
            <div className="w-14 h-14 bg-amber-200 rounded-full shadow-lg relative">
                <div className="absolute -top-2 left-0 right-0 h-7 bg-gray-900 rounded-t-full" />
                <div className="absolute top-6 -left-2 w-3 h-8 bg-gray-900 rounded-full" />
                <div className="absolute top-6 -right-2 w-3 h-8 bg-gray-900 rounded-full" />
            </div>
            <div
                className="w-18 h-20 bg-purple-500 rounded-b-3xl rounded-t-xl mt-1 shadow-lg relative"
                style={{ width: "72px" }}
            >
                <div className="absolute -bottom-2 left-4 w-6 h-8 bg-amber-200 rounded" />
                <div className="absolute -bottom-2 right-4 w-6 h-8 bg-amber-200 rounded" />
                {/* Notebook */}
                <div className="absolute -left-14 bottom-2 w-14 h-10 bg-white rounded shadow-md border-l-4 border-yellow-400" />
                {/* Pencil in hand */}
                <div className="absolute -left-2 bottom-4 w-1.5 h-10 bg-yellow-300 rounded-full transform -rotate-45" />
            </div>
        </div>
    </div>
);

const GraduationIllustration = () => (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
        {/* Decorative arrows */}
        <div className="absolute top-2 left-2 text-red-400 text-3xl transform -rotate-12">
            ⟨
        </div>
        <div className="absolute top-0 left-12 text-red-300 text-2xl transform rotate-6">
            ⟨
        </div>
        {/* Cap */}
        <div className="absolute top-8 left-8 w-20 h-20">
            <div className="w-20 h-4 bg-gray-900 rounded-sm shadow-lg" />
            <div className="w-14 h-10 bg-gray-800 rounded-b-lg mx-auto" />
            <div className="w-2 h-6 bg-yellow-400 mx-auto" />
            <div className="w-8 h-1 bg-yellow-400 mx-auto rounded" />
        </div>
        {/* Books */}
        <div className="absolute bottom-4 right-2">
            {["bg-yellow-300", "bg-blue-300", "bg-red-300", "bg-green-300"].map(
                (c, i) => (
                    <div
                        key={i}
                        className={`w-16 h-3 ${c} rounded shadow`}
                        style={{
                            transform: `rotate(${(i - 1.5) * 4}deg) translateY(${i * -2}px)`,
                        }}
                    />
                ),
            )}
        </div>
        {/* Pencil */}
        <div className="absolute bottom-8 right-16 w-3 h-16 bg-blue-500 rounded-t-full shadow-md transform rotate-12">
            <div className="absolute bottom-0 w-full h-3 bg-amber-200 rounded-b" />
        </div>
    </div>
);

// ── Scroll Animation Hook ─────────────────────────────────────────
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) setInView(true);
            },
            { threshold },
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
    const [ref, inView] = useInView();
    const transforms = {
        up: "translateY(32px)",
        down: "translateY(-32px)",
        left: "translateX(-32px)",
        right: "translateX(32px)",
    };
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : transforms[direction],
                transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────
export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div
            className="min-h-screen font-sans text-gray-800 overflow-x-hidden"
            style={{ fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif" }}
        >
            {/* ── Google Fonts ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,700&family=Caveat:wght@700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-handwrite { font-family: 'Caveat', cursive; }
        .hero-bg {
          background: linear-gradient(135deg, #fefce8 0%, #fdf4e3 40%, #f0f9ff 100%);
        }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
        .btn-primary {
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(245,158,11,0.4); }
        .btn-outline {
          border: 2px solid #374151;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: #374151; color: white; }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px;
          background: #F59E0B; transition: width 0.3s;
        }
        .nav-link:hover::after { width: 100%; }
        .quote-section {
          background: linear-gradient(135deg, #1e3a5f 0%, #1a5276 100%);
        }
        .cta-section {
          background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
        }
        .feature-card-active {
          background: linear-gradient(135deg, #FBBF24, #F59E0B);
          color: white;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .float-anim-slow { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .dot-grid span { animation: pulse-dot 2s ease-in-out infinite; }
        .dot-grid span:nth-child(2) { animation-delay: 0.2s; }
        .dot-grid span:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

            {/* ══════════════════════════════════════════ NAVBAR ══ */}
            <nav
                className="fixed top-5 left-5 right-5 z-50 transition-all duration-300 $"
            >
                <div className={`max-w-360 mx-auto px-4 sm:px-6 lg:px-8 rounded-lg ${scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : menuOpen ? "bg-white/80" : "bg-transparent"}`}>
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex flex-1 items-center gap-2">
                            <Logo />
                            <span className="font-bold text-gray-900 text-lg tracking-tight">
                                Wariku
                            </span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex  items-center gap-14">
                            {["Home", "Material", "About"].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className={`nav-link text-sm font-medium ${item === "Home" ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-800"} transition-colors`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex md:flex-1 justify-end items-center gap-3">
                            <a
                                href="#"
                                className="px-5 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                Login
                            </a>
                            <a
                                href="#"
                                className="px-5 py-2 text-sm font-semibold text-white bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-200 shadow-md"
                            >
                                Register
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div
                                className={`w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
                            />
                            <div
                                className={`w-5 h-0.5 bg-gray-800 my-1 transition-all ${menuOpen ? "opacity-0" : ""}`}
                            />
                            <div
                                className={`w-5 h-0.5 bg-gray-800 transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
                            />
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden border-t border-gray-100 py-4 px-2 flex flex-col gap-3  rounded-b-2xl">
                            {["Home", "Material", "About"].map((item) => (
                                <a
                                    key={item}
                                    href="#"
                                    className="text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                                >
                                    {item}
                                </a>
                            ))}
                            <div className="flex gap-3 px-3 pt-2 border-t border-gray-100">
                                <a
                                    href="#"
                                    className="flex-1 text-center px-4 py-2 text-sm font-semibold text-blue-600 border-2 border-blue-600 rounded-full"
                                >
                                    Login
                                </a>
                                <a
                                    href="#"
                                    className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white bg-yellow-400 rounded-full"
                                >
                                    Register
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* ══════════════════════════════════════════ HERO ══ */}
            <section className="hero-bg min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center text-center relative">
                        {/* Badge */}
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm/5 mb-6">
                                <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    Smart
                                </span>
                                <span className="text-gray-600 text-sm">
                                    Learning Systems
                                </span>
                            </div>
                        </FadeIn>

                        {/* Illustrations — shown beside headline on md+ */}
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Left illustration */}
                            <FadeIn
                                direction="left"
                                delay={0.2}
                                className="hidden md:flex float-anim"
                            >
                                <HeroIllustrationLeft />
                            </FadeIn>

                            {/* Headline */}
                            <div className="flex-1 max-w-2xl">
                                <FadeIn delay={0.1}>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-4">
                                        Belajar Lebih{" "}
                                        <span className="text-yellow-400 font-handwrite text-5xl md:text-6xl lg:text-7xl">
                                            Cerdas
                                        </span>
                                        <br />
                                        <span className="font-handwrite text-blue-500 text-5xl md:text-6xl lg:text-7xl italic">
                                            Sesuai
                                        </span>{" "}
                                        Dengan Dirimu
                                    </h1>
                                </FadeIn>
                                <FadeIn delay={0.25}>
                                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
                                        Sistem pembelajaran adaptif yang
                                        menggabungkan analisis kemampuan belajar
                                        dengan interpretasi Wariga Bali
                                    </p>
                                </FadeIn>
                                <FadeIn delay={0.35}>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <a
                                            href="#"
                                            className="btn-primary px-7 py-3 rounded-full font-semibold text-white text-sm shadow-lg"
                                        >
                                            Mulai Belajar
                                        </a>
                                        <a
                                            href="#"
                                            className="btn-outline px-7 py-3 rounded-full font-semibold text-sm text-gray-700"
                                        >
                                            Lihat Selengkapnya
                                        </a>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* Right illustration */}
                            <FadeIn
                                direction="right"
                                delay={0.2}
                                className="hidden md:flex float-anim-slow"
                            >
                                <HeroIllustrationRight />
                            </FadeIn>
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
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start mb-14">
                        <FadeIn direction="left" className="md:w-2/5">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                                Kenapa Sistem Ini
                                <br />
                                Berbeda?
                            </h2>
                        </FadeIn>
                        <FadeIn
                            direction="right"
                            delay={0.15}
                            className="md:w-3/5"
                        >
                            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                                Sistem ini dirancang untuk memberikan{" "}
                                <strong className="text-gray-800">
                                    pengalaman belajar
                                </strong>{" "}
                                yang lebih personal dengan menggabungkan
                                analisis kemampuan siswa dan pendekatan berbasis
                                karakter.
                            </p>
                        </FadeIn>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <BookIcon />,
                                title: "Pembelajaran Adaptif",
                                desc: "Materi disesuaikan secara otomatis berdasarkan tingkat pemahaman dan performa belajar kamu.",
                                active: false,
                            },
                            {
                                icon: <StarIcon />,
                                title: "Berbasis Wariga Bali",
                                desc: "Menggunakan interpretasi Wariga untuk memahami preferensi belajar secara lebih personal.",
                                active: true,
                            },
                            {
                                icon: <BrainIcon />,
                                title: "Analisis Cerdas",
                                desc: "Menggabungkan penilaian untuk memahami kemampuan kamu secara menyeluruh.",
                                active: false,
                            },
                        ].map((card, i) => (
                            <FadeIn key={i} delay={i * 0.15}>
                                <div
                                    className={`card-hover rounded-2xl p-6 shadow-md border ${card.active ? "feature-card-active border-yellow-400" : "bg-white border-gray-100"}`}
                                >
                                    <div className="mb-4">{card.icon}</div>
                                    <h3
                                        className={`font-bold text-base mb-2 ${card.active ? "text-white" : "text-gray-800"}`}
                                    >
                                        {card.title}
                                    </h3>
                                    <p
                                        className={`text-sm leading-relaxed ${card.active ? "text-yellow-50" : "text-gray-500"}`}
                                    >
                                        {card.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ FEATURE 1 ══ */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <FadeIn
                            direction="left"
                            className="md:w-1/2 flex justify-center"
                        >
                            <ReadingGirl />
                        </FadeIn>
                        <FadeIn
                            direction="right"
                            delay={0.2}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                Belajar Sesuai Gaya
                                <br />
                                dan Preferensimu
                            </h2>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Sistem memahami preferensi belajarmu melalui
                                pendekatan Wariga Bali, sehingga materi dapat
                                disajikan dalam bentuk yang lebih mudah kamu
                                pahami, baik visual, numerik, maupun naratif.
                            </p>
                            <div className="mt-6 flex gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                                <p className="text-sm text-gray-500">
                                    Materi disesuaikan dengan karakteristik
                                    belajarmu secara otomatis
                                </p>
                            </div>
                            <div className="mt-3 flex gap-3">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                                <p className="text-sm text-gray-500">
                                    Pendekatan holistik berbasis kearifan lokal
                                    Bali
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ FEATURE 2 ══ */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                        <FadeIn
                            direction="right"
                            className="md:w-1/2 flex justify-center"
                        >
                            <WritingGirl />
                        </FadeIn>
                        <FadeIn
                            direction="left"
                            delay={0.2}
                            className="md:w-1/2"
                        >
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                Latihan yang Menyesuaikan
                                <br />
                                Kemampuanmu
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
                                <p className="text-sm text-gray-500">
                                    Analisis real-time berdasarkan performa
                                    latihan kamu
                                </p>
                            </div>
                            <div className="mt-3 flex gap-3">
                                <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                                <p className="text-sm text-gray-500">
                                    Rekomendasi cerdas untuk materi selanjutnya
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ QUOTE ══ */}
            <section className="py-16 md:py-20 quote-section relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-4 left-6 text-blue-300 opacity-30 text-8xl font-serif leading-none">
                    "
                </div>
                <div className="absolute bottom-4 right-6 text-blue-300 opacity-30 text-8xl font-serif leading-none">
                    "
                </div>

                {/* Dot grid decoration */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 grid grid-cols-5 gap-2 opacity-20 dot-grid hidden md:grid">
                    {[...Array(20)].map((_, i) => (
                        <span
                            key={i}
                            className="w-1.5 h-1.5 bg-blue-300 rounded-full block"
                        />
                    ))}
                </div>

                {/* Squiggle decoration */}
                <div className="absolute left-6 bottom-6 text-blue-400 text-4xl opacity-40">
                    〜
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <FadeIn>
                        <p className="text-white text-lg md:text-2xl font-medium leading-relaxed">
                            " Sistem memahami preferensi belajarmu melalui
                            pendekatan Wariga Bali,
                            <br className="hidden md:block" />
                            sehingga materi dapat disajikan dalam bentuk yang
                            lebih mudah kamu
                            <br className="hidden md:block" />
                            pahami, baik visual, numerik, maupun naratif. "
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* ══════════════════════════════════════════ CTA BANNER ══ */}
            <section className="py-12 md:py-16 cta-section">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <FadeIn
                            direction="left"
                            className="flex justify-center md:justify-start md:w-1/3"
                        >
                            <GraduationIllustration />
                        </FadeIn>
                        <FadeIn
                            direction="right"
                            delay={0.2}
                            className="md:w-1/2 text-center md:text-left"
                        >
                            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                                Mulai Perjalanan
                                <br />
                                Belajarmu Sekarang
                            </h2>
                            <p className="text-blue-200 text-sm md:text-base mb-6">
                                Kenali bagaimana sistem ini bekerja untuk
                                mendukung proses belajarmu.
                            </p>
                            <a
                                href="#"
                                className="inline-block px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all duration-200"
                            >
                                Mulai Sekarang
                            </a>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════ BOTTOM CARDS ══ */}
            <section className="py-12 md:py-16 bg-white">
                <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Lihat Materi */}
                        <FadeIn direction="left">
                            <div className="card-hover bg-white border border-gray-100 rounded-2xl p-8 shadow-md">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📖</span>
                                </div>
                                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                                    Lihat Materi
                                </h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Eksplorasi materi pembelajaran sesuai
                                    kebutuhanmu.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 border-b-2 border-yellow-400 pb-0.5 hover:border-yellow-500 transition-colors"
                                >
                                    Lihat Selengkapnya
                                    <span className="text-yellow-500">↗</span>
                                </a>
                            </div>
                        </FadeIn>

                        {/* Coba Latihan */}
                        <FadeIn direction="right" delay={0.1}>
                            <div className="card-hover bg-blue-600 rounded-2xl p-8 shadow-md">
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <h3 className="text-2xl font-extrabold text-white mb-2">
                                    Coba Latihan
                                </h3>
                                <p className="text-blue-200 text-sm mb-6">
                                    Mulai latihan dan temukan tingkat
                                    pemahamanmu saat ini.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white border-b-2 border-blue-300 pb-0.5 hover:border-white transition-colors"
                                >
                                    Lihat Selengkapnya
                                    <span>↗</span>
                                </a>
                            </div>
                        </FadeIn>
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
                                <Logo />
                                <span className="font-bold text-gray-900 text-lg">
                                    Wariku
                                </span>
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
