import { Link } from "@inertiajs/react";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import MathThumbnail from "@/components/MathThumbnail";

const CourseCard = ({ id, title = "Materi", subdesc = "", topic = "" }) => (
    <Link
        href={`/lessons?open=${id}`}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group flex flex-col"
    >
        <MathThumbnail />
        <div className="p-4 flex flex-col flex-1">
            <p className="text-[10px] text-gray-400 mb-0.5">{topic}</p>
            <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-(--theme-primary) transition-colors">
                {title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed flex-1">
               {subdesc}
            </p>
            <div className="mt-3">
                <span
                    className="flex items-center gap-1.5 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-opacity hover:opacity-90 w-fit"
                    style={{ background: "var(--theme-gradient)" }}
                >
                    Selengkapnya
                    <ArrowUpRightIcon className="w-3 h-3" />
                </span>
            </div>
        </div>
    </Link>
);

export default CourseCard;
