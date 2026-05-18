import { Link } from "@inertiajs/react";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import QuestionIcon from "@/assets/icon/QuestionIcon";
import RefreshIcon from "@/assets/icon/RefreshIcon";
import TrophyIcon from "@/assets/icon/TrophyIcon";
import XIcon from "@/assets/icon/XIcon";
import PlayIcon from "@/assets/icon/PlayIcon";
import { DIFF_CONFIG } from "@/constants/Dashboard";
import ScoreRing from "@/components/ScoreRing";

const DetailDrawerQuestion = ({ variant, onClose, themeSlug }) => {
    const diff = DIFF_CONFIG[variant.difficulty] ?? DIFF_CONFIG.easy;

    return (
        <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

            <div
                data-theme={themeSlug}
                className="fixed top-0 right-0 h-full z-50 bg-white shadow-2xl flex flex-col w-full sm:w-105 lg:w-1/3 overflow-hidden"
                style={{
                    animation:
                        "slideInRight 0.3s cubic-bezier(0.32,0.72,0,1) both",
                }}
            >
                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto">
                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-2xl bg-(--theme-soft) flex items-center justify-center shrink-0">
                                    <QuestionIcon className="w-6 h-6 text-(--theme-primary)" />
                                </div>
                                <div>
                                    <span
                                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${diff.bg} ${diff.text}`}
                                    >
                                        {diff.label}
                                    </span>
                                    <h2 className="font-bold text-gray-900 text-lg leading-snug mt-1">
                                        {variant.material_title}
                                    </h2>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 mt-0.5"
                            >
                                <XIcon className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {variant.material_topic}
                        </p>
                    </div>

                    <div className="px-6 py-5 space-y-5">
                        {/* Stats grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    icon: QuestionIcon,
                                    label: "Pertanyaan",
                                    value: variant.question_count,
                                    colorClass: "text-(--theme-primary)",
                                    bgStyle: "var(--theme-soft)",
                                },
                                {
                                    icon: RefreshIcon,
                                    label: "Percobaan",
                                    value: variant.attempt_count,
                                    colorClass: "text-blue-500",
                                    bgStyle: "#eff6ff",
                                },
                            ].map(
                                ({
                                    icon: Icon,
                                    label,
                                    value,
                                    colorClass,
                                    bgStyle,
                                }) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl p-3 text-center"
                                        style={{ backgroundColor: bgStyle }}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${colorClass} mx-auto mb-1`}
                                        />
                                        <p className="text-[10px] text-gray-400">
                                            {label}
                                        </p>
                                        <p className="font-black text-gray-800 text-sm">
                                            {value}
                                        </p>
                                    </div>
                                ),
                            )}
                        </div>

                        {/* Best score */}
                        {variant.best_score !== null ? (
                            <div
                                className="flex items-center gap-4 rounded-2xl p-4"
                                style={{ backgroundColor: "var(--theme-soft)" }}
                            >
                                <ScoreRing score={variant.best_score} />
                                <div>
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <TrophyIcon className="w-4 h-4 text-amber-500" />
                                        <p className="text-xs font-bold text-gray-700">
                                            Skor Terbaik
                                        </p>
                                    </div>
                                    <p className="text-2xl font-black text-(--theme-primary)">
                                        {variant.best_score}
                                        <span className="text-sm font-medium text-gray-400">
                                            /100
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Dari {variant.attempt_count} percobaan
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4">
                                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                    <TrophyIcon className="w-6 h-6 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500">
                                        Belum Ada Skor
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Mulai latihan untuk mendapatkan skor
                                        pertamamu!
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                            <h3 className="font-bold text-amber-700 text-xs uppercase tracking-wider mb-2">
                                Petunjuk Pengerjaan
                            </h3>
                            <ul className="space-y-1.5 text-xs text-amber-700/80">
                                {[
                                    "Baca setiap soal dengan teliti sebelum menjawab",
                                    "Jawaban tidak bisa diubah setelah lanjut ke soal berikutnya",
                                    "Setiap soal hanya memiliki satu jawaban yang benar",
                                    "Skor dihitung berdasarkan akurasi dan kecepatan menjawab",
                                ].map((txt, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <span className="font-bold shrink-0">
                                            {i + 1}.
                                        </span>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Sticky CTA footer */}
                <div className="px-6 pb-6 pt-4 border-t border-gray-100 bg-white shrink-0">
                    <Link
                        href={`/quiz/${variant.id}`}
                        className="w-full flex items-center justify-center gap-2 text-white font-bold text-sm py-3.5 rounded-2xl transition-opacity hover:opacity-90 shadow-lg"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <PlayIcon className="w-4 h-4" />
                        {variant.attempt_count > 0
                            ? "Mulai Latihan Baru"
                            : "Mulai Latihan Sekarang"}
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

export default DetailDrawerQuestion;
