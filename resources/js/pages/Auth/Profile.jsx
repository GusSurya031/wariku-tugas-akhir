import { useState, useEffect, useRef, useCallback } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import Sidebar from "@/components/Sidebar";
import Logo from "@/assets/icon/logo.svg";
import MenuIcon from "@/assets/icon/MenuIcon";
import SparkleIcon from "@/assets/icon/SparkleIcon";
import ArrowUpRightIcon from "@/assets/icon/ArrowUpRightIcon";
import HomeIcon from "@/assets/icon/HomeIcon";
import BookIcon from "@/assets/icon/BookIcon";
import PencilIcon from "@/assets/icon/PencilIcon";
import ChartIcon from "@/assets/icon/ChartIcon";
import SettingsIcon from "@/assets/icon/SettingsIcon";
import LogoutIcon from "@/assets/icon/LogoutIcon";
import XIcon from "@/assets/icon/XIcon";
import {THEME_MAP} from "@/constants/Dashboard";


const CameraIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
    </svg>
);
const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const EyeOffIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
    </svg>
);
const CheckIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
const AlertIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);
const TrashIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);
const UploadIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);
const CalendarIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" />
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" />
        <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" />
    </svg>
);

const navMain = [
    { label: "Dashboard", icon: HomeIcon,    href: "/dashboard" },
    { label: "Lesson",    icon: BookIcon,    href: "/lessons" },
    { label: "Exercise",  icon: PencilIcon,  href: "/exercise" },
    { label: "Report",    icon: ChartIcon,   href: "/report" },
];
const navSettings = [
    { label: "Profile", icon: SettingsIcon, href: "/profile", active: true },
    { label: "Logout",  icon: LogoutIcon,   href: "/logout",  danger: true },
];


