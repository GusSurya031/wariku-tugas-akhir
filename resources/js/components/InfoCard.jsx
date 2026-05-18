import { Link } from "@inertiajs/react";
import UserIcon from "@/assets/icon/UserIcon";
import MailIcon from "@/assets/icon/MailIcon";
import EditIcon from "@/assets/icon/EditIcon";

const InfoCard = ({ userData }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 h-full">
        <div className="flex items-center justify-between">
            <h2 className="font-bold text-(--theme-primary) text-lg">Informasi</h2>
            <Link
                href="/profile"
                className="w-8 h-8 rounded-xl hover:bg-(--theme-soft) flex items-center justify-center transition-colors text-gray-400 hover:text-(--theme-primary)"
            >
                <EditIcon className="w-4 h-4" />
            </Link>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-(--theme-soft) ring-4 ring-(--theme-soft) flex items-center justify-center overflow-hidden">
                <UserIcon className="w-12 h-12 text-(--theme-primary) opacity-40" />
            </div>
            <h3 className="font-bold text-gray-800 text-base">{userData.name}</h3>
        </div>

        {/* Mood & Wariga badges */}
        <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Mood</p>
                <p className="font-bold text-gray-800 text-sm truncate">
                    {userData.mood_label ?? "Belum dicatat"}
                </p>
            </div>
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Sapta Wara</p>
                <p className="font-bold text-gray-800 text-sm truncate">
                    {userData.sapta_wara ?? "Belum diisi"}
                </p>
            </div>
        </div>

        {/* Wuku row */}
        {userData.wuku && (
            <div className="border border-gray-200 rounded-xl px-3 py-2.5 text-center">
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Wuku</p>
                <p className="font-bold text-gray-800 text-sm">{userData.wuku}</p>
            </div>
        )}

        {/* Contact details */}
        <div className="space-y-3">
            {[
                { icon: UserIcon, value: userData.fullname },
                { icon: MailIcon, value: userData.email },
            ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className="truncate">{value ?? "-"}</span>
                </div>
            ))}
        </div>
    </div>
);

export default InfoCard;
