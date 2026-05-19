import { Head, Link } from "@inertiajs/react";
import { THEME_MAP, DIFFICULTY_LABEL, QUIZ_RULES } from "../../constants/Dashboard";
import PencilSquareIcon from "@/assets/icon/PencilSquareIcon";
import SparkleIcon from "@/assets/icon/SparkleIcon";
import InfoIcon from "@/assets/icon/InfoIcon";

export default function PreQuiz({
    sourceMaterial,
    quizVariantId,
    quizDifficulty,
    isFirstAttempt,
    themeDay = null,
}) {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    const diffLabel = DIFFICULTY_LABEL[quizDifficulty] ?? quizDifficulty;
    const srcDiffLabel = DIFFICULTY_LABEL[sourceMaterial.difficulty] ?? sourceMaterial.difficulty;

    return (
        <>
            <Head title={`Persiapan Latihan — ${sourceMaterial.title}`} />

            <div data-theme={themeSlug} className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-lg">

                    {/* Hero card */}
                    <div className="rounded-3xl p-8 text-white text-center mb-5 shadow-xl"
                        style={{ background: "var(--theme-gradient)" }}>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <PencilSquareIcon className="w-9 h-9 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold mb-1">Latihan Soal</h1>
                        <p className="text-white/80 text-sm mb-4">{sourceMaterial.title}</p>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                                Tingkat {diffLabel}
                            </span>
                            {!isFirstAttempt && (
                                <span className="bg-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-(--theme-primary)">
                                    <SparkleIcon className="w-3 h-3" />
                                    Berdasarkan Rekomendasi
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Difficulty explanation */}
                    <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-(--theme-soft) flex items-center justify-center shrink-0 mt-0.5">
                                <InfoIcon className="w-4 h-4 text-(--theme-primary)" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 mb-1">
                                    {isFirstAttempt ? "Soal Pertama Kali" : "Soal Berdasarkan Rekomendasi"}
                                </p>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {isFirstAttempt
                                        ? `Karena ini pertama kalinya kamu mengerjakan latihan, tingkat kesulitan soal disesuaikan dengan materi yang baru saja kamu pelajari (${srcDiffLabel}).`
                                        : `Tingkat kesulitan soal (${diffLabel}) ditentukan oleh sistem berdasarkan hasil belajar dan rekomendasimu sebelumnya, bukan dari materi yang baru dipelajari.`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm">
                        <h2 className="font-bold text-gray-800 text-sm mb-4">Sebelum Mulai, Perhatikan:</h2>
                        <div className="space-y-4">
                            {QUIZ_RULES.map((rule, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0 mt-0.5">
                                        <rule.icon className="w-4 h-4 text-(--theme-primary)" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{rule.title}</p>
                                        <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Link href="/lessons"
                            className="flex-1 text-center py-3.5 px-6 rounded-2xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
                            Kembali ke Materi
                        </Link>
                        <Link href={`/quiz/${quizVariantId}`}
                            className="flex-1 text-center py-3.5 px-6 rounded-2xl text-white font-bold text-sm transition-opacity hover:opacity-90 shadow-lg"
                            style={{ background: "var(--theme-gradient)" }}>
                            Mulai Sekarang →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