// ─── Field ────────────────────────────────────────────────────────────────────
const Field = ({ label, name, value, onChange, type = "text", placeholder = "", error = "", disabled = false, required = true, icon: Icon }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-(--theme-primary) mb-0.5">
            {label}{required && !disabled && <span className="text-(--theme-secondary) ml-0.5">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <span className="absolute left-0 bottom-2.5 text-gray-300">
                    <Icon className="w-3.5 h-3.5" />
                </span>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full bg-transparent border-0 border-b text-sm pb-2 focus:outline-none transition-colors
                ${Icon ? "pl-5" : ""}
                ${error ? "border-red-400 text-gray-800 focus:border-red-500"
                  : disabled ? "border-gray-100 text-gray-400 cursor-not-allowed"
                  : "border-gray-200 text-gray-800 focus:border-(--theme-primary)"}`}
            />
        </div>
        {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
    </div>
);

// ─── Password Field ───────────────────────────────────────────────────────────
const PasswordField = ({ label, name, value, onChange, error }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-(--theme-primary)">
                    {label}
                    <span className="text-gray-400 font-normal ml-1">(opsional)</span>
                </label>
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-xs text-(--theme-primary) font-semibold hover:text-(--theme-secondary) transition-colors flex items-center gap-1"
                >
                    {show ? <EyeOffIcon className="w-3 h-3" /> : <EyeIcon className="w-3 h-3" />}
                    {show ? "Sembunyikan" : "Ubah"}
                </button>
            </div>
            <input
                type={show ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={show ? "Masukkan password baru (min. 8 karakter)" : "••••••••••••••"}
                className={`w-full bg-transparent border-0 border-b text-sm text-gray-800 placeholder-gray-300 pb-2 focus:outline-none transition-colors
                ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-(--theme-primary)"}`}
            />
            {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
        </div>
    );
};

// ─── Select Field ─────────────────────────────────────────────────────────────
const SelectField = ({ label, name, value, onChange, options, error, required = true }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-(--theme-primary) mb-0.5">
            {label}{required && <span className="text-(--theme-secondary) ml-0.5">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full bg-transparent border-0 border-b text-sm text-gray-800 pb-2 focus:outline-none transition-colors appearance-none cursor-pointer
            ${error ? "border-red-400" : "border-gray-200 focus:border-(--theme-primary)"}`}
        >
            {options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
        {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
    </div>
);

// ─── Cancel Modal ─────────────────────────────────────────────────────────────
const CancelModal = ({ hasChanges, onConfirm, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-modal">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${hasChanges ? "bg-amber-100" : "bg-green-100"}`}>
                {hasChanges ? <AlertIcon className="w-6 h-6 text-amber-500" /> : <CheckIcon className="w-6 h-6 text-green-500" />}
            </div>
            <h3 className="text-base font-bold text-gray-900 text-center mb-2">
                {hasChanges ? "Batalkan Perubahan?" : "Tidak Ada Perubahan"}
            </h3>
            <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
                {hasChanges
                    ? "Kamu memiliki perubahan yang belum disimpan. Yakin ingin membatalkan? Semua perubahan akan hilang."
                    : "Tidak ada perubahan yang dilakukan pada profil kamu."}
            </p>
            <div className="flex gap-3">
                {hasChanges ? (
                    <>
                        <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
                            Tetap Edit
                        </button>
                        <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-bold text-white transition-all shadow-md shadow-red-200">
                            Ya, Batalkan
                        </button>
                    </>
                ) : (
                    <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                        style={{ background: "var(--theme-gradient)" }}>
                        Oke, Mengerti
                    </button>
                )}
            </div>
        </div>
        <style>{`
            @keyframes modal-in { from{opacity:0;transform:scale(0.92) translateY(16px)} to{opacity:1;transform:none} }
            .animate-modal { animation: modal-in 0.25s cubic-bezier(.34,1.56,.64,1); }
        `}</style>
    </div>
);

// ─── Save Toast ───────────────────────────────────────────────────────────────
const SaveToast = ({ visible }) => (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl transition-all duration-400
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
    >
        <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
            <CheckIcon className="w-3 h-3 text-white" />
        </div>
        Profil berhasil diperbarui!
    </div>
);

// ─── Photo Upload ─────────────────────────────────────────────────────────────
const PhotoUpload = ({ preview, onFileSelect, onRemove, error }) => {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = useCallback((file) => {
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            onFileSelect(null, "Format file harus JPG atau PNG");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            onFileSelect(null, "Ukuran file maksimal 2MB");
            return;
        }
        onFileSelect(file, "");
    }, [onFileSelect]);

    return (
        <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="relative flex-shrink-0">
                    <div
                        className={`w-28 h-28 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer
                        ${dragging ? "border-(--theme-primary) scale-105" : "border-gray-200 hover:border-(--theme-secondary)"}`}
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                    >
                        {preview ? (
                            <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-(--theme-soft) flex flex-col items-center justify-center gap-1">
                                <div className="grid grid-cols-7 gap-1 opacity-30">
                                    {[...Array(35)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-(--theme-primary)" />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center rounded-2xl">
                            <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 rounded-xl p-2">
                                <CameraIcon className="w-5 h-5 text-(--theme-primary)" />
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full" />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => inputRef.current?.click()}
                            className="flex items-center gap-2 text-sm font-semibold text-(--theme-primary) hover:text-(--theme-secondary) transition-colors"
                        >
                            <UploadIcon className="w-4 h-4" />
                            Ubah Foto Profil
                        </button>
                        {preview && (
                            <button type="button" onClick={onRemove}
                                className="flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-600 transition-colors ml-3"
                            >
                                <TrashIcon className="w-4 h-4" />
                                Hapus
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Format: JPG, PNG · Maks. 2MB<br />
                        Klik foto atau seret file ke sini untuk mengubah
                    </p>
                    {error && <p className="text-[11px] text-red-500 font-semibold">⚠ {error}</p>}
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
            />
        </div>
    );
};

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage({ auth, userData = {}, themeDay = null }) {
    const themeSlug = THEME_MAP[themeDay] ?? null;
    const [sidebarOpen, setSidebarOpen]       = useState(false);
    const [photoPreview, setPhotoPreview]     = useState(userData?.profil_url ?? null);
    const [photoError, setPhotoError]         = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [saveToast, setSaveToast]           = useState(false);

    const form = useForm({
        username:     userData?.username ?? "",
        fullname:     userData?.fullname ?? "",
        email:        userData?.email    ?? "",
        password:     "",
        gender:       userData?.gender   ?? "",
        photo:        null,
        remove_photo: false,
    });

    // Sync photo preview when userData refreshes after save
    useEffect(() => {
        setPhotoPreview(userData?.profil_url ?? null);
    }, [userData?.profil_url]);

    // Toast on successful save
    useEffect(() => {
        if (form.recentlySuccessful) {
            setSaveToast(true);
            const t = setTimeout(() => setSaveToast(false), 3000);
            return () => clearTimeout(t);
        }
    }, [form.recentlySuccessful]);

    const hasChanges =
        form.data.username     !== (userData?.username ?? "") ||
        form.data.fullname     !== (userData?.fullname ?? "") ||
        form.data.email        !== (userData?.email    ?? "") ||
        form.data.password     !== "" ||
        form.data.gender       !== (userData?.gender   ?? "") ||
        form.data.photo        !== null ||
        form.data.remove_photo === true;

    const handleFileSelect = (file, err) => {
        setPhotoError(err ?? "");
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
            form.setData("photo", file);
            form.setData("remove_photo", false);
        }
    };

    const handlePhotoRemove = () => {
        setPhotoPreview(null);
        setPhotoError("");
        form.setData("photo", null);
        form.setData("remove_photo", true);
    };

    const handleSave = () => {
        form.post("/profile", {
            forceFormData: true,
            onSuccess: () => {
                form.setData("password", "");
                form.setData("photo", null);
                form.setData("remove_photo", false);
            },
        });
    };

    const confirmCancel = () => {
        form.reset();
        setPhotoPreview(userData?.profil_url ?? null);
        setPhotoError("");
        setShowCancelModal(false);
    };

    const birthDateDisplay = userData?.birth_date
        ? new Date(userData.birth_date + "T00:00:00").toLocaleDateString("id-ID", {
              day: "numeric", month: "long", year: "numeric",
          })
        : "-";

    const GENDER_OPTIONS = [
        { value: "",       label: "— Pilih —" },
        { value: "male",   label: "Laki-laki" },
        { value: "female", label: "Perempuan" },
    ];

    return (
        <>
            <Head title="Profil Anda" />

            <div data-theme={themeSlug} className="min-h-screen bg-gray-50 flex">
                <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navMain = {navMain}
                navSettings = {navSettings}
                />

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Mobile top bar */}
                    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
                        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
                            <MenuIcon className="w-5 h-5" />
                        </button>
                    {/* Logo */}
                    <div className="flex flex-1 items-center gap-2">
                        <img src={Logo} alt="Logo" className="w-24 md:w-32"/>
                    </div>
                        {hasChanges && (
                            <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                Belum disimpan
                            </div>
                        )}
                    </div>

                    <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 pb-32">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
                            <HomeIcon className="w-4 h-4" />
                            <Link href="/dashboard" className="hover:text-gray-600 transition-colors">Dashboard</Link>
                            <span>/</span>
                            <span className="text-(--theme-primary) font-semibold">Profile</span>
                        </div>

                        {/* Page title */}
                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                            <div>
                                <h1 className="text-2xl font-bold text-(--theme-primary)">Profil Anda</h1>
                                <p className="text-sm text-gray-400 mt-0.5">Kelola informasi pribadi dan pengaturan akun kamu</p>
                            </div>
                            {hasChanges && (
                                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                    Ada perubahan yang belum disimpan
                                </div>
                            )}
                        </div>

                        {/* Form card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                            {/* Photo */}
                            <PhotoUpload
                                preview={photoPreview}
                                onFileSelect={handleFileSelect}
                                onRemove={handlePhotoRemove}
                                error={photoError}
                            />

                            <div className="border-t border-gray-100 mb-7" />

                            {/* Fields grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                                <Field
                                    label="Username"
                                    name="username"
                                    value={form.data.username}
                                    onChange={(e) => form.setData("username", e.target.value)}
                                    error={form.errors.username}
                                    placeholder="Masukkan username"
                                />
                                <Field
                                    label="Nama Lengkap"
                                    name="fullname"
                                    value={form.data.fullname}
                                    onChange={(e) => form.setData("fullname", e.target.value)}
                                    error={form.errors.fullname}
                                    placeholder="Masukkan nama lengkap"
                                />

                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.data.email}
                                    onChange={(e) => form.setData("email", e.target.value)}
                                    error={form.errors.email}
                                    placeholder="Masukkan email"
                                />
                                <SelectField
                                    label="Jenis Kelamin"
                                    name="gender"
                                    value={form.data.gender}
                                    onChange={(e) => form.setData("gender", e.target.value)}
                                    options={GENDER_OPTIONS}
                                    error={form.errors.gender}
                                    required={false}
                                />

                                <PasswordField
                                    label="Kata Sandi"
                                    name="password"
                                    value={form.data.password}
                                    onChange={(e) => form.setData("password", e.target.value)}
                                    error={form.errors.password}
                                />
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-(--theme-primary) mb-0.5 flex items-center gap-1.5">
                                        <CalendarIcon className="w-3.5 h-3.5" />
                                        Tanggal Lahir
                                        <span className="text-gray-400 font-normal text-[11px]">(tidak dapat diubah)</span>
                                    </label>
                                    <p className="text-sm text-gray-400 border-b border-gray-100 pb-2 cursor-not-allowed">
                                        {birthDateDisplay}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Sticky action bar */}
                    <div className="sticky bottom-0 z-10 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 py-4 md:px-8">
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-gray-400 hidden sm:block">
                                {hasChanges
                                    ? "⚠️ Kamu memiliki perubahan yang belum disimpan"
                                    : "✓ Semua perubahan telah tersimpan"}
                            </p>
                            <div className="flex items-center gap-3 ml-auto">
                                <button
                                    type="button"
                                    onClick={() => setShowCancelModal(true)}
                                    disabled={form.processing}
                                    className="px-6 py-2.5 rounded-xl border-2 border-red-200 text-sm font-bold text-red-500 hover:border-red-300 hover:bg-red-50 transition-all disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={form.processing || !hasChanges}
                                    className="px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={!form.processing && hasChanges ? { background: "var(--theme-gradient)" } : { background: "var(--theme-soft)", color: "var(--theme-secondary)" }}
                                >
                                    {form.processing ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : "Simpan"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCancelModal && (
                <CancelModal
                    hasChanges={hasChanges}
                    onConfirm={confirmCancel}
                    onClose={() => setShowCancelModal(false)}
                />
            )}
            <SaveToast visible={saveToast} />
        </>
    );
}
