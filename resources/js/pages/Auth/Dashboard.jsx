import { useState } from "react";
import { Head, Link } from "@inertiajs/react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);
const BookIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
    </svg>
);
const PencilIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
    </svg>
);
const ChartIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
    </svg>
);
const SettingsIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const LogoutIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
    </svg>
);
const SearchIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
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
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17L17 7M17 7H7M17 7v10"
        />
    </svg>
);
const SparkleIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
);
const MenuIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);
const XIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

// ─── Math Thumbnail ───────────────────────────────────────────────────────────
const MathThumbnail = () => (
    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-100 to-orange-50 flex items-center justify-center">
        <div className="relative select-none" aria-hidden="true">
            <span className="absolute -top-4 -left-6 text-2xl font-black text-red-500 rotate-[-15deg]">
                5
            </span>
            <span className="absolute -top-6 left-2 text-xl font-black text-green-500 rotate-[10deg]">
                2
            </span>
            <span className="absolute -top-3 left-10 text-2xl font-black text-blue-500 rotate-[-8deg]">
                ×
            </span>
            <span className="absolute top-0 -right-6 text-xl font-black text-purple-500 rotate-[12deg]">
                4
            </span>
            <span className="absolute -bottom-2 -left-4 text-xl font-black text-orange-500 rotate-[-10deg]">
                3
            </span>
            <span className="absolute bottom-0 right-0 text-2xl font-black text-pink-500 rotate-[8deg]">
                +
            </span>
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg px-5 py-2 shadow-lg">
                <span
                    className="text-yellow-300 font-black text-2xl tracking-wider"
                    style={{
                        fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                        textShadow: "2px 2px 0 #1e3a8a",
                    }}
                >
                    MATH
                </span>
            </div>
            <span className="absolute -bottom-3 -right-5 text-xl font-black text-yellow-500 rotate-[-12deg]">
                9
            </span>
            <span className="absolute top-1 -left-8 text-lg font-black text-teal-500 rotate-[15deg]">
                6
            </span>
            <span className="absolute -bottom-4 left-3 text-2xl font-black text-violet-500 rotate-[5deg]">
                8
            </span>
        </div>
    </div>
);

