import { useState, useEffect, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";
import { THEME_MAP } from "@/constants/Dashboard";
import Logo from "@/assets/icon/logo.svg";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pad = (n) => String(n).padStart(2, "0");
const letter = (i) => ["A", "B", "C", "D"][i] ?? String(i + 1);

function formatTime(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${pad(h)} : ${pad(m)} : ${pad(sec)}`;
}

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
    purple: "var(--theme-primary)",
    purpleLight: "var(--theme-soft)",
    purpleMid: "var(--theme-secondary)",
    gray: "#F5F5F7",
    border: "#E2E2E6",
    muted: "#8A8A9A",
    success: "#22C55E",
};

// ─── Shared button factory ────────────────────────────────────────────────────
function Btn({ onClick, disabled, children, filled = false, style = {} }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 20px",
                borderRadius: 50,
                fontSize: 14,
                fontWeight: 600,
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                border: filled
                    ? "none"
                    : `1.5px solid ${disabled ? C.border : C.purple}`,
                background: filled
                    ? disabled
                        ? C.purpleLight
                        : "var(--theme-gradient)"
                    : "white",
                color: filled ? "white" : disabled ? C.muted : C.purple,
                opacity: disabled ? 0.65 : 1,
                ...style,
            }}
        >
            {children}
        </button>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function QuizPage({ variant, questions = [], themeDay = null }) {
    const total = questions.length;
    const themeSlug = THEME_MAP[themeDay] ?? null;

    // ── state ──────────────────────────────────────────────────────────────────
    const [current, setCurrent] = useState(0);
    // collected answers: [{question_id, question_option_id, duration_answering}]
    const [answers, setAnswers] = useState([]);
    // option_id selected for the CURRENT question (null = nothing chosen)
    const [selectedOption, setSelectedOption] = useState(null);
    // seconds elapsed for the current question
    const [elapsed, setElapsed] = useState(0);
    const [showExitModal, setShowExitModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const timerRef = useRef(null);
    const elapsedRef = useRef(0);

    // ── timer: starts fresh for each question ──────────────────────────────────
    const startTimer = useCallback(() => {
        clearInterval(timerRef.current);
        elapsedRef.current = 0;
        setElapsed(0);
        timerRef.current = setInterval(() => {
            elapsedRef.current += 1;
            setElapsed(elapsedRef.current);
        }, 1000);
    }, []);

    // Start timer when component mounts; clean up on unmount
    useEffect(() => {
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [startTimer]);

    // ── derived values ─────────────────────────────────────────────────────────
    const q = questions[current];
    const isLast = current === total - 1;
    const done = answers.length;

    // ── select option (only before advancing) ──────────────────────────────────
    const handleSelect = (optionId) => {
        if (!submitting) setSelectedOption(optionId);
    };

    // ── advance to next question ───────────────────────────────────────────────
    const handleNext = () => {
        if (!selectedOption || submitting) return;

        const newAnswer = {
            question_id: q.id,
            question_option_id: selectedOption,
            duration_answering: elapsedRef.current,
        };

        setAnswers((prev) => [...prev, newAnswer]);
        setSelectedOption(null);
        setCurrent((c) => c + 1);
        startTimer();
    };

    // ── submit all answers (last question) ────────────────────────────────────
    // Two data fields per answer: duration_answering + question_option_id
    const handleSubmit = () => {
        if (!selectedOption || !isLast || submitting) return;

        clearInterval(timerRef.current);
        setSubmitting(true);

        const finalAnswers = [
            ...answers,
            {
                question_id: q.id,
                question_option_id: selectedOption,
                duration_answering: elapsedRef.current,
            },
        ];

        router.post("/quiz", {
            material_has_variant_id: variant.id,
            answers: finalAnswers,
        });
    };

    // ── exit modal ─────────────────────────────────────────────────────────────
    const handleExit = () => {
        clearInterval(timerRef.current);
        router.visit("/dashboard");
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Submitting overlay
    // ─────────────────────────────────────────────────────────────────────────
    if (submitting) {
        return (
            <div
                data-theme={themeSlug}
                style={{
                    minHeight: "100vh",
                    background: C.gray,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "system-ui, sans-serif",
                }}
            >
                <div style={{ textAlign: "center" }}>
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            border: `4px solid ${C.purpleLight}`,
                            borderTop: `4px solid ${C.purple}`,
                            borderRadius: "50%",
                            margin: "0 auto 24px",
                            animation: "spin 0.9s linear infinite",
                        }}
                    />
                    <p
                        style={{
                            color: C.purple,
                            fontWeight: 700,
                            fontSize: 16,
                        }}
                    >
                        Menyimpan jawaban…
                    </p>
                    <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>
                        Hasilmu sedang diproses
                    </p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div
            data-theme={themeSlug}
            className="min-h-screen bg-(--bg-secondary) font-sans"
        >
            {/* ── Header ─────────────────────────────────────────────────── */}
            <header className="sticky top-0 z-20 bg-white border-b border-(--border-primary)  ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowExitModal(true)}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-0 bg-(--theme-soft) text-lg text-(--theme-primary)"
                        >
                            ←
                        </button>

                        <div>
                            <div className="text-[17px] font-bold text-(--theme-primary)">
                                Latihan Soal
                            </div>
                            <div className="text-xs text-(--text-secondary)">
                                {variant?.materialTitle ?? "Materi"} ·{" "}
                                {variant?.difficulty === "easy"
                                    ? "Mudah"
                                    : variant?.difficulty === "medium"
                                      ? "Sedang"
                                      : "Lanjut"}
                            </div>
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img src={Logo} alt="Logo" className="w-24 md:w-32" />
                    </div>
                </div>
            </header>

            {/* ── Body grid ──────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[minmax(0,1fr)_280px]">
                {/* ── Main card ──────────────────────────────────────────── */}
                <div className="flex flex-col gap-6 rounded-2xl border border-(--border-primary) bg-white px-8 py-7">
                    {/* Question counter */}
                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-(--text-secondary)">
                            Soal {current + 1} dari {total}
                        </span>

                        <span className="text-lg font-bold text-(--theme-primary)">
                            Soal {current + 1}
                        </span>

                        {/* No previous button — cannot go back after answering */}
                        <div className="w-20" />
                    </div>

                    {/* Question text */}
                    <div className="rounded-xl bg-(--bg-secondary) p-4 text-[15px] leading-[1.75] text-[#2C2C3E]">
                        {q?.question_text}
                    </div>

                    {/* Options */}
                    <div className="flex flex-col gap-2.5">
                        {q?.options.map((opt, idx) => {
                            const sel = selectedOption === opt.id;

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                    className={`flex cursor-pointer items-center gap-3.5 rounded-xl border-[1.5px] px-4.5 py-3 text-left text-sm transition-all duration-150 ${
                                        sel
                                            ? "border-(--theme-primary) bg-(--theme-soft) font-semibold text-(--theme-primary)"
                                            : "border-(--border-primary) bg-white font-normal text-[#2C2C3E]"
                                    }`}
                                >
                                    <span
                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[13px] font-semibold ${
                                            sel
                                                ? "border-(--theme-primary) bg-(--theme-primary) text-white"
                                                : "border-(--border-primary) bg-transparent text-(--text-secondary)"
                                        }`}
                                    >
                                        {letter(idx)}
                                    </span>

                                    {opt.option_text}
                                </button>
                            );
                        })}
                    </div>

                    {/* Action button */}
                    <div className="mt-1 flex justify-end">
                        {isLast ? (
                            <Btn
                                onClick={handleSubmit}
                                disabled={!selectedOption}
                                filled
                                className="px-8 py-2.5 text-[15px]"
                            >
                                Kirim Semua Jawaban
                            </Btn>
                        ) : (
                            <Btn
                                onClick={handleNext}
                                disabled={!selectedOption}
                                filled
                                className="px-7 py-2.5 text-[15px]"
                            >
                                Selanjutnya →
                            </Btn>
                        )}
                    </div>
                </div>

                {/* ── Sidebar ─────────────────────────────────────────────── */}
                <div className="flex flex-col gap-4">
                    {/* Timer — per question, starts from 0 */}
                    <div className="rounded-2xl border border-(--border-primary) bg-white px-6 py-5">
                        <div className="mb-1.5 text-sm font-bold text-(--theme-primary)">
                            Waktu soal ini
                        </div>

                        <div className="text-[22px] font-bold tracking-[2px] text-[#1A1A2E]">
                            {formatTime(elapsed)}
                        </div>
                    </div>

                    {/* Question map — display only, no navigation */}
                    <div className="rounded-2xl border border-(--border-primary) bg-white px-6 py-5">
                        <div className="mb-3.5 text-sm font-bold text-(--theme-primary)">
                            Peta Soal
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((_, i) => {
                                const isAnswered = i < answers.length;
                                const isCurrent = i === current;

                                return (
                                    <div
                                        key={i}
                                        title={`Soal ${i + 1}${
                                            isAnswered
                                                ? " — Dijawab"
                                                : isCurrent
                                                  ? " — Aktif"
                                                  : ""
                                        }`}
                                        className={`flex aspect-square items-center justify-center rounded-[10px] border-[1.5px] text-xs font-semibold ${
                                            isCurrent
                                                ? "border-(--theme-primary) bg-(--theme-primary) text-white"
                                                : isAnswered
                                                  ? "border-(--theme-secondary) bg-(--theme-soft) text-(--theme-primary)"
                                                  : "border-(--border-primary) bg-white text-(--text-secondary)"
                                        }`}
                                    >
                                        {pad(i + 1)}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 flex flex-col gap-1.5 text-xs text-(--text-secondary)">
                            <span>
                                <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[3px] bg-(--theme-primary)" />
                                Aktif
                            </span>

                            <span>
                                <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[3px] border border-(--theme-secondary) bg-(--theme-soft)" />
                                Dijawab
                            </span>

                            <span>
                                <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-[3px] border border-(--border-primary)" />
                                Belum dijawab
                            </span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="rounded-2xl border border-(--border-primary) bg-white px-6 py-4">
                        <div className="mb-2 flex justify-between text-[13px] text-(--text-secondary)">
                            <span>Progress</span>
                            <span className="font-semibold text-(--theme-primary)">
                                {done}/{total}
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-(--theme-soft)">
                            <div
                                className="h-full rounded-full bg-(--theme-primary) transition-[width] duration-300"
                                style={{ width: `${(done / total) * 100}%` }}
                            />
                        </div>

                        <p className="mt-2 text-[11px] text-(--text-secondary)">
                            Tidak bisa kembali ke soal sebelumnya.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Exit modal ─────────────────────────────────────────────── */}
            {showExitModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
                    <div className="w-full max-w-105 rounded-[20px] bg-white px-8 py-9 text-center">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF3E0] text-3xl">
                            ⚠️
                        </div>

                        <h3 className="mb-2.5 text-xl font-bold text-[#1A1A2E]">
                            Quiz belum selesai!
                        </h3>

                        <p className="mb-7 text-sm leading-[1.6] text-(--text-secondary)">
                            Kamu baru menjawab{" "}
                            <strong className="text-(--theme-primary)">
                                {done}
                            </strong>{" "}
                            dari{" "}
                            <strong className="text-(--theme-primary)">
                                {total}
                            </strong>{" "}
                            soal. Jika keluar, progres kamu{" "}
                            <strong>tidak akan tersimpan</strong>.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="flex-1 cursor-pointer rounded-full border-[1.5px] border-(--theme-primary) bg-white p-3 text-sm font-semibold text-(--theme-primary)"
                            >
                                Lanjutkan Quiz
                            </button>

                            <button
                                onClick={handleExit}
                                className="flex-1 cursor-pointer rounded-full border-0 bg-(--theme-primary) p-3 text-sm font-semibold text-white"
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
