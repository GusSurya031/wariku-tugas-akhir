import { Link } from "@inertiajs/react";
import { DIFFICULTY_LABEL, DIFFICULTY_COLOR } from "@/constants/Dashboard";
import BookIcon from "@/assets/icon/BookIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";

const RecommendedCard = ({
    href,
    icon: Icon = BookIcon,
    label,
    topic,
    title = "Materi",
    difficulty = "easy",
    difficultyLabel,
    difficultyClassName,

    variant = "default",
}) => {
    const finalLabel = label ?? topic;
    const finalDifficultyLabel =
        difficultyLabel ?? DIFFICULTY_LABEL?.[difficulty] ?? difficulty;

    const finalDifficultyClassName =
        difficultyClassName ??
        DIFFICULTY_COLOR?.[difficulty] ??
        "bg-(--theme-soft) text-(--theme-primary)";

    const iconSize = variant === "compact" ? "w-9 h-9" : "w-10 h-10";
    const iconClass = variant === "compact" ? "w-4.5 h-4.5" : "w-5 h-5";
    const padding = variant === "compact" ? "px-4 py-3.5" : "px-4 py-4";
    const minWidth = variant === "compact" ? "min-w-52" : "min-w-45";

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 bg-white border border-gray-100 rounded-2xl ${padding} shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex-1 ${minWidth}`}
        >
            <div
                className={`${iconSize} rounded-xl bg-(--theme-soft) flex items-center justify-center shrink-0`}
            >
                <Icon className={`${iconClass} text-(--theme-primary)`} />
            </div>

            <div className="flex-1 min-w-0">
                {finalLabel && (
                    <p className="text-[10px] text-gray-400 font-medium mb-0.5 truncate">
                        {finalLabel}
                    </p>
                )}

                <div
                    className={
                        variant === "compact"
                            ? "flex items-center gap-2 flex-wrap"
                            : ""
                    }
                >
                    <p
                        className={`text-sm text-gray-800 truncate ${
                            variant === "compact"
                                ? "font-bold"
                                : "font-semibold"
                        }`}
                    >
                        {title}
                    </p>

                    {finalDifficultyLabel && (
                        <span
                            className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                variant === "compact" ? "" : "mt-1"
                            } ${finalDifficultyClassName}`}
                        >
                            {finalDifficultyLabel}
                        </span>
                    )}
                </div>
            </div>

            {variant === "compact" ? (
                <div className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-(--theme-soft) group-hover:border-(--theme-secondary) transition-all shrink-0">
                    <ArrowUpRightIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-(--theme-primary)" />
                </div>
            ) : (
                <span className="text-(--theme-primary) ml-auto shrink-0">
                    <ArrowUpRightIcon className="w-4 h-4" />
                </span>
            )}
        </Link>
    );
};

export default RecommendedCard;
