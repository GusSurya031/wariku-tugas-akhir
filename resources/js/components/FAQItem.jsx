import { useState } from "react";
import ItemFadeIn from "@/components/ItemFadeIn";

const FAQItem = ({ question, answer, index }) => {
    const [open, setOpen] = useState(false);

    return (
        <ItemFadeIn direction="up" delay={index * 0.08}>
            <div className={`faq-item ${open ? "open" : ""}`}>
                <button className="faq-btn" onClick={() => setOpen(!open)}>
                    <div className="flex items-center gap-3">
                        <span className="text-white-400 font-semibold">•</span>
                        <span className="text-sm font-bold text-gray-900">
                            {question}
                        </span>
                    </div>

                    <div
                        className={`faq-icon ${open ? "bg-yellow-100" : "bg-gray-100"}`}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={open ? "#D97706" : "#6B7280"}
                            strokeWidth="2.5"
                            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </button>

                {open && (
                    <div className="faq-answer tab-content">
                        <p className="text-[13.5px] leading-[1.8] text-gray-500">
                            {answer}
                        </p>
                    </div>
                )}
            </div>
        </ItemFadeIn>
    );
};

export default FAQItem;
