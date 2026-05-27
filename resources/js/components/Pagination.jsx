import React from "react";
import ChevronLeftIcon from "@/assets/icon/ChevronLeftIcon";
import ChevronRightIcon from "@/assets/icon/ChevronRightIcon";
import { PER_PAGE } from '@/constants/Dashboard';



const Pagination = ({ current, total, totalItems, onChange }) => {
    if (total <= 0) return null;
    const pages = Array.from({ length: total }, (_, i) => i + 1);

    const getVisiblePages = () => {
        if (total <= 5) return pages;
        if (current <= 3) return [...pages.slice(0, 4), "...", total];
        if (current >= total - 2) return [1, "...", ...pages.slice(total - 4)];
        return [1, "...", current - 1, current, current + 1, "...", total];
    };

    const from = Math.min((current - 1) * PER_PAGE + 1, totalItems);
    const to   = Math.min(current * PER_PAGE, totalItems);

    return (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-4 flex-wrap">
            <p className="text-xs text-gray-400">
                Menampilkan {from}–{to} dari {totalItems} data
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => onChange(Math.max(1, current - 1))}
                    disabled={current === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200
                    text-gray-400 hover:border-(--theme-secondary) hover:text-(--theme-primary) disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </button>

                {getVisiblePages().map((p, i) =>
                    p === "..." ? (
                        <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">…</span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => onChange(p)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all border
                            ${p === current
                                ? "bg-(--theme-primary) text-white border-(--theme-primary) shadow-sm"
                                : "border-gray-200 text-gray-600 hover:border-(--theme-secondary) hover:text-(--theme-primary)"
                            }`}
                        >
                            {p}
                        </button>
                    ),
                )}

                <button
                    onClick={() => onChange(Math.min(total, current + 1))}
                    disabled={current === total}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200
                    text-gray-400 hover:border-(--theme-secondary) hover:text-(--theme-primary) disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
