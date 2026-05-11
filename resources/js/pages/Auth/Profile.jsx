import { useState, useRef, useCallback } from "react";
import { Head, Link } from "@inertiajs/react";

// ─── Icons (from Lesson.jsx + new ones) ──────────────────────────────────────
const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);
const BookIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);
const PencilIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);
const ChartIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const SettingsIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const LogoutIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);
const MenuIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const XIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const HomeSmIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth={1.8} fill="none" />
  </svg>
);
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const Sidebar = ({ open, onClose }) => {
    const navMain = [
        {
            label: "Dashboard",
            icon: HomeIcon,
            active: true,
            href: "/dashboard",
        },
        { label: "Lesson", icon: BookIcon, href: "/lessons" },
        { label: "Exercise", icon: PencilIcon, href: "/exercise" },
        { label: "Report", icon: ChartIcon, href: "/report" },
    ];
    const navSettings = [
        { label: "Profile", icon: SettingsIcon, href: "/profile" },
        { label: "Logout", icon: LogoutIcon, href: "/logout", danger: true },
    ];

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`fixed top-0 left-0 h-full z-40 w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 transition-transform duration-300
                lg:translate-x-0 lg:sticky lg:z-auto lg:flex lg:h-screen
                ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center gap-2 mb-8 px-1">
                    <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✦</span>
                    </div>
                    <span className="font-bold text-gray-900 text-lg tracking-tight">
                        Wariku
                    </span>
                    <button
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600"
                        onClick={onClose}
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Overview
                        </p>
                        <nav className="space-y-0.5">
                            {navMain.map(
                                ({ label, icon: Icon, active, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                        ${active ? "bg-(--theme-soft) text-(--theme-primary)" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 shrink-0 ${active ? "text-(--theme-primary)" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </Link>
                                ),
                            )}
                        </nav>
                    </div>

                    <div className="mt-auto">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-2">
                            Settings
                        </p>
                        <nav className="space-y-0.5">
                            {navSettings.map(
                                ({ label, icon: Icon, href, danger }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        {...(danger
                                            ? { method: "post", as: "button" }
                                            : {})}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                        ${danger ? "text-red-400 hover:bg-red-50 hover:text-red-500" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
                                    >
                                        <Icon
                                            className={`w-4.5 h-4.5 shrink-0 ${danger ? "text-red-400" : "text-gray-400 group-hover:text-gray-600"}`}
                                        />
                                        {label}
                                    </Link>
                                ),
                            )}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
};

// ─── Input Field Component ────────────────────────────────────────────────────
const Field = ({ label, name, value, onChange, type = "text", placeholder = "", error = "", readOnly = false, children, required = true }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-violet-600 mb-0.5">
      {label}{required && <span className="text-violet-400">*</span>}
    </label>
    {children || (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full bg-transparent border-0 border-b text-sm text-gray-800 placeholder-gray-300 pb-2 focus:outline-none transition-colors
          ${error
            ? "border-red-400 focus:border-red-500"
            : readOnly
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-200 focus:border-violet-400"
          }`}
      />
    )}
    {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
  </div>
);

// ─── Password Field ───────────────────────────────────────────────────────────
const PasswordField = ({ label, name, value, onChange, error }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-violet-600">
          {label}<span className="text-violet-400">*</span>
        </label>
        <button type="button" onClick={() => setShow(!show)}
          className="text-xs text-violet-500 font-semibold hover:text-violet-700 transition-colors flex items-center gap-1">
          {show ? <EyeOffIcon className="w-3 h-3" /> : <EyeIcon className="w-3 h-3" />}
          {show ? "Sembunyikan" : "Ubah"}
        </button>
      </div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={show ? "Masukkan password baru" : "••••••••••••••"}
          className={`w-full bg-transparent border-0 border-b text-sm text-gray-800 placeholder-gray-300 pb-2 focus:outline-none transition-colors pr-8
            ${error ? "border-red-400" : "border-gray-200 focus:border-violet-400"}`}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
    </div>
  );
};

