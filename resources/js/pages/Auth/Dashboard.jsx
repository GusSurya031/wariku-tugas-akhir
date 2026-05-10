import { useState } from "react";
import { Head, Link } from "@inertiajs/react";

// ─── Sapta Wara theme mapping ─────────────────────────────────────────────────
// Maps Indonesian day name (from resolveThemeDay) → data-theme slug in app.css
const THEME_MAP = {
    Minggu: "redite",
    Senin:  "soma",
    Selasa: "anggara",
    Rabu:   "buda",
    Kamis:  "wrespati",
    Jumat:  "sukra",
    Sabtu:  "saniscara",
};

const DIFFICULTY_LABEL = { easy: "Mudah", medium: "Sedang", hard: "Lanjut" };
const DIFFICULTY_COLOR  = {
    easy:   "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    hard:   "bg-red-100 text-red-700",
};

const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "short", day: "numeric", month: "long", year: "numeric",
    });
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const BookIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const PencilIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);
const ChartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const SettingsIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const LogoutIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const SearchIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const PlayIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);
const DotsIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <circle cx="12" cy="19" r="1.5" />
    </svg>
);
const ArrowUpRightIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
);
const SparkleIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
);
const MenuIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const XIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// ─── Math Thumbnail ───────────────────────────────────────────────────────────
const MathThumbnail = () => (
    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-(--theme-soft) flex items-center justify-center">
        <div className="relative select-none" aria-hidden="true">
            <span className="absolute -top-4 -left-6 text-2xl font-black text-red-500 rotate-[-15deg]">5</span>
            <span className="absolute -top-6 left-2 text-xl font-black text-green-500 rotate-10">2</span>
            <span className="absolute -top-3 left-10 text-2xl font-black text-blue-500 rotate-[-8deg]">×</span>
            <span className="absolute top-0 -right-6 text-xl font-black text-purple-500 rotate-12">4</span>
            <span className="absolute -bottom-2 -left-4 text-xl font-black text-orange-500 rotate-[-10deg]">3</span>
            <span className="absolute bottom-0 right-0 text-2xl font-black text-pink-500 rotate-[8deg]">+</span>
            <div className="rounded-lg px-5 py-2 shadow-lg" style={{ background: "var(--theme-gradient)" }}>
                <span className="text-white font-black text-2xl tracking-wider" style={{ fontFamily: "'Fredoka One', 'Nunito', sans-serif" }}>
                    MATH
                </span>
            </div>
            <span className="absolute -bottom-3 -right-5 text-xl font-black text-yellow-500 -rotate-12">9</span>
            <span className="absolute top-1 -left-8 text-lg font-black text-teal-500 rotate-15">6</span>
            <span className="absolute -bottom-4 left-3 text-2xl font-black text-violet-500 rotate-[5deg]">8</span>
        </div>
    </div>
);

