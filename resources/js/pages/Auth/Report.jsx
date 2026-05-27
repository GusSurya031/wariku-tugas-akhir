import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { THEME_MAP } from "@/constants/Dashboard";
// Components
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";
import ScoreBadge from "@/components/ScoreBadge";
import InfoCard from "@/components/InfoCard";
import HistoryCard from "@/components/HistoryCard";
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
import XIcon from "@/assets/icon/XIcon";
import MailIcon from "@/assets/icon/MailIcon";
import UserIcon from "@/assets/icon/UserIcon";
import EditIcon from "@/assets/icon/EditIcon";

const PER_PAGE = 5;

const navMain = [
    { label: "Dashboard", icon: HomeIcon, href: "/dashboard" },
    { label: "Lesson",    icon: BookIcon, href: "/lessons" },
    { label: "Exercise",  icon: PencilIcon, href: "/exercise" },
    { label: "Report",    icon: ChartIcon,  href: "/report", active: true },
];
const navSettings = [
    { label: "Profile", icon: SettingsIcon, href: "/profile" },
    { label: "Logout",  icon: LogoutIcon,   href: "/logout", danger: true },
];


export default function Report({ auth, userData = {}, attempts = [], themeDay = null }) {
    const themeSlug = THEME_MAP[themeDay] ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(attempts.length / PER_PAGE));
    const pageRows   = attempts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <>
            <Head title="Wariku - Report" />

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

                <main className="flex-1 overflow-y-auto min-w-0">
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
                        <img src={Logo} alt="Logo" className="w-24 md:w-32"/>
                    </div>
                    </div>

                    <div className="px-4 py-6 md:px-8">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
                            <HomeIcon className="w-4 h-4" />
                            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">
                                Dashboard
                            </Link>
                            <span>/</span>
                            <span className="text-(--theme-primary) font-semibold">Report</span>
                        </div>

                        {/* Two-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-[minmax(260px,320px)_1fr] gap-5 items-start pb-10">
                            <InfoCard userData={userData} />
                            <HistoryCard
                                rows={pageRows}
                                page={page}
                                totalPages={totalPages}
                                totalItems={attempts.length}
                                onPageChange={setPage}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