// ─── Select Field ─────────────────────────────────────────────────────────────
const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-bold text-violet-600 mb-0.5">
      {label}<span className="text-violet-400">*</span>
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-transparent border-0 border-b text-sm text-gray-800 pb-2 focus:outline-none transition-colors appearance-none cursor-pointer
        ${error ? "border-red-400" : "border-gray-200 focus:border-violet-400"}`}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">⚠ {error}</p>}
  </div>
);

// ─── Cancel Modal ─────────────────────────────────────────────────────────────
const CancelModal = ({ hasChanges, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-modal">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto ${hasChanges ? "bg-amber-100" : "bg-green-100"}`}>
        {hasChanges
          ? <AlertIcon className="w-6 h-6 text-amber-500" />
          : <CheckIcon className="w-6 h-6 text-green-500" />
        }
      </div>
      <h3 className="text-base font-bold text-gray-900 text-center mb-2">
        {hasChanges ? "Batalkan Perubahan?" : "Tidak Ada Perubahan"}
      </h3>
      <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">
        {hasChanges
          ? "Kamu memiliki perubahan yang belum disimpan. Yakin ingin membatalkan? Semua perubahan akan hilang."
          : "Tidak ada perubahan yang dilakukan pada profil kamu."
        }
      </p>
      <div className="flex gap-3">
        {hasChanges ? (
          <>
            <button onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all">
              Tetap Edit
            </button>
            <button onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-sm font-bold text-white transition-all shadow-md shadow-red-200">
              Ya, Batalkan
            </button>
          </>
        ) : (
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-sm font-bold text-white transition-all shadow-md shadow-violet-200">
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
  <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl transition-all duration-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}>
    <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0">
      <CheckIcon className="w-3 h-3 text-white" />
    </div>
    Profil berhasil diperbarui!
  </div>
);