// ─── Calendar ─────────────────────────────────────────────────────────────────
const Calendar = () => {
    const days = ["D", "S", "T", "Q", "Q", "S", "S"];
    // March 2026: starts on Sunday (0)
    const weeks = [
        [29, 30, null, null, null, null, null], // overflow from Feb shown as 29,30
        [null, null, 1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26],
        [27, 28, 29, 30, 31, null, null],
    ];

    // Build flat grid starting from correct weekday
    // March 2026: 1st is Sunday
    const firstDay = 0; // Sunday
    const totalDays = 31;
    const grid = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= totalDays; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);

    const today = 3; // highlight day 3 as "today" per design
    const highlighted = [7, 11, 22, 24]; // colored highlights from design

    const colors = {
        7: "bg-violet-200 text-violet-700",
        11: "bg-violet-500 text-white",
        22: "bg-violet-200 text-violet-700",
        24: "bg-violet-500 text-white",
        3: "bg-orange-400 text-white",
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800 text-sm">
                    Maret 2026
                </span>
                <div className="flex gap-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs">
                        ‹
                    </button>
                    <button className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xs">
                        ›
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center">
                {days.map((d, i) => (
                    <div
                        key={i}
                        className="text-[10px] font-semibold text-gray-400 py-1"
                    >
                        {d}
                    </div>
                ))}
                {grid.map((d, i) => (
                    <div
                        key={i}
                        className={`text-xs font-medium py-1 rounded-full mx-auto w-7 h-7 flex items-center justify-center cursor-pointer transition-all
            ${!d ? "invisible" : ""}
            ${d === today ? colors[today] : ""}
            ${highlighted.includes(d) && d !== today ? colors[d] : ""}
            ${d && !highlighted.includes(d) && d !== today ? "hover:bg-gray-100 text-gray-600" : ""}
          `}
                    >
                        {d}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, active: true, href: "#" },
        { label: "Lesson", icon: BookIcon, href: "#" },
        { label: "Exercise", icon: PencilIcon, href: "#" },
        { label: "Report", icon: ChartIcon, href: "#" },
    ];
    const navSettings = [
        { label: "Settings", icon: SettingsIcon, href: "#" },
        { label: "Logout", icon: LogoutIcon, href: "/logout", danger: true },
    ];

    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
        fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-auto lg:flex
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 mb-8 px-1">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✦</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg tracking-tight">
                        Wariku
                    </span>
                    <button
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Nav */}
                <div className="flex-1 space-y-6">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Overview
                        </p>
                        <nav className="space-y-0.5">
                            {navMain.map(
                                ({ label, icon: Icon, active, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${
                        active
                            ? "bg-violet-50 text-violet-600"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-violet-500" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </Link>
                                ),
                            )}
                        </nav>
                    </div>

                    <div className="mt-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Settings
                        </p>
                        <nav className="space-y-0.5">
                            {navSettings.map(
                                ({ label, icon: Icon, href, danger }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        {...(danger === true ? { method: "post" } : {})}
                                        {...(danger === true ? { as: "button" } : {})}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${
                        danger
                            ? "text-red-400 hover:bg-red-50 hover:text-red-500"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 flex-shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </Link>
                                )
                            )}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Hero Banner ──────────────────────────────────────────────────────────────
const HeroBanner = ({ user = "Budi" }) => (
    <div className="relative rounded-2xl overflow-hidden bg-violet-600 px-6 py-7 md:px-8 md:py-8">
        {/* Decorative sparkles */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-20 text-white/20 text-5xl font-black">
                ✦
            </div>
            <div className="absolute bottom-4 right-8 text-white/15 text-7xl font-black">
                ✦
            </div>
            <div className="absolute top-1/2 right-36 -translate-y-1/2 text-white/10 text-3xl font-black">
                ✦
            </div>
        </div>

        <p className="text-violet-200 text-xs font-semibold uppercase tracking-widest mb-2">
            WARIKU
        </p>
        <h1 className="text-white font-bold text-xl md:text-2xl leading-snug mb-1">
            Selamat pagi, {user}! 🌤️
        </h1>
        <p className="text-violet-200 text-sm md:text-base mb-5">
            Siap melanjutkan perjalanan belajarmu hari ini?
        </p>
        <button className="flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
            Mulai Belajar
            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <PlayIcon className="w-3 h-3 ml-0.5" />
            </span>
        </button>
    </div>
);

// ─── Recommended Card ─────────────────────────────────────────────────────────
const RecommendedCard = ({ title = "Perkalian Dasar", lessons = 8 }) => (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex-1 min-w-[180px]">
        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
            <BookIcon className="w-5 h-5 text-violet-500" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400">- / {lessons} lessons</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
                {title}
            </p>
        </div>
        <button className="text-gray-300 hover:text-gray-500 ml-auto flex-shrink-0">
            <DotsIcon className="w-4 h-4" />
        </button>
    </div>
);

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard = ({
    title = "Penjumlahan Dasar",
    desc = "Pelajari konsep dasar penjumlahan sebagai fondasi dalam memahami operasi matematika.",
}) => (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col">
        <MathThumbnail />
        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-bold text-gray-800 text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {desc}
            </p>
            <div className="mt-3">
                <button className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors">
                    Selengkapnya
                    <ArrowUpRightIcon className="w-3 h-3" />
                </button>
            </div>
        </div>
    </div>
);

// ─── Journey Table ────────────────────────────────────────────────────────────
const JourneyTable = () => {
    const rows = [
        {
            date: "Tue, 25 Maret 2026",
            duration: "1 jam 30 Menit",
            materi: "Perkalian Dasar",
            result: 79,
        },
        {
            date: "Tue, 25 Maret 2026",
            duration: "1 jam 30 Menit",
            materi: "Perkalian Dasar",
            result: 79,
        },
        {
            date: "Tue, 25 Maret 2026",
            duration: "1 jam 30 Menit",
            materi: "Perkalian Dasar",
            result: 79,
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                                Waktu Pengerjaan
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                                Durasi
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                                Materi
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                                Result
                            </th>
                            <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="px-5 py-3.5 text-gray-600 text-xs">
                                    {row.date}
                                </td>
                                <td className="px-5 py-3.5 text-gray-600 text-xs">
                                    {row.duration}
                                </td>
                                <td className="px-5 py-3.5 text-gray-700 text-xs font-medium">
                                    {row.materi}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="text-xs font-bold text-gray-800">
                                        {row.result}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <button className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-200 transition-all group">
                                        <ArrowUpRightIcon className="w-3 h-3 text-gray-400 group-hover:text-violet-500" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ─── Profile Card ─────────────────────────────────────────────────────────────
const ProfileCard = () => (
    <div className="space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <h2 className="font-bold text-gray-800 mb-4">
                Profile Sang Pelajar
            </h2>
            <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden ring-4 ring-violet-100 bg-gray-200">
                {/* Avatar placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-violet-300 to-violet-500 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">B</span>
                </div>
            </div>
            <h3 className="font-bold text-gray-800">Salam Pelajar</h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                1 Langkah Kecil Hari Ini Lebih Baik
                <br />
                Dari Tidak Sama Sekali
            </p>
        </div>
        <Calendar />
    </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function Dashboard({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userName = auth?.user?.name ?? "Budi";

    const recommended = [
        { title: "Perkalian Dasar", lessons: 8 },
        { title: "Perkalian Dasar", lessons: 8 },
        { title: "Perkalian Dasar", lessons: 8 },
    ];

    const courses = [
        { title: "Penjumlahan Dasar" },
        { title: "Penjumlahan Dasar" },
        { title: "Penjumlahan Dasar" },
        { title: "Penjumlahan Dasar" },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-50 flex">
                {/* Sidebar */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main content */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <MenuIcon className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">
                                    ✦
                                </span>
                            </div>
                            <span className="font-bold text-gray-900">
                                Wariku
                            </span>
                        </div>
                    </div>

                    {/* Content area */}
                    <div className="flex-1 flex gap-0 overflow-hidden">
                        {/* Center scrollable */}
                        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 xl:pr-0 space-y-7 min-w-0">
                            {/* Search */}
                            <div className="relative max-w-2xl">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search your course here..."
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all shadow-sm"
                                />
                            </div>

                            {/* Hero */}
                            <HeroBanner user={userName} />

                            {/* Recommended */}
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <h2 className="font-bold text-gray-800">
                                        Direkomendasikan Untukmu Hari Ini
                                    </h2>
                                    <SparkleIcon className="w-4 h-4 text-amber-400" />
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                                    {recommended.map((item, i) => (
                                        <RecommendedCard key={i} {...item} />
                                    ))}
                                </div>
                            </section>

                            {/* Explore courses */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-gray-800">
                                        Jelajahi Materi Lainnya
                                    </h2>
                                    <a
                                        href="#"
                                        className="text-sm font-semibold text-violet-500 hover:text-violet-700 transition-colors"
                                    >
                                        See All
                                    </a>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {courses.map((c, i) => (
                                        <CourseCard key={i} {...c} />
                                    ))}
                                </div>
                            </section>

                            {/* Journey */}
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-bold text-gray-800">
                                        Perjalanan Belajarmu
                                    </h2>
                                    <a
                                        href="#"
                                        className="text-sm font-semibold text-violet-500 hover:text-violet-700 transition-colors"
                                    >
                                        See All
                                    </a>
                                </div>
                                <JourneyTable />
                            </section>

                            {/* Mobile profile (visible only on small screens) */}
                            <div className="xl:hidden">
                                <ProfileCard />
                            </div>

                            <div className="pb-4" />
                        </main>

                        {/* Right sidebar - profile (hidden on small screens) */}
                        <aside className="hidden xl:block w-72 flex-shrink-0 overflow-y-auto px-5 py-6 border-l border-gray-100 bg-white/50">
                            <ProfileCard />
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
