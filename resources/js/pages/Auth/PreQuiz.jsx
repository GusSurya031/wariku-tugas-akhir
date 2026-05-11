import { Head, Link } from "@inertiajs/react";

// ─── Theme ────────────────────────────────────────────────────────────────────
const THEME_MAP = {
    Minggu: "redite", Senin: "soma",   Selasa: "anggara", Rabu: "buda",
    Kamis: "wrespati", Jumat: "sukra", Sabtu: "saniscara",
};

const DIFFICULTY_LABEL = { easy: "Mudah", medium: "Menengah", hard: "Lanjutan" };

// ─── Icons ────────────────────────────────────────────────────────────────────
const PencilSquareIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const ClockIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
);
const BanIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.93 4.93l14.14 14.14" />
    </svg>
);
const CheckListIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);
const AlertIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const InfoIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const SparkleIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

// ─── Quiz Rules ───────────────────────────────────────────────────────────────
const QUIZ_RULES = [
    {
        icon: ClockIcon,
        title: "Timer per soal",
        desc:  "Setiap soal memiliki waktu yang dihitung untuk mengukur kecepatan menjawabmu.",
    },
    {
        icon: BanIcon,
        title: "Tidak bisa kembali",
        desc:  "Setelah menjawab dan lanjut ke soal berikutnya, kamu tidak bisa kembali ke soal sebelumnya.",
    },
    {
        icon: CheckListIcon,
        title: "Jawab semua soal",
        desc:  "Pastikan semua soal telah dijawab sebelum menekan tombol kirim.",
    },
    {
        icon: AlertIcon,
        title: "Jangan tinggalkan halaman",
        desc:  "Refresh atau keluar dari halaman akan menghapus seluruh progres jawabanmu.",
    },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
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
                                <span className="bg-amber-300/30 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
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
