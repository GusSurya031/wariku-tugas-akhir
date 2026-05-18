export const CATEGORIES = [
    "Semua",
    "Aljabar",
    "Sistem Persamaan",
    "Geometri",
    "Statistika",
];

export const TOPIC_COLOR = {
    geometri: "#16A34A",
    statistika: "#7C3AED",
    aljabar: "#F59E0B",
    "sistem persamaan": "#EF4444",
};
export const TOPIC_LABEL = {
    geometri: "Geometri",
    statistika: "Statistika",
    aljabar: "Aljabar",
    "sistem persamaan": "Sistem Persamaan",
};

export const DIFFICULTY_LABEL = {
    easy: "Pemula",
    medium: "Menengah",
    hard: "Lanjut"
};

export const DIFFICULTY_ABBR = {
    easy: "P",
    medium: "M",
    hard: "L"
};

export const DIFFICULTY_COLOR = {
    easy: "#10B981",
    medium: "#F59E0B",
    hard: "#EF4444",
};

export const STATIC_TOOLS = [
    { icon: "📝", label: "Alat tulis untuk mencatat dan berhitung" },
    { icon: "⏰", label: "Fokus dan waktu belajar yang cukup" },
];

export const STATIC_METHODS = [
    "Penjelasan konsep dasar",
    "Contoh soal yang mudah dipahami",
    "Latihan bertahap sesuai level",
    "Evaluasi pemahaman di akhir sesi",
];

export const TECH_CARDS = [
    {
        num: 1,
        title: "Rule-Based System",
        desc: "Menggunakan interpretasi Wariga Bali untuk memahami preferensi belajar siswa secara lebih personal dan budaya-kontekstual.",
        icon: "📜",
        color: "#065F46",
    },
    {
        num: 2,
        title: "Learning Analytics",
        desc: "Menganalisis performa & hasil evaluasi siswa untuk memahami tingkat pemahaman secara lebih akurat.",
        icon: "🧠",
        color: "#312E81",
    },
    {
        num: 3,
        title: "Adaptive Learning",
        desc: "Menggabungkan penilaian multidimensi untuk memahami kemampuan kamu secara menyeluruh dan memberikan jalur belajar optimal.",
        icon: "🔁",
        color: "#92400E",
    },
];

export const FAQS = [
    {
        q: "Apa itu sistem pembelajaran adaptif?",
        a: "Sistem pembelajaran adaptif adalah sistem yang menyesuaikan konten dan metode belajar secara otomatis berdasarkan kemampuan, gaya belajar, dan kemajuan siswa. Wariku menggunakan pendekatan ini dikombinasikan dengan kearifan Wariga Bali untuk pengalaman yang lebih personal.",
    },
    {
        q: "Bagaimana Wariga Bali diintegrasikan ke dalam sistem ini?",
        a: "Wariga Bali adalah sistem kalender dan interpretasi karakter khas Bali. Sistem kami menerjemahkan prinsip-prinsip Wariga menjadi preferensi gaya belajar — misalnya waktu belajar yang optimal, pendekatan visual vs naratif, dan ritme penyampaian materi.",
    },
    {
        q: "Apakah saya perlu memahami Wariga Bali untuk menggunakan Wariku?",
        a: "Tidak sama sekali! Sistem secara otomatis menangani interpretasi Wariga di balik layar. Kamu cukup memasukkan informasi dasar, dan sistem akan memberikan rekomendasi belajar yang disesuaikan untukmu.",
    },
    {
        q: "Bagaimana cara sistem mengukur kemampuan saya?",
        a: "Sistem menganalisis hasil latihan, waktu pengerjaan, tingkat akurasi, dan konsistensi belajarmu. Data ini diproses menggunakan Fuzzy Logic untuk menghasilkan penilaian yang lebih nuansa dibanding sistem penilaian konvensional.",
    },
    {
        q: "Apakah data belajar saya tersimpan dengan aman?",
        a: "Ya, seluruh data belajarmu dienkripsi dan disimpan secara aman. Kami tidak membagikan data pribadi kepada pihak ketiga tanpa persetujuan. Privasi dan keamanan data pengguna adalah prioritas utama kami.",
    },
];
