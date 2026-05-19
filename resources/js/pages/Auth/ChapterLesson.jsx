import { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import MaterialContent from "@/components/MaterialContent";
import "@/../css/wariku_module_illustration_unified.css";
import { THEME_MAP } from "@/constants/Dashboard";
import HomeIcon from "@/assets/icon/HomeIcon";
import BookIcon from "@/assets/icon/BookIcon";
import PencilIcon from "@/assets/icon/PencilIcon";
import ChartIcon from "@/assets/icon/ChartIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import LogoutIcon from "@/assets/icon/LogoutIcon";
import SearchIcon from "@/assets/icon/SearchIcon";
import XIcon from "@/assets/icon/XIcon";
import CheckIcon from "@/assets/icon/CheckIcon";
import ListIcon from "@/assets/icon/ListIcon";
import MenuIcon from "@/assets/icon/MenuIcon";
import Logo from "@/assets/icon/logo.svg";
import MathHeroImage from "@/components/MathHeroImage";
import Sidebar from "@/components/Sidebar";
import ChapterSidebar from "@/components/ChapterSidebar";
import NextChapterBanner from "@/components/NextChapterBanner";
import QuizCTA from "@/components/QuizCTA";

const navMain = [
    { label: "Dashboard", icon: HomeIcon, href: "/dashboard" },
    { label: "Lesson", icon: BookIcon, active: true, href: "/lessons" },
    { label: "Exercise", icon: PencilIcon, href: "/exercise" },
    { label: "Report", icon: ChartIcon, href: "/report" },
];
const navSettings = [
    { label: "Profile", icon: SettingsIcon, href: "/profile" },
    { label: "Logout", icon: LogoutIcon, href: "/logout", danger: true },
];

export default function ChapterLesson({ auth, variant, themeDay = null }) {
    const user = auth.user;
    const chapters = variant.chapters ?? [];
    const themeSlug = THEME_MAP[themeDay] ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chapterOpen, setChapterOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [completedIdxs, setCompletedIdxs] = useState([]);
    const [reachedBottom, setReachedBottom] = useState(false);

    const contentRef = useRef(null);

    const activeChapter = chapters[activeIdx];
    const nextChapter = chapters[activeIdx + 1] ?? null;
    const isLastChapter = activeIdx === chapters.length - 1;

    useEffect(() => {
        setReachedBottom(false);
    }, [activeIdx]);

    useEffect(() => {
        if (chapters.length === 0) return;
        axios
            .post(`/lessons/${variant.id}/progress`, {
                chapter_index: activeIdx,
                total_chapters: chapters.length,
            })
            .catch(() => {});
    }, [activeIdx]);

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const onScroll = () => {
            if (el.scrollTop + el.clientHeight >= el.scrollHeight - 80)
                setReachedBottom(true);
        };
        el.addEventListener("scroll", onScroll);
        return () => el.removeEventListener("scroll", onScroll);
    }, [activeIdx]);

    const goToChapter = (idx) => {
        if (!completedIdxs.includes(activeIdx)) {
            setCompletedIdxs((prev) => [...prev, activeIdx]);
        }
        setActiveIdx(idx);
        setReachedBottom(false);
        contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleNextChapter = () => {
        if (!completedIdxs.includes(activeIdx)) {
            setCompletedIdxs((prev) => [...prev, activeIdx]);
        }
        if (nextChapter) goToChapter(activeIdx + 1);
    };

    const diffBadge =
        { easy: "Mudah", medium: "Menengah", hard: "Lanjutan" }[
            variant.difficulty_level
        ] ?? variant.difficulty_level;
    const typeBadge =
        variant.learning_type === "illustration" ? "Ilustrasi" : "Teks";

    const materialSlug = variant.material.title
        .toLowerCase()
        .replace(/[\/\s]+/g, "-");

    return (
        <>
            <Head
                title={`${activeChapter?.title ?? "Chapter"} — ${variant.material.title}`}
            />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex overflow-hidden"
                style={{ height: "100dvh" }}
            >
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    navMain={navMain}
                    navSettings={navSettings}
                />

                <div className="flex flex-1 min-w-0 overflow-hidden">
                    {/* Scrollable center */}
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
                                {/* Logo */}
                                <div className="flex flex-1 items-center gap-2">
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="w-24 md:w-32"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setChapterOpen(true)}
                                className="p-2 rounded-xl hover:bg-(--theme-soft) transition-colors text-(--theme-primary) flex items-center gap-1.5 text-xs font-semibold"
                            >
                                <ListIcon className="w-5 h-5" />
                                <span className="hidden sm:inline">
                                    Chapter
                                </span>
                            </button>
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5 flex-wrap">
                            <HomeIcon className="w-4 h-4 shrink-0" />
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
                            <span className="text-(--theme-primary) font-semibold">
                                {variant.material.title}
                            </span>
                        </div>

                        {/* Title + badges */}
                        <div className="mb-2 flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-semibold bg-(--theme-soft) text-(--theme-primary) px-2.5 py-1 rounded-full">
                                {diffBadge}
                            </span>
                            <span className="text-xs font-semibold bg-(--theme-soft) text-(--theme-primary) px-2.5 py-1 rounded-full opacity-70">
                                {typeBadge}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-(--theme-primary) leading-tight">
                            {variant.material.title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 mb-5">
                            Bab {activeChapter?.order_number ?? 1}:{" "}
                            {activeChapter?.title}
                        </p>

                        <MathHeroImage />

                        <div className="mt-7 max-w-none">
                            <h2 className="font-bold text-gray-800 text-base mb-4">
                                {activeChapter?.title}
                            </h2>

                            {activeChapter?.content ? (
                                variant.learning_type === "illustration" ? (
                                    <MaterialContent
                                        className={`material-illustration module-theme-${materialSlug}`}
                                        html={activeChapter?.content}
                                    />
                                ) : (
                                    <MaterialContent
                                        className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-8 prose-img:rounded-xl prose-table:overflow-hidden"
                                        html={activeChapter?.content}
                                    />
                                )
                            ) : (
                                <p className="text-gray-400">
                                    Konten belum tersedia.
                                </p>
                            )}
                        </div>

                        {/* Bottom CTA */}
                        <div
                            className={`transition-all duration-500 ${reachedBottom ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                        >
                            {!isLastChapter ? (
                                <NextChapterBanner
                                    chapter={nextChapter}
                                    onGo={handleNextChapter}
                                />
                            ) : (
                                <QuizCTA
                                    variantId={variant.id}
                                    difficulty={variant.difficulty_level}
                                />
                            )}
                        </div>

                        <div className="pb-10" />
                    </main>

                    {/* Right chapter sidebar */}
                    <div className="hidden lg:block w-80 shrink-0 overflow-y-auto py-6 pr-6 pl-2">
                        <div className="sticky top-6">
                            <ChapterSidebar
                                chapters={chapters}
                                activeIdx={activeIdx}
                                completedIdxs={completedIdxs}
                                onSelect={goToChapter}
                                onMobileClose={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile chapter drawer */}
            <div className="block lg:hidden" data-theme={themeSlug}>
                <ChapterSidebar
                    chapters={chapters}
                    activeIdx={activeIdx}
                    completedIdxs={completedIdxs}
                    onSelect={goToChapter}
                    mobileOpen={chapterOpen}
                    onMobileClose={() => setChapterOpen(false)}
                />
            </div>
        </>
    );
}
