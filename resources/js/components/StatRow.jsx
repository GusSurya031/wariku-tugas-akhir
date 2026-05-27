const StatRow = ({ label, value }) => (
    <div className="flex items-start gap-2 py-3 border-b border-gray-50 last:border-0">
        <span className="text-sm font-bold text-gray-700 w-32 shrink-0">
            {label}
        </span>
        <span className="text-gray-400 font-medium text-sm shrink-0">:</span>
        <span className="text-sm text-gray-600">{value}</span>
    </div>
);

export default StatRow;
