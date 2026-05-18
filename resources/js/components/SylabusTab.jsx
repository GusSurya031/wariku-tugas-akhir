import { useState, useMemo } from "react";

const SilabusTab = ({ syllabus, time }) => {
    const [openWeek, setOpenWeek] = useState(0);

    return (
        <div className="tab-content grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Accordion */}
            <div className="min-w-0 lg:col-span-8">
                <h2 className="mb-5 text-[clamp(1.3rem,2.5vw,1.6rem)] font-black text-gray-900">
                    Silabus Materi
                </h2>

                <div className="flex flex-col gap-3">
                    {syllabus.map((week, wi) => {
                        const isOpen = openWeek === wi;
                        const doneCount = week.topics.filter(
                            (t) => t.done,
                        ).length;

                        return (
                            <div
                                key={wi}
                                className={`overflow-hidden rounded-2xl border-[1.5px] transition-all duration-200 ${
                                    isOpen
                                        ? "border-amber-300 bg-amber-50"
                                        : "border-[#F0EDE6] bg-white"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setOpenWeek(isOpen ? -1 : wi)
                                    }
                                    className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-5 py-4 text-left"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-200 ${
                                                isOpen
                                                    ? "bg-amber-500"
                                                    : "bg-gray-100"
                                            }`}
                                        >
                                            <span
                                                className={`text-[13px] font-black ${
                                                    isOpen
                                                        ? "text-white"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {week.abbr ?? week.week}
                                            </span>
                                        </div>

                                        <div>
                                            <div className="text-sm font-extrabold text-gray-900">
                                                {week.title}
                                            </div>
                                            <div className="mt-0.5 text-xs text-gray-400">
                                                {doneCount}/{week.topics.length}{" "}
                                                topik selesai
                                            </div>
                                        </div>
                                    </div>

                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#9CA3AF"
                                        strokeWidth="2.5"
                                        className={`shrink-0 transition-transform duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="flex flex-col gap-2 px-3.5 pb-3.5">
                                        {week.topics.map((topic, ti) => (
                                            <div
                                                key={topic.id}
                                                className={`syllabus-item ${topic.done ? "done" : ""}`}
                                                style={{
                                                    transitionDelay: `${ti * 0.05}s`,
                                                }}
                                            >
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                    <span className="text-xs font-bold text-gray-400">
                                                        {ti + 1}
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <div className="text-[13px] font-bold text-gray-700">
                                                        {topic.title}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: summary sidebar */}
            <div className="flex flex-col gap-5 lg:col-span-4">
                <div className="sidebar-card">
                    <h3 className="mb-4 text-[15px] font-extrabold text-gray-900">
                        Ringkasan Silabus
                    </h3>

                    {[
                        {
                            label: "Total Level",
                            value: syllabus.length,
                            icon: "🎯",
                        },
                        {
                            label: "Total Topik",
                            value: syllabus.reduce(
                                (a, w) => a + w.topics.length,
                                0,
                            ),
                            icon: "📖",
                        },
                        {
                            label: "Estimasi Waktu",
                            value: time + " Menit",
                            icon: "⏱️",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-3 py-2.5 ${
                                i < 3 ? "border-b border-gray-100" : ""
                            }`}
                        >
                            <span className="text-lg">{s.icon}</span>
                            <div className="flex-1">
                                <div className="text-[11px] font-medium text-gray-400">
                                    {s.label}
                                </div>
                                <div className="text-base font-extrabold text-gray-900">
                                    {s.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SilabusTab;
