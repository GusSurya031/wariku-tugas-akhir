import { useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";

// ─── Theme mapping ────────────────────────────────────────────────────────────
const THEME_MAP = {
    Minggu: "redite",
    Senin: "soma",
    Selasa: "anggara",
    Rabu: "buda",
    Kamis: "wrespati",
    Jumat: "sukra",
    Sabtu: "saniscara",
};

const MOOD_COLORS = ["#22c55e", "#3b82f6", "#8b5cf6", "#6b7280", "#ef4444", "#f59e0b", "#ec4899"];
const WARIGA_COLORS = { Guru: "#22c55e", Ratu: "#3b82f6", Lara: "#8b5cf6", Pati: "#d1d5db" };

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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
const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
const ExportIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);
const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const BookIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);
const QuestionMarkIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const TrendUpIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("id-ID", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
};

const exportToCSV = (date, exportRows) => {
    if (!exportRows || exportRows.length === 0) {
        alert("Tidak ada data untuk tanggal ini.");
        return;
    }
    const headers = ["Nama", "Kondisi Mood", "Level Mood", "Score Performance", "Rekomendasi", "Kondisi Wariga"];
    const csvRows = [
        headers.join(","),
        ...exportRows.map((r) =>
            [
                `"${r.user_name}"`,
                `"${r.mood_label}"`,
                r.mood_level,
                r.score_performance,
                `"${r.recommendation_rule}"`,
                `"${r.wariga_condition}"`,
            ].join(",")
        ),
    ];
    const csv = "﻿" + csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wariku-report-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        { label: "Dashboard", icon: HomeIcon, active: true, href: "/dashboard/teacher" },
    ];
    const navBottom = [
        { label: "Profile", icon: SettingsIcon, href: "/profile" },
        { label: "Logout", icon: LogoutIcon, href: "/logout", danger: true },
    ];

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />
            )}
            <aside
                className={`fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 transition-transform duration-300
                lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:z-auto
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center gap-2 mb-8 px-1">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✦</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg tracking-tight">Wariku</span>
                    <button className="ml-auto lg:hidden text-gray-400 hover:text-gray-600" onClick={onClose}>
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Overview</p>
                        <nav className="space-y-0.5">
                            {navMain.map(({ label, icon: Icon, active, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${active ? "bg-(--theme-soft) text-(--theme-primary)" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4 h-4 shrink-0 ${active ? "text-(--theme-primary)" : "text-gray-400 group-hover:text-gray-600"}`} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">Settings</p>
                        <nav className="space-y-0.5">
                            {navBottom.map(({ label, icon: Icon, href, danger }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    {...(danger ? { method: "post", as: "button" } : {})}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                    ${danger ? "text-red-400 hover:bg-red-50" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                >
                                    <Icon className={`w-4 h-4 shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`} />
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

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, unit }) => (
    <div className="rounded-2xl px-6 py-5 flex flex-col gap-4 min-w-0" style={{ background: "var(--theme-gradient)" }}>
        <p className="text-white font-bold text-base">{label}</p>
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-2xl">{value}</span>
            <span className="text-white/70 text-sm">{unit}</span>
        </div>
    </div>
);

// ─── Bar Chart ────────────────────────────────────────────────────────────────
const BarChart = ({ data }) => {
    const max = Math.max(...data.map((d) => d.value), 1);
    const BAR_W = 12, GAP = 20, H = 64;
    const W = data.length * (BAR_W + GAP) - GAP + 40;

    if (data.length === 0) {
        return <p className="text-xs text-gray-400 py-8 text-center">Tidak ada data mood untuk tanggal ini.</p>;
    }

    return (
        <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{ minWidth: `${W}px`, maxWidth: "100%" }} preserveAspectRatio="xMidYMid meet">
                <line x1="0" y1={H} x2={W} y2={H} stroke="#e5e7eb" strokeWidth="1" />
                {data.map((d, i) => {
                    const barH = Math.max((d.value / max) * (H - 20), 4);
                    const x = i * (BAR_W + GAP) + 20;
                    const y = H - barH;
                    return (
                        <g key={d.label}>
                            <rect x={x} y={y} width={BAR_W} height={barH} fill={d.color} className="transition-all duration-500" />
                            <text x={x + BAR_W / 2} y={y - 5} textAnchor="middle" fontSize="6" fill="#6b7280" fontWeight="600">{d.value}</text>
                        </g>
                    );
                })}
            </svg>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 px-1">
                {data.map((d) => (
                    <div key={d.label} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
                        <span className="text-xs text-gray-500">{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Donut Chart ──────────────────────────────────────────────────────────────
const DonutChart = ({ data }) => {
    if (data.length === 0) {
        return <p className="text-xs text-gray-400 py-8 text-center">Tidak ada data wariga untuk tanggal ini.</p>;
    }

    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const R = 56, CX = 80, CY = 80, stroke = 18;
    const circ = 2 * Math.PI * R;

    let offset = 0;
    const arcs = data.map((d) => {
        const dash = (d.value / total) * circ;
        const arc = { ...d, dash, offset };
        offset += dash;
        return arc;
    });

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative shrink-0">
                <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
                    {arcs.map((a, i) => (
                        <circle key={i} cx={CX} cy={CY} r={R} fill="none" stroke={a.color} strokeWidth={stroke}
                            strokeDasharray={`${a.dash} ${circ - a.dash}`}
                            strokeDashoffset={-a.offset + circ / 4}
                            strokeLinecap="butt"
                            style={{ transition: "stroke-dasharray 0.5s ease" }}
                        />
                    ))}
                    <text x={CX} y={CY - 4} textAnchor="middle" fontSize="22" fontWeight="900" fill="#1f2937">{total}</text>
                    <text x={CX} y={CY + 14} textAnchor="middle" fontSize="10" fill="#9ca3af">total</text>
                </svg>
            </div>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
                {data.map((d) => (
                    <div key={d.label} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                            <span className="text-sm text-gray-600 truncate">{d.label}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-sm font-bold text-gray-800">{d.value}</span>
                            <span className="text-xs text-gray-400 w-8 text-right">
                                {Math.round((d.value / (data.reduce((s, x) => s + x.value, 0) || 1)) * 100)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ value }) => (
    <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${value}%`, background: value >= 80 ? "#22c55e" : value >= 60 ? "#f59e0b" : "#ef4444" }}
            />
        </div>
        <span className="text-xs font-semibold text-gray-600 w-8 text-right">{value}%</span>
    </div>
);

// ─── Score Badge ──────────────────────────────────────────────────────────────
const ScoreBadge = ({ score }) => {
    const cls = score >= 85 ? "text-green-600 bg-green-50" : score >= 70 ? "text-amber-600 bg-amber-50" : "text-red-500 bg-red-50";
    return <span className={`inline-flex font-black text-sm px-2.5 py-0.5 rounded-lg ${cls}`}>{score}</span>;
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TeacherDashboard({
    auth,
    themeDay = null,
    stats = { totalStudents: 0, totalMaterials: 0, totalQuestions: 0 },
    moodByDate = {},
    warigaByDate = {},
    availableDates = [],
    exportByDate = {},
    performanceGeneral = [],
    performanceByMaterial = {},
    materials = [],
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState("");

    const themeSlug = THEME_MAP[themeDay] ?? null;
    const userName = auth?.user?.fullname ?? auth?.user?.name ?? "Guru";

    const todayStr = new Date().toISOString().split("T")[0];
    const defaultDate = useMemo(
        () => (availableDates.includes(todayStr) ? todayStr : (availableDates[availableDates.length - 1] ?? todayStr)),
        [],
    );
    const [filterDate, setFilterDate] = useState(defaultDate);

    const moodData = useMemo(
        () => (moodByDate[filterDate] ?? []).map((d, i) => ({ ...d, color: MOOD_COLORS[i % MOOD_COLORS.length] })),
        [moodByDate, filterDate],
    );

    const warigaData = useMemo(
        () => (warigaByDate[filterDate] ?? []).map((d) => ({ ...d, color: WARIGA_COLORS[d.label] ?? "#9ca3af" })),
        [warigaByDate, filterDate],
    );

    const currentPerformance = useMemo(
        () => (selectedMaterial ? (performanceByMaterial[selectedMaterial]?.rows ?? []) : performanceGeneral),
        [selectedMaterial, performanceGeneral, performanceByMaterial],
    );

    const handleExport = () => exportToCSV(filterDate, exportByDate[filterDate] ?? []);

    return (
        <>
            <Head title="Dashboard — Guru" />

            <div data-theme={themeSlug} className="min-h-screen bg-gray-50 flex" style={{ height: "100dvh" }}>
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <main className="flex-1 overflow-y-auto min-w-0">
                    {/* Mobile topbar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
                            <MenuIcon className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">✦</span>
                            </div>
                            <span className="font-bold text-gray-900">Wariku</span>
                        </div>
                    </div>

                    <div className="px-4 py-6 md:px-8 space-y-7 pb-12">
                        {/* ── Hero ───────────────────────────────────────────── */}
                        <div>
                            <h1 className="font-bold text-gray-900 text-xl md:text-2xl">
                                Selamat datang, {userName}!
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Siap analisis hasil belajar siswamu hari ini?
                            </p>
                        </div>

                        {/* ── Stat cards ─────────────────────────────────────── */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard icon={UsersIcon} label="Student" value={stats.totalStudents} unit="users" />
                            <StatCard icon={BookIcon} label="Materi" value={stats.totalMaterials} unit="materi" />
                            <StatCard icon={QuestionMarkIcon} label="Soal" value={stats.totalQuestions} unit="soal" />
                        </div>

                        {/* ── Section header: charts ─────────────────────────── */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <h2 className="font-bold text-(--theme-primary) text-base flex-1">
                                Analisis Mood dan Wariga User
                            </h2>

                            {/* Date filter */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowPicker((p) => !p)}
                                    className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2 text-sm text-gray-600 hover:border-(--theme-secondary) hover:text-(--theme-primary) transition-all shadow-sm"
                                >
                                    <CalendarIcon className="w-4 h-4" />
                                    <span className="font-medium whitespace-nowrap">
                                        {filterDate ? fmt(filterDate) : "Pilih Tanggal"}
                                    </span>
                                </button>

                                {showPicker && (
                                    <div className="absolute right-0 top-full mt-2 z-30 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 min-w-50">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Pilih Tanggal</p>
                                        <input
                                            type="date"
                                            value={filterDate}
                                            onChange={(e) => { setFilterDate(e.target.value); setShowPicker(false); }}
                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-(--theme-secondary)"
                                        />
                                        {availableDates.length > 0 && (
                                            <div className="mt-3 space-y-1">
                                                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Quick picks</p>
                                                {availableDates.slice(-5).map((d) => (
                                                    <button
                                                        key={d}
                                                        onClick={() => { setFilterDate(d); setShowPicker(false); }}
                                                        className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors
                                                        ${filterDate === d ? "bg-(--theme-soft) text-(--theme-primary) font-semibold" : "hover:bg-gray-50 text-gray-600"}`}
                                                    >
                                                        {fmt(d)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Export button */}
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-opacity hover:opacity-90 shadow-md whitespace-nowrap"
                                style={{ background: "var(--theme-gradient)" }}
                            >
                                <ExportIcon className="w-4 h-4" />
                                Export
                            </button>
                        </div>

                        {/* ── Charts row ─────────────────────────────────────── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-(--theme-primary) text-sm mb-1">Mood Student</h3>
                                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                                    Kondisi mood siswa pada {fmt(filterDate) || filterDate}
                                </p>
                                <BarChart data={moodData} />
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-(--theme-primary) text-sm mb-1">Kondisi Wariga</h3>
                                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                                    Kondisi wariga siswa pada {fmt(filterDate) || filterDate}
                                </p>
                                <DonutChart data={warigaData} />
                            </div>
                        </div>

                        {/* ── Top Performance table ───────────────────────────── */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-5">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-(--theme-primary) text-sm">Top Performance User</h3>
                                        <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                                            <TrendUpIcon className="w-3.5 h-3.5" />
                                            Live
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Performa siswa berdasarkan rata-rata skor dan progres materi
                                    </p>
                                </div>

                                {/* Material filter */}
                                <select
                                    value={selectedMaterial}
                                    onChange={(e) => setSelectedMaterial(e.target.value)}
                                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-(--theme-secondary) bg-white"
                                >
                                    <option value="">Semua Materi</option>
                                    {materials.map((m) => (
                                        <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                            </div>

                            {currentPerformance.length === 0 ? (
                                <p className="text-xs text-gray-400 py-8 text-center">Belum ada data performa siswa.</p>
                            ) : (
                                <div className="overflow-x-auto -mx-2 px-2">
                                    <table className="w-full text-sm min-w-140">
                                        <thead>
                                            <tr className="border-b border-gray-100">
                                                {[
                                                    "No",
                                                    "Nama Siswa",
                                                    "Percobaan",
                                                    ...(selectedMaterial
                                                        ? ["Skor Tertinggi", "Rata-rata Skor"]
                                                        : ["Progres Materi", "Rata-rata Skor", "Avg Score Perf."]),
                                                ].map((h) => (
                                                    <th key={h} className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 pb-3 pr-4 last:pr-0 first:pl-0 whitespace-nowrap">
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPerformance.map((p, i) => (
                                                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-(--theme-soft)/30 transition-colors">
                                                    <td className="py-3.5 pr-4 text-xs text-gray-400 font-medium">
                                                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <div className="flex items-center gap-2.5">
                                                            <div
                                                                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                                                                style={{ background: "var(--theme-gradient)" }}
                                                            >
                                                                <span className="text-white text-[10px] font-bold">{p.name?.[0] ?? "?"}</span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{p.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <span className="text-sm font-bold text-gray-700">{p.attempts}×</span>
                                                    </td>
                                                    {selectedMaterial ? (
                                                        <>
                                                            <td className="py-3.5 pr-4">
                                                                <ScoreBadge score={p.highest_score ?? 0} />
                                                            </td>
                                                            <td className="py-3.5">
                                                                <ScoreBadge score={p.avg_score} />
                                                            </td>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <td className="py-3.5 pr-4 min-w-32.5">
                                                                <ProgressBar value={p.progress} />
                                                            </td>
                                                            <td className="py-3.5 pr-4">
                                                                <ScoreBadge score={p.avg_score} />
                                                            </td>
                                                            <td className="py-3.5">
                                                                <ScoreBadge score={p.avg_score_performance ?? 0} />
                                                            </td>
                                                        </>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            {showPicker && <div className="fixed inset-0 z-20" onClick={() => setShowPicker(false)} />}
        </>
    );
}
