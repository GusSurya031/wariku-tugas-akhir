import { getScoreInfo} from "@/helpers/DashboardHelpers";
const ScoreDonut = ({ score }) => {
    const { stroke } = getScoreInfo(score);
    const R = 60,
        CX = 80,
        CY = 80,
        sw = 12;
    const circ = 2 * Math.PI * R;
    return (
        <div className="flex flex-col items-center">
            <svg width="160" height="160" viewBox="0 0 160 160">
                <circle
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth={sw}
                />
                <circle
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={sw}
                    strokeDasharray={`${(score / 100) * circ} ${circ}`}
                    // strokeDashoffset={circ / 4} strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1s ease" }}
                />
                <text
                    x={CX}
                    y={CY + 6}
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="900"
                    fill="#1f2937"
                >
                    {score}
                </text>
            </svg>
        </div>
    );
};

export default ScoreDonut;
