import ClockIcon from '@/assets/icon/ClockIcon';
import BanIcon from '@/assets/icon/BanIcon';
import CheckListIcon from '@/assets/icon/CheckListIcon';
import AlertIcon from '@/assets/icon/AlertIcon';

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

export const INSTRUCTIONS = [
    "Baca setiap soal dengan teliti sebelum menjawab",
    "Jawaban tidak bisa diubah setelah lanjut ke soal berikutnya",
    "Setiap soal hanya memiliki satu jawaban yang benar",
    "Nilai akhir akan ditampilkan setelah menyelesaikan semua soal",
    "Perlu DIINGAT bahwa ketika sudah memulai latihan dan menutup halaman, maka jawaban anda tidak akan tersimpan dan latihan harus dimulai dari awal kembali",
];

export const QUIZ_RULES = [
    {
        icon: ClockIcon,
        title: "Timer per soal",
        desc:  "Setiap soal memiliki waktu yang dihitung untuk mengukur kecepatan menjawabmu.",
    },
    {
        icon: BanIcon,
        title: "Tidak bisa kembali",
        desc:  "Setelah menjawab dan lanjut ke soal berikutnya, kamu tidak bisa kembali ke soal sebelumnya.",
    },
    {
        icon: CheckListIcon,
        title: "Jawab semua soal",
        desc:  "Pastikan semua soal telah dijawab sebelum menekan tombol kirim.",
    },
    {
        icon: AlertIcon,
        title: "Jangan tinggalkan halaman",
        desc:  "Refresh atau keluar dari halaman akan menghapus seluruh progres jawabanmu.",
    },
];

