import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { ArrowUpRightIcon } from "./Dashboard";
import Logo from "@/assets/icon/logo.svg";

// ─── Theme map ────────────────────────────────────────────────────────────────
const THEME_MAP = {
    Minggu: "redite",   Senin: "soma",    Selasa: "anggara", Rabu: "buda",
    Kamis:  "wrespati", Jumat: "sukra",   Sabtu:  "saniscara",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const BookIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const PencilIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);
const ChartIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const SettingsIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const LogoutIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);
const MenuIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const XIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
const HomeSmIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
    </svg>
);
const MailIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);
const UserIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const EditIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const ChevronLeftIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const ChevronRightIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────
const PER_PAGE = 5;

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
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
                        <img src={Logo} alt="Logo" className="w-24 md:w-32"/>
                    </div>
                    <button className="ml-auto lg:hidden text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Overview
                        </p>
                        <nav className="space-y-0.5">
                            {navMain.map(({ label, icon: Icon, active, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${active ? "bg-(--theme-soft) text-(--theme-primary)" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? "text-(--theme-primary)" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Settings
                        </p>
                        <nav className="space-y-0.5">
                            {navSettings.map(({ label, icon: Icon, href, danger }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    {...(danger ? { method: "post", as: "button" } : {})}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${danger ? "text-red-400 hover:bg-red-50 hover:text-red-500" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4.5 h-4.5 shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Score badge ──────────────────────────────────────────────────────────────
const ScoreBadge = ({ score }) => {
    const color =
        score >= 85 ? "text-green-600 bg-green-50"
        : score >= 70 ? "text-amber-600 bg-amber-50"
        : "text-red-500 bg-red-50";
    return (
        <span className={`inline-flex items-center justify-center font-black text-sm px-2.5 py-0.5 rounded-lg ${color}`}>
            {score}
        </span>
    );
};

// ─── Pagination ───────────────────────────────────────────────────────────────
const Pagination = ({ current, total, totalItems, onChange }) => {
    if (total <= 0) return null;
    const pages = Array.from({ length: total }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (total <= 5) return pages;
        if (current <= 3) return [...pages.slice(0, 4), "...", total];
        if (current >= total - 2) return [1, "...", ...pages.slice(total - 4)];
        return [1, "...", current - 1, current, current + 1, "...", total];
    };

    const from = Math.min((current - 1) * PER_PAGE + 1, totalItems);
    const to   = Math.min(current * PER_PAGE, totalItems);

    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-4 flex-wrap">
            <p className="text-xs text-gray-400">
                Menampilkan {from}–{to} dari {totalItems} data
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onChange(Math.max(1, current - 1))}
                    disabled={current === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200
                    text-gray-400 hover:border-(--theme-secondary) hover:text-(--theme-primary) disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>

                {getVisiblePages().map((p, i) =>
                    p === "..." ? (
                        <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onChange(p)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all border
                            ${p === current
                                ? "bg-(--theme-primary) text-white border-(--theme-primary) shadow-sm"
                                : "border-gray-200 text-gray-600 hover:border-(--theme-secondary) hover:text-(--theme-primary)"
                            }`}
                        >
                            {p}
                        </button>
                    ),
                )}

                <button
                    onClick={() => onChange(Math.min(total, current + 1))}
                    disabled={current === total}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200
                    text-gray-400 hover:border-(--theme-secondary) hover:text-(--theme-primary) disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

// ─── Info Card ────────────────────────────────────────────────────────────────
const InfoCard = ({ userData }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 h-full">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-(--theme-primary) text-lg">Informasi</h2>
            <Link
                href="/profile"
                className="w-8 h-8 rounded-xl hover:bg-(--theme-soft) flex items-center justify-center transition-colors text-gray-400 hover:text-(--theme-primary)"
            >
                <EditIcon className="w-4 h-4" />
            </Link>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-(--theme-soft) ring-4 ring-(--theme-soft) flex items-center justify-center overflow-hidden">
                <UserIcon className="w-12 h-12 text-(--theme-primary) opacity-40" />
            </div>
            <h3 className="font-bold text-gray-800 text-base">{userData.name}</h3>
        </div>

        {/* Mood & Wariga badges */}
        <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Mood</p>
                <p className="font-bold text-gray-800 text-sm truncate">
                    {userData.mood_label ?? "Belum dicatat"}
                </p>
            </div>
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Sapta Wara</p>
                <p className="font-bold text-gray-800 text-sm truncate">
                    {userData.sapta_wara ?? "Belum diisi"}
                </p>
            </div>
        </div>

        {/* Wuku row */}
        {userData.wuku && (
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Wuku</p>
                <p className="font-bold text-gray-800 text-sm">{userData.wuku}</p>
            </div>
        )}

        {/* Contact details */}
        <div className="space-y-3">
            {[
                { icon: UserIcon, value: userData.fullname },
                { icon: MailIcon, value: userData.email },
            ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="truncate">{value ?? "-"}</span>
                </div>
            ))}
        </div>
    </div>
);

// ─── History Card ─────────────────────────────────────────────────────────────
const HistoryCard = ({ rows, page, totalPages, totalItems, onPageChange }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-full">
        <h2 className="font-bold text-(--theme-primary) text-base">Perjalanan belajarmu</h2>

        <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[480px]">
                <thead>
                    <tr className="border-b border-gray-100">
                        {["Waktu Pengerjaan", "Durasi", "Materi", "Skor", "Action"].map((h) => (
                            <th
                                key={h}
                                className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 first:pl-0 last:pr-0 whitespace-nowrap"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                                Belum ada riwayat latihan soal.
                            </td>
                        </tr>
                    )}

                    {rows.map((row, i) => (
                        <tr
                            key={row.id}
                            className={`border-b last:border-0 transition-colors hover:bg-(--theme-soft)/40
                            ${i % 2 === 0 ? "border-gray-50" : "border-gray-100"}`}
                        >
                            <td className="py-3.5 pr-4 text-xs text-gray-500 whitespace-nowrap">{row.date}</td>
                            <td className="py-3.5 pr-4 text-xs text-gray-500 whitespace-nowrap">{row.duration}</td>
                            <td className="py-3.5 pr-4 text-xs text-gray-700 font-medium whitespace-nowrap">{row.material_title}</td>
                            <td className="py-3.5">
                                <ScoreBadge score={row.score} />
                            </td>
                            <td className="py-3.5 pr-4">
                                <Link
                                    href={`/quiz/result/${row.id}`}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border(--theme-secondary) transition-all group">
                                    <ArrowUpRightIcon className="w-3 h-3 text-gray-400 group-hover:text-(--theme-primary)" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                    {/* Fill empty rows to stabilise height */}
                    {rows.length > 0 && rows.length < PER_PAGE &&
                        Array.from({ length: PER_PAGE - rows.length }).map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b last:border-0 border-gray-50">
                                <td colSpan={5} className="py-3.5" />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        {totalItems > 0 && (
            <Pagination
                current={page}
                total={totalPages}
                totalItems={totalItems}
                onChange={onPageChange}
            />
        )}
    </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Report({ auth, userData = {}, attempts = [], themeDay = null }) {
    const themeSlug = THEME_MAP[themeDay] ?? null;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(attempts.length / PER_PAGE));
    const pageRows   = attempts.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <>
            <Head title="Report" />

            <div
                data-theme={themeSlug}
                className="min-h-screen bg-gray-50 flex"
                style={{ height: "100dvh" }}
            >
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
                            <HomeSmIcon className="w-4 h-4" />
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
