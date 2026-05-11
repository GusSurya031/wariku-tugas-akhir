import { Head, Link } from "@inertiajs/react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const THEME_MAP = {
    Minggu: "redite", Senin: "soma",   Selasa: "anggara", Rabu: "buda",
    Kamis: "wrespati", Jumat: "sukra", Sabtu: "saniscara",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowLeftIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const ArrowUpRightIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
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
const CheckCircleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const XCircleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const SparklesIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);
const ClockIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
);
const LayersIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);
const RefreshIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);
const TrophyIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getScoreInfo = (score) => {
    if (score >= 85) return { stroke: "#22c55e", text: "text-green-500", label: "Sangat Baik",   bg: "bg-green-50"  };
    if (score >= 70) return { stroke: "#f59e0b", text: "text-amber-500", label: "Baik",          bg: "bg-amber-50"  };
    if (score >= 55) return { stroke: "#8b5cf6", text: "text-violet-500",label: "Cukup",         bg: "bg-violet-50" };
    return              { stroke: "#ef4444", text: "text-red-500",    label: "Perlu Latihan", bg: "bg-red-50"    };
};

const generateTips = (score, rec) => {
    const tips = [];
    if      (score >= 85) tips.push("Luar biasa! Pertahankan semangat belajar dan tantang dirimu dengan materi yang lebih menantang.");
    else if (score >= 70) tips.push("Bagus! Kamu sudah menguasai sebagian besar materi. Fokus pada bagian yang masih perlu diperbaiki.");
    else if (score >= 55) tips.push("Cukup baik. Pelajari kembali materi yang belum dikuasai sebelum mencoba lagi.");
    else                  tips.push("Jangan menyerah! Kembali ke materi dan pelajari ulang dari awal.");

    if (rec) {
        const ct = rec.content_type === "illustration" ? "ilustrasi" : "teks";
        tips.push(`Sistem merekomendasikan belajar dengan format ${ct} pada tingkat ${rec.difficulty}.`);
        if (rec.quiz_difficulty) {
            tips.push(`Untuk latihan soal berikutnya, tingkat ${rec.quiz_difficulty} akan membantu mengoptimalkan pemahamanmu.`);
        }
    }
    return tips;
};

// ─── Score Donut ──────────────────────────────────────────────────────────────
const ScoreDonut = ({ score }) => {
    const { stroke } = getScoreInfo(score);
    const R = 60, CX = 80, CY = 80, sw = 12;
    const circ = 2 * Math.PI * R;
    return (
        <div className="flex flex-col items-center">
            <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f3f4f6" strokeWidth={sw} />
                <circle cx={CX} cy={CY} r={R} fill="none" stroke={stroke} strokeWidth={sw}
                    strokeDasharray={`${(score / 100) * circ} ${circ}`}
                    strokeDashoffset={circ / 4} strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease" }} />
                <text x={CX} y={CY + 6} textAnchor="middle" fontSize="28" fontWeight="900" fill="#1f2937">
                    {score}
                </text>
            </svg>
        </div>
    );
};

// ─── Stat Row ─────────────────────────────────────────────────────────────────
const StatRow = ({ label, value }) => (
    <div className="flex items-start gap-2 py-3 border-b border-gray-50 last:border-0">
        <span className="text-sm font-bold text-gray-700 w-32 shrink-0">{label}</span>
        <span className="text-gray-400 font-medium text-sm shrink-0">:</span>
        <span className="text-sm text-gray-600">{value}</span>
    </div>
);

