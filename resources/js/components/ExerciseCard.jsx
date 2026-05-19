import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import QuestionIcon from "@/assets/icon/QuestionIcon";
import { DIFF_CONFIG } from "@/constants/Dashboard";

const ExerciseCard = ({ variant, onClick }) => {
    const diff = DIFF_CONFIG[variant.difficulty] ?? DIFF_CONFIG.easy;
    return (
        <div
            onClick={() => onClick(variant)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group p-4 flex flex-col gap-3"
        >
            <div className="flex items-start justify-between">
                <div className="w-9 h-9 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0">
                    <QuestionIcon className="w-5 h-5 text-(--theme-primary)" />
                </div>
                <span
                    className={`text-[11px] font-bold px-3 py-1 rounded-full ${diff.bg} ${diff.text}`}
                >
                    {diff.label}
                </span>
            </div>

            <div className="h-6" />

            <div>
                <h3 className="font-bold text-gray-800 text-sm group-hover:text-(--theme-primary) transition-colors">
                    {variant.material_title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                    {variant.material_topic}
                </p>
            </div>

            <div className="border-t border-gray-50 pt-3">
                <p className="text-xs text-gray-500 font-medium mb-0.5">
                    Pertanyaan
                </p>
                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-800">
                            {variant.question_count}
                        </span>
                        <span className="text-xs text-gray-400">
                            {variant.attempt_count > 0
                                ? `/ ${variant.attempt_count}× Percobaan`
                                : "soal"}
                        </span>
                    </div>
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm shrink-0"
                        style={{ background: "var(--theme-gradient)" }}
                    >
                        <ArrowUpRightIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseCard;