// ─── Photo Upload Area ────────────────────────────────────────────────────────
const PhotoUpload = ({ preview, onUpload, onRemove, error }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file) return;
    const valid = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
    const tooBig = file.size > 2 * 1024 * 1024;
    if (!valid) { onUpload(null, "Format file harus JPG atau PNG"); return; }
    if (tooBig)  { onUpload(null, "Ukuran file maksimal 2MB"); return; }
    const reader = new FileReader();
    reader.onload = e => onUpload(e.target.result, "");
    reader.readAsDataURL(file);
  }, [onUpload]);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-28 h-28 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer
              ${dragging ? "border-violet-400 scale-105" : "border-gray-200 hover:border-violet-300"}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
          >
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-100 to-indigo-100 flex flex-col items-center justify-center gap-1">
                {/* Dot grid placeholder */}
                <div className="grid grid-cols-7 gap-1 opacity-40">
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-violet-400" />
                  ))}
                </div>
              </div>
            )}
            {/* Camera overlay */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center rounded-2xl">
              <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/90 rounded-xl p-2">
                <CameraIcon className="w-5 h-5 text-violet-600" />
              </div>
            </div>
          </div>
          {/* Online dot */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full" />
        </div>

        {/* Upload actions */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              <UploadIcon className="w-4 h-4" />
              Ubah Foto Profil
            </button>
            {preview && (
              <button type="button" onClick={onRemove}
                className="flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-600 transition-colors ml-3">
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
        onChange={e => handleFile(e.target.files[0])}
      />
    </div>
  );
};

// ─── Initial Data ─────────────────────────────────────────────────────────────
const INITIAL = {
  nama_lengkap:       "Made Bayu Maha Krisna Siaka",
  nama_panggilan:     "Bayu Siaka",
  nim:                "2108561095",
  kata_sandi:         "",
  jenis_kelamin:      "Laki-laki",
  agama:              "Hindu",
  no_telepon:         "085847270310",
  alamat:             "Jl. Nuansa Kori XI/1, Ubung Kaja, Denpasar",
  id_line:            "bayusiaka",
  tempat_tanggal_lahir: "Denpasar, 21 Januari 2003",
  photo:              "",
};

// ─── Profile Page ─────────────────────────────────────────────────────────────
export default function ProfilePage({ auth }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saved, setSaved] = useState({ ...INITIAL });
  const [form, setForm]   = useState({ ...INITIAL });
  const [photoPreview, setPhotoPreview]   = useState("");
  const [savedPhoto, setSavedPhoto]       = useState("");
  const [photoError, setPhotoError]       = useState("");
  const [errors, setErrors]               = useState({});
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [saveToast, setSaveToast]         = useState(false);
  const [saving, setSaving]               = useState(false);

  // ── detect changes ──────────────────────────────────────────────────────────
  const hasChanges =
    JSON.stringify(form) !== JSON.stringify(saved) ||
    photoPreview !== savedPhoto;

  // ── field change ────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  // ── photo upload ────────────────────────────────────────────────────────────
  const handlePhotoUpload = (dataUrl, err) => {
    setPhotoError(err);
    if (dataUrl) setPhotoPreview(dataUrl);
  };
  const handlePhotoRemove = () => { setPhotoPreview(""); setPhotoError(""); };

  // ── validate ────────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.nama_lengkap.trim())   e.nama_lengkap   = "Nama lengkap wajib diisi";
    if (!form.nama_panggilan.trim()) e.nama_panggilan  = "Nama panggilan wajib diisi";
    if (!form.nim.trim())            e.nim             = "NIM wajib diisi";
    if (!form.no_telepon.trim())     e.no_telepon      = "No. telepon wajib diisi";
    else if (!/^[0-9+\-\s]{8,15}$/.test(form.no_telepon)) e.no_telepon = "Format nomor tidak valid";
    if (!form.alamat.trim())         e.alamat          = "Alamat wajib diisi";
    if (form.kata_sandi && form.kata_sandi.length < 8) e.kata_sandi = "Password minimal 8 karakter";
    return e;
  };

  // ── save ────────────────────────────────────────────────────────────────────
  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSaving(true);
    setTimeout(() => {
      setSaved({ ...form, kata_sandi: "" });
      setForm(p => ({ ...p, kata_sandi: "" }));
      setSavedPhoto(photoPreview);
      setSaving(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }, 1200);
  };

  // ── cancel ──────────────────────────────────────────────────────────────────
  const handleCancel = () => setShowCancelModal(true);
  const confirmCancel = () => {
    setForm({ ...saved, kata_sandi: "" });
    setPhotoPreview(savedPhoto);
    setErrors({});
    setPhotoError("");
    setShowCancelModal(false);
  };

  const GENDER_OPTIONS = [
    { value: "Laki-laki",  label: "Laki-laki" },
    { value: "Perempuan",  label: "Perempuan" },
  ];
  const AGAMA_OPTIONS = [
    { value: "Hindu",     label: "Hindu" },
    { value: "Islam",     label: "Islam" },
    { value: "Kristen",   label: "Kristen" },
    { value: "Katolik",   label: "Katolik" },
    { value: "Buddha",    label: "Buddha" },
    { value: "Konghucu",  label: "Konghucu" },
  ];

  return (
    <>
      <Head title="Profil Anda" />

      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-20">
            <button onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600">
              <MenuIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">✦</span>
              </div>
              <span className="font-bold text-gray-900">Wariku</span>
            </div>
            {/* Mobile save indicator */}
            {hasChanges && (
              <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Belum disimpan
              </div>
            )}
          </div>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 pb-32">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
              <HomeSmIcon className="w-4 h-4" />
              <a href="#" className="hover:text-gray-600 transition-colors">Dashboard</a>
              <span>/</span>
              <span className="text-violet-600 font-semibold">Profile</span>
            </div>

            {/* Page title row */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-bold text-violet-600">Profil Anda</h1>
                <p className="text-sm text-gray-400 mt-0.5">Kelola informasi pribadi dan pengaturan akun kamu</p>
              </div>
              {/* Desktop unsaved badge */}
              {hasChanges && (
                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Ada perubahan yang belum disimpan
                </div>
              )}
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 max-w-4xl">

              {/* Photo */}
              <PhotoUpload
                preview={photoPreview}
                onUpload={handlePhotoUpload}
                onRemove={handlePhotoRemove}
                error={photoError}
              />

              {/* Divider */}
              <div className="border-t border-gray-100 mb-7" />

              {/* Fields grid — 2 columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                <Field
                  label="Nama Lengkap"
                  name="nama_lengkap"
                  value={form.nama_lengkap}
                  onChange={handleChange}
                  error={errors.nama_lengkap}
                  placeholder="Masukkan nama lengkap"
                />
                <Field
                  label="Agama"
                  name="agama"
                  value={form.agama}
                  onChange={handleChange}
                  error={errors.agama}
                >
                  <SelectField
                    label="Agama"
                    name="agama"
                    value={form.agama}
                    onChange={handleChange}
                    options={AGAMA_OPTIONS}
                    error={errors.agama}
                  />
                </Field>

                <Field
                  label="Nama Panggilan"
                  name="nama_panggilan"
                  value={form.nama_panggilan}
                  onChange={handleChange}
                  error={errors.nama_panggilan}
                  placeholder="Masukkan nama panggilan"
                />
                <Field
                  label="No Telepon"
                  name="no_telepon"
                  value={form.no_telepon}
                  onChange={handleChange}
                  type="tel"
                  error={errors.no_telepon}
                  placeholder="08xxxxxxxxxx"
                />

                <Field
                  label="NIM"
                  name="nim"
                  value={form.nim}
                  onChange={handleChange}
                  error={errors.nim}
                  placeholder="Masukkan NIM"
                />
                <Field
                  label="Alamat"
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  error={errors.alamat}
                  placeholder="Masukkan alamat lengkap"
                />

                <PasswordField
                  label="Kata Sandi"
                  name="kata_sandi"
                  value={form.kata_sandi}
                  onChange={handleChange}
                  error={errors.kata_sandi}
                />
                <Field
                  label="Id Line"
                  name="id_line"
                  value={form.id_line}
                  onChange={handleChange}
                  placeholder="Masukkan ID Line"
                  required={false}
                />

                <Field
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  value={form.jenis_kelamin}
                  onChange={handleChange}
                  error={errors.jenis_kelamin}
                >
                  <SelectField
                    label="Jenis Kelamin"
                    name="jenis_kelamin"
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    options={GENDER_OPTIONS}
                    error={errors.jenis_kelamin}
                  />
                </Field>
                <Field
                  label="Tempat Tanggal Lahir"
                  name="tempat_tanggal_lahir"
                  value={form.tempat_tanggal_lahir}
                  onChange={handleChange}
                  error={errors.tempat_tanggal_lahir}
                  placeholder="Kota, DD Bulan YYYY"
                />
              </div>
            </div>
          </main>

          {/* ── Sticky Action Bar ─────────────────────────────────────────────── */}
          <div className="sticky bottom-0 z-10 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 py-4 md:px-8">
            <div className="max-w-4xl flex items-center justify-between gap-3">
              {/* Left: change summary */}
              <p className="text-xs text-gray-400 hidden sm:block">
                {hasChanges
                  ? "⚠️ Kamu memiliki perubahan yang belum disimpan"
                  : "✓ Semua perubahan telah tersimpan"}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl border-2 border-red-200 text-sm font-bold text-red-500 hover:border-red-300 hover:bg-red-50 transition-all disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className={`px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all shadow-md flex items-center gap-2
                    ${saving || !hasChanges
                      ? "bg-violet-300 cursor-not-allowed shadow-none"
                      : "bg-violet-600 hover:bg-violet-700 shadow-violet-200 hover:-translate-y-0.5"
                    }`}
                >
                  {saving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
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

      {/* ── Cancel Modal ──────────────────────────────────────────────────────── */}
      {showCancelModal && (
        <CancelModal
          hasChanges={hasChanges}
          onConfirm={confirmCancel}
          onClose={() => setShowCancelModal(false)}
        />
      )}

      {/* ── Save Toast ────────────────────────────────────────────────────────── */}
      <SaveToast visible={saveToast} />
    </>
  );
}
