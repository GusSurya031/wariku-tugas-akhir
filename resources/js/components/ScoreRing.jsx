const ScoreRing = ({ score }) => {
    const r = 28,
        c = 2 * Math.PI * r;
    return (
        <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="var(--theme-soft, #ede9fe)"
                    strokeWidth="7"
                />
                <circle
                    cx="36"
                    cy="36"
                    r={r}
                    fill="none"
                    stroke="var(--theme-primary, #7c3aed)"
                    strokeWidth="7"
                    strokeDasharray={c}
                    strokeDashoffset={c * (1 - score / 100)}
                    strokeLinecap="round"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-(--theme-primary)">
                {score}
            </span>
        </div>
    );
};

export default ScoreRing;
