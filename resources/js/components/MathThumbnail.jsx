const MathThumbnail = () => (
    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-(--theme-soft) flex items-center justify-center">
        <div className="relative select-none" aria-hidden="true">
            <span className="absolute -top-4 -left-6 text-2xl font-black text-red-500 rotate-[-15deg]">
                5
            </span>
            <span className="absolute -top-6 left-2 text-xl font-black text-green-500 rotate-10">
                2
            </span>
            <span className="absolute -top-3 left-10 text-2xl font-black text-blue-500 rotate-[-8deg]">
                ×
            </span>
            <span className="absolute top-0 -right-6 text-xl font-black text-purple-500 rotate-12">
                4
            </span>
            <span className="absolute -bottom-2 -left-4 text-xl font-black text-orange-500 rotate-[-10deg]">
                3
            </span>
            <span className="absolute bottom-0 right-0 text-2xl font-black text-pink-500 rotate-[8deg]">
                +
            </span>
            <div
                className="rounded-lg px-5 py-2 shadow-lg"
                style={{ background: "var(--theme-gradient)" }}
            >
                <span
                    className="text-white font-black text-2xl tracking-wider"
                    style={{
                        fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                    }}
                >
                    MATH
                </span>
            </div>
            <span className="absolute -bottom-3 -right-5 text-xl font-black text-yellow-500 -rotate-12">
                9
            </span>
            <span className="absolute top-1 -left-8 text-lg font-black text-teal-500 rotate-15">
                6
            </span>
            <span className="absolute -bottom-4 left-3 text-2xl font-black text-violet-500 rotate-[5deg]">
                8
            </span>
        </div>
    </div>
);

export default MathThumbnail;
