import { useState } from "react";
import { Link } from "@inertiajs/react";
import "@/../css/app.css";

const GlobalStyles = () => (
    <style>{`
    .auth-page {
      min-height: 100vh; width: 100%;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
      background: linear-gradient(135deg, #fef9e7 0%, #fdf4ca 40%, #f0f4ff 100%);
      position: relative; overflow: hidden;
    }
    .bg-blob {
      position: fixed; border-radius: 50%;
      filter: blur(80px); pointer-events: none; z-index: 0;
    }
    .auth-card {
      display: flex;
      width: 100%; max-width: 860px;
      background: #fff;
      border-radius: 28px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06);
      overflow: hidden;
      position: relative; z-index: 1;
      min-height: 540px;
    }
    .auth-left {
      width: 320px; flex-shrink: 0;
      padding: 40px 36px;
      display: flex; flex-direction: column; justify-content: space-between;
      position: relative; overflow: hidden; 
      background: linear-gradient(160deg, #a78bfa 0%, #7c3aed 35%, #4338ca 65%, #312e81 100%);
    }
    .panel-blob {
      position: absolute; border-radius: 50%;
      filter: blur(50px); pointer-events: none;
    }
    .auth-right {
      flex: 1; padding: 48px 44px;
      display: flex; flex-direction: column; justify-content: center;
      background: #fff;
    }
    .input-group { margin-bottom: 18px; }
    .input-label {
      display: block; font-size: 13px; font-weight: 700;
      color: #374151; margin-bottom: 7px;
    }
    .input-wrap { position: relative; }
    .auth-input {
      width: 100%; padding: 12px 16px;
      border: 1.5px solid #E5E7EB; border-radius: 12px;
      font-size: 14px; font-family: inherit; color: #111827;
      background: #fafaf8; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .auth-input:focus {
      border-color: #7C3AED;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.10);
      background: #fff;
    }
    .auth-input::placeholder { color: #9CA3AF; }
    .input-icon {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      cursor: pointer; color: #9CA3AF; transition: color 0.2s;
    }
    .input-icon:hover { color: #7C3AED; }
    .btn-primary-auth {
      width: 100%; padding: 13px;
      border-radius: 12px; border: none; cursor: pointer;
      font-size: 14px; font-weight: 800; font-family: inherit;
      background: linear-gradient(135deg, #7C3AED, #6D28D9);
      color: #fff;
      box-shadow: 0 6px 20px rgba(124,58,237,0.35);
      transition: transform 0.2s, box-shadow 0.2s;
      margin-bottom: 20px;
      letter-spacing: 0.02em;
    }
    .btn-primary-auth:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(124,58,237,0.45);
    }
    .btn-primary-auth:active { transform: none; }
    .divider {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 18px;
    }
    .divider-line { flex: 1; height: 1px; background: #E5E7EB; }
    .divider-text { font-size: 12px; color: #9CA3AF; font-weight: 500; white-space: nowrap; }
    .social-btn {
      flex: 1; padding: 10px 0;
      border: 1.5px solid #E5E7EB; border-radius: 10px;
      background: #fff; cursor: pointer; font-size: 13px; font-weight: 600;
      color: #374151; font-family: inherit;
      display: flex; align-items: center; justify-content: center; gap: 7px;
      transition: border-color 0.2s, background 0.2s, transform 0.2s;
    }
    .social-btn:hover {
      border-color: #7C3AED; background: #FAF5FF;
      transform: translateY(-1px);
    }
    .wariga-badge {
      position: absolute; top: 36px; right: 36px;
      background: rgba(255,255,255,0.15); backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.25);
      border-radius: 12px; padding: 8px 14px;
      display: flex; align-items: center; gap: 6px;
    }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(5deg)} }
    @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes slide-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    .float-el { animation: float 5s ease-in-out infinite; }
    .float-el2 { animation: float2 7s ease-in-out infinite; }
    .spin-el { animation: spin-slow 20s linear infinite; }
    .slide-in { animation: slide-in 0.4s ease; }
    .custom-check {
      width: 18px; height: 18px; border-radius: 5px;
      border: 1.5px solid #D1D5DB; background: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0; transition: all 0.2s;
    }
    .custom-check.checked {
      background: linear-gradient(135deg,#7C3AED,#6D28D9);
      border-color: #7C3AED;
    }
    .input-error { font-size: 11.5px; color: #EF4444; margin-top: 5px; font-weight: 500; }
    .auth-input.success { border-color: #10B981; }
    .auth-input.error-state { border-color: #EF4444; box-shadow: 0 0 0 3px rgba(239,68,68,0.10); }
    @media (max-width: 680px) {
      .auth-left { display: none; }
      .auth-right { padding: 36px 28px; }
      .auth-card { border-radius: 20px; }
    }
    @media (max-width: 400px) {
      .auth-right { padding: 28px 20px; }
      .social-btns { flex-direction: column !important; }
    }
  `}</style>
);

