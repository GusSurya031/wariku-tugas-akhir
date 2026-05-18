import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Logo from "@/assets/icon/logo.svg";
import SingleLogo from "@/assets/icon/SingleLogo";
import LeftPanel from "@/components/PanelAuth";

function getStrength(pw) {
    if (!pw) return { score: 0, label: "", color: "#E5E7EB" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    const map = [
        { label: "Terlalu lemah", color: "#EF4444" },
        { label: "Lemah", color: "#F97316" },
        { label: "Cukup", color: "#FBBF24" },
        { label: "Kuat", color: "#10B981" },
        { label: "Sangat kuat", color: "#059669" },
    ];
    return { score, ...map[score] };
}

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const strength = getStrength(password);

    const validate = () => {
        const e = {};
        if (!name.trim()) e.name = "Nama tidak boleh kosong";
        if (!email) e.email = "Email tidak boleh kosong";
        else if (!/\S+@\S+\.\S+/.test(email))
            e.email = "Format email tidak valid";
        if (!password) e.password = "Password tidak boleh kosong";
        else if (password.length < 8)
            e.password = "Password minimal 8 karakter";
        if (password !== confirm) e.confirm = "Password tidak cocok";
        return e;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        router.post(
            "/register",
            { name, email, password, password_confirmation: confirm },
            {
                onError: (backendErrors) => {
                    setErrors(backendErrors);
                    setLoading(false);
                },
                onSuccess: () => setSuccess(true),
                onFinish: () => setLoading(false),
                preserveScroll: true,
            },
        );
    };

    if (success)
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <LeftPanel
                        heading="Mulai perjalananmu"
                        paragraph="Dapatkan akses ke sistem belajar adaptif berbasis Wariga Bali"
                    />
                    <div className="auth-right">
                        <div className="slide-in py-6 text-center">
                            <div className="mx-auto mb-5 flex h-18 w-18 items-center justify-center rounded-full bg-[linear-gradient(135deg,#D1FAE5,#6EE7B7)]">
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#059669"
                                    strokeWidth="2.5"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                            <h2 className="mb-2 text-[22px] font-black text-gray-900">
                                Akun Berhasil Dibuat! 🎉
                            </h2>
                            <p className="mb-6 text-[13.5px] leading-[1.7] text-gray-500">
                                Selamat datang di Wariku! Sistem sedang
                                menyiapkan pengalaman belajar yang disesuaikan
                                dengan profil Wariga Bali kamu.
                            </p>
                            <Link
                                href="/login"
                                className="btn-primary-auth block text-center no-underline"
                            >
                                Masuk ke Akun →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="auth-page">
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

            {/* Decorative floating symbols */}
            <span className="float-el fixed top-[15%] left-[8%] z-0 text-[20px] text-[#FBBF24] opacity-50">
                ★
            </span>
            <span className="float-el2 fixed top-[70%] right-[6%] z-0 text-[16px] text-[#C4B5FD] opacity-50">
                ✦
            </span>
            <span className="float-el fixed bottom-[20%] left-[5%] z-0 text-[14px] text-[#FDE68A] opacity-40 [animation-delay:1s]">
                ✦
            </span>

            <div className="auth-card">
                <LeftPanel
                    heading="Mulai perjalananmu"
                    paragraph="Dapatkan akses ke sistem belajar adaptif berbasis Wariga Bali"
                />

                <div className="auth-right">
                    <div className="slide-in">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-4">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <img
                                        src={Logo}
                                        alt="Logo"
                                        className="w-20"
                                    />
                                </Link>
                            </div>
                            <h1 className="mb-1.5 text-[clamp(1.3rem,2.5vw,1.7rem)] font-black text-gray-900">
                                Buat Akun Baru
                            </h1>
                            <p className="text-[13px] leading-[1.6] text-gray-500">
                                Mulai perjalanan belajar adaptif berbasis Wariga
                                Bali hari ini.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="input-group">
                                <label className="input-label">
                                    Nama lengkap
                                </label>
                                <input
                                    className={`auth-input ${errors.name ? "error-state" : name ? "success" : ""}`}
                                    type="text"
                                    placeholder="Nama kamu"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setErrors((p) => ({ ...p, name: "" }));
                                    }}
                                />
                                {errors.name && (
                                    <p className="input-error">
                                        ⚠ {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="input-group">
                                <label className="input-label">
                                    Email kamu
                                </label>
                                <input
                                    className={`auth-input ${errors.email ? "error-state" : email && !errors.email ? "success" : ""}`}
                                    type="email"
                                    placeholder="contoh@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors((p) => ({ ...p, email: "" }));
                                    }}
                                />
                                {errors.email && (
                                    <p className="input-error">
                                        ⚠ {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="input-group">
                                <label className="input-label">Password</label>
                                <div className="input-wrap">
                                    <input
                                        className={`auth-input ${errors.password ? "error-state" : ""}`}
                                        type={showPw ? "text" : "password"}
                                        placeholder="Min. 8 karakter"
                                        value={password}
                                        style={{ paddingRight: 44 }}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setErrors((p) => ({
                                                ...p,
                                                password: "",
                                            }));
                                        }}
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

                                {/* Strength meter */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="mb-1 flex gap-1">
                                            {[0, 1, 2, 3].map((i) => (
                                                <div
                                                    key={i}
                                                    className="strength-bar"
                                                    style={{
                                                        background:
                                                            i < strength.score
                                                                ? strength.color
                                                                : "#E5E7EB",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                        <span
                                            className="text-[11px] font-semibold"
                                            style={{ color: strength.color }}
                                        >
                                            {strength.label}
                                        </span>
                                    </div>
                                )}
                                {errors.password && (
                                    <p className="input-error">
                                        ⚠ {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="input-group">
                                <label className="input-label">
                                    Konfirmasi password
                                </label>
                                <div className="input-wrap">
                                    <input
                                        className={`auth-input ${errors.confirm ? "error-state" : confirm && confirm === password ? "success" : confirm ? "error-state" : ""}`}
                                        type={showConfirm ? "text" : "password"}
                                        placeholder="Ulangi password"
                                        value={confirm}
                                        style={{ paddingRight: 44 }}
                                        onChange={(e) => {
                                            setConfirm(e.target.value);
                                            setErrors((p) => ({
                                                ...p,
                                                confirm: "",
                                            }));
                                        }}
                                    />
                                    <span
                                        className="input-icon"
                                        onClick={() =>
                                            setShowConfirm(!showConfirm)
                                        }
                                    >
                                        {confirm && confirm === password ? (
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
                                        ) : showConfirm ? (
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
                                {errors.confirm && (
                                    <p className="input-error">
                                        ⚠ {errors.confirm}
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
                                    <span className="flex items-center justify-center gap-2">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            className="animate-spin"
                                        >
                                            <path d="M21 12a9 9 0 11-6.219-8.56" />
                                        </svg>
                                        Membuat akun...
                                    </span>
                                ) : (
                                    "Buat Akun →"
                                )}
                            </button>
                        </form>

                        {/* Switch to Login */}
                        <p className="text-center text-[13px] text-gray-500">
                            Sudah punya akun?{" "}
                            <Link
                                href="/login"
                                className="font-bold text-violet-600 no-underline"
                            >
                                Masuk
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
