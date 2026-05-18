import { useState } from "react";
import { Link } from "@inertiajs/react";
// Assets
import XIcon from "@/assets/icon/XIcon";
import BookIcon from "@/assets/icon/BookIcon";
import ClockIcon from "@/assets/icon/ClockIcon";
import PlayIcon from "@/assets/icon/PlayIcon";
// Components
import MathThumbnail from "@/components/MathThumbnail";
import MaterialContent from "@/components/MaterialContent";
import { DIFFICULTY_LABEL, DIFFICULTY_ORDER } from "@/constants/Dashboard";

const DetailDrawer = ({
    course,
    onClose,
    themeSlug,
    userLearningType = "text",
    recommendedDifficulty = null,
}) => {
    const variants = course?.variants ?? [];

    const availableDiffs = DIFFICULTY_ORDER.filter((d) =>
        variants.some((v) => v.difficulty_level === d),
    );
    const [selectedDiff, setSelectedDiff] = useState(
        availableDiffs[0] ?? "easy",
    );
    const refVariant = variants.find(
        (v) => v.difficulty_level === selectedDiff,
    );
    const chapterTitles = refVariant?.chapter_titles ?? [];

    const targetVariant =
        variants.find(
            (v) =>
                v.difficulty_level === selectedDiff &&
                v.learning_type === userLearningType,
        ) ?? refVariant;

    const totalChapters = availableDiffs.reduce((sum, d) => {
        const v = variants.find(
            (x) =>
                x.difficulty_level === d &&
                x.learning_type === userLearningType,
        );
        return sum + (v?.chapter_count ?? 0);
    }, 0);

    const estMinutes = course?.estimated_duration ?? 0;
    const estLabel =
        estMinutes >= 60
            ? `${Math.floor(estMinutes / 60)} jam${estMinutes % 60 > 0 ? ` ${estMinutes % 60} menit` : ""}`
            : `${estMinutes} menit`;

    return (
        <>
            <div
                className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
                onClick={onClose}
            />

            <div
                data-theme={themeSlug}
                className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col w-full sm:w-105 lg:w-1/3 overflow-y-auto"
                style={{
                    animation:
                        "slideInRight 0.3s cubic-bezier(0.32,0.72,0,1) both",
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
                >
                    <XIcon className="w-4 h-4 text-gray-600" />
                </button>

                {/* Thumbnail */}
                <div className="px-6 pt-6 pb-0">
                    <MathThumbnail size="large" />
                </div>

                <div className="px-6 py-5 flex-1">
                    {/* Topic badge */}
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--theme-primary) bg-(--theme-soft) px-3 py-1 rounded-full mb-3">
                        <BookIcon className="w-3 h-3" />{" "}
                        {course?.topic ?? "Matematika"}
                    </span>

                    <h2 className="font-bold text-gray-900 text-xl leading-snug mb-2">
                        {course?.title ?? "Materi"}
                    </h2>
                    {/* <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        {course?.description ?? ""}
                    </p> */}
                    <MaterialContent
                        className=""
                        html= {course?.description ?? ""}
                    />

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-5 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <BookIcon className="w-4 h-4 text-(--theme-primary)" />
                            <span>{totalChapters} Chapter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <ClockIcon className="w-4 h-4 text-amber-400" />
                            <span>{estLabel}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 mb-5" />

                    {/* Difficulty selector */}
                    <h3 className="font-bold text-gray-800 text-sm mb-3">
                        Pilih Tingkat Belajar
                    </h3>
                    <div className="flex gap-2 mb-5">
                        {availableDiffs.map((diff) => {
                            const diffVariant =
                                variants.find(
                                    (v) =>
                                        v.difficulty_level === diff &&
                                        v.learning_type === userLearningType,
                                ) ??
                                variants.find(
                                    (v) => v.difficulty_level === diff,
                                );
                            const progress = diffVariant?.progress ?? null;
                            const isRecommended =
                                diff === recommendedDifficulty;

                            return (
                                <div
                                    key={diff}
                                    className="flex-1 flex flex-col items-center gap-1"
                                >
                                    <button
                                        onClick={() => setSelectedDiff(diff)}
                                        className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition-all
                                            ${
                                                selectedDiff === diff
                                                    ? "border-transparent text-white shadow-sm"
                                                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-(--theme-soft) hover:border-(--theme-secondary)"
                                            }`}
                                        style={
                                            selectedDiff === diff
                                                ? {
                                                      background:
                                                          "var(--theme-gradient)",
                                                  }
                                                : {}
                                        }
                                    >
                                        {DIFFICULTY_LABEL[diff]}
                                    </button>

                                    {isRecommended && (
                                        <div className="relative group">
                                            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-700 whitespace-nowrap cursor-help inline-block">
                                                ★ Rekomendasi
                                            </span>
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 p-2 text-[10px] leading-snug bg-gray-800 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg">
                                                Direkomendasikan berdasarkan
                                                kondisi dan hasil belajarmu
                                            </div>
                                        </div>
                                    )}

                                    {progress && (
                                        <span
                                            className={`text-[9px] font-medium ${
                                                progress.status === "completed"
                                                    ? "text-green-600"
                                                    : "text-(--theme-primary)"
                                            }`}
                                        >
                                            {progress.status === "completed"
                                                ? "✓ Selesai"
                                                : `${progress.percentage}%`}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Chapter list for selected difficulty */}
                    <div className="space-y-2 mb-6">
                        {chapterTitles.length > 0 ? (
                            chapterTitles.map((title, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <span className="w-6 h-6 rounded-full bg-(--theme-soft) text-(--theme-primary) text-[10px] font-bold flex items-center justify-center shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-xs text-gray-700 font-medium">
                                        {title}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-400 text-center py-4">
                                Belum ada chapter tersedia.
                            </p>
                        )}
                    </div>

                    {/* CTA */}
                    <Link
                        href={
                            targetVariant ? `/lessons/${targetVariant.id}` : "#"
                        }
                        className="w-full text-white font-bold text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 shadow-lg"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <PlayIcon className="w-5 h-5" />
                        Mulai Belajar Sekarang
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
            `}</style>
        </>
    );
};

export default DetailDrawer;
