import ArrowRightIcon from "@/assets/icon/ArrowRightIcon";

const NextChapterBanner = ({ chapter, onGo }) => (
    <div className="mt-10 rounded-2xl border-2 border-(--theme-secondary) bg-(--theme-soft) p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <p className="text-xs font-bold text-(--theme-primary) uppercase tracking-wider mb-1 opacity-70">
                Materi Selanjutnya
            </p>
            <h3 className="font-bold text-gray-800 text-base">
                {chapter.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
                Lanjutkan perjalanan belajarmu ke materi berikutnya
            </p>
        </div>
        <button
            onClick={onGo}
            className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-opacity hover:opacity-90 shadow-md whitespace-nowrap shrink-0"
            style={{ background: "var(--theme-gradient)" }}
        >
            Lanjut Belajar
            <ArrowRightIcon className="w-4 h-4" />
        </button>
    </div>
);

export default NextChapterBanner;
