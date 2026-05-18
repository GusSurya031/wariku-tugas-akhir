import { useState } from "react";
import { Link, router, Head } from "@inertiajs/react";
import Logo from "@/assets/icon/logo.svg";
import SingleLogo from "@/assets/icon/SingleLogo";
import LeftPanel from "@/components/PanelAuth";

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

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        router.post(
            "/login",
            { email, password },
            {
                onError: (backendErrors) => {
                    setErrors(backendErrors);
                    setLoading(false);
                },
                onFinish: () => setLoading(false),
                preserveScroll: true,
            },
        );
    };

    return (
        <>
            <Head title="Wariku - Login Akun Anda" />
            <div className="auth-page hero-bg">
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
                    <LeftPanel
                        heading="Selamat Datang Kembali"
                        paragraph="Belajar lebih cerdas sesuai dirimu"
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
                                <h1 className="mb-1.5 text-[clamp(1.4rem,2.5vw,1.8rem)] font-black text-gray-900">
                                    Selamat Datang Kembali
                                </h1>
                                <p className="text-[13.5px] leading-[1.6] text-gray-500">
                                    Masuk dan lanjutkan perjalanan belajarmu
                                    yang telah disesuaikan dengan Wariga Bali.
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
                                    <div className="flex items-center justify-between">
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
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="3"
                                                    />
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
                                            Masuk...
                                        </span>
                                    ) : (
                                        "Masuk →"
                                    )}
                                </button>
                            </form>

                            {/* Switch to Register */}
                            <p className="text-center text-[13px] text-gray-500">
                                Belum punya akun?{" "}
                                <Link
                                    href="/register"
                                    className="font-bold text-violet-600 no-underline"
                                >
                                    Daftar sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