const Logo = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
            <path d="M8 10 Q14 6 20 10 Q14 14 8 10Z" fill="#FDE68A" />
            <path d="M8 14 Q14 10 20 14 Q14 18 8 14Z" fill="rgba(255,255,255,0.6)" />
            <path d="M8 18 Q14 14 20 18 Q14 22 8 18Z" fill="#FDE68A" opacity="0.6" />
        </svg>
        <span style={{ fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "-0.02em" }}>
            Wariku
        </span>
    </div>
);

const LeftPanel = () => (
    <div className="auth-left">
        <div className="panel-blob float-el" style={{ width: 220, height: 220, background: "rgba(167,139,250,0.6)", top: -60, left: -60 }} />
        <div className="panel-blob float-el2" style={{ width: 180, height: 180, background: "rgba(96,165,250,0.45)", top: 100, right: -40 }} />
        <div className="panel-blob float-el" style={{ width: 140, height: 140, background: "rgba(251,191,36,0.25)", bottom: 60, left: 20, animationDelay: "1s" }} />

        <div style={{ position: "relative", zIndex: 2 }}>
            <Logo />
            <div className="wariga-badge float-el2">
                <span style={{ fontSize: 14 }}>🌟</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>
                    Wariga-Powered
                </span>
            </div>
        </div>

        <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="spin-el" style={{ width: 120, height: 120, border: "2px dashed rgba(255,255,255,0.2)", borderRadius: "50%", position: "absolute" }} />
            <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontSize: 32 }}>📚</span>
            </div>
            <div className="float-el" style={{ position: "absolute", top: -20, right: 10, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "6px 12px", border: "1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>✦ Adaptif</span>
            </div>
            <div className="float-el2" style={{ position: "absolute", bottom: -10, left: 0, background: "rgba(251,191,36,0.25)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "6px 12px", border: "1px solid rgba(251,191,36,0.3)" }}>
                <span style={{ fontSize: 11, color: "#FDE68A", fontWeight: 700 }}>✦ Personal</span>
            </div>
            <div className="float-el" style={{ position: "absolute", bottom: 30, right: -10, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "6px 12px", border: "1px solid rgba(255,255,255,0.2)", animationDelay: "1.5s" }}>
                <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>✦ Wariga</span>
            </div>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, fontWeight: 500 }}>
                Selamat datang kembali
            </p>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.4 }}>
                Belajar lebih cerdas sesuai dirimu
            </h2>
        </div>
    </div>
);

