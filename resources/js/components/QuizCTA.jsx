import PencilSquareIcon from "../assets/icon/PencilSquareIcon";
import { Link } from "@inertiajs/react";

const QuizCTA = ({ variantId, difficulty }) => {
    const diffLabel =
        { easy: "Mudah", medium: "Menengah", hard: "Lanjutan" }[difficulty] ??
        difficulty;
    return (
        <div
            className="mt-10 rounded-2xl p-6 text-white shadow-lg"
            style={{ background: "var(--theme-gradient)" }}
        >
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <PencilSquareIcon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-1 text-center">
                Siap Mengerjakan Latihan?
            </h3>
            <p className="text(--theme-soft) text-sm text-center mb-1">
                Kamu telah menyelesaikan semua materi pada bab ini.
            </p>
            <p className="text(--theme-soft) text-xs text-center mb-5">
                Uji pemahamanmu dengan latihan soal tingkat{" "}
                <span className="font-bold text-white">{diffLabel}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                    href="/lessons"
                    className="text-center bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors"
                >
                    Kembali ke Lesson
                </Link>
                <Link
                    href={`/quiz/${variantId}/info`}
                    className="text-center bg-white hover:opacity-90 font-bold text-sm px-6 py-2.5 rounded-full transition-opacity shadow-md text-(--theme-primary)"
                >
                    Mulai Latihan Soal →
                </Link>
            </div>
        </div>
    );
};

export default QuizCTA;
