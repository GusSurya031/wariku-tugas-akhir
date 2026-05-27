export const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const getScoreInfo = (score) => {
    if (score >= 85)
        return {
            stroke: "#22c55e",
            text: "text-green-500",
            label: "Sangat Baik",
            bg: "bg-green-50",
        };
    if (score >= 70)
        return {
            stroke: "#f59e0b",
            text: "text-amber-500",
            label: "Baik",
            bg: "bg-amber-50",
        };
    if (score >= 55)
        return {
            stroke: "#8b5cf6",
            text: "text-violet-500",
            label: "Cukup",
            bg: "bg-violet-50",
        };
    return {
        stroke: "#ef4444",
        text: "text-red-500",
        label: "Perlu Latihan",
        bg: "bg-red-50",
    };
};

export const generateTips = (score, rec) => {
    const tips = [];
    if (score >= 85)
        tips.push(
            "Luar biasa! Pertahankan semangat belajar dan tantang dirimu dengan materi yang lebih menantang.",
        );
    else if (score >= 70)
        tips.push(
            "Bagus! Kamu sudah menguasai sebagian besar materi. Fokus pada bagian yang masih perlu diperbaiki.",
        );
    else if (score >= 55)
        tips.push(
            "Cukup baik. Pelajari kembali materi yang belum dikuasai sebelum mencoba lagi.",
        );
    else
        tips.push(
            "Jangan menyerah! Kembali ke materi dan pelajari ulang dari awal.",
        );

    if (rec) {
        const ct = rec.content_type === "illustration" ? "ilustrasi" : "teks";
        tips.push(
            `Sistem merekomendasikan belajar dengan format ${ct} pada tingkat ${rec.difficulty}.`,
        );
        if (rec.quiz_difficulty) {
            tips.push(
                `Untuk latihan soal berikutnya, tingkat ${rec.quiz_difficulty} akan membantu mengoptimalkan pemahamanmu.`,
            );
        }
    }
    return tips;
};

export const fmt = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const exportToCSV = (date, exportRows) => {
    if (!exportRows || exportRows.length === 0) {
        alert("Tidak ada data untuk tanggal ini.");
        return;
    }
    const headers = [
        "Nama",
        "Kondisi Mood",
        "Level Mood",
        "Score Performance",
        "Rekomendasi",
        "Kondisi Wariga",
    ];
    const csvRows = [
        headers.join(","),
        ...exportRows.map((r) =>
            [
                `"${r.user_name}"`,
                `"${r.mood_label}"`,
                r.mood_level,
                r.score_performance,
                `"${r.recommendation_rule}"`,
                `"${r.wariga_condition}"`,
            ].join(","),
        ),
    ];
    const csv = "﻿" + csvRows.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wariku-report-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
};
