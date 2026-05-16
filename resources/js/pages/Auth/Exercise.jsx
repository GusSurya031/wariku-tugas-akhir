import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Logo from "@/assets/icon/logo.svg";

// ─── Theme ────────────────────────────────────────────────────────────────────
const THEME_MAP = {
    Minggu: "redite",
    Senin: "soma",
    Selasa: "anggara",
    Rabu: "buda",
    Kamis: "wrespati",
    Jumat: "sukra",
    Sabtu: "saniscara",
};

// ─── Difficulty config (fixed colours per level — independent of theme) ──────
const DIFF_CONFIG = {
    easy: { label: "Mudah", bg: "bg-green-100", text: "text-green-700" },
    medium: { label: "Menengah", bg: "bg-amber-100", text: "text-amber-700" },
    hard: { label: "Lanjutan", bg: "bg-red-100", text: "text-red-700" },
};

const FILTERS = [
    { value: "all", label: "Semua" },
    { value: "easy", label: "Mudah" },
    { value: "medium", label: "Menengah" },
    { value: "hard", label: "Lanjutan" },
];

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
const HomeSmIcon = ({ className }) => (
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
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
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
const ClockIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
);
const QuestionIcon = ({ className }) => (
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
const TrophyIcon = ({ className }) => (
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
    </svg>
);
const RefreshIcon = ({ className }) => (
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
    </svg>
);
const PlayIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

// ─── Profile Card ─────────────────────────────────────────────────────────────
const ProfileCard = ({ user }) => {
    const initial = user?.name?.charAt(0)?.toUpperCase() ?? "W";
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div>
                    <div className="w-10 h-10 rounded-full mx-auto overflow-hidden ring-4 ring-(--theme-soft)">
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "var(--theme-gradient)" }}
                        >
                            <span className="text-white text-2xl font-bold">
                                {initial}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="font-bold text-gray-800">
                        {user?.fullname ?? user?.name ?? "Pelajar"}
                    </h2>
                    <h4 className="text-sm font-light text-gray-800">
                        Sang Pelajar
                    </h4>
                </div>
            </div>
            {/* <Calendar /> */}
        </div>
    );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, href: "/dashboard" },
        { label: "Lesson", icon: BookIcon, href: "/lessons" },
        {
            label: "Exercise",
            icon: PencilIcon,
            href: "/exercise",
            active: true,
        },
        { label: "Report", icon: ChartIcon, href: "/report" },
    ];
    const navSettings = [
        { label: "Profile", icon: SettingsIcon, href: "/profile" },
        { label: "Logout", icon: LogoutIcon, href: "/logout", danger: true },
    ];

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 transition-transform duration-300
                lg:translate-x-0 lg:sticky lg:z-auto lg:flex lg:h-screen
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center gap-2 mb-8 px-1">
                    {/* Logo */}
                    <div className="flex flex-1 items-center gap-2">
                        <img src={Logo} alt="Logo" className="w-24 md:w-32" />
                    </div>
                    <button
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
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
                                    ${active ? "bg-(--theme-soft) text-(--theme-primary)" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 shrink-0 ${active ? "text-(--theme-primary)" : "text-gray-400 group-hover:text-gray-600"}`}
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
                                        {...(danger
                                            ? { method: "post", as: "button" }
                                            : {})}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${danger ? "text-red-400 hover:bg-red-50 hover:text-red-500" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </Link>
                                ),
                            )}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Score Ring ───────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
    const r = 28,
        c = 2 * Math.PI * r;
    return (
        <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="var(--theme-soft, #ede9fe)"
                    strokeWidth="7"
                />
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="var(--theme-primary, #7c3aed)"
                    strokeWidth="7"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - score / 100)}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-(--theme-primary)">
                {score}
            </span>
        </div>
    );
};

// ─── Exercise Card ─────────────────────────────────────────────────────────────
const ExerciseCard = ({ variant, onClick }) => {
    const diff = DIFF_CONFIG[variant.difficulty] ?? DIFF_CONFIG.easy;
    return (
        <div
            onClick={() => onClick(variant)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group p-4 flex flex-col gap-3"
        >
            <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0">
                    <QuestionIcon className="w-5 h-5 text-(--theme-primary)" />
                </div>
                <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${diff.bg} ${diff.text}`}
                >
                    {diff.label}
                </span>
            </div>

            <div className="h-6" />

            <div>
                <h3 className="font-bold text-gray-800 text-sm group-hover:text-(--theme-primary) transition-colors">
                    {variant.material_title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {variant.material_topic}
                </p>
            </div>

            <div className="border-t border-gray-50 pt-3">
                <p className="text-xs text-gray-500 font-medium mb-0.5">
                    Pertanyaan
                </p>
                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-800">
                            {variant.question_count}
                        </span>
                        <span className="text-xs text-gray-400">
                            {variant.attempt_count > 0
                                ? `/ ${variant.attempt_count}×`
                                : "soal"}
                        </span>
                    </div>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <ArrowUpRightIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Detail Drawer ─────────────────────────────────────────────────────────────
const DetailDrawer = ({ variant, onClose, themeSlug }) => {
    const diff = DIFF_CONFIG[variant.difficulty] ?? DIFF_CONFIG.easy;

    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            <div
                data-theme={themeSlug}
                className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col w-full sm:w-105 lg:w-1/3 overflow-hidden"
                style={{
                    animation:
                        "slideInRight 0.3s cubic-bezier(0.32,0.72,0,1) both",
                }}
            >
                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto">
                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-(--theme-soft) flex items-center justify-center shrink-0">
                                    <QuestionIcon className="w-6 h-6 text-(--theme-primary)" />
                                </div>
                                <div>
                                    <span
                                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${diff.bg} ${diff.text}`}
                                    >
                                        {diff.label}
                                    </span>
                                    <h2 className="font-bold text-gray-900 text-lg leading-snug mt-1">
                                        {variant.material_title}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                            >
                                <XIcon className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {variant.material_topic}
                        </p>
                    </div>

                    <div className="px-6 py-5 space-y-5">
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    icon: QuestionIcon,
                                    label: "Pertanyaan",
                                    value: variant.question_count,
                                    colorClass: "text-(--theme-primary)",
                                    bgStyle: "var(--theme-soft)",
                                },
                                {
                                    icon: RefreshIcon,
                                    label: "Percobaan",
                                    value: variant.attempt_count,
                                    colorClass: "text-blue-500",
                                    bgStyle: "#eff6ff",
                                },
                            ].map(
                                ({
                                    icon: Icon,
                                    label,
                                    value,
                                    colorClass,
                                    bgStyle,
                                }) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl p-3 text-center"
                                        style={{ backgroundColor: bgStyle }}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${colorClass} mx-auto mb-1`}
                                        />
                                        <p className="text-[10px] text-gray-400">
                                            {label}
                                        </p>
                                        <p className="font-black text-gray-800 text-sm">
                                            {value}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Best score */}
                        {variant.best_score !== null ? (
                            <div
                                className="flex items-center gap-4 rounded-2xl p-4"
                                style={{ backgroundColor: "var(--theme-soft)" }}
                            >
                                <ScoreRing score={variant.best_score} />
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <TrophyIcon className="w-4 h-4 text-amber-500" />
                                        <p className="text-xs font-bold text-gray-700">
                                            Skor Terbaik
                                        </p>
                                    </div>
                                    <p className="text-2xl font-black text-(--theme-primary)">
                                        {variant.best_score}
                                        <span className="text-sm font-medium text-gray-400">
                                            /100
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Dari {variant.attempt_count} percobaan
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <TrophyIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500">
                                        Belum Ada Skor
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Mulai latihan untuk mendapatkan skor
                                        pertamamu!
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                            <h3 className="font-bold text-amber-700 text-xs uppercase tracking-wider mb-2">
                                Petunjuk Pengerjaan
                            </h3>
                            <ul className="space-y-1.5 text-xs text-amber-700/80">
                                {[
                                    "Baca setiap soal dengan teliti sebelum menjawab",
                                    "Jawaban tidak bisa diubah setelah lanjut ke soal berikutnya",
                                    "Setiap soal hanya memiliki satu jawaban yang benar",
                                    "Skor dihitung berdasarkan akurasi dan kecepatan menjawab",
                                ].map((txt, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="font-bold shrink-0">
                                            {i + 1}.
                                        </span>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky CTA footer */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white shrink-0">
                    <Link
                        href={`/quiz/${variant.id}`}
                        className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 shadow-lg"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <PlayIcon className="w-4 h-4" />
                        {variant.attempt_count > 0
                            ? "Mulai Latihan Baru"
                            : "Mulai Latihan Sekarang"}
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `}</style>
        </>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Exercise({ auth, variants = [], themeDay = null }) {
    const user      = auth?.user;
    const themeSlug = THEME_MAP[themeDay] ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedVar, setSelectedVar] = useState(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = variants.filter((v) => {
        const matchSearch = v.material_title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchFilter =
            activeFilter === "all" || v.difficulty === activeFilter;
        return matchSearch && matchFilter;
    });

    return (
        <>
            <Head title="Exercise" />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
                style={{ height: "100dvh" }}
            >
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="flex-1 overflow-y-auto min-w-0 space-y-7">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <MenuIcon className="w-5 h-5" />
                        </button>
                        {/* Logo */}
                        <div className="flex flex-1 items-center gap-2">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="w-24 md:w-32"
                            />
                        </div>
                    </div>

                    <div className="px-4 py-6 md:px-8">
                        {/* Search */}
                        <div className="flex items-center mb-5">
                            <div className="relative w-full">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari latihan soal..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-(--theme-secondary) focus:border-transparent transition-all shadow-sm"
                                />
                            </div>
                            <div className="hidden md:block ml-6 w-48">
                                <ProfileCard user={user} />
                            </div>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                            <HomeSmIcon className="w-4 h-4" />
                            <Link
                                href="/dashboard"
                                className="hover:text-gray-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-(--theme-primary) font-semibold">
                                Exercise
                            </span>
                        </div>

                        {/* Page title */}
                        <h1 className="text-xl font-bold text-(--theme-primary) mb-5">
                            Pilihan Latihan Soal
                        </h1>

                        {/* Filter chips */}
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.value}
                                    onClick={() => setActiveFilter(f.value)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border
                                        ${
                                            activeFilter === f.value
                                                ? "text-white border-transparent shadow-sm"
                                                : "bg-white text-gray-500 border-gray-200 hover:border-(--theme-secondary) hover:text-(--theme-primary)"
                                        }`}
                                    style={
                                        activeFilter === f.value
                                            ? {
                                                  background:
                                                      "var(--theme-gradient)",
                                              }
                                            : {}
                                    }
                                >
                                    {f.label}
                                </button>
                            ))}
                            <span className="ml-auto text-xs text-gray-400">
                                {filtered.length} latihan
                            </span>
                        </div>

                        {/* Card grid */}
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
                                {filtered.map((v) => (
                                    <ExerciseCard
                                        key={v.id}
                                        variant={v}
                                        onClick={setSelectedVar}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <PencilIcon className="w-12 h-12 mb-3 text-gray-200" />
                                <p className="text-sm font-medium">
                                    Latihan tidak ditemukan
                                </p>
                                <p className="text-xs mt-1">
                                    Coba kata kunci atau filter lain
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {selectedVar && (
                <DetailDrawer
                    variant={selectedVar}
                    onClose={() => setSelectedVar(null)}
                    themeSlug={themeSlug}
                />
            )}
        </>
    );
}
