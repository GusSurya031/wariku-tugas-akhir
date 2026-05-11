import { useState, useEffect, useRef, useCallback } from "react";
import { router } from "@inertiajs/react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const pad    = (n) => String(n).padStart(2, "0");
const letter = (i) => ["A", "B", "C", "D"][i] ?? String(i + 1);

function formatTime(s) {
    const h   = Math.floor(s / 3600);
    const m   = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${pad(h)} : ${pad(m)} : ${pad(sec)}`;
}

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
    purple:      "#6C63FF",
    purpleLight: "#EDE9FF",
    purpleMid:   "#8B84FF",
    gray:        "#F5F5F7",
    border:      "#E2E2E6",
    muted:       "#8A8A9A",
    success:     "#22C55E",
};

// ─── Shared button factory ────────────────────────────────────────────────────
function Btn({ onClick, disabled, children, filled = false, style = {} }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 6, padding: "8px 20px", borderRadius: 50,
                fontSize: 14, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.15s",
                border: filled ? "none" : `1.5px solid ${disabled ? C.border : C.purple}`,
                background: filled ? (disabled ? "#C9C6F5" : C.purple) : "white",
                color: filled ? "white" : (disabled ? C.muted : C.purple),
                opacity: disabled ? 0.65 : 1,
                ...style,
            }}
        >
            {children}
        </button>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function QuizPage({ variant, questions = [] }) {
    const total = questions.length;

    // ── state ──────────────────────────────────────────────────────────────────
    const [current,        setCurrent]        = useState(0);
    // collected answers: [{question_id, question_option_id, duration_answering}]
    const [answers,        setAnswers]        = useState([]);
    // option_id selected for the CURRENT question (null = nothing chosen)
    const [selectedOption, setSelectedOption] = useState(null);
    // seconds elapsed for the current question
    const [elapsed,        setElapsed]        = useState(0);
    const [showExitModal,  setShowExitModal]  = useState(false);
    const [submitting,     setSubmitting]     = useState(false);

    const timerRef    = useRef(null);
    const elapsedRef  = useRef(0);

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
    const q      = questions[current];
    const isLast = current === total - 1;
    const done   = answers.length;

    // ── select option (only before advancing) ──────────────────────────────────
    const handleSelect = (optionId) => {
        if (!submitting) setSelectedOption(optionId);
    };

    // ── advance to next question ───────────────────────────────────────────────
    const handleNext = () => {
        if (!selectedOption || submitting) return;

        const newAnswer = {
            question_id:        q.id,
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
                question_id:        q.id,
                question_option_id: selectedOption,
                duration_answering: elapsedRef.current,
            },
        ];

        router.post("/quiz", {
            material_has_variant_id: variant.id,
            answers:                 finalAnswers,
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
            <div style={{ minHeight: "100vh", background: C.gray, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, border: `4px solid ${C.purpleLight}`, borderTop: `4px solid ${C.purple}`, borderRadius: "50%", margin: "0 auto 24px", animation: "spin 0.9s linear infinite" }} />
                    <p style={{ color: C.purple, fontWeight: 700, fontSize: 16 }}>Menyimpan jawaban…</p>
                    <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>Hasilmu sedang diproses</p>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Quiz UI
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div style={{ minHeight: "100vh", background: C.gray, fontFamily: "system-ui, sans-serif" }}>

            {/* ── Header ─────────────────────────────────────────────────── */}
            <div style={{ background: "white", borderBottom: `1px solid ${C.border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                        onClick={() => setShowExitModal(true)}
                        style={{ width: 36, height: 36, borderRadius: "50%", background: C.purpleLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.purple, fontSize: 18 }}
                    >←</button>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 17, color: C.purple }}>Latihan Soal</div>
                        <div style={{ fontSize: 12, color: C.muted }}>
                            {variant?.materialTitle ?? "Materi"} · {variant?.difficulty === "easy" ? "Mudah" : variant?.difficulty === "medium" ? "Sedang" : "Lanjut"}
                        </div>
                    </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A2E" }}>Wariku ✦</div>
            </div>

            {/* ── Body grid ──────────────────────────────────────────────── */}
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: 24 }}>

                {/* ── Main card ──────────────────────────────────────────── */}
                <div style={{ background: "white", borderRadius: 16, border: `1px solid ${C.border}`, padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>

                    {/* Question counter */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13, color: C.muted }}>Soal {current + 1} dari {total}</span>
                        <span style={{ fontWeight: 700, fontSize: 18, color: C.purple }}>Soal {current + 1}</span>
                        {/* No previous button — cannot go back after answering */}
                        <div style={{ width: 80 }} />
                    </div>

                    {/* Question text */}
                    <div style={{ fontSize: 15, lineHeight: 1.75, color: "#2C2C3E", padding: "16px", background: C.gray, borderRadius: 12 }}>
                        {q?.question_text}
                    </div>

                    {/* Options */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {q?.options.map((opt, idx) => {
                            const sel = selectedOption === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => handleSelect(opt.id)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 14,
                                        padding: "12px 18px", borderRadius: 12, textAlign: "left",
                                        cursor: "pointer", transition: "all 0.15s",
                                        border: `1.5px solid ${sel ? C.purple : C.border}`,
                                        background: sel ? C.purpleLight : "white",
                                        color: sel ? C.purple : "#2C2C3E",
                                        fontWeight: sel ? 600 : 400, fontSize: 14,
                                    }}
                                >
                                    <span style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        border: `1.5px solid ${sel ? C.purple : C.border}`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0, fontSize: 13,
                                        background: sel ? C.purple : "transparent",
                                        color: sel ? "white" : C.muted, fontWeight: 600,
                                    }}>
                                        {letter(idx)}
                                    </span>
                                    {opt.option_text}
                                </button>
                            );
                        })}
                    </div>

                    {/* Action button */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                        {isLast ? (
                            <Btn onClick={handleSubmit} disabled={!selectedOption} filled style={{ padding: "10px 32px", fontSize: 15 }}>
                                Kirim Semua Jawaban
                            </Btn>
                        ) : (
                            <Btn onClick={handleNext} disabled={!selectedOption} filled style={{ padding: "10px 28px", fontSize: 15 }}>
                                Selanjutnya →
                            </Btn>
                        )}
                    </div>
                </div>

                {/* ── Sidebar ─────────────────────────────────────────────── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                    {/* Timer — per question, starts from 0 */}
                    <div style={{ background: "white", borderRadius: 16, border: `1px solid ${C.border}`, padding: "20px 24px" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.purple, marginBottom: 6 }}>Waktu soal ini</div>
                        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#1A1A2E" }}>
                            {formatTime(elapsed)}
                        </div>
                    </div>

                    {/* Question map — display only, no navigation (cannot go back) */}
                    <div style={{ background: "white", borderRadius: 16, border: `1px solid ${C.border}`, padding: "20px 24px" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.purple, marginBottom: 14 }}>Peta Soal</div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                            {questions.map((_, i) => {
                                const isAnswered = i < answers.length;
                                const isCurrent  = i === current;
                                const isPending  = i > current;
                                return (
                                    <div
                                        key={i}
                                        title={`Soal ${i + 1}${isAnswered ? " — Dijawab" : isCurrent ? " — Aktif" : ""}`}
                                        style={{
                                            aspectRatio: "1", borderRadius: 10, fontSize: 12, fontWeight: 600,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            border: `1.5px solid ${isCurrent ? C.purple : isAnswered ? C.purpleMid : C.border}`,
                                            background: isCurrent ? C.purple : isAnswered ? C.purpleLight : "white",
                                            color: isCurrent ? "white" : isAnswered ? C.purple : C.muted,
                                        }}
                                    >
                                        {pad(i + 1)}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, fontSize: 12, color: C.muted }}>
                            <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: C.purple, marginRight: 6 }} />Aktif</span>
                            <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: C.purpleLight, border: `1px solid ${C.purpleMid}`, marginRight: 6 }} />Dijawab</span>
                            <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, border: `1px solid ${C.border}`, marginRight: 6 }} />Belum dijawab</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div style={{ background: "white", borderRadius: 16, border: `1px solid ${C.border}`, padding: "16px 24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: C.muted, marginBottom: 8 }}>
                            <span>Progress</span>
                            <span style={{ fontWeight: 600, color: C.purple }}>{done}/{total}</span>
                        </div>
                        <div style={{ height: 8, borderRadius: 99, background: C.purpleLight, overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 99, background: C.purple, width: `${(done / total) * 100}%`, transition: "width 0.3s" }} />
                        </div>
                        <p style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>
                            Tidak bisa kembali ke soal sebelumnya.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Exit modal ─────────────────────────────────────────────── */}
            {showExitModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
                    <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 420, width: "100%", textAlign: "center" }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 30 }}>⚠️</div>
                        <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 700, color: "#1A1A2E" }}>Quiz belum selesai!</h3>
                        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.6, margin: "0 0 28px" }}>
                            Kamu baru menjawab <strong style={{ color: C.purple }}>{done}</strong> dari{" "}
                            <strong style={{ color: C.purple }}>{total}</strong> soal.
                            Jika keluar, progres kamu <strong>tidak akan tersimpan</strong>.
                        </p>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button
                                onClick={() => setShowExitModal(false)}
                                style={{ flex: 1, padding: "11px", borderRadius: 50, border: `1.5px solid ${C.purple}`, background: "white", color: C.purple, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                            >
                                Lanjutkan Quiz
                            </button>
                            <button
                                onClick={handleExit}
                                style={{ flex: 1, padding: "11px", borderRadius: 50, border: "none", background: C.purple, color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                            >
                                Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Responsive ─────────────────────────────────────────────── */}
            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: minmax(0,1fr) 280px"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
}
