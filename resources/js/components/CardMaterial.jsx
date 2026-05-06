import { useState, useEffect, useRef } from "react";
import "@/../css/app.css";
import MathThumbnailImg from "@/assets/images/thumbnail-card.png";
import { useInView } from "@/components/useInView";

const CardMaterial = ({
    title = "Penjumlahan Dasar",
    description = "Pelajari konsep dasar penjumlahan sebagai fondasi dalam memahami operasi matematika.",
    category = "Dasar",
    categoryColor = "#D97706",
    level = 1,
    duration = "30 Menit",
    thumbnail,
    onSelect,
    delay = 0,
}) => {
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
            <div className="card-thumbnail">
                <img src={MathThumbnailImg} alt="" />

                {/* Category badge */}
                <div
                    className="absolute top-3 left-3 text-white rounded-full px-[10px] py-[3px] text-[11px] font-bold tracking-wide"
                    style={{ background: categoryColor }}
                >
                    {category}
                </div>

                {/* Duration badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-[10px] py-[3px] text-[11px] font-semibold text-gray-700 flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    {duration}
                </div>
            </div>

            {/* Body */}
            <div className="px-[18px] pt-4 pb-[18px]">
                {/* Difficulty dots */}
                <div className="flex items-center gap-1 mb-2">
                    {levelDots.map((d) => (
                        <div
                            key={d}
                            className="w-2 h-2 rounded-full"
                            style={{ background: d <= level ? "#F59E0B" : "#E5E7EB" }}
                        />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-1 font-medium">
                        {level === 1 ? "Pemula" : level === 2 ? "Menengah" : "Lanjut"}
                    </span>
                </div>

                <h3 className="text-[15px] font-extrabold text-gray-900 mb-1.5 leading-tight">
                    {title}
                </h3>
                <p className="text-[12.5px] text-gray-500 leading-relaxed mb-3.5">
                    {description}
                </p>

                <button className="card-btn">
                    Selengkapnya
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                </button>
            </div>
        </div>
    );
};


export default CardMaterial;
