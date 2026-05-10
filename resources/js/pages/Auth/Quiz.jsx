import { useState, useEffect, useRef, useCallback } from "react";

const QUESTIONS = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  text: `Perhatikan persamaan berikut: 2x + ${i + 3} = ${(i + 3) * 3}. Tentukan nilai x yang memenuhi persamaan tersebut dan jelaskan langkah penyelesaiannya secara sistematis.`,
  options: [
    { key: "A", label: `x = ${(i + 3) * 3 - (i + 3)}` },
    { key: "B", label: `x = ${(i + 3) * 2}` },
    { key: "C", label: `x = ${i + 5}` },
    { key: "D", label: `x = ${i + 7}` },
    { key: "E", label: `x = ${i + 9}` },
  ],
  correct: "A",
}));

function pad(n) { return String(n).padStart(2, "0"); }

function formatTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${pad(h)} : ${pad(m)} : ${pad(sec)}`;
}

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [elapsed, setElapsed] = useState(0);
  const [timings, setTimings] = useState({});
  const [showExitModal, setShowExitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef(null);
  const elapsedRef = useRef(0);

  const startTimer = useCallback(() => {
    elapsedRef.current = 0;
    setElapsed(0);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setElapsed(elapsedRef.current);
    }, 1000);
  }, []);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, []);

  useEffect(() => {
    if (submitted) clearInterval(timerRef.current);
  }, [submitted]);

  const q = QUESTIONS[current];
  const total = QUESTIONS.length;
  const selectedAnswer = answers[current];
  const isLast = current === total - 1;
  const isFirst = current === 0;

  const canNext = selectedAnswer !== undefined;
  // prev disabled entirely once a question is answered
  const canPrev = !isFirst && selectedAnswer === undefined;

  const handleSelect = useCallback((key) => {
    if (!submitted) setAnswers(prev => ({ ...prev, [current]: key }));
  }, [current, submitted]);

  const handleNext = () => {
    if (canNext && !isLast) {
      setTimings(prev => ({ ...prev, [current]: elapsedRef.current }));
      setCurrent(c => c + 1);
      startTimer();
    }
  };
  const handlePrev = () => { if (canPrev) setCurrent(c => c - 1); };

  const handleSubmit = () => {
    if (isLast && canNext && !submitted) {
      const finalTimings = { ...timings, [current]: elapsedRef.current };
      setTimings(finalTimings);
      clearInterval(timerRef.current);
      setSubmitted(true);
    }
  };

  const handleBackClick = () => setShowExitModal(true);

  const score = submitted
    ? QUESTIONS.filter((q, i) => answers[i] === q.correct).length
    : null;

  const purple = "#6C63FF";
  const purpleLight = "#EDE9FF";
  const purpleMid = "#8B84FF";
  const gray = "#F5F5F7";
  const border = "#E2E2E6";
  const textMuted = "#8A8A9A";

  const btn = (onClick, disabled, children, variant = "outline", extraStyle = {}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 6, padding: "8px 18px", borderRadius: 50,
        fontSize: 14, fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.15s",
        border: variant === "filled" ? "none" : `1.5px solid ${disabled ? border : purple}`,
        background: variant === "filled" ? (disabled ? "#C9C6F5" : purple) : "white",
        color: variant === "filled" ? "white" : (disabled ? textMuted : purple),
        opacity: disabled ? 0.7 : 1,
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );

  if (submitted) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ minHeight: "100vh", background: gray, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "48px 40px", maxWidth: 480, width: "100%", textAlign: "center", border: `1px solid ${border}` }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: purpleLight, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 36 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: "#1A1A2E", margin: "0 0 8px" }}>Quiz Selesai!</h2>
          <p style={{ color: textMuted, margin: "0 0 32px" }}>Waktu yang digunakan: {formatTime(elapsed)}</p>
          <div style={{ background: purpleLight, borderRadius: 16, padding: "24px", margin: "0 0 32px" }}>
            <div style={{ fontSize: 48, fontWeight: 700, color: purple }}>{pct}%</div>
            <div style={{ color: purple, fontSize: 14, marginTop: 4 }}>{score} dari {total} jawaban benar</div>
          </div>
          {btn(() => { setSubmitted(false); setCurrent(0); setAnswers({}); setElapsed(0); timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000); }, false, "Coba Lagi", "filled", { width: "100%", padding: "12px 24px", fontSize: 15 })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: gray, fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: `1px solid ${border}`, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={handleBackClick} style={{ width: 36, height: 36, borderRadius: "50%", background: purpleLight, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: purple, fontSize: 18 }}>←</button>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: purple }}>Latihan Soal</div>
            <div style={{ fontSize: 12, color: textMuted }}>Materi: Aljabar</div>
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#1A1A2E" }}>Wariku ✦</div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: 24 }}>

        {/* Main Card */}
        <div style={{ background: "white", borderRadius: 16, border: `1px solid ${border}`, padding: "28px 32px", display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {btn(handlePrev, !canPrev, <><span>←</span> Sebelumnya</>, "outline")}
            <span style={{ fontWeight: 700, fontSize: 18, color: purple }}>Soal {current + 1}</span>
            {btn(handleNext, !canNext || isLast, <>Selanjutnya <span>→</span></>, "outline")}
          </div>

          {/* Question */}
          <div style={{ fontSize: 15, lineHeight: 1.75, color: "#2C2C3E" }}>{q.text}</div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {q.options.map(opt => {
              const sel = selectedAnswer === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelect(opt.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 18px", borderRadius: 12, textAlign: "left",
                    cursor: "pointer", transition: "all 0.15s",
                    border: `1.5px solid ${sel ? purple : border}`,
                    background: sel ? purpleLight : "white",
                    color: sel ? purple : "#2C2C3E",
                    fontWeight: sel ? 600 : 400, fontSize: 14,
                  }}
                >
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${sel ? purple : border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, background: sel ? purple : "transparent", color: sel ? "white" : textMuted, fontWeight: 600 }}>{opt.key}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Submit on last */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            {btn(handleSubmit, !isLast || !canNext, "Submit Jawaban", "filled", { padding: "10px 28px", fontSize: 15, opacity: (!isLast || !canNext) ? 0.5 : 1 })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Timer */}
          <div style={{ background: "white", borderRadius: 16, border: `1px solid ${border}`, padding: "20px 24px" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: purple, marginBottom: 10 }}>Waktu yang diperlukan</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#1A1A2E" }}>{formatTime(elapsed)}</div>
          </div>

          {/* Question Map */}
          <div style={{ background: "white", borderRadius: 16, border: `1px solid ${border}`, padding: "20px 24px" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: purple, marginBottom: 14 }}>Soal</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
              {QUESTIONS.map((_, i) => {
                const answered = answers[i] !== undefined;
                const isCur = i === current;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (answered || i === 0 || answers[i - 1] !== undefined) setCurrent(i);
                    }}
                    title={`Soal ${i + 1}`}
                    style={{
                      aspectRatio: "1", borderRadius: 10, fontSize: 12, fontWeight: 600,
                      border: `1.5px solid ${isCur ? purple : answered ? purpleMid : border}`,
                      background: isCur ? purple : answered ? purpleLight : "white",
                      color: isCur ? "white" : answered ? purple : textMuted,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    {pad(i + 1)}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 16, fontSize: 12, color: textMuted }}>
              <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: purple, marginRight: 4 }} />Aktif</span>
              <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: purpleLight, border: `1px solid ${purpleMid}`, marginRight: 4 }} />Dijawab</span>
              <span><span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, border: `1px solid ${border}`, marginRight: 4 }} />Belum</span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ background: "white", borderRadius: 16, border: `1px solid ${border}`, padding: "16px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: textMuted, marginBottom: 8 }}>
              <span>Progress</span>
              <span style={{ fontWeight: 600, color: purple }}>{Object.keys(answers).length}/{total}</span>
            </div>
            <div style={{ height: 8, borderRadius: 99, background: purpleLight, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: purple, width: `${(Object.keys(answers).length / total) * 100}%`, transition: "width 0.3s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 32px", maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#FFF3E0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 30 }}>⚠️</div>
            <h3 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 700, color: "#1A1A2E" }}>Quiz belum selesai!</h3>
            <p style={{ color: textMuted, fontSize: 14, lineHeight: 1.6, margin: "0 0 28px" }}>
              Kamu baru menjawab <strong style={{ color: purple }}>{Object.keys(answers).length}</strong> dari <strong style={{ color: purple }}>{total}</strong> soal. Jika keluar, progres kamu <strong>tidak akan tersimpan</strong>.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setShowExitModal(false)} style={{ flex: 1, padding: "11px", borderRadius: 50, border: `1.5px solid ${purple}`, background: "white", color: purple, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Lanjutkan Quiz</button>
              <button onClick={() => alert("Navigating back to material...")} style={{ flex: 1, padding: "11px", borderRadius: 50, border: "none", background: purple, color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Keluar</button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive CSS */}
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
