import CheckIcon from "@/assets/icon/CheckIcon";

const ChapterSidebar = ({
    chapters,
    activeIdx,
    completedIdxs,
    onSelect,
    mobileOpen,
    onMobileClose,
}) => {
    const nextChapter = chapters[activeIdx + 1] ?? null;

    const Item = ({ ch, idx }) => {
        const isActive = idx === activeIdx;
        const isCompleted = completedIdxs.includes(idx);
        const isLocked = !isActive && !isCompleted && idx > activeIdx;
        const num = String(ch.order_number).padStart(2, "0");

        return (
            <button
                onClick={() => {
                    if (!isLocked) {
                        onSelect(idx);
                        onMobileClose?.();
                    }
                }}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200
                    ${isCompleted && !isActive ? "bg-(--theme-soft) text-(--theme-primary) hover:opacity-80" : ""}
                    ${isLocked ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-60" : ""}
                    ${!isActive && !isCompleted && !isLocked ? "bg-gray-50 text-gray-600 hover:bg-gray-100" : ""}
                `}
                style={
                    isActive
                        ? {
                              background: "var(--theme-gradient)",
                              color: "white",
                              boxShadow:
                                  "0 4px 12px color-mix(in srgb, var(--theme-primary) 30%, transparent)",
                          }
                        : {}
                }
            >
                <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0
                    ${isActive ? "bg-white/20 text-white" : ""}
                    ${isCompleted && !isActive ? "bg-(--theme-soft) text-(--theme-primary)" : ""}
                    ${!isActive && !isCompleted ? "bg-gray-200 text-gray-500" : ""}
                `}
                >
                    {isCompleted && !isActive ? (
                        <CheckIcon className="w-4 h-4" />
                    ) : (
                        num
                    )}
                </span>
                <span
                    className={`text-sm font-semibold truncate ${isActive ? "text-white" : ""}`}
                >
                    {ch.title}
                </span>
            </button>
        );
    };

    const content = (
        <div className="space-y-2 p-1">
            <div className="flex items-center justify-between mb-1 px-1">
                <h3 className="font-bold text-gray-800 text-sm">
                    Daftar Chapter
                </h3>
            </div>
            {nextChapter && (
                <p className="text-xs text-(--theme-primary) font-medium px-1 mb-3 opacity-70">
                    Berikutnya: {nextChapter.title}
                </p>
            )}
            {chapters.map((ch, idx) => (
                <Item key={ch.id} ch={ch} idx={idx} />
            ))}
        </div>
    );

    return (
        <>
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-6 pt-1">{content}</div>
            </aside>
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={onMobileClose}
                    />
                    <div
                        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-5 shadow-2xl lg:hidden"
                        style={{
                            animation:
                                "slideUp 0.3s cubic-bezier(0.32,0.72,0,1) both",
                        }}
                    >
                        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />
                        {content}
                        <div className="pb-4" />
                    </div>
                    <style>{`@keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>
                </>
            )}
        </>
    );
};

export default ChapterSidebar;
