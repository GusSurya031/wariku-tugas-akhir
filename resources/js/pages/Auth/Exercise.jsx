import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { THEME_MAP, DIFF_CONFIG, FILTERS } from "@/constants/Dashboard";
import ProfileCard from "@/components/ProfileCard";
import Sidebar from "@/components/Sidebar";
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
import QuestionIcon from "@/assets/icon/QuestionIcon";
import TrophyIcon from "@/assets/icon/TrophyIcon";
import RefreshIcon from "@/assets/icon/RefreshIcon";
import ExerciseCard from "@/components/ExerciseCard";
import DetailDrawerQuestion from "@/components/DetailDrawerQuestion";

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
            <Head title="Wariku - Exercises" />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
                style={{ height: "100dvh" }}
            >
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    navMain={navMain}
                    navSettings={navSettings}
                />

                <main className="flex-1 overflow-y-auto min-w-0 md:space-y-7">
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
                            <HomeIcon className="w-4 h-4" />
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
                            <span className="md:ml-auto text-xs text-gray-400">
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
                <DetailDrawerQuestion
                    variant={selectedVar}
                    onClose={() => setSelectedVar(null)}
                    themeSlug={themeSlug}
                />
            )}
        </>
    );
}
