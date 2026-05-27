import { Link } from "@inertiajs/react";
import ScoreBadge from '@/components/ScoreBadge';
import Pagination from '@/components/Pagination';
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import { PER_PAGE } from '@/constants/Dashboard';

const HistoryCard = ({ rows, page, totalPages, totalItems, onPageChange }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4 h-full">
        <h2 className="font-bold text-(--theme-primary) text-base">Perjalanan belajarmu</h2>

        <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full text-sm min-w-[480px]">
                <thead>
                    <tr className="border-b border-gray-100">
                        {["Waktu Pengerjaan", "Durasi", "Materi", "Skor", "Action"].map((h) => (
                            <th
                                key={h}
                                className="text-left text-xs font-semibold text-gray-400 pb-3 pr-4 first:pl-0 last:pr-0 whitespace-nowrap"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                                Belum ada riwayat latihan soal.
                            </td>
                        </tr>
                    )}

                    {rows.map((row, i) => (
                        <tr
                            key={row.id}
                            className={`border-b last:border-0 transition-colors hover:bg-(--theme-soft)/40
                            ${i % 2 === 0 ? "border-gray-50" : "border-gray-100"}`}
                        >
                            <td className="py-3.5 pr-4 text-xs text-gray-500 whitespace-nowrap">{row.date}</td>
                            <td className="py-3.5 pr-4 text-xs text-gray-500 whitespace-nowrap">{row.duration}</td>
                            <td className="py-3.5 pr-4 text-xs text-gray-700 font-medium whitespace-nowrap">{row.material_title}</td>
                            <td className="py-3.5">
                                <ScoreBadge score={row.score} />
                            </td>
                            <td className="py-3.5 pr-4">
                                <Link
                                    href={`/quiz/result/${row.id}`}
                                    className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border(--theme-secondary) transition-all group">
                                    <ArrowUpRightIcon className="w-3 h-3 text-gray-400 group-hover:text-(--theme-primary)" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                    {/* Fill empty rows to stabilise height */}
                    {rows.length > 0 && rows.length < PER_PAGE &&
                        Array.from({ length: PER_PAGE - rows.length }).map((_, i) => (
                            <tr key={`empty-${i}`} className="border-b last:border-0 border-gray-50">
                                <td colSpan={5} className="py-3.5" />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

        {totalItems > 0 && (
            <Pagination
                current={page}
                total={totalPages}
                totalItems={totalItems}
                onChange={onPageChange}
            />
        )}
    </div>
);

export default HistoryCard;
