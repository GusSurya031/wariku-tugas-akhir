import { useState } from "react";
import { Head } from "@inertiajs/react";

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
const EyeIcon = ({ className }) => (
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
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
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
const PlayIcon = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
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

// ─── Data ──────────────────────────────────────────────────────────────────────
const DIFFICULTY_CONFIG = {
    Easy: { bg: "bg-violet-500", text: "text-white" },
    Medium: { bg: "bg-amber-400", text: "text-white" },
    Hard: { bg: "bg-red-500", text: "text-white" },
};

const EXERCISES = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: [
        "Penjumlahan Dasar",
        "Pengurangan Dasar",
        "Perkalian Dasar",
        "Pembagian Dasar",
        "Pecahan Sederhana",
    ][i % 5],
    desc: "Ayo berlatih kemampuan kamu mengenai penjumlahan dasar",
    difficulty: ["Easy", "Medium", "Hard"][i % 3],
    questions: 30,
    attempts: [0, 2, 1, 3, 0][i % 5],
    duration: "30 Menit",
    bestScore: [null, 85, 72, 91, null][i % 5],
    topics: [
        "Bilangan bulat",
        "Operasi hitung",
        "Penjumlahan berulang",
        "Soal cerita",
    ],
}));

const FILTERS = ["Semua", "Easy", "Medium", "Hard"];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, href: "#" },
        { label: "Lesson", icon: BookIcon, href: "#" },
        { label: "Exercise", icon: PencilIcon, active: true, href: "#" },
        { label: "Report", icon: ChartIcon, href: "#" },
    ];
    const navBottom = [
        { label: "Settings", icon: SettingsIcon, href: "#" },
        { label: "Logout", icon: LogoutIcon, href: "#", danger: true },
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
                className={`
        fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100
        flex flex-col py-6 px-4 transition-transform duration-300
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto
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

                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Overview
                        </p>
                        <nav className="space-y-0.5">
                            {navMain.map(
                                ({ label, icon: Icon, active, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${active ? "bg-violet-50 text-violet-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 flex-shrink-0 ${active ? "text-violet-500" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </a>
                                ),
                            )}
                        </nav>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Settings
                        </p>
                        <nav className="space-y-0.5">
                            {navBottom.map(
                                ({ label, icon: Icon, href, danger }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${danger ? "text-red-400 hover:bg-red-50" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 flex-shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </a>
                                ),
                            )}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Exercise Card ─────────────────────────────────────────────────────────────
const ExerciseCard = ({ ex, onClick }) => {
    const diff = DIFFICULTY_CONFIG[ex.difficulty];
    return (
        <div
            onClick={() => onClick(ex)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group p-4 flex flex-col gap-3"
        >
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <EyeIcon className="w-5 h-5 text-violet-500" />
                </div>
                <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${diff.bg} ${diff.text}`}
                >
                    {ex.difficulty}
                </span>
            </div>

            {/* Blank illustration area (mirrors figma spacing) */}
            <div className="h-10" />

            {/* Title + desc */}
            <div>
                <h3 className="font-bold text-gray-800 text-sm group-hover:text-violet-600 transition-colors">
                    {ex.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                    {ex.desc}
                </p>
            </div>

            {/* Stats row */}
            <div className="border-t border-gray-50 pt-3">
                <p className="text-xs text-gray-500 font-medium mb-0.5">
                    Pertanyaan
                </p>
                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-800">
                            {ex.questions}
                        </span>
                        <span className="text-xs text-gray-400">
                            / {ex.attempts} Percobaan
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-violet-500 hover:bg-violet-600 flex items-center justify-center transition-colors shadow-sm shadow-violet-200 flex-shrink-0">
                        <ArrowUpRightIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Score Ring ───────────────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
    const r = 28,
        c = 2 * Math.PI * r;
    return (
        <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="#ede9fe"
                    strokeWidth="7"
                />
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="7"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - score / 100)}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-violet-700">
                {score}
            </span>
        </div>
    );
};

