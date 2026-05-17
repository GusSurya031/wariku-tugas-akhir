import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import Logo from "@/assets/icon/logo.svg";
import MaterialContent from "@/components/MaterialContent";

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
        <polyline
            points="9 22 9 12 15 12 15 22"
            stroke="currentColor"
            strokeWidth={1.8}
            fill="none"
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
const UsersIcon = ({ className }) => (
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);
const StarIcon = ({ className, filled }) => (
    <svg
        className={className}
        fill={filled ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
);
const PlayCircleIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
    >
        <circle cx="12" cy="12" r="10" />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 8l6 4-6 4V8z"
            fill="currentColor"
            stroke="none"
        />
    </svg>
);
const CheckCircleIcon = ({ className }) => (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);

const stripHtml = (html) => {
    if (!html) return "";

    const div = document.createElement("div");
    div.innerHTML = html;

    return div.textContent || div.innerText || "";
};

const limitText = (text, maxLength = 150) => {
    if (!text) return "";

    return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
};

// ─── Math Thumbnail ───────────────────────────────────────────────────────────
const MathThumbnail = ({ size = "normal" }) => {
    const h = size === "large" ? "h-52" : "h-36";
    return (
        <div
            className={`relative w-full ${h} rounded-xl overflow-hidden bg-(--theme-soft) flex items-center justify-center`}
        >
            <div className="relative select-none" aria-hidden="true">
                <span className="absolute -top-4 -left-6 text-2xl font-black text-red-500 rotate-[-15deg]">
                    5
                </span>
                <span className="absolute -top-6 left-2 text-xl font-black text-green-500 rotate-10">
                    2
                </span>
                <span className="absolute -top-3 left-10 text-2xl font-black text-blue-500 rotate-[-8deg]">
                    ×
                </span>
                <span className="absolute top-0 -right-6 text-xl font-black text-purple-500 rotate-12">
                    4
                </span>
                <span className="absolute -bottom-2 -left-4 text-xl font-black text-orange-500 rotate-[-10deg]">
                    3
                </span>
                <span className="absolute bottom-0 right-0 text-2xl font-black text-pink-500 rotate-[8deg]">
                    +
                </span>
                <div
                    className="rounded-lg px-5 py-2 shadow-lg"
                    style={{ background: "var(--theme-gradient)" }}
                >
                    <span
                        className="text-white font-black text-2xl tracking-wider"
                        style={{
                            fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                        }}
                    >
                        MATH
                    </span>
                </div>
                <span className="absolute -bottom-3 -right-5 text-xl font-black text-yellow-500 -rotate-12">
                    9
                </span>
                <span className="absolute top-1 -left-8 text-lg font-black text-teal-500 rotate-15">
                    6
                </span>
                <span className="absolute -bottom-4 left-3 text-2xl font-black text-violet-500 rotate-[5deg]">
                    8
                </span>
            </div>
        </div>
    );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, href: "/dashboard" },
        { label: "Lesson", active: true, icon: BookIcon, href: "/lessons" },
        { label: "Exercise", icon: PencilIcon, href: "/exercise" },
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
// ─── Detail Drawer ────────────────────────────────────────────────────────────
const DIFFICULTY_ORDER = ["easy", "medium", "hard"];
const DIFFICULTY_LABEL = {
    easy: "Mudah",
    medium: "Menengah",
    hard: "Lanjutan",
};

