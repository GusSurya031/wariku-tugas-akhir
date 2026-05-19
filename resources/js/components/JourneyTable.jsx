import { Link } from "@inertiajs/react";
import {formatDate} from "@/helpers/DashboardHelpers";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";

const JourneyTable = ({ rows = [] }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                            Waktu
                        </th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                            Materi
                        </th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                            Akurasi
                        </th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                            Performa
                        </th>
                        <th className="text-left text-xs font-bold uppercase tracking-wider text-gray-400 px-5 py-3.5">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-5 py-8 text-center text-xs text-gray-400"
                            >
                                Belum ada riwayat latihan soal.
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="px-5 py-3.5 text-gray-600 text-xs">
                                    {formatDate(row.created_at)}
                                </td>
                                <td className="px-5 py-3.5 text-gray-700 text-xs font-medium">
                                    {row.material_title}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className="text-xs font-bold text-gray-800">
                                        {row.score}%
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span
                                        className={`text-xs font-bold ${
                                            row.score_performance <= 60
                                                ? "text-red-500"
                                                : row.score_performance <= 80
                                                  ? "text-amber-500"
                                                  : "text-emerald-600"
                                        }`}
                                    >
                                        {row.score_performance}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <Link
                                        href={`/quiz/result/${row.id}`}
                                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-(--theme-soft) hover:border-(--theme-secondary) transition-all group"
                                    >
                                        <ArrowUpRightIcon className="w-3 h-3 text-gray-400 group-hover:text-(--theme-primary)" />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default JourneyTable;
