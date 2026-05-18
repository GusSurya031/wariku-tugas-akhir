import { useRef } from "react";
import useInView from "@/components/useInView";
import ThumbnailCard from "@/assets/images/thumbnail_card.png";

export default function MaterialCard({
    title = "",
    description = "",
    sub_description = "",
    category = "",
    categoryColor = "",
    duration = "",
    thumbnail = ThumbnailCard,
    onSelect,
    delay = 0,
}) {
    const [ref, visible] = useInView(0.1);
    const levelDots = [1, 2, 3];

    return (
        <div
            ref={ref}
            className="material-card"
            style={{
                transitionDelay: `${delay}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
            }}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect?.()}
        >
            {/* Thumbnail */}
            <div
                className="card-thumbnail"
                style={{ background: `url(${thumbnail}) center/cover` }}
            >
                {/* <img src={thumbnail} alt="" className="w-3/4 h-full object-fit" /> */}

                {/* Category badge */}
                <div
                    className="absolute top-3 left-3 text-white rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide"
                    style={{ background: categoryColor }}
                >
                    {category}
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 text-[11px] font-semibold text-gray-700 flex items-center gap-1">
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6B7280"
                        strokeWidth="2.5"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    {duration} Menit
                </div>
            </div>

            {/* Body */}
            <div className="px-5 pt-4 pb-5">
                <h3 className="text-[15px] font-extrabold text-gray-900 mb-1.5 leading-tight">
                    {title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3.5">
                    {sub_description}
                </p>

                <button className="card-btn">
                    Selengkapnya
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