const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!email) e.email = "Email tidak boleh kosong";
        else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Format email tidak valid";
        if (!password) e.password = "Password tidak boleh kosong";
        else if (password.length < 6) e.password = "Password minimal 6 karakter";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
    };

    return (
        <div className="auth-page">
            <GlobalStyles />

            <div className="bg-blob" style={{ width: 400, height: 400, background: "#FEF08A", opacity: 0.25, top: -120, left: -100 }} />
            <div className="bg-blob" style={{ width: 300, height: 300, background: "#C4B5FD", opacity: 0.2, top: 100, right: -80 }} />
            <div className="bg-blob" style={{ width: 250, height: 250, background: "#A5F3FC", opacity: 0.18, bottom: -80, left: 200 }} />

            <div className="float-el" style={{ position: "fixed", top: "15%", left: "8%", color: "#FBBF24", fontSize: 20, opacity: 0.5, zIndex: 0 }}>★</div>
            <div className="float-el2" style={{ position: "fixed", top: "70%", right: "6%", color: "#C4B5FD", fontSize: 16, opacity: 0.5, zIndex: 0 }}>✦</div>
            <div className="float-el" style={{ position: "fixed", bottom: "20%", left: "5%", color: "#FDE68A", fontSize: 14, opacity: 0.4, zIndex: 0, animationDelay: "1s" }}>✦</div>

            <div className="auth-card">
                <LeftPanel />

                <div className="auth-right">
                    <div className="slide-in">
                        {/* Header */}
                        <div className="mb-6">
                            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#EDE9FE,#DDD6FE)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                                <span style={{ fontSize: 18 }}>✦</span>
                            </div>
                            <h1 style={{ fontSize: "clamp(1.4rem,2.5vw,1.8rem)", fontWeight: 900, color: "#111827", marginBottom: 6 }}>
                                Selamat Datang Kembali
                            </h1>
                            <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.6 }}>
                                Masuk dan lanjutkan perjalanan belajarmu yang telah disesuaikan dengan Wariga Bali.
                            </p>
                        </div>

                        {/* Email */}
                        <div className="input-group">
                            <label className="input-label">Email kamu</label>
                            <div className="input-wrap">
                                <input
                                    className={`auth-input ${errors.email ? "error-state" : email && !errors.email ? "success" : ""}`}
                                    type="email"
                                    placeholder="contoh@email.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                                />
                                {email && !errors.email && (
                                    <span className="input-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                                    </span>
                                )}
                            </div>
                            {errors.email && <p className="input-error">⚠ {errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="input-group">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label className="input-label">Password</label>
                                <a href="#" style={{ fontSize: 12, color: "#7C3AED", fontWeight: 600, textDecoration: "none" }}
                                    onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                                    onMouseLeave={(e) => (e.target.style.textDecoration = "none")}>
                                    Lupa password?
                                </a>
                            </div>
                            <div className="input-wrap">
                                <input
                                    className={`auth-input ${errors.password ? "error-state" : ""}`}
                                    type={showPw ? "text" : "password"}
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                                    style={{ paddingRight: 44 }}
                                />
                                <span className="input-icon" onClick={() => setShowPw(!showPw)}>
                                    {showPw ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </span>
                            </div>
                            {errors.password && <p className="input-error">⚠ {errors.password}</p>}
                        </div>

                        {/* Remember me */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                            <div className={`custom-check ${remember ? "checked" : ""}`} onClick={() => setRemember(!remember)}>
                                {remember && (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                )}
                            </div>
                            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Ingat saya di perangkat ini</span>
                        </div>

                        {/* Submit */}
                        <button className="btn-primary-auth" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin-slow 1s linear infinite" }}>
                                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                                    </svg>
                                    Masuk...
                                </span>
                            ) : "Masuk →"}
                        </button>

                        {/* Divider */}
                        <div className="divider">
                            <div className="divider-line" />
                            <span className="divider-text">atau lanjutkan dengan</span>
                            <div className="divider-line" />
                        </div>

                        {/* Social */}
                        <div className="social-btns" style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                            <button className="social-btn"><GoogleIcon /> Google</button>
                            <button className="social-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                Facebook
                            </button>
                        </div>

                        {/* Switch to Register */}
                        <p style={{ textAlign: "center", fontSize: 13, color: "#6B7280" }}>
                            Belum punya akun?{" "}
                            <Link href="/register" style={{ color: "#7C3AED", fontWeight: 700, textDecoration: "none" }}>
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
