import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    THEME_MAP,
    DIFFICULTY_LABEL,
    DIFFICULTY_COLOR,
    FORMAT_DATE,
} from "@/constants/Dashboard";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import RecommendedCard from "@/components/RecommendedCard";
import CourseCard from "@/components/CourseCard";
import JourneyTable from "@/components/JourneyTable";
// Assets
import Logo from "@/assets/icon/logo.svg";
import MenuIcon from "@/assets/icon/MenuIcon";
import SparkleIcon from "@/assets/icon/SparkleIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import HomeIcon from "@/assets/icon/HomeIcon";
import BookIcon from "@/assets/icon/BookIcon";
import PencilIcon from "@/assets/icon/PencilIcon";
import ChartIcon from "@/assets/icon/ChartIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import LogoutIcon from "@/assets/icon/LogoutIcon";


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

export default function Dashboard({
    auth,
    themeDay,
    recommendedMaterials = [],
    allMaterials = [],
    recentAttempts = [],
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth?.user;
    const themeSlug = THEME_MAP[themeDay] ?? null;

    return (
        <>
            <Head title="Wariku - Dashboard" />
            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
            >
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    navMain={navMain}
                    navSettings={navSettings}
                />

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <MenuIcon className="w-5 h-5" />
                        </button>
                        <div className="flex flex-1 justify-center items-center gap-2">
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
                    <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 lg:px-8 space-y-7">
                        {/* Hero */}
                        <HeroBanner user={user?.name} themeDay={themeDay} />

                        {/* Recommended */}
                        <section>
                            <div className="flex items-center gap-2 mb-4">
                                <h2 className="font-bold text-gray-800">
                                    Direkomendasikan Untukmu Hari Ini
                                </h2>
                                <SparkleIcon className="w-4 h-4 text-(--theme-primary)" />
                            </div>
                            {recommendedMaterials.length > 0 ? (
                                <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
                                    {recommendedMaterials.map((item) => (
                                        <RecommendedCard
                                            key={item.id}
                                            materialId={item.material_id}
                                            title={item.title}
                                            difficulty={item.difficulty}
                                            topic={item.topic}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400">
                                    Belum ada rekomendasi. Selesaikan onboarding
                                    terlebih dahulu.
                                </p>
                            )}
                        </section>

                        {/* Explore */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-gray-800">
                                    Jelajahi Materi Lainnya
                                </h2>
                                <Link
                                    href="/lessons"
                                    className="text-sm font-semibold text-(--theme-primary) hover:text-(--theme-secondary) transition-colors"
                                >
                                    See All
                                </Link>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {allMaterials.map((m) => (
                                    <CourseCard
                                        key={m.id}
                                        id={m.id}
                                        title={m.title}
                                        subdesc={m.sub_description}
                                        topic={m.topic}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Journey */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-gray-800">
                                    Perjalanan Belajarmu
                                </h2>
                                <Link
                                    href="/report"
                                    className="text-sm font-semibold text-(--theme-primary) hover:text-(--theme-secondary) transition-colors"
                                >
                                    See All
                                </Link>
                            </div>
                            <JourneyTable rows={recentAttempts} />
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}
