import { useState, useEffect, useRef } from "react";
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
const ArrowRightIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
);
const CheckIcon = ({ className }) => (
    <svg
        className={className}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const ListIcon = ({ className }) => (
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
            d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
    </svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────────
const CHAPTERS = [
    { id: 0, num: "00", title: "Introduction" },
    { id: 1, num: "01", title: "Angka dan Perkalian" },
    { id: 2, num: "02", title: "Perkalian Bersusun" },
    { id: 3, num: "03", title: "Perkalian Ribuan" },
    { id: 4, num: "04", title: "Pembagian Dasar" },
    { id: 5, num: "05", title: "Latihan Soal" },
];

const LOREM = `Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.`;

// ─── Math Hero Image ──────────────────────────────────────────────────────────
const MathHeroImage = () => (
    <div
        className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-sky-100 via-yellow-50 to-orange-100"
        style={{ minHeight: "280px", maxHeight: "340px" }}
    >
        {/* Number decorations */}
        {[
            {
                val: "3",
                color: "#22c55e",
                x: "5%",
                y: "15%",
                size: "5rem",
                rot: "-10deg",
            },
            {
                val: "×",
                color: "#8b5cf6",
                x: "18%",
                y: "5%",
                size: "3.5rem",
                rot: "8deg",
            },
            {
                val: "4",
                color: "#f97316",
                x: "30%",
                y: "8%",
                size: "4rem",
                rot: "-5deg",
            },
            {
                val: "+",
                color: "#06b6d4",
                x: "48%",
                y: "4%",
                size: "3.5rem",
                rot: "12deg",
            },
            {
                val: "7",
                color: "#ef4444",
                x: "68%",
                y: "10%",
                size: "4.5rem",
                rot: "-8deg",
            },
            {
                val: "1",
                color: "#f59e0b",
                x: "85%",
                y: "5%",
                size: "3rem",
                rot: "6deg",
            },
            {
                val: "9",
                color: "#3b82f6",
                x: "3%",
                y: "65%",
                size: "4rem",
                rot: "15deg",
            },
            {
                val: "6",
                color: "#eab308",
                x: "88%",
                y: "60%",
                size: "4.5rem",
                rot: "-12deg",
            },
        ].map((n, i) => (
            <span
                key={i}
                className="absolute font-black select-none leading-none"
                style={{
                    color: n.color,
                    left: n.x,
                    top: n.y,
                    fontSize: n.size,
                    transform: `rotate(${n.rot})`,
                    textShadow: "3px 3px 0 rgba(0,0,0,0.15)",
                    filter: "drop-shadow(2px 2px 3px rgba(0,0,0,0.1))",
                }}
            >
                {n.val}
            </span>
        ))}
        {/* Center MATH logo */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-2xl px-10 py-5 shadow-2xl border-4 border-blue-600/30">
                    <span
                        className="font-black text-5xl tracking-widest"
                        style={{
                            color: "#fde68a",
                            textShadow:
                                "3px 3px 0 #1e3a8a, -1px -1px 0 #1e40af",
                            fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                        }}
                    >
                        MATH
                    </span>
                </div>
                {/* Scattered smaller numbers around the logo */}
                <span className="absolute -top-5 -left-6 text-2xl font-black text-pink-500 rotate-[-20deg] select-none">
                    5
                </span>
                <span className="absolute -top-3 -right-8 text-xl font-black text-green-500 rotate-[15deg] select-none">
                    2
                </span>
                <span className="absolute -bottom-4 -left-4 text-2xl font-black text-purple-500 rotate-[10deg] select-none">
                    8
                </span>
                <span className="absolute -bottom-5 -right-5 text-xl font-black text-red-500 rotate-[-8deg] select-none">
                    ÷
                </span>
            </div>
        </div>
    </div>
);

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        {
            label: "Dashboard",
            icon: HomeIcon,
            active: true,
            href: "/dashboard",
        },
        { label: "Lesson", icon: BookIcon, href: "/lessons" },
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

// ─── Chapter Sidebar (Right) ──────────────────────────────────────────────────
const ChapterSidebar = ({
    chapters,
    activeId,
    completedIds,
    onSelect,
    mobileOpen,
    onMobileClose,
}) => {
    const nextChapter = chapters.find((c) => c.id === activeId + 1);

    const Item = ({ ch }) => {
        const isActive = ch.id === activeId;
        const isCompleted = completedIds.includes(ch.id);
        const isLocked = !isActive && !isCompleted && ch.id > activeId;

        return (
            <button
                onClick={() => {
                    onSelect(ch.id);
                    onMobileClose?.();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group
          ${isActive ? "bg-violet-600 text-white shadow-md shadow-violet-200" : ""}
          ${isCompleted ? "bg-violet-100 text-violet-500 hover:bg-violet-200" : ""}
          ${isLocked ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-60" : ""}
          ${!isActive && !isCompleted && !isLocked ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : ""}
        `}
            >
                <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors
          ${isActive ? "bg-white/20 text-white" : ""}
          ${isCompleted ? "bg-violet-200 text-violet-600" : ""}
          ${!isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""}
        `}
                >
                    {isCompleted && !isActive ? (
                        <CheckIcon className="w-4 h-4" />
                    ) : (
                        ch.num
                    )}
                </span>
                <span
                    className={`text-sm font-semibold truncate ${isActive ? "text-white" : ""}`}
                >
                    {ch.title}
                </span>
            </button>
        );
    };

    const content = (
        <div className="space-y-2 p-1">
            <div className="flex items-center justify-between mb-1 px-1">
                <h3 className="font-bold text-gray-800 text-sm">
                    Class Chapter
                </h3>
                <button className="text-xs font-semibold text-violet-500 hover:text-violet-700 transition-colors">
                    See All
                </button>
            </div>
            {nextChapter && (
                <p className="text-xs text-violet-500 font-medium px-1 mb-3">
                    Next Chapter : {nextChapter.title}
                </p>
            )}
            {chapters.map((ch) => (
                <Item key={ch.id} ch={ch} />
            ))}
        </div>
    );

    return (
        <>
            {/* Desktop sticky panel */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-6 pt-1">{content}</div>
            </aside>

            {/* Mobile drawer */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={onMobileClose}
                    />
                    <div
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-5 shadow-2xl lg:hidden"
                        style={{
                            animation:
                                "slideUp 0.3s cubic-bezier(0.32,0.72,0,1) both",
                        }}
                    >
                        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
                        {content}
                        <div className="pb-4" />
                    </div>
                    <style>{`@keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>
                </>
            )}
        </>
    );
};

// ─── Next Chapter CTA ─────────────────────────────────────────────────────────
const NextChapterBanner = ({ chapter, onGo }) => (
    <div className="mt-10 rounded-2xl border-2 border-violet-100 bg-violet-50 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
                Materi Selanjutnya
            </p>
            <h3 className="font-bold text-gray-800 text-base">
                {chapter.num}. {chapter.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
                Lanjutkan perjalanan belajarmu ke materi berikutnya
            </p>
        </div>
        <button
            onClick={onGo}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-colors shadow-md shadow-violet-200 whitespace-nowrap flex-shrink-0"
        >
            Lanjut Belajar
            <ArrowRightIcon className="w-4 h-4" />
        </button>
    </div>
);

// ─── Finished Banner ──────────────────────────────────────────────────────────
const FinishedBanner = () => (
    <div className="mt-10 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-500 p-6 text-white text-center shadow-lg shadow-violet-200">
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckIcon className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-bold text-xl mb-1">Selamat! 🎉</h3>
        <p className="text-violet-200 text-sm">
            Kamu telah menyelesaikan semua materi pada kelas ini.
        </p>
        <button className="mt-4 bg-white text-violet-600 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-violet-50 transition-colors">
            Kembali ke Daftar Lesson
        </button>
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ChapterLesson({ auth, material }) {
    const user = auth.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chapterOpen, setChapterOpen] = useState(false);
    const [activeId, setActiveId] = useState(1); // current chapter
    const [completedIds, setCompletedIds] = useState([0]); // ch 0 already done
    const [reachedBottom, setReachedBottom] = useState(false);

    const contentRef = useRef(null);

    const activeChapter = CHAPTERS.find((c) => c.id === activeId);
    const nextChapter = CHAPTERS.find((c) => c.id === activeId + 1);

    // ── Detect scroll-to-bottom ──────────────────────────────────────────────
    useEffect(() => {
        setReachedBottom(false);
    }, [activeId]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        const onScroll = () => {
            const nearBottom =
                el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
            if (nearBottom) setReachedBottom(true);
        };

        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [activeId]);

    // ── Navigate chapter ─────────────────────────────────────────────────────
    const goToChapter = (id) => {
        // Mark current as completed when leaving
        if (!completedIds.includes(activeId)) {
            setCompletedIds((prev) => [...prev, activeId]);
        }
        setActiveId(id);
        setReachedBottom(false);
        contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNextChapter = () => {
        if (!completedIds.includes(activeId)) {
            setCompletedIds((prev) => [...prev, activeId]);
        }
        if (nextChapter) goToChapter(nextChapter.id);
    };

    return (
        <>
            <Head title={`${activeChapter?.title ?? "Chapter"} — Wariku`} />

            <div
                className="min-h-screen bg-gray-50 flex overflow-hidden"
                style={{ height: "100dvh" }}
            >
                {/* ── Left Sidebar (sticky) ────────────────────────────────────── */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* ── Scrollable main + right panel wrapper ────────────────────── */}
                <div className="flex flex-1 min-w-0 overflow-hidden">
                    {/* Center scrollable content */}
                    <main
                        ref={contentRef}
                        className="flex-1 overflow-y-auto px-4 py-6 md:px-8 min-w-0"
                    >
                        {/* Mobile top bar */}
                        <div className="lg:hidden flex items-center justify-between mb-4">
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
                            {/* Mobile chapter toggle */}
                            <button
                                onClick={() => setChapterOpen(true)}
                                className="p-2 rounded-xl hover:bg-violet-50 transition-colors text-violet-500 flex items-center gap-1.5 text-xs font-semibold"
                            >
                                <ListIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">
                                    Chapter
                                </span>
                            </button>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                            <HomeSmIcon className="w-4 h-4 flex-shrink-0" />
                            <Link
                                href="/dashboard"
                                className="hover:text-gray-600 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <span>/</span>
                            <Link
                                href="/lessons"
                                className="hover:text-gray-600 transition-colors"
                            >
                                Lesson
                            </Link>
                            <span>/</span>
                            <span className="text-violet-600 font-semibold">
                                Penjumlahan Dasar
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-violet-600 leading-tight">
                            Penjumlahan Dasar
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 mb-5">
                            Part {activeChapter?.id ?? 1} :{" "}
                            {activeChapter?.title}
                        </p>

                        {/* Hero image */}
                        <MathHeroImage />

                        {/* Content body */}
                        <div className="mt-7 max-w-none">
                            <h2 className="font-bold text-gray-800 text-base mb-4">
                                Overview
                            </h2>
                            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <p key={i}>{LOREM}</p>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA — shown after reaching bottom */}
                        <div
                            className={`transition-all duration-500 ${reachedBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                        >
                            {nextChapter ? (
                                <NextChapterBanner
                                    chapter={nextChapter}
                                    onGo={handleNextChapter}
                                />
                            ) : completedIds.length === CHAPTERS.length - 1 ? (
                                <FinishedBanner />
                            ) : null}
                        </div>

                        <div className="pb-10" />
                    </main>

                    {/* ── Right Chapter Sidebar (sticky) ──────────────────────── */}
                    <div className="hidden lg:block w-80 flex-shrink-0 overflow-y-auto py-6 pr-6 pl-2">
                        <div className="sticky top-6">
                            <ChapterSidebar
                                chapters={CHAPTERS}
                                activeId={activeId}
                                completedIds={completedIds}
                                onSelect={goToChapter}
                                onMobileClose={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="block lg:hidden">
                {/* Mobile Chapter Drawer */}
                <ChapterSidebar
                    chapters={CHAPTERS}
                    activeId={activeId}
                    completedIds={completedIds}
                    onSelect={goToChapter}
                    mobileOpen={chapterOpen}
                    onMobileClose={() => setChapterOpen(false)}
                />
            </div>
        </>
    );
}