// ─── Detail Drawer ─────────────────────────────────────────────────────────────
const DetailDrawer = ({ ex, onClose, onStart }) => {
    const diff = DIFFICULTY_CONFIG[ex.difficulty];

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            {/* Sliding panel */}
            <div
                className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col
          w-full sm:w-[420px] lg:w-1/3 overflow-hidden"
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
                                <div className="w-11 h-11 rounded-2xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                                    <EyeIcon className="w-6 h-6 text-violet-500" />
                                </div>
                                <div>
                                    <span
                                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${diff.bg} ${diff.text}`}
                                    >
                                        {ex.difficulty}
                                    </span>
                                    <h2 className="font-bold text-gray-900 text-lg leading-snug mt-1">
                                        {ex.title}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors flex-shrink-0 mt-0.5"
                            >
                                <XIcon className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                            {ex.desc}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-5 space-y-6">
                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    icon: QuestionIcon,
                                    label: "Pertanyaan",
                                    value: ex.questions,
                                    color: "text-violet-500",
                                    bg: "bg-violet-50",
                                },
                                {
                                    icon: ClockIcon,
                                    label: "Durasi",
                                    value: ex.duration,
                                    color: "text-amber-500",
                                    bg: "bg-amber-50",
                                },
                                {
                                    icon: RefreshIcon,
                                    label: "Percobaan",
                                    value: ex.attempts,
                                    color: "text-blue-500",
                                    bg: "bg-blue-50",
                                },
                            ].map(({ icon: Icon, label, value, color, bg }) => (
                                <div
                                    key={label}
                                    className={`${bg} rounded-2xl p-3 text-center`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${color} mx-auto mb-1`}
                                    />
                                    <p className="text-[10px] text-gray-400">
                                        {label}
                                    </p>
                                    <p className="font-black text-gray-800 text-sm">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Best score */}
                        {ex.bestScore !== null ? (
                            <div className="flex items-center gap-4 bg-violet-50 rounded-2xl p-4">
                                <ScoreRing score={ex.bestScore} />
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <TrophyIcon className="w-4 h-4 text-amber-500" />
                                        <p className="text-xs font-bold text-gray-700">
                                            Skor Terbaik
                                        </p>
                                    </div>
                                    <p className="text-2xl font-black text-violet-700">
                                        {ex.bestScore}
                                        <span className="text-sm font-medium text-gray-400">
                                            /100
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Dari {ex.attempts} percobaan
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
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

                        {/* Topics */}
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm mb-3">
                                Topik yang Diuji
                            </h3>
                            <div className="space-y-2">
                                {ex.topics.map((t, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0" />
                                        <span className="text-sm text-gray-600">
                                            {t}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                            <h3 className="font-bold text-amber-700 text-xs uppercase tracking-wider mb-2">
                                Petunjuk Pengerjaan
                            </h3>
                            <ul className="space-y-1.5 text-xs text-amber-700/80">
                                {[
                                    "Baca setiap soal dengan teliti sebelum menjawab",
                                    `Kamu memiliki waktu ${ex.duration} untuk menyelesaikan semua soal`,
                                    "Setiap soal hanya memiliki satu jawaban yang benar",
                                    "Skor dihitung berdasarkan jumlah jawaban yang benar",
                                ].map((txt, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="font-bold flex-shrink-0">
                                            {i + 1}.
                                        </span>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Bottom padding so content clears sticky footer */}
                        <div className="h-2" />
                    </div>
                </div>

                {/* Sticky CTA footer */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white flex-shrink-0">
                    {ex.attempts > 0 && (
                        <button className="w-full mb-2.5 flex items-center justify-center gap-2 border-2 border-violet-200 text-violet-600 font-bold text-sm py-3 rounded-2xl hover:bg-violet-50 transition-colors">
                            <RefreshIcon className="w-4 h-4" />
                            Coba Lagi
                        </button>
                    )}
                    <button
                        onClick={() => onStart(ex)}
                        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-bold text-sm py-3.5 rounded-2xl transition-colors shadow-lg shadow-violet-200"
                    >
                        <PlayIcon className="w-4 h-4" />
                        {ex.attempts > 0
                            ? "Mulai Latihan Baru"
                            : "Mulai Latihan Sekarang"}
                    </button>
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
export default function Exercise({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEx, setSelectedEx] = useState(null);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("Semua");

    const filtered = EXERCISES.filter((ex) => {
        const matchSearch = ex.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchFilter =
            activeFilter === "Semua" || ex.difficulty === activeFilter;
        return matchSearch && matchFilter;
    });

    const handleStart = (ex) => {
        // Replace with: router.visit(route('quiz.show', ex.id))
        setSelectedEx(null);
        alert(`Navigating to quiz: ${ex.title}`);
    };

    return (
        <>
            <Head title="Exercise" />

            <div
                className="min-h-screen bg-gray-50 flex"
                style={{ height: "100dvh" }}
            >
                {/* ── Sticky left sidebar ─────────────────────────────────────── */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* ── Scrollable main content ──────────────────────────────────── */}
                <main className="flex-1 overflow-y-auto min-w-0">
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

                    <div className="px-4 py-6 md:px-8">
                        {/* Search */}
                        <div className="relative max-w-2xl mb-6">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search your course here..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                            <HomeSmIcon className="w-4 h-4" />
                            <a
                                href="#"
                                className="hover:text-gray-600 transition-colors"
                            >
                                Dashboard
                            </a>
                            <span>/</span>
                            <span className="text-violet-600 font-semibold">
                                Exercise
                            </span>
                        </div>

                        {/* Page title */}
                        <h1 className="text-xl font-bold text-violet-600 mb-5">
                            Pilihan Latihan Soal
                        </h1>

                        {/* Filter chips */}
                        <div className="flex items-center gap-2 mb-6 flex-wrap">
                            {FILTERS.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border
                    ${
                        activeFilter === f
                            ? "bg-violet-600 text-white border-violet-600 shadow-sm shadow-violet-200"
                            : "bg-white text-gray-500 border-gray-200 hover:border-violet-300 hover:text-violet-600"
                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                            <span className="ml-auto text-xs text-gray-400">
                                {filtered.length} latihan
                            </span>
                        </div>

                        {/* Card grid */}
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
                                {filtered.map((ex) => (
                                    <ExerciseCard
                                        key={ex.id}
                                        ex={ex}
                                        onClick={setSelectedEx}
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

            {/* Detail Drawer (portal-like, renders on top of everything) */}
            {selectedEx && (
                <DetailDrawer
                    ex={selectedEx}
                    onClose={() => setSelectedEx(null)}
                    onStart={handleStart}
                />
            )}
        </>
    );
}
