import { Link } from "@inertiajs/react";
import { DIFFICULTY_LABEL, DIFFICULTY_COLOR } from "@/constants/Dashboard";
import BookIcon from "@/assets/icon/BookIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";


const RecommendedCard = ({
    materialId,
    title = "Materi",
    difficulty = "easy",
    topic = "",
}) => (
    <Link
        className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex-1 min-w-45"
        href={`/lessons?open=${materialId}`}
    >
        <div className="w-10 h-10 rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0">
            <BookIcon className="w-5 h-5 text-(--theme-primary)" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[10px] text-gray-400 truncate">{topic}</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
                {title}
            </p>
            <span
                className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${DIFFICULTY_COLOR[difficulty]}`}
            >
                {DIFFICULTY_LABEL[difficulty]}
            </span>
        </div>
        <span className="text-(--theme-primary) ml-auto shrink-0">
            <ArrowUpRightIcon className="w-4 h-4" />
        </span>
    </Link>
);

export default RecommendedCard;
