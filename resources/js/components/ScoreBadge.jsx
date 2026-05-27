const ScoreBadge = ({ score }) => {
    const color =
        score >= 85 ? "text-green-600 bg-green-50"
        : score >= 70 ? "text-amber-600 bg-amber-50"
        : "text-red-500 bg-red-50";
    return (
        <span className={`inline-flex items-center justify-center font-black text-sm px-2.5 py-0.5 rounded-lg ${color}`}>
            {score}
        </span>
    );
};

export default ScoreBadge;
