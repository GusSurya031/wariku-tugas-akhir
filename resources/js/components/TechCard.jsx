import ItemFadeIn from '@/components/ItemFadeIn';

const TechCard = ({ card, index }) => (
    <ItemFadeIn direction="up" delay={index * 0.12}>
        <div className="tech-card">
            <div
                className="num-badge"
                style={{
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}CC)`,
                }}
            >
                {card.num}
            </div>

            <div className="mb-3 text-[32px]">{card.icon}</div>

            <h3 className="mb-2.5 text-base font-extrabold text-gray-900">
                {card.title}
            </h3>

            <p className="text-[13px] leading-[1.75] text-gray-500">
                {card.desc}
            </p>
        </div>
    </ItemFadeIn>
);

export default TechCard;
