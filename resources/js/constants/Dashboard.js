export const THEME_MAP = {
    Minggu: "redite",
    Senin: "soma",
    Selasa: "anggara",
    Rabu: "buda",
    Kamis: "wrespati",
    Jumat: "sukra",
    Sabtu: "saniscara",
};

export const DIFFICULTY_LABEL = {
    easy: "Mudah",
    medium: "Menengah",
    hard: "Lanjutan",
};
export const DIFFICULTY_COLOR = {
    easy: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
};

export const FORMAT_DATE = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const DIFFICULTY_ORDER = ["easy", "medium", "hard"];

export const DIFF_CONFIG = {
    easy: { label: "Mudah", bg: "bg-green-100", text: "text-green-700" },
    medium: { label: "Menengah", bg: "bg-amber-100", text: "text-amber-700" },
    hard: { label: "Lanjutan", bg: "bg-red-100", text: "text-red-700" },
};

export const FILTERS = [
    { value: "all", label: "Semua" },
    { value: "easy", label: "Mudah" },
    { value: "medium", label: "Menengah" },
    { value: "hard", label: "Lanjutan" },
];