// ─── Recommendation Card ──────────────────────────────────────────────────────
const RecommendationCard = ({ icon: Icon, label, title, difficulty, href }) => (
    <Link href={href}
        className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md transition-shadow group flex-1 min-w-52">
        <div className="w-9 h-9 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0">
            <Icon className="w-4.5 h-4.5 text-(--theme-primary)" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 font-medium mb-0.5">{label}</p>
            <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold text-gray-800 truncate">{title}</p>
                <span className="text-[10px] font-bold bg-(--theme-soft) text-(--theme-primary) px-2 py-0.5 rounded-full whitespace-nowrap">
                    {difficulty}
                </span>
            </div>
        </div>
        <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-(--theme-soft) group-hover:border-(--theme-secondary) transition-all shrink-0">
            <ArrowUpRightIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-(--theme-primary)" />
        </div>
    </Link>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ExerciseResult({
    result,
    recommendation = null,
    recommendedMaterials = [],
    themeDay = null,
}) {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    const scoreInfo = getScoreInfo(result.score);
    const tips      = generateTips(result.score, recommendation);

    return (
        <>
            <Head title={`Hasil Latihan — ${result.material_title}`} />

            <div data-theme={themeSlug} className="min-h-screen bg-gray-50">
                {/* ── Top Navigation Bar ─────────────────────────────────────── */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/exercise"
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border-(--theme-secondary) transition-all group">
                                <ArrowLeftIcon className="w-4 h-4 text-gray-500 group-hover:text-(--theme-primary)" />
                            </Link>
                            <div>
                                <h1 className="font-bold text-(--theme-primary) text-sm leading-tight">Latihan Soal</h1>
                                <p className="text-gray-400 text-xs">Materi: {result.material_title}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">✦</span>
                            </div>
                            <span className="font-bold text-gray-900 text-base tracking-tight hidden sm:inline">Wariku</span>
                        </div>
                    </div>
                </header>

                {/* ── Main Content ───────────────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* ── LEFT: Score & Stats (4 cols) ─────────────────────── */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                                <h2 className="font-bold text-(--theme-primary) text-base text-center">Hasil Latihan</h2>

                                {/* Score donut */}
                                <div className="flex flex-col items-center gap-2">
                                    <ScoreDonut score={result.score} />
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${scoreInfo.bg} ${scoreInfo.text}`}>
                                        {scoreInfo.label}
                                    </span>
                                </div>

                                {/* Correct / Wrong */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border-2 border-green-100 rounded-2xl px-4 py-3 text-center bg-green-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-xs font-semibold text-gray-500">Soal Benar</p>
                                        </div>
                                        <p className="text-2xl font-black text-green-500">{result.correct_count}</p>
                                    </div>
                                    <div className="border-2 border-red-100 rounded-2xl px-4 py-3 text-center bg-red-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <XCircleIcon className="w-4 h-4 text-red-400" />
                                            <p className="text-xs font-semibold text-gray-500">Soal Salah</p>
                                        </div>
                                        <p className="text-2xl font-black text-red-400">{result.wrong_count}</p>
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div className="divide-y divide-gray-50">
                                    <StatRow label="Materi"       value={result.material_title}             />
                                    <StatRow label="Jumlah Soal"  value={`${result.total_questions} soal`}  />
                                    <StatRow label="Kesulitan"    value={result.difficulty}                 />
                                    <StatRow label="Total Durasi" value={result.duration}                   />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2.5 pt-1">
                                    {result.variant_id && (
                                        <Link href={`/quiz/${result.variant_id}/info`}
                                            className="w-full flex items-center justify-center gap-2 border-2 border-(--theme-secondary) text-(--theme-primary) font-bold text-sm py-2.5 rounded-xl hover:bg-(--theme-soft) transition-colors">
                                            <RefreshIcon className="w-4 h-4" />
                                            Coba Lagi
                                        </Link>
                                    )}
                                    <Link href="/exercise"
                                        className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90 shadow-md"
                                        style={{ background: "var(--theme-gradient)" }}>
                                        <ArrowLeftIcon className="w-4 h-4" />
                                        Kembali ke Latihan
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Analysis & Recommendation (8 cols) ─────────── */}
                        <div className="lg:col-span-8 flex flex-col gap-5">

                            {/* Analysis card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0 mt-0.5">
                                        <SparklesIcon className="w-4 h-4 text-(--theme-primary)" />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-(--theme-primary) text-base">Hasil Analisis dan Rekomendasi</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {recommendation
                                                ? "Berdasarkan kluster belajar, mood, dan kondisi wariga kamu"
                                                : "Skor latihan soal kamu"
                                            }
                                        </p>
                                    </div>
                                </div>

                                {recommendation ? (
                                    <>
                                        {/* Rule description */}
                                        <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
                                            <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                                                "{recommendation.description}"
                                            </p>
                                        </div>

                                        {/* Human-readable summary */}
                                        <div className="rounded-xl px-4 py-4 mb-5 border" style={{ backgroundColor: "var(--theme-soft)", borderColor: "var(--theme-secondary)" }}>
                                            <p className="text-sm text-(--theme-primary) leading-relaxed font-medium">
                                                Sistem merekomendasikan materi dengan tingkat{" "}
                                                <strong>{recommendation.difficulty}</strong> menggunakan format{" "}
                                                <strong>{recommendation.content_type === "illustration" ? "ilustrasi" : "teks"}</strong>.
                                                {recommendation.quiz_difficulty && (
                                                    <> Untuk latihan soal berikutnya, tingkat <strong>{recommendation.quiz_difficulty}</strong> direkomendasikan.</>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 mb-5">
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Rekomendasi tidak tersedia saat ini. Pastikan kamu sudah mengisi mood harian sebelum mengerjakan latihan.
                                        </p>
                                    </div>
                                )}

                                {/* Tips */}
                                <div className="space-y-3">
                                    {tips.map((tip, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-(--theme-soft) flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-[10px] font-black text-(--theme-primary)">{i + 1}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended content */}
                            {recommendedMaterials.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <LayersIcon className="w-4 h-4 text-(--theme-primary)" />
                                        <h3 className="font-bold text-gray-800 text-sm">Konten yang Direkomendasikan</h3>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                                        {recommendedMaterials.map((rec, i) => (
                                            <RecommendationCard key={i}
                                                icon={rec.type === "materi" ? BookIcon : PencilIcon}
                                                label={rec.label}
                                                title={rec.title}
                                                difficulty={rec.difficulty}
                                                href={rec.href}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Performance strip */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { icon: TrophyIcon,      label: "Skor",            value: `${result.score}/100`,          color: "text-(--theme-primary)", bgStyle: "var(--theme-soft)" },
                                    { icon: CheckCircleIcon, label: "Jawaban Benar",    value: `${result.correct_count} soal`, color: "text-green-600",          bgStyle: "#f0fdf4"           },
                                    { icon: XCircleIcon,     label: "Jawaban Salah",    value: `${result.wrong_count} soal`,   color: "text-red-500",            bgStyle: "#fef2f2"           },
                                    { icon: ClockIcon,       label: "Durasi",           value: result.duration,                color: "text-amber-600",          bgStyle: "#fffbeb"           },
                                ].map(({ icon: Icon, label, value, color, bgStyle }) => (
                                    <div key={label} className="rounded-2xl p-4 flex flex-col gap-1.5" style={{ backgroundColor: bgStyle }}>
                                        <Icon className={`w-5 h-5 ${color}`} />
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                                        <p className={`text-sm font-black ${color}`}>{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
