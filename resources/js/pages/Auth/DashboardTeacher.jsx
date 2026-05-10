import { useState, useMemo } from "react";
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
const CalendarIcon = ({ className }) => (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
    </svg>
);
const ExportIcon = ({ className }) => (
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
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
const QuestionMarkIcon = ({ className }) => (
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
const TrendUpIcon = ({ className }) => (
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
    </svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────────
const MOOD_DATA = {
    "2026-04-01": [
        { label: "Semangat", value: 10, color: "#22c55e" },
        { label: "Excited", value: 7, color: "#3b82f6" },
        { label: "Biasa aja", value: 8, color: "#8b5cf6" },
        { label: "Stress", value: 5, color: "#6b7280" },
        { label: "Sedih", value: 3, color: "#ef4444" },
    ],
    "2026-04-02": [
        { label: "Semangat", value: 8, color: "#22c55e" },
        { label: "Excited", value: 9, color: "#3b82f6" },
        { label: "Biasa aja", value: 6, color: "#8b5cf6" },
        { label: "Stress", value: 7, color: "#6b7280" },
        { label: "Sedih", value: 4, color: "#ef4444" },
    ],
    "2026-04-03": [
        { label: "Semangat", value: 12, color: "#22c55e" },
        { label: "Excited", value: 5, color: "#3b82f6" },
        { label: "Biasa aja", value: 9, color: "#8b5cf6" },
        { label: "Stress", value: 3, color: "#6b7280" },
        { label: "Sedih", value: 2, color: "#ef4444" },
    ],
};

const WARIGA_DATA = {
    "2026-04-01": [
        { label: "Guru", value: 10, color: "#22c55e" },
        { label: "Ratu", value: 6, color: "#3b82f6" },
        { label: "Lara", value: 3, color: "#8b5cf6" },
        { label: "Pati", value: 2, color: "#d1d5db" },
    ],
    "2026-04-02": [
        { label: "Guru", value: 8, color: "#22c55e" },
        { label: "Ratu", value: 9, color: "#3b82f6" },
        { label: "Lara", value: 5, color: "#8b5cf6" },
        { label: "Pati", value: 4, color: "#d1d5db" },
    ],
    "2026-04-03": [
        { label: "Guru", value: 14, color: "#22c55e" },
        { label: "Ratu", value: 4, color: "#3b82f6" },
        { label: "Lara", value: 2, color: "#8b5cf6" },
        { label: "Pati", value: 1, color: "#d1d5db" },
    ],
};

const PERFORMANCE_ALL = [
    {
        id: 1,
        name: "Anak Agung Putri",
        attempts: 5,
        progress: 82,
        avgScore: 88,
    },
    { id: 2, name: "Made Bayu", attempts: 4, progress: 75, avgScore: 79 },
    { id: 3, name: "Ni Wayan Sari", attempts: 6, progress: 90, avgScore: 92 },
    {
        id: 4,
        name: "I Kadek Mahendra",
        attempts: 3,
        progress: 60,
        avgScore: 71,
    },
    { id: 5, name: "Putu Dewi", attempts: 7, progress: 95, avgScore: 95 },
    { id: 6, name: "Komang Artha", attempts: 2, progress: 45, avgScore: 63 },
    { id: 7, name: "Nyoman Suka", attempts: 5, progress: 78, avgScore: 82 },
    { id: 8, name: "I Gede Wiranata", attempts: 4, progress: 68, avgScore: 74 },
    { id: 9, name: "Luh Ayu Pertiwi", attempts: 6, progress: 88, avgScore: 90 },
    { id: 10, name: "Wayan Budiana", attempts: 3, progress: 55, avgScore: 67 },
];

const TODAY = "2026-04-01";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const exportToCSV = (date, moodData, warigaData, perfData) => {
    const rows = [
        ["Export Date", date],
        [],
        ["=== MOOD DATA ==="],
        ["Mood", "Count"],
        ...moodData.map((m) => [m.label, m.value]),
        [],
        ["=== WARIGA DATA ==="],
        ["Wariga", "Count"],
        ...warigaData.map((w) => [w.label, w.value]),
        [],
        ["=== PERFORMANCE ==="],
        ["No", "Nama", "Percobaan", "Progress Materi (%)", "Rata-rata Skor"],
        ...perfData.map((p, i) => [
            i + 1,
            p.name,
            p.attempts,
            p.progress,
            p.avgScore,
        ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
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
        { label: "Dashboard", icon: HomeIcon, active: true, href: "#" },
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

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, unit }) => (
    <div className="bg-violet-600 rounded-2xl px-6 py-5 flex flex-col gap-4 min-w-0">
        <p className="text-white font-bold text-base">{label}</p>
        <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-2xl">{value}</span>
            <span className="text-violet-200 text-sm">{unit}</span>
        </div>
    </div>
);

// ─── Bar Chart (pure SVG/CSS) ─────────────────────────────────────────────────
const BarChart = ({ data }) => {
    const max = Math.max(...data.map((d) => d.value), 1);
    const BAR_W = 36;
    const GAP = 20;
    const H = 140;
    const W = data.length * (BAR_W + GAP) - GAP + 40;

    return (
        <div className="w-full overflow-x-auto">
            <svg
                viewBox={`0 0 ${W} ${H + 20}`}
                className="w-full"
                style={{ minWidth: `${W}px`, maxWidth: "100%" }}
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Baseline */}
                <line
                    x1="0"
                    y1={H}
                    x2={W}
                    y2={H}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                />

                {data.map((d, i) => {
                    const barH = Math.max((d.value / max) * (H - 20), 4);
                    const x = i * (BAR_W + GAP) + 20;
                    const y = H - barH;
                    return (
                        <g key={d.label}>
                            <rect
                                x={x}
                                y={y}
                                width={BAR_W}
                                height={barH}
                                fill={d.color}
                                rx="6"
                                ry="6"
                                className="transition-all duration-500"
                            />
                            {/* Value label on top */}
                            <text
                                x={x + BAR_W / 2}
                                y={y - 5}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#6b7280"
                                fontWeight="600"
                            >
                                {d.value}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 px-1">
                {data.map((d) => (
                    <div key={d.label} className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: d.color }}
                        />
                        <span className="text-xs text-gray-500">{d.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Donut Chart (pure SVG) ───────────────────────────────────────────────────
const DonutChart = ({ data }) => {
    const total = data.reduce((s, d) => s + d.value, 0) || 1;
    const R = 56,
        CX = 80,
        CY = 80,
        stroke = 18;
    const circ = 2 * Math.PI * R;

    let offset = 0;
    const arcs = data.map((d) => {
        const pct = d.value / total;
        const dash = pct * circ;
        const arc = { ...d, dash, offset, pct };
        offset += dash;
        return arc;
    });

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
                <svg width="160" height="160" viewBox="0 0 160 160">
                    {/* Track */}
                    <circle
                        cx={CX}
                        cy={CY}
                        r={R}
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth={stroke}
                    />
                    {/* Segments */}
                    {arcs.map((a, i) => (
                        <circle
                            key={i}
                            cx={CX}
                            cy={CY}
                            r={R}
                            fill="none"
                            stroke={a.color}
                            strokeWidth={stroke}
                            strokeDasharray={`${a.dash} ${circ - a.dash}`}
                            strokeDashoffset={-a.offset + circ / 4}
                            strokeLinecap="butt"
                            style={{ transition: "stroke-dasharray 0.5s ease" }}
                        />
                    ))}
                    {/* Center label */}
                    <text
                        x={CX}
                        y={CY - 4}
                        textAnchor="middle"
                        fontSize="22"
                        fontWeight="900"
                        fill="#1f2937"
                    >
                        {total}
                    </text>
                    <text
                        x={CX}
                        y={CY + 14}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#9ca3af"
                    >
                        total
                    </text>
                </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
                {data.map((d) => (
                    <div
                        key={d.label}
                        className="flex items-center justify-between gap-3"
                    >
                        <div className="flex items-center gap-2 min-w-0">
                            <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ background: d.color }}
                            />
                            <span className="text-sm text-gray-600 truncate">
                                {d.label}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-sm font-bold text-gray-800">
                                {d.value}
                            </span>
                            <span className="text-xs text-gray-400 w-8 text-right">
                                {Math.round(
                                    (d.value /
                                        (data.reduce(
                                            (s, x) => s + x.value,
                                            0,
                                        ) || 1)) *
                                        100,
                                )}
                                %
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
                style={{
                    width: `${value}%`,
                    background:
                        value >= 80
                            ? "#22c55e"
                            : value >= 60
                              ? "#f59e0b"
                              : "#ef4444",
                }}
            />
        </div>
        <span className="text-xs font-semibold text-gray-600 w-8 text-right">
            {value}%
        </span>
    </div>
);

// ─── Score Badge ──────────────────────────────────────────────────────────────
const ScoreBadge = ({ score }) => {
    const cls =
        score >= 85
            ? "text-green-600 bg-green-50"
            : score >= 70
              ? "text-amber-600 bg-amber-50"
              : "text-red-500 bg-red-50";
    return (
        <span
            className={`inline-flex font-black text-sm px-2.5 py-0.5 rounded-lg ${cls}`}
        >
            {score}
        </span>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TeacherDashboard({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterDate, setFilterDate] = useState(TODAY);
    const [showPicker, setShowPicker] = useState(false);
    const userName = auth?.user?.name ?? "Guru";

    // Get data for selected date, fall back to first available
    const availableDates = Object.keys(MOOD_DATA);
    const resolvedDate = MOOD_DATA[filterDate] ? filterDate : availableDates[0];
    const moodData = MOOD_DATA[resolvedDate] ?? MOOD_DATA[availableDates[0]];
    const warigaData =
        WARIGA_DATA[resolvedDate] ?? WARIGA_DATA[availableDates[0]];

    // Stats
    const totalStudents = PERFORMANCE_ALL.length;
    const totalMaterials = 30;
    const totalQuestions = 120;

    const handleExport = () => {
        exportToCSV(filterDate, moodData, warigaData, PERFORMANCE_ALL);
    };

    return (
        <>
            <Head title="Dashboard — Guru" />

            <div
                className="min-h-screen bg-gray-50 flex"
                style={{ height: "100dvh" }}
            >
                {/* Sticky sidebar */}
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Scrollable main */}
                <main className="flex-1 overflow-y-auto min-w-0">
                    {/* Mobile topbar */}
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

                    <div className="px-4 py-6 md:px-8 space-y-7 pb-12">
                        {/* ── Hero greeting ──────────────────────────────────────── */}
                        <div>
                            <h1 className="font-bold text-gray-900 text-xl md:text-2xl">
                                Selamat pagi, {userName}! 🌤️
                            </h1>
                            <p className="text-gray-500 text-sm mt-1">
                                Siap analisis hasil belajar siswamu hari ini?
                            </p>
                        </div>

                        {/* ── Stat cards ─────────────────────────────────────────── */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <StatCard
                                icon={UsersIcon}
                                label="Student"
                                value={totalStudents}
                                unit="users"
                            />
                            <StatCard
                                icon={BookIcon}
                                label="Materials"
                                value={totalMaterials}
                                unit="materials"
                            />
                            <StatCard
                                icon={QuestionMarkIcon}
                                label="Question"
                                value={totalQuestions}
                                unit="questions"
                            />
                        </div>

                        {/* ── Section header ─────────────────────────────────────── */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <h2 className="font-bold text-violet-600 text-base flex-1">
                                Analisis Mood dan Wariga User
                            </h2>

                            {/* Date filter */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowPicker((p) => !p)}
                                    className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-2 text-sm text-gray-600 hover:border-violet-300 hover:text-violet-600 transition-all shadow-sm"
                                >
                                    <CalendarIcon className="w-4 h-4" />
                                    <span className="font-medium whitespace-nowrap">
                                        {filterDate
                                            ? fmt(filterDate)
                                            : "Pilih Tanggal"}
                                    </span>
                                </button>

                                {showPicker && (
                                    <div className="absolute right-0 top-full mt-2 z-30 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 min-w-[200px]">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                                            Pilih Tanggal
                                        </p>
                                        <input
                                            type="date"
                                            value={filterDate}
                                            onChange={(e) => {
                                                setFilterDate(e.target.value);
                                                setShowPicker(false);
                                            }}
                                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-300"
                                        />
                                        <div className="mt-3 space-y-1">
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                                Quick picks
                                            </p>
                                            {availableDates.map((d) => (
                                                <button
                                                    key={d}
                                                    onClick={() => {
                                                        setFilterDate(d);
                                                        setShowPicker(false);
                                                    }}
                                                    className={`w-full text-left text-xs px-3 py-1.5 rounded-lg transition-colors
                            ${filterDate === d ? "bg-violet-100 text-violet-700 font-semibold" : "hover:bg-gray-50 text-gray-600"}`}
                                                >
                                                    {fmt(d)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Export button */}
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors shadow-md shadow-violet-200 whitespace-nowrap"
                            >
                                <ExportIcon className="w-4 h-4" />
                                Export
                            </button>
                        </div>

                        {/* ── Charts row ─────────────────────────────────────────── */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/* Bar chart — Mood */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-violet-600 text-sm mb-1">
                                    Mood Student
                                </h3>
                                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                                    Kondisi mood siswa ketika menggunakan sistem
                                    pada hari tertentu (
                                    {filterDate === TODAY
                                        ? "Today"
                                        : fmt(filterDate)}
                                    )
                                </p>
                                <BarChart data={moodData} />
                            </div>

                            {/* Donut chart — Wariga */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <h3 className="font-bold text-violet-600 text-sm mb-1">
                                    Kondisi Wariga
                                </h3>
                                <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                                    Kondisi wariga siswa ketika menggunakan
                                    sistem pada hari tertentu (
                                    {filterDate === TODAY
                                        ? "Today"
                                        : fmt(filterDate)}
                                    )
                                </p>
                                <DonutChart data={warigaData} />
                            </div>
                        </div>

                        {/* ── Top Performance table ───────────────────────────────── */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h3 className="font-bold text-violet-600 text-sm">
                                        Top Performance User
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Performa siswa berdasarkan rata-rata
                                        skor dan progres materi
                                    </p>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                                    <TrendUpIcon className="w-3.5 h-3.5" />
                                    Live
                                </div>
                            </div>

                            <div className="overflow-x-auto -mx-2 px-2">
                                <table className="w-full text-sm min-w-[560px]">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            {[
                                                "No",
                                                "Nama Siswa",
                                                "Percobaan",
                                                "Progres Materi",
                                                "Rata-rata Skor",
                                            ].map((h) => (
                                                <th
                                                    key={h}
                                                    className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 pb-3 pr-4 last:pr-0 first:pl-0 whitespace-nowrap"
                                                >
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {PERFORMANCE_ALL.slice()
                                            .sort(
                                                (a, b) =>
                                                    b.avgScore - a.avgScore,
                                            )
                                            .map((p, i) => (
                                                <tr
                                                    key={p.id}
                                                    className="border-b border-gray-50 last:border-0 hover:bg-violet-50/30 transition-colors"
                                                >
                                                    <td className="py-3.5 pr-4 text-xs text-gray-400 font-medium">
                                                        {i === 0
                                                            ? "🥇"
                                                            : i === 1
                                                              ? "🥈"
                                                              : i === 2
                                                                ? "🥉"
                                                                : `${i + 1}`}
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-200 to-violet-400 flex items-center justify-center flex-shrink-0">
                                                                <span className="text-white text-[10px] font-bold">
                                                                    {p.name[0]}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                                                {p.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3.5 pr-4">
                                                        <span className="text-sm font-bold text-gray-700">
                                                            {p.attempts}×
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 pr-4 min-w-[130px]">
                                                        <ProgressBar
                                                            value={p.progress}
                                                        />
                                                    </td>
                                                    <td className="py-3.5">
                                                        <ScoreBadge
                                                            score={p.avgScore}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Close picker on outside click */}
            {showPicker && (
                <div
                    className="fixed inset-0 z-20"
                    onClick={() => setShowPicker(false)}
                />
            )}
        </>
    );
}
