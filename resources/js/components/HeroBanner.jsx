import { Link } from "@inertiajs/react";
import { THEME_MAP } from "@/constants/Dashboard";
import PlayIcon from "@/assets/icon/PlayIcon";

const HeroBanner = ({ user = "Pelajar", themeDay = null }) => {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    return (
        <div
            className="relative rounded-2xl overflow-hidden px-6 py-7 md:px-8 md:py-8"
            style={{ background: "var(--theme-gradient)" }}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-20 text-white/20 text-5xl font-black">
                    ✦
                </div>
                <div className="absolute bottom-4 right-8 text-white/15 text-7xl font-black">
                    ✦
                </div>
                <div className="absolute top-1/2 right-36 -translate-y-1/2 text-white/10 text-3xl font-black">
                    ✦
                </div>
            </div>
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                {themeSlug ? themeSlug.toUpperCase() : "WARIKU"}
            </p>
            <h1 className="text-white font-bold text-xl md:text-2xl leading-snug mb-1">
                Selamat belajar, {user}! 🌤️
            </h1>
            <p className="text-white/70 text-sm md:text-base mb-5">
                Siap melanjutkan perjalanan belajarmu hari ini?
            </p>
            <Link
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors border border-white/30 w-fit"
                href="/lessons"
            >
                Mulai Belajar
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <PlayIcon className="w-3 h-3 ml-0.5" />
                </span>
            </Link>
        </div>
    );
};

export default HeroBanner;