// ─── Calendar ─────────────────────────────────────────────────────────────────
const Calendar = () => {
    const days      = ["D", "S", "T", "Q", "Q", "S", "S"];
    const firstDay  = 0;
    const totalDays = 31;
    const grid      = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= totalDays; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);

    const today       = 3;
    const highlighted = [7, 11, 22, 24];

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800 text-sm">Maret 2026</span>
                <div className="flex gap-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs">‹</button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs">›</button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center">
                {days.map((d, i) => (
                    <div key={i} className="text-[10px] font-semibold text-gray-400 py-1">{d}</div>
                ))}
                {grid.map((d, i) => {
                    const isToday       = d === today;
                    const isHighlighted = highlighted.includes(d) && !isToday;
                    return (
                        <div key={i} className={`text-xs font-medium py-1 rounded-full mx-auto w-7 h-7 flex items-center justify-center cursor-pointer transition-all
                            ${!d ? "invisible" : ""}
                            ${isToday ? "text-white" : ""}
                            ${isHighlighted ? "bg-(--theme-soft) text-(--theme-primary)" : ""}
                            ${d && !isHighlighted && !isToday ? "hover:bg-gray-100 text-gray-600" : ""}`}
                            style={isToday ? { background: "var(--theme-gradient)" } : {}}
                        >
                            {d}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, active: true, href: "/dashboard" },
        { label: "Lesson",    icon: BookIcon,  href: "/lessons" },
        { label: "Exercise",  icon: PencilIcon, href: "/exercise" },
        { label: "Report",    icon: ChartIcon,  href: "/report" },
    ];
    const navSettings = [
        { label: "Settings", icon: SettingsIcon, href: "#" },
        { label: "Logout",   icon: LogoutIcon,   href: "/logout", danger: true },
    ];

    return (
        <>
            {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
            <aside className={`fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 transition-transform duration-300
                lg:translate-x-0 lg:static lg:z-auto lg:flex
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center gap-2 mb-8 px-1">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✦</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg tracking-tight">Wariku</span>
                    <button className="ml-auto lg:hidden text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 space-y-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Overview</p>
                        <nav className="space-y-0.5">
                            {navMain.map(({ label, icon: Icon, active, href }) => (
                                <Link key={label} href={href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                        ${active ? "bg-(--theme-soft) text-(--theme-primary)" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-(--theme-primary)" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Settings</p>
                        <nav className="space-y-0.5">
                            {navSettings.map(({ label, icon: Icon, href, danger }) => (
                                <Link key={label} href={href}
                                    {...(danger ? { method: "post", as: "button" } : {})}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                        ${danger ? "text-red-400 hover:bg-red-50 hover:text-red-500" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4.5 h-4.5 shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const HeroBanner = ({ user = "Pelajar", themeDay = null }) => {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    return (
        <div
            className="relative rounded-2xl overflow-hidden px-6 py-7 md:px-8 md:py-8"
            style={{ background: "var(--theme-gradient)" }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-20 text-white/20 text-5xl font-black">✦</div>
                <div className="absolute bottom-4 right-8 text-white/15 text-7xl font-black">✦</div>
                <div className="absolute top-1/2 right-36 -translate-y-1/2 text-white/10 text-3xl font-black">✦</div>
            </div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                {themeSlug ? themeSlug.toUpperCase() : "WARIKU"}
            </p>
            <h1 className="text-white font-bold text-xl md:text-2xl leading-snug mb-1">
                Selamat belajar, {user}! 🌤️
            </h1>
            <p className="text-white/70 text-sm md:text-base mb-5">
                Siap melanjutkan perjalanan belajarmu hari ini?
            </p>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors border border-white/30">
                Mulai Belajar
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-3 h-3 ml-0.5" />
                </span>
            </button>
        </div>
    );
};

// ─── Recommended Card ─────────────────────────────────────────────────────────
const RecommendedCard = ({ title = "Materi", difficulty = "easy", topic = "" }) => (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex-1 min-w-45">
        <div className="w-10 h-10 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0">
            <BookIcon className="w-5 h-5 text-(--theme-primary)" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 truncate">{topic}</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{title}</p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${DIFFICULTY_COLOR[difficulty]}`}>
                {DIFFICULTY_LABEL[difficulty]}
            </span>
        </div>
        <button className="text-gray-300 hover:text-gray-500 ml-auto shrink-0">
            <DotsIcon className="w-4 h-4" />
        </button>
    </div>
);

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard = ({ title = "Materi", desc = "", topic = "" }) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
        <MathThumbnail />
        <div className="p-4 flex flex-col flex-1">
            <p className="text-[10px] text-gray-400 mb-0.5">{topic}</p>
            <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">{desc}</p>
            <div className="mt-3">
                <button className="flex items-center gap-1.5 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors"
                    style={{ background: "var(--theme-gradient)" }}>
                    Selengkapnya
                    <ArrowUpRightIcon className="w-3 h-3" />
                </button>
            </div>
        </div>
    </div>
);

// ─── Journey Table ────────────────────────────────────────────────────────────
const JourneyTable = ({ rows = [] }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">Waktu</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">Materi</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">Akurasi</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">Performa</th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-5 py-8 text-center text-xs text-gray-400">
                                Belum ada riwayat latihan soal.
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={row.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="px-5 py-3.5 text-gray-600 text-xs">{formatDate(row.created_at)}</td>
                                <td className="px-5 py-3.5 text-gray-700 text-xs font-medium">{row.material_title}</td>
                                <td className="px-5 py-3.5">
                                    <span className="text-xs font-bold text-gray-800">{row.score}%</span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`text-xs font-bold ${
                                        row.score_performance <= 60 ? "text-red-500" :
                                        row.score_performance <= 80 ? "text-amber-500" : "text-emerald-600"
                                    }`}>
                                        {row.score_performance}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border-(--theme-secondary) transition-all group">
                                        <ArrowUpRightIcon className="w-3 h-3 text-gray-400 group-hover:text-(--theme-primary)" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

// ─── Profile Card ─────────────────────────────────────────────────────────────
const ProfileCard = ({ user }) => {
    const initial = user?.name?.charAt(0)?.toUpperCase() ?? "W";
    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <h2 className="font-bold text-gray-800 mb-4">Profile Sang Pelajar</h2>
                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-(--theme-soft)">
                    <div className="w-full h-full flex items-center justify-center" style={{ background: "var(--theme-gradient)" }}>
                        <span className="text-white text-2xl font-bold">{initial}</span>
                    </div>
                </div>
                <h3 className="font-bold text-gray-800">{user?.fullname ?? user?.name ?? "Pelajar"}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    1 Langkah Kecil Hari Ini Lebih Baik
                    <br />
                    Dari Tidak Sama Sekali
                </p>
            </div>
            <Calendar />
        </div>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard({ auth, themeDay, recommendedMaterials = [], allMaterials = [], recentAttempts = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user      = auth?.user;
    const themeSlug = THEME_MAP[themeDay] ?? null;

    return (
        <>
            <Head title="Dashboard" />
            {/* data-theme on root triggers CSS variable overrides in app.css */}
            <div data-theme={themeSlug} className="min-h-screen bg-gray-50 flex">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
                            <MenuIcon className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">✦</span>
                            </div>
                            <span className="font-bold text-gray-900">Wariku</span>
                        </div>
                    </div>

                    <div className="flex-1 flex gap-0 overflow-hidden">
                        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 xl:pr-0 space-y-7 min-w-0">
                            {/* Search */}
                            <div className="relative max-w-2xl">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search your course here..."
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--theme-secondary) focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Hero */}
                            <HeroBanner user={user?.name} themeDay={themeDay} />

                            {/* Recommended */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="font-bold text-gray-800">Direkomendasikan Untukmu Hari Ini</h2>
                                    <SparkleIcon className="w-4 h-4 text-(--theme-primary)" />
                                </div>
                                {recommendedMaterials.length > 0 ? (
                                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                                        {recommendedMaterials.map((item) => (
                                            <RecommendedCard
                                                key={item.id}
                                                title={item.title}
                                                difficulty={item.difficulty}
                                                topic={item.topic}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        Belum ada rekomendasi. Selesaikan onboarding terlebih dahulu.
                                    </p>
                                )}
                            </section>

                            {/* Explore */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-gray-800">Jelajahi Materi Lainnya</h2>
                                    <a href="#" className="text-sm font-semibold text-(--theme-primary) hover:text-(--theme-secondary) transition-colors">See All</a>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {allMaterials.map((m) => (
                                        <CourseCard key={m.id} title={m.title} desc={m.description} topic={m.topic} />
                                    ))}
                                </div>
                            </section>

                            {/* Journey */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-gray-800">Perjalanan Belajarmu</h2>
                                    <a href="#" className="text-sm font-semibold text-(--theme-primary) hover:text-(--theme-secondary) transition-colors">See All</a>
                                </div>
                                <JourneyTable rows={recentAttempts} />
                            </section>

                            {/* Mobile profile */}
                            <div className="xl:hidden">
                                <ProfileCard user={user} />
                            </div>

                            <div className="pb-4" />
                        </main>

                        <aside className="hidden xl:block w-72 shrink-0 overflow-y-auto px-5 py-6 border-l border-gray-100 bg-white/50">
                            <ProfileCard user={user} />
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
