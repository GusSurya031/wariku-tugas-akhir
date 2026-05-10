import { Head, Link } from "@inertiajs/react";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowLeftIcon = ({ className }) => (
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
            d="M15 19l-7-7 7-7"
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
const CheckCircleIcon = ({ className }) => (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
const XCircleIcon = ({ className }) => (
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
const SparklesIcon = ({ className }) => (
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
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
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
const LayersIcon = ({ className }) => (
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
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        />
    </svg>
);
const RefreshIcon = ({ className }) => (
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
    </svg>
);
const TrophyIcon = ({ className }) => (
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
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
    </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getScoreColor = (score) => {
    if (score >= 85)
        return {
            stroke: "#22c55e",
            text: "text-green-500",
            label: "Sangat Baik",
            bg: "bg-green-50",
        };
    if (score >= 70)
        return {
            stroke: "#f59e0b",
            text: "text-amber-500",
            label: "Baik",
            bg: "bg-amber-50",
        };
    if (score >= 55)
        return {
            stroke: "#8b5cf6",
            text: "text-violet-500",
            label: "Cukup",
            bg: "bg-violet-50",
        };
    return {
        stroke: "#ef4444",
        text: "text-red-500",
        label: "Perlu Latihan",
        bg: "bg-red-50",
    };
};

// Translate the raw DB rule string into a human-readable recommendation
const parseAnalysis = (raw) => {
    // raw example: "Kluster A + mood positif (3) + catur bekel guru/ratu → teks, bobot medium, soal mix_easy_medium"
    const clusterMatch = raw.match(/Kluster\s+(\w+)/i);
    const moodMatch = raw.match(/mood\s+(\w+)\s*\((\d+)\)/i);
    const warigaMatch = raw.match(/catur bekel\s+([\w/]+)/i);
    const bobot = raw.match(/bobot\s+(\w+)/i);
    const soalType = raw.match(/soal\s+([\w_]+)/i);
    const mediaType = raw.match(/teks|video|audio|interaktif/i);

    const cluster = clusterMatch?.[1] ?? "A";
    const mood = moodMatch?.[1] ?? "positif";
    const moodVal = moodMatch?.[2] ?? "3";
    const wariga = warigaMatch?.[1]?.replace("/", " / ") ?? "Guru";
    const level = bobot?.[1] ?? "medium";
    const soal =
        soalType?.[1]
            ?.replace(/_/g, " ")
            .replace("mix", "campuran")
            .replace("easy", "mudah-")
            .replace("medium", "sedang") ?? "campuran mudah-sedang";
    const media = mediaType?.[0] ?? "teks";

    const moodLabel =
        {
            positif: "positif dan bersemangat",
            negatif: "perlu perhatian ekstra",
            netral: "stabil",
        }[mood] ?? mood;

    return {
        summary: `Berdasarkan analisis kluster, kamu termasuk dalam Kelompok ${cluster} — siswa dengan kondisi mood ${moodLabel} (skor ${moodVal}/5) dan wariga ${wariga}. Sistem merekomendasikan latihan dengan tingkat kesulitan ${level}, menggunakan media ${media}, dengan variasi soal ${soal}.`,
        tips: [
            mood === "positif"
                ? "Mood-mu sedang bagus! Manfaatkan momentum ini untuk mengerjakan soal-soal yang lebih menantang."
                : "Jangan khawatir jika merasa lelah. Ambil istirahat singkat sebelum melanjutkan latihan.",
            `Wariga ${wariga} menunjukkan kamu memiliki karakteristik belajar yang cocok dengan pendekatan ${media === "teks" ? "membaca dan memahami teks" : media}.`,
            `Rekomendasi soal ${soal} dipilih agar kamu dapat membangun kepercayaan diri sekaligus tetap tertantang.`,
        ],
    };
};

// ─── Score Donut ──────────────────────────────────────────────────────────────
const ScoreDonut = ({ score }) => {
    const { stroke, text } = getScoreColor(score);
    const R = 60,
        CX = 80,
        CY = 80,
        sw = 12;
    const circ = 2 * Math.PI * R;
    const pct = score / 100;

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <svg width="160" height="160" viewBox="0 0 160 160">
                    {/* Track */}
                    <circle
                        cx={CX}
                        cy={CY}
                        r={R}
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth={sw}
                    />
                    {/* Progress */}
                    <circle
                        cx={CX}
                        cy={CY}
                        r={R}
                        fill="none"
                        stroke={stroke}
                        strokeWidth={sw}
                        strokeDasharray={`${pct * circ} ${circ}`}
                        strokeDashoffset={circ / 4}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 1s ease" }}
                    />
                    {/* Score */}
                    <text
                        x={CX}
                        y={CY + 6}
                        textAnchor="middle"
                        fontSize="28"
                        fontWeight="900"
                        fill="#1f2937"
                    >
                        {score}
                    </text>
                </svg>
            </div>
        </div>
    );
};

// ─── Recommendation Card ──────────────────────────────────────────────────────
const RecommendationCard = ({
    icon: Icon,
    label,
    title,
    difficulty,
    href = "#",
}) => (
    <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer flex-1 min-w-[200px]">
        <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4.5 h-4.5 text-violet-500" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 font-medium mb-0.5">
                {label}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold text-gray-800 truncate">
                    {title}
                </p>
                <span className="text-[10px] font-bold bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {difficulty}
                </span>
            </div>
        </div>
        <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-violet-50 group-hover:border-violet-200 transition-all flex-shrink-0">
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-violet-500" />
        </div>
    </div>
);

// ─── Stat Row ─────────────────────────────────────────────────────────────────
const StatRow = ({ label, value }) => (
    <div className="flex items-start gap-2 py-3 border-b border-gray-50 last:border-0">
        <span className="text-sm font-bold text-gray-700 w-32 flex-shrink-0">
            {label}
        </span>
        <span className="text-gray-400 font-medium text-sm flex-shrink-0">
            :
        </span>
        <span className="text-sm text-gray-600">{value}</span>
    </div>
);

// ─── Main Props (swap with Inertia page props in production) ──────────────────
const RESULT = {
    materi: "Aljabar",
    jumlahSoal: 20,
    kesulitan: "Medium",
    durasi: "40 Menit 20 Detik",
    score: 85,
    benar: 17,
    salah: 3,
    rawAnalysis:
        "Kluster A + mood positif (3) + catur bekel guru/ratu → teks, bobot medium, soal mix_easy_medium",
    recommendations: [
        {
            label: "Materi",
            title: "Perkalian dan Penjumlahan",
            difficulty: "Medium",
            type: "materi",
        },
        {
            label: "Latihan Soal",
            title: "Perkalian dan Penjumlahan",
            difficulty: "Medium",
            type: "latihan",
        },
    ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ExerciseResult({ result = RESULT }) {
    const { summary, tips } = parseAnalysis(result.rawAnalysis);
    const scoreInfo = getScoreColor(result.score);

    return (
        <>
            <Head title={`Hasil Latihan — ${result.materi}`} />

            <div className="min-h-screen bg-gray-50">
                {/* ── Top Navigation Bar ──────────────────────────────────────── */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                        {/* Back + title */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-violet-50 hover:border-violet-300 transition-all group"
                            >
                                <ArrowLeftIcon className="w-4 h-4 text-gray-500 group-hover:text-violet-500" />
                            </a>
                            <div>
                                <h1 className="font-bold text-violet-600 text-sm leading-tight">
                                    Latihan Soal
                                </h1>
                                <p className="text-gray-400 text-xs">
                                    Materi : {result.materi}
                                </p>
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">
                                    ✦
                                </span>
                            </div>
                            <span className="font-bold text-gray-900 text-base tracking-tight hidden sm:inline">
                                Wariku
                            </span>
                        </div>
                    </div>
                </header>

                {/* ── Main Content ─────────────────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    {/* 12-col grid: 4 cols result | 8 cols analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* ── LEFT: Hasil Latihan (4 cols) ─────────────────────────── */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-full flex flex-col gap-5">
                                <h2 className="font-bold text-violet-600 text-base text-center">
                                    Hasil Latihan
                                </h2>

                                {/* Score donut */}
                                <div className="flex flex-col items-center gap-2">
                                    <ScoreDonut score={result.score} />
                                    <span
                                        className={`text-xs font-bold px-3 py-1 rounded-full ${scoreInfo.bg} ${scoreInfo.text}`}
                                    >
                                        {scoreInfo.label}
                                    </span>
                                </div>

                                {/* Correct / Wrong split */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border-2 border-green-100 rounded-2xl px-4 py-3 text-center bg-green-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-xs font-semibold text-gray-500">
                                                Soal Benar
                                            </p>
                                        </div>
                                        <p className="text-2xl font-black text-green-500">
                                            {result.benar}
                                        </p>
                                    </div>
                                    <div className="border-2 border-red-100 rounded-2xl px-4 py-3 text-center bg-red-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <XCircleIcon className="w-4 h-4 text-red-400" />
                                            <p className="text-xs font-semibold text-gray-500">
                                                Soal Salah
                                            </p>
                                        </div>
                                        <p className="text-2xl font-black text-red-400">
                                            {result.salah}
                                        </p>
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div className="divide-y divide-gray-50">
                                    <StatRow
                                        label="Materi"
                                        value={result.materi}
                                    />
                                    <StatRow
                                        label="Jumlah Soal"
                                        value={`${result.jumlahSoal} Soal`}
                                    />
                                    <StatRow
                                        label="Kesulitan Soal"
                                        value={result.kesulitan}
                                    />
                                    <StatRow
                                        label="Total Durasi"
                                        value={result.durasi}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2.5 pt-1">
                                    <button className="w-full flex items-center justify-center gap-2 border-2 border-violet-200 text-violet-600 font-bold text-sm py-2.5 rounded-xl hover:bg-violet-50 transition-colors">
                                        <RefreshIcon className="w-4 h-4" />
                                        Coba Lagi
                                    </button>
                                    <a
                                        href="#"
                                        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-violet-200"
                                    >
                                        <TrophyIcon className="w-4 h-4" />
                                        Lihat Semua Hasil
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Analisis & Rekomendasi (8 cols) ───────────────── */}
                        <div className="lg:col-span-8 flex flex-col gap-5">
                            {/* Analysis card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <SparklesIcon className="w-4 h-4 text-violet-500" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-violet-600 text-base">
                                            Hasil Analisis dan Rekomendasi
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            Berdasarkan kluster belajar, mood,
                                            dan kondisi wariga kamu
                                        </p>
                                    </div>
                                </div>

                                {/* Raw rule — styled as a subtle code-like quote */}
                                <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
                                    <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                                        " {result.rawAnalysis} "
                                    </p>
                                </div>

                                {/* Human-readable summary */}
                                <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-4 mb-5">
                                    <p className="text-sm text-violet-800 leading-relaxed font-medium">
                                        {summary}
                                    </p>
                                </div>

                                {/* Tips list */}
                                <div className="space-y-3">
                                    {tips.map((tip, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-[10px] font-black text-violet-600">
                                                    {i + 1}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {tip}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendation cards */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <LayersIcon className="w-4 h-4 text-violet-500" />
                                    <h3 className="font-bold text-gray-800 text-sm">
                                        Konten yang Direkomendasikan
                                    </h3>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                                    {result.recommendations.map((rec, i) => (
                                        <RecommendationCard
                                            key={i}
                                            icon={
                                                rec.type === "materi"
                                                    ? BookIcon
                                                    : PencilIcon
                                            }
                                            label={rec.label}
                                            title={rec.title}
                                            difficulty={rec.difficulty}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Performance summary strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    {
                                        icon: TrophyIcon,
                                        label: "Skor",
                                        value: `${result.score}/100`,
                                        color: "text-violet-600",
                                        bg: "bg-violet-50",
                                    },
                                    {
                                        icon: CheckCircleIcon,
                                        label: "Jawaban Benar",
                                        value: `${result.benar} soal`,
                                        color: "text-green-600",
                                        bg: "bg-green-50",
                                    },
                                    {
                                        icon: XCircleIcon,
                                        label: "Jawaban Salah",
                                        value: `${result.salah} soal`,
                                        color: "text-red-500",
                                        bg: "bg-red-50",
                                    },
                                    {
                                        icon: ClockIcon,
                                        label: "Durasi",
                                        value: result.durasi,
                                        color: "text-amber-600",
                                        bg: "bg-amber-50",
                                    },
                                ].map(
                                    ({
                                        icon: Icon,
                                        label,
                                        value,
                                        color,
                                        bg,
                                    }) => (
                                        <div
                                            key={label}
                                            className={`${bg} rounded-2xl p-4 flex flex-col gap-1.5`}
                                        >
                                            <Icon
                                                className={`w-5 h-5 ${color}`}
                                            />
                                            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                                                {label}
                                            </p>
                                            <p
                                                className={`text-sm font-black ${color}`}
                                            >
                                                {value}
                                            </p>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
