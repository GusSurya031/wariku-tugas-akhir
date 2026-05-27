const MathHeroImage = () => (
    <div
        className="relative w-full rounded-2xl overflow-hidden bg-(--theme-soft)"
        style={{ minHeight: "220px", maxHeight: "280px" }}
    >
        {[
            {
                val: "3",
                color: "#22c55e",
                x: "5%",
                y: "15%",
                size: "5rem",
                rot: "-10deg",
            },
            {
                val: "×",
                color: "#8b5cf6",
                x: "18%",
                y: "5%",
                size: "3.5rem",
                rot: "8deg",
            },
            {
                val: "4",
                color: "#f97316",
                x: "30%",
                y: "8%",
                size: "4rem",
                rot: "-5deg",
            },
            {
                val: "+",
                color: "#06b6d4",
                x: "48%",
                y: "4%",
                size: "3.5rem",
                rot: "12deg",
            },
            {
                val: "7",
                color: "#ef4444",
                x: "68%",
                y: "10%",
                size: "4.5rem",
                rot: "-8deg",
            },
            {
                val: "9",
                color: "#3b82f6",
                x: "3%",
                y: "65%",
                size: "4rem",
                rot: "15deg",
            },
            {
                val: "6",
                color: "#eab308",
                x: "88%",
                y: "60%",
                size: "4.5rem",
                rot: "-12deg",
            },
        ].map((n, i) => (
            <span
                key={i}
                className="absolute font-black select-none leading-none"
                style={{
                    color: n.color,
                    left: n.x,
                    top: n.y,
                    fontSize: n.size,
                    transform: `rotate(${n.rot})`,
                    textShadow: "3px 3px 0 rgba(0,0,0,0.15)",
                }}
            >
                {n.val}
            </span>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
            <div
                className="rounded-2xl px-10 py-5 shadow-2xl"
                style={{ background: "var(--theme-gradient)" }}
            >
                <span
                    className="font-black text-5xl tracking-widest text-white"
                    style={{
                        fontFamily: "'Fredoka One', 'Nunito', sans-serif",
                    }}
                >
                    MATH
                </span>
            </div>
        </div>
    </div>
);

export default MathHeroImage;
