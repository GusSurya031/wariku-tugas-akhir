import { Head, Link } from "@inertiajs/react";
import { THEME_MAP } from "@/constants/Dashboard";
import { getScoreInfo, generateTips } from "@/helpers/DashboardHelpers";
// Components
import RecommendationCard from "@/components/RecommendedCard";
import ScoreDonut from "@/components/ScoreDonut";
import StatRow from "@/components/StatRow";
// Assets
import ArrowLeftIcon from "@/assets/icon/ArrowLeftIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import BookIcon from "@/assets/icon/BookIcon";
import PencilIcon from "@/assets/icon/PencilIcon";
import CheckCircleIcon from "@/assets/icon/CheckCircleIcon";
import XIcon from "@/assets/icon/XIcon";
import SparklesIcon from "@/assets/icon/SparklesIcon";
import ClockIcon from "@/assets/icon/ClockIcon";
import LayersIcon from "@/assets/icon/LayersIcon";
import RefreshIcon from "@/assets/icon/RefreshIcon";
import TrophyIcon from "@/assets/icon/TrophyIcon";
import Logo from "@/assets/icon/logo.svg";

export default function ExerciseResult({
    result,
    recommendation = null,
    recommendedMaterials = [],
    themeDay = null,
}) {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    const scoreInfo = getScoreInfo(result.score);
    const tips = generateTips(result.score, recommendation);

    return (
        <>
            <Head title={`Hasil Latihan — ${result.material_title}`} />

            <div data-theme={themeSlug} className="min-h-screen bg-gray-50">
                {/* ── Top Navigation Bar ─────────────────────────────────────── */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link
                                href="/exercise"
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border-(--theme-secondary) transition-all group"
                            >
                                <ArrowLeftIcon className="w-4 h-4 text-gray-500 group-hover:text-(--theme-primary)" />
                            </Link>
                            <div>
                                <h1 className="font-bold text-(--theme-primary) text-sm leading-tight">
                                    Latihan Soal
                                </h1>
                                <p className="text-gray-400 text-xs">
                                    Materi: {result.material_title}
                                </p>
                            </div>
                        </div>
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
                </header>

                {/* ── Main Content ───────────────────────────────────────────── */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* ── LEFT: Score & Stats (4 cols) ─────────────────────── */}
                        <div className="lg:col-span-4">
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5">
                                <h2 className="font-bold text-(--theme-primary) text-base text-center">
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

                                {/* Correct / Wrong */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="border-2 border-green-100 rounded-2xl px-4 py-3 text-center bg-green-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-xs font-semibold text-gray-500">
                                                Soal Benar
                                            </p>
                                        </div>
                                        <p className="text-2xl font-black text-green-500">
                                            {result.correct_count}
                                        </p>
                                    </div>
                                    <div className="border-2 border-red-100 rounded-2xl px-4 py-3 text-center bg-red-50/50">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <XIcon className="w-4 h-4 text-red-400" />
                                            <p className="text-xs font-semibold text-gray-500">
                                                Soal Salah
                                            </p>
                                        </div>
                                        <p className="text-2xl font-black text-red-400">
                                            {result.wrong_count}
                                        </p>
                                    </div>
                                </div>

                                {/* Meta info */}
                                <div className="divide-y divide-gray-50">
                                    <StatRow
                                        label="Materi"
                                        value={result.material_title}
                                    />
                                    <StatRow
                                        label="Jumlah Soal"
                                        value={`${result.total_questions} soal`}
                                    />
                                    <StatRow
                                        label="Kesulitan"
                                        value={result.difficulty}
                                    />
                                    <StatRow
                                        label="Total Durasi"
                                        value={result.duration}
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2.5 pt-1">
                                    {result.variant_id && (
                                        <Link
                                            href={`/quiz/${result.variant_id}/info`}
                                            className="w-full flex items-center justify-center gap-2 border-2 border-(--theme-secondary) text-(--theme-primary) font-bold text-sm py-2.5 rounded-xl hover:bg-(--theme-soft) transition-colors"
                                        >
                                            <RefreshIcon className="w-4 h-4" />
                                            Coba Lagi
                                        </Link>
                                    )}
                                    <Link
                                        href="/exercise"
                                        className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-2.5 rounded-xl transition-opacity hover:opacity-90 shadow-md"
                                        style={{
                                            background: "var(--theme-gradient)",
                                        }}
                                    >
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
                                        <h2 className="font-bold text-(--theme-primary) text-base">
                                            Hasil Analisis dan Rekomendasi
                                        </h2>
                                        <p className="text-xs text-gray-400 mt-0.5">
                                            {recommendation
                                                ? "Berdasarkan kluster belajar, mood, dan kondisi wariga kamu"
                                                : "Skor latihan soal kamu"}
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
                                        <div
                                            className="rounded-xl px-4 py-4 mb-5 border"
                                            style={{
                                                backgroundColor:
                                                    "var(--theme-soft)",
                                                borderColor:
                                                    "var(--theme-secondary)",
                                            }}
                                        >
                                            <p className="text-sm text-(--theme-primary) leading-relaxed font-medium">
                                                Sistem merekomendasikan materi
                                                dengan tingkat{" "}
                                                <strong>
                                                    {recommendation.difficulty}
                                                </strong>{" "}
                                                menggunakan format{" "}
                                                <strong>
                                                    {recommendation.content_type ===
                                                    "illustration"
                                                        ? "ilustrasi"
                                                        : "teks"}
                                                </strong>
                                                .
                                                {recommendation.quiz_difficulty && (
                                                    <>
                                                        {" "}
                                                        Untuk latihan soal
                                                        berikutnya, tingkat{" "}
                                                        <strong>
                                                            {
                                                                recommendation.quiz_difficulty
                                                            }
                                                        </strong>{" "}
                                                        direkomendasikan.
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 mb-5">
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            Rekomendasi tidak tersedia saat ini.
                                            Pastikan kamu sudah mengisi mood
                                            harian sebelum mengerjakan latihan.
                                        </p>
                                    </div>
                                )}

                                {/* Tips */}
                                <div className="space-y-3">
                                    {tips.map((tip, i) => (
                                        <div
                                            key={i}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-(--theme-soft) flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-[10px] font-black text-(--theme-primary)">
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

                            {/* Recommended content */}
                            {recommendedMaterials.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <LayersIcon className="w-4 h-4 text-(--theme-primary)" />
                                        <h3 className="font-bold text-gray-800 text-sm">
                                            Konten yang Direkomendasikan
                                        </h3>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                                        {recommendedMaterials.map((rec, i) => (
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
                                                href={rec.href}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
