import { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
// Assets
import Logo from "@/assets/icon/logo.svg";
import MenuIcon from "@/assets/icon/MenuIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import HomeIcon from "@/assets/icon/HomeIcon";
import BookIcon from "@/assets/icon/BookIcon";
import PencilIcon from "@/assets/icon/PencilIcon";
import ChartIcon from "@/assets/icon/ChartIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import LogoutIcon from "@/assets/icon/LogoutIcon";
import SearchIcon from "@/assets/icon/SearchIcon";
import XIcon from "@/assets/icon/XIcon";
import ClockIcon from "@/assets/icon/ClockIcon";
import PlayIcon from "@/assets/icon/PlayIcon";
import CheckCircleIcon from "@/assets/icon/CheckCircleIcon";
// Components
import MaterialContent from "@/components/MaterialContent";
import DetailDrawer from "@/components/DetailDrawer";
import Sidebar from "@/components/Sidebar";
import MathThumbnail from "@/components/MathThumbnail";
import CourseCard from "@/components/CourseCard";
import ProfileCard from "@/components/ProfileCard";
import { THEME_MAP } from "@/constants/Dashboard";

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
            <Head title="Wariku - Lessons" />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
            >
                {/* Sticky Sidebar */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    navMain={navMain}
                    navSettings={navSettings}
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
                            <HomeIcon className="w-4 h-4 text-gray-400" />
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10">
                                {filtered.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        title={course.title}
                                        subdesc={course.sub_description}
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
