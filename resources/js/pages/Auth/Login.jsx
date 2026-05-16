import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import "@/../css/app.css";
import Logo from "@/assets/icon/logo.svg";
import SingleLogo from "@/assets/icon/single_logo";

const GlobalStyles = () => (
    <style>{`
    .auth-page {
      min-height: 100vh; width: 100%;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
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

const LeftPanel = () => (
    <div className="auth-left relative hidden w-[320px] shrink-0 overflow-hidden bg-[linear-gradient(160deg,#a78bfa_0%,#7c3aed_35%,#4338ca_65%,#312e81_100%)] px-9 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="panel-blob float-el absolute -left-[60px] -top-[60px] h-[220px] w-[220px] rounded-full bg-violet-400/60" />

        <div className="panel-blob float-el2 absolute -right-10 top-[100px] h-[180px] w-[180px] rounded-full bg-blue-400/45" />

        <div className="panel-blob float-el absolute bottom-[60px] left-5 h-[140px] w-[140px] rounded-full bg-amber-400/25 [animation-delay:1s]" />

        <div className="relative z-[2]">
            <div className="wariga-badge float-el2">
                <span className="text-sm">🌟</span>
                <span className="text-[11px] font-bold text-white/90">
                    Wariga-Powered
                </span>
            </div>
        </div>

        <div className="relative z-[2] flex flex-1 items-center justify-center">
            <div className="spin-el absolute h-[120px] w-[120px] rounded-full border-2 border-dashed border-white/20" />

            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                <span className="text-[32px]">
                    <SingleLogo className="w-10 h-10" />
                </span>
            </div>

            <div className="float-el absolute -top-5 right-2.5 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur">
                <span className="text-[11px] font-bold text-white">
                    ✦ Adaptif
                </span>
            </div>

            <div className="float-el2 absolute -bottom-2.5 left-0 rounded-[10px] border border-amber-400/30 bg-amber-400/25 px-3 py-1.5 backdrop-blur">
                <span className="text-[11px] font-bold text-amber-200">
                    ✦ Personal
                </span>
            </div>

            <div className="float-el absolute bottom-[30px] -right-2.5 rounded-[10px] border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur [animation-delay:1.5s]">
                <span className="text-[11px] font-bold text-white">
                    ✦ Wariga
                </span>
            </div>
        </div>

        <div className="relative z-[2]">
            <p className="mb-1.5 text-xs font-medium text-white/60">
                Selamat datang kembali
            </p>

            <h2 className="text-lg font-black leading-[1.4] text-white">
                Belajar lebih cerdas sesuai dirimu
            </h2>
        </div>
    </div>
);

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!email) e.email = "Email tidak boleh kosong";
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = "Format email tidak valid";
        if (!password) e.password = "Password tidak boleh kosong";
        else if (password.length < 6)
            e.password = "Password minimal 6 karakter";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Jalankan validasi client-side
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // 2. Reset errors dan set loading
        setErrors({});
        setLoading(true);

        // 3. Kirim data ke backend
        router.post(
            "/login",
            {
                email,
                password,
            },
            {
                // Inertia akan otomatis menangani pengiriman data
                onError: (backendErrors) => {
                    setErrors(backendErrors);
                    setLoading(false);
                },
                onSuccess: () => {
                    setSuccess(true);
                },
                onFinish: () => {
                    setLoading(false);
                },
                // Penting: Cegah scroll jump
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="auth-page hero-bg">
            <GlobalStyles />

            <div
                className="bg-blob"
                style={{
                    width: 400,
                    height: 400,
                    background: "#FEF08A",
                    opacity: 0.25,
                    top: -120,
                    left: -100,
                }}
            />
            <div
                className="bg-blob"
                style={{
                    width: 300,
                    height: 300,
                    background: "#C4B5FD",
                    opacity: 0.2,
                    top: 100,
                    right: -80,
                }}
            />
            <div
                className="bg-blob"
                style={{
                    width: 250,
                    height: 250,
                    background: "#A5F3FC",
                    opacity: 0.18,
                    bottom: -80,
                    left: 200,
                }}
            />
            <div className="auth-card">
                <LeftPanel />

                <div className="auth-right">
                    <div className="slide-in">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-4">
                                <Link href="/" className="flex items-center gap-2">
                                    <img src={Logo} alt="Logo" className="w-20" />
                                </Link>
                            </div>
                            <h1
                                style={{
                                    fontSize: "clamp(1.4rem,2.5vw,1.8rem)",
                                    fontWeight: 900,
                                    color: "#111827",
                                    marginBottom: 6,
                                }}
                            >
                                Selamat Datang Kembali
                            </h1>
                            <p
                                style={{
                                    fontSize: 13.5,
                                    color: "#6B7280",
                                    lineHeight: 1.6,
                                }}
                            >
                                Masuk dan lanjutkan perjalanan belajarmu yang
                                telah disesuaikan dengan Wariga Bali.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <div className="input-group">
                                <label className="input-label">
                                    Email kamu
                                </label>
                                <div className="input-wrap">
                                    <input
                                        className={`auth-input ${errors.email ? "error-state" : email && !errors.email ? "success" : ""}`}
                                        type="email"
                                        placeholder="contoh@email.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setErrors((p) => ({
                                                ...p,
                                                email: "",
                                            }));
                                        }}
                                    />
                                    {email && !errors.email && (
                                        <span className="input-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="#10B981"
                                                strokeWidth="2.5"
                                            >
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="input-error">
                                        ⚠ {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <label className="input-label">
                                        Password
                                    </label>
                                </div>
                                <div className="input-wrap">
                                    <input
                                        className={`auth-input ${errors.password ? "error-state" : ""}`}
                                        type={showPw ? "text" : "password"}
                                        placeholder="••••••••••"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((p) => ({
                                                ...p,
                                                password: "",
                                            }));
                                        }}
                                        style={{ paddingRight: 44 }}
                                    />
                                    <span
                                        className="input-icon"
                                        onClick={() => setShowPw(!showPw)}
                                    >
                                        {showPw ? (
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </span>
                                </div>
                                {errors.password && (
                                    <p className="input-error">
                                        ⚠ {errors.password}
                                    </p>
                                )}
                            </div>
                            {/* Submit */}
                            <button
                                className="btn-primary-auth"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 8,
                                        }}
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            style={{
                                                animation:
                                                    "spin-slow 1s linear infinite",
                                            }}
                                        >
                                            <path d="M21 12a9 9 0 11-6.219-8.56" />
                                        </svg>
                                        Masuk...
                                    </span>
                                ) : (
                                    "Masuk →"
                                )}
                            </button>
                        </form>

                        {/* Switch to Register */}
                        <p
                            style={{
                                textAlign: "center",
                                fontSize: 13,
                                color: "#6B7280",
                            }}
                        >
                            Belum punya akun?{" "}
                            <Link
                                href="/register"
                                style={{
                                    color: "#7C3AED",
                                    fontWeight: 700,
                                    textDecoration: "none",
                                }}
                            >
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