const DetailDrawer = ({
    course,
    onClose,
    themeSlug,
    userLearningType = "text",
    recommendedDifficulty = null,
}) => {
    const variants = course?.variants ?? [];

    const availableDiffs = DIFFICULTY_ORDER.filter((d) =>
        variants.some((v) => v.difficulty_level === d),
    );
    const [selectedDiff, setSelectedDiff] = useState(
        availableDiffs[0] ?? "easy",
    );

    // Chapter titles come from any variant of the selected difficulty (titles are the same across learning types)
    const refVariant = variants.find(
        (v) => v.difficulty_level === selectedDiff,
    );
    const chapterTitles = refVariant?.chapter_titles ?? [];

    // CTA target: variant matching selected difficulty + user's learning type
    const targetVariant =
        variants.find(
            (v) =>
                v.difficulty_level === selectedDiff &&
                v.learning_type === userLearningType,
        ) ?? refVariant;

    const totalChapters = availableDiffs.reduce((sum, d) => {
        const v = variants.find(
            (x) =>
                x.difficulty_level === d &&
                x.learning_type === userLearningType,
        );
        return sum + (v?.chapter_count ?? 0);
    }, 0);

    const estMinutes = course?.estimated_duration ?? 0;
    const estLabel =
        estMinutes >= 60
            ? `${Math.floor(estMinutes / 60)} jam${estMinutes % 60 > 0 ? ` ${estMinutes % 60} menit` : ""}`
            : `${estMinutes} menit`;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Panel gets data-theme so CSS variables work inside the fixed element */}
            <div
                data-theme={themeSlug}
                className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col w-full sm:w-105 lg:w-1/3 overflow-y-auto"
                style={{
                    animation:
                        "slideInRight 0.3s cubic-bezier(0.32,0.72,0,1) both",
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                >
                    <XIcon className="w-4 h-4 text-gray-600" />
                </button>

                {/* Thumbnail */}
                <div className="px-6 pt-6 pb-0">
                    <MathThumbnail size="large" />
                </div>

                <div className="px-6 py-5 flex-1">
                    {/* Topic badge */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--theme-primary) bg-(--theme-soft) px-3 py-1 rounded-full mb-3">
                        <BookIcon className="w-3 h-3" />{" "}
                        {course?.topic ?? "Matematika"}
                    </span>

                    <h2 className="font-bold text-gray-900 text-xl leading-snug mb-2">
                        {course?.title ?? "Materi"}
                    </h2>
                    {/* <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        {course?.description ?? ""}
                    </p> */}
                    <MaterialContent
                        className=""
                        html= {course?.description ?? ""}
                    />

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-5 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <BookIcon className="w-4 h-4 text-(--theme-primary)" />
                            <span>{totalChapters} Chapter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-4 h-4 text-amber-400" />
                            <span>{estLabel}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 mb-5" />

                    {/* Difficulty selector */}
                    <h3 className="font-bold text-gray-800 text-sm mb-3">
                        Pilih Tingkat Belajar
                    </h3>
                    <div className="flex gap-2 mb-5">
                        {availableDiffs.map((diff) => {
                            const diffVariant =
                                variants.find(
                                    (v) =>
                                        v.difficulty_level === diff &&
                                        v.learning_type === userLearningType,
                                ) ??
                                variants.find(
                                    (v) => v.difficulty_level === diff,
                                );
                            const progress = diffVariant?.progress ?? null;
                            const isRecommended =
                                diff === recommendedDifficulty;

                            return (
                                <div
                                    key={diff}
                                    className="flex-1 flex flex-col items-center gap-1"
                                >
                                    <button
                                        onClick={() => setSelectedDiff(diff)}
                                        className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition-all
                                            ${
                                                selectedDiff === diff
                                                    ? "border-transparent text-white shadow-sm"
                                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-(--theme-soft) hover:border-(--theme-secondary)"
                                            }`}
                                        style={
                                            selectedDiff === diff
                                                ? {
                                                      background:
                                                          "var(--theme-gradient)",
                                                  }
                                                : {}
                                        }
                                    >
                                        {DIFFICULTY_LABEL[diff]}
                                    </button>

                                    {isRecommended && (
                                        <div className="relative group">
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-700 whitespace-nowrap cursor-help inline-block">
                                                ★ Rekomendasi
                                            </span>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 p-2 text-[10px] leading-snug bg-gray-800 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg">
                                                Direkomendasikan berdasarkan
                                                kondisi dan hasil belajarmu
                                            </div>
                                        </div>
                                    )}

                                    {progress && (
                                        <span
                                            className={`text-[9px] font-medium ${
                                                progress.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-(--theme-primary)"
                                            }`}
                                        >
                                            {progress.status === "completed"
                                                ? "✓ Selesai"
                                                : `${progress.percentage}%`}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Chapter list for selected difficulty */}
                    <div className="space-y-2 mb-6">
                        {chapterTitles.length > 0 ? (
                            chapterTitles.map((title, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <span className="w-6 h-6 rounded-full bg-(--theme-soft) text-(--theme-primary) text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium">
                                        {title}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 text-center py-4">
                                Belum ada chapter tersedia.
                            </p>
                        )}
                    </div>

                    {/* CTA */}
                    <Link
                        href={
                            targetVariant ? `/lessons/${targetVariant.id}` : "#"
                        }
                        className="w-full text-white font-bold text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <PlayCircleIcon className="w-5 h-5" />
                        Mulai Belajar Sekarang
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

// ─── Course Card ──────────────────────────────────────────────────────────────
const CourseCard = ({ title, desc, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col"
    >
        <MathThumbnail />
        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-(--theme-primary) transition-colors">
                {title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
                {limitText(stripHtml(desc), 150)}
            </p>
            <div className="mt-3">
                <button
                    className="flex items-center gap-1.5 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-opacity hover:opacity-90"
                    style={{ background: "var(--theme-gradient)" }}
                >
                    Selengkapnya
                    <ArrowUpRightIcon className="w-3 h-3" />
                </button>
            </div>
        </div>
    </div>
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
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Lesson({
    auth,
    allMaterials = [],
    themeDay = null,
    userLearningType = "text",
    recommendedDifficulty = null,
}) {
    const user = auth?.user;
    const themeSlug = THEME_MAP[themeDay] ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const openId = params.get("open");
        if (openId) {
            const course = allMaterials.find((m) => String(m.id) === openId);
            if (course) setSelectedCourse(course);
        }
    }, []);

    const filtered = allMaterials.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <>
            <Head title="Lesson" />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
            >
                {/* Sticky Sidebar */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main */}
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
                            {/* Logo */}
                            <div className="flex flex-1 items-center gap-2">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-24 md:w-32"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Scrollable content */}
                    <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-7">
                        {/* Search */}
                        <div className="flex items-center">
                            <div className="relative w-full">
                                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search your course here..."
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
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                            <HomeSmIcon className="w-4 h-4 text-gray-400" />
                            <Link
                                href="/dashboard"
                                className="hover:text-gray-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-(--theme-primary) font-semibold">
                                Lesson
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-bold text-(--theme-primary) mb-6">
                            Pilihan Materi Belajarmu
                        </h1>

                        {/* Grid */}
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
                                {filtered.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        title={course.title}
                                        desc={course.description}
                                        topic={course.topic}
                                        {...course}
                                        onClick={() =>
                                            setSelectedCourse(course)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                                <BookIcon className="w-12 h-12 mb-3 text-gray-200" />
                                <p className="text-sm font-medium">
                                    Materi tidak ditemukan
                                </p>
                                <p className="text-xs">Coba kata kunci lain</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Detail Drawer */}
            {selectedCourse && (
                <DetailDrawer
                    course={selectedCourse}
                    onClose={() => setSelectedCourse(null)}
                    themeSlug={themeSlug}
                    userLearningType={userLearningType}
                    recommendedDifficulty={recommendedDifficulty}
                />
            )}
        </>
    );
}
