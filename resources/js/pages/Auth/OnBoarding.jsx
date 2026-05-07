import { router } from "@inertiajs/react";
import { useState } from "react";
import "@/../css/app.css";
import { BalineseDate } from "balinese-date-js-lib";

export default function Onboarding() {
    const balineseTodayDate = new BalineseDate();
    const [step, setStep] = useState(1);
    /* =============================================
       STEP 1
    ============================================= */

    const [username, setUsername] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");

    /* =============================================
       STEP 2
    ============================================= */

    const [selectedMood, setSelectedMood] = useState(null);

    const moods = [
        {
            label: "Sangat Semangat",
            value: 3,
            emoji: "🔥",
        },
        {
            label: "Semangat",
            value: 3,
            emoji: "😄",
        },
        {
            label: "Biasa Saja",
            value: 2,
            emoji: "🙂",
        },
        {
            label: "Kurang Fokus",
            value: 1,
            emoji: "😴",
        },
        {
            label: "Sangat Lelah",
            value: 1,
            emoji: "🥲",
        },
    ];

    /* =============================================
       STEP 1 SUBMIT
    ============================================= */

    const handleProfile = () => {
        const balineseBirthDate = new BalineseDate(new Date(birthDate))
        // console.log(birth_date)

        router.post(
            "/onboarding/profile",
            {
                username,
                birth_date: birthDate,
                gender,
                balinese_birth_date:balineseBirthDate,
                balinese_today_date:balineseTodayDate
            },
            {
                onError: (errors) => {
                    console.log(errors);
                },

                onSuccess: () => {
                    setStep(2);
                },

            },
        );
    };

    /* =============================================
       STEP 2 SUBMIT
    ============================================= */

    const handleMood = () => {
        if (!selectedMood) return;

        router.post(
            "/onboarding/mood",
            {
                mood_level: selectedMood.value,
                mood_label: selectedMood.label,
            },
            {
                onSuccess: () => {
                    setStep(3);
                },
            },
        );
    };

    /* =============================================
       FINISH
    ============================================= */

    const handleFinish = () => {
        router.post("/onboarding/finish");
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl border border-[var(--border-primary)]">
                {/* =====================================
                   PROGRESS
                ===================================== */}

                <div className="mb-8 flex items-center justify-center gap-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className={`h-3 w-20 rounded-full transition-all duration-300 ${
                                step >= item
                                    ? "bg-(--color-primary-blue)"
                                    : "bg-gray-200"
                            }`}
                        />
                    ))}
                </div>

                {/* =====================================
                   STEP 1
                ===================================== */}

                {step === 1 && (
                    <div>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-serif text-[var(--text-primary)] mb-2">
                                Lengkapi Profilmu
                            </h1>

                            <p className="text-[var(--text-secondary)]">
                                Bantu sistem mengenal dirimu lebih baik
                            </p>
                        </div>

                        <div className="space-y-5">
                            {/* Username Input */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    Nama Panggilan
                                </label>

                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Contoh: Made"
                                    className="w-full rounded-2xl border border-[var(--border-primary)] px-5 py-4 outline-none focus:border-[var(--color-primary-blue)]"
                                />
                            </div>

                            {/* Birth Date Input */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    Tanggal Lahir
                                </label>

                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) =>
                                        setBirthDate(e.target.value)
                                    }
                                    className="w-full rounded-2xl border border-[var(--border-primary)] px-5 py-4 outline-none focus:border-[var(--color-primary-blue)]"
                                />
                            </div>

                            {/* Gender Input */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-[var(--text-primary)]">
                                    Jenis Kelamin
                                </label>

                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full rounded-2xl border border-[var(--border-primary)] bg-white px-5 py-4 outline-none focus:border-[var(--color-primary-blue)]"
                                >
                                    <option value="">
                                        Pilih jenis kelamin
                                    </option>

                                    <option value="male">Laki-laki</option>

                                    <option value="female">Perempuan</option>
                                </select>
                            </div>

                            <button
                                onClick={handleProfile}
                                className="w-full rounded-2xl bg-primary-blue py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                            >
                                Lanjutkan
                            </button>
                        </div>
                    </div>
                )}

                {/* =====================================
                   STEP 2
                ===================================== */}

                {step === 2 && (
                    <div>
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-serif text-[var(--text-primary)] mb-2">
                                Bagaimana Mood-mu Hari Ini?
                            </h1>

                            <p className="text-[var(--text-secondary)]">
                                Sistem akan menyesuaikan pengalaman belajar
                                berdasarkan kondisimu
                            </p>
                        </div>

                        <div className="grid gap-4">
                            {moods.map((mood, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedMood(mood)}
                                    className={`rounded-2xl border p-5 text-left transition-all duration-200 ${
                                        selectedMood?.label === mood.label
                                            ? "border-[var(--color-primary-blue)] bg-blue-50"
                                            : "border-[var(--border-primary)] bg-white"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-3xl">
                                            {mood.emoji}
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-[var(--text-primary)]">
                                                {mood.label}
                                            </h3>

                                            <p className="text-sm text-[var(--text-secondary)]">
                                                Mood Level {mood.value}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleMood}
                            className="mt-6 w-full rounded-2xl bg-[var(--color-primary-blue)] py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                        >
                            Simpan Mood
                        </button>
                    </div>
                )}

                {/* =====================================
                   STEP 3
                ===================================== */}

                {step === 3 && (
                    <div className="py-10 text-center">
                        <div className="mb-6 text-6xl">🎉</div>

                        <h1 className="mb-3 text-4xl font-serif text-[var(--text-primary)]">
                            Sistem Siap Digunakan
                        </h1>

                        <p className="mx-auto mb-8 max-w-lg leading-relaxed text-[var(--text-secondary)]">
                            Profil dan preferensimu berhasil disimpan. Sekarang
                            kamu sudah bisa mulai belajar dengan pengalaman yang
                            lebih personal.
                        </p>

                        <button
                            onClick={handleFinish}
                            className="rounded-2xl bg-[var(--color-primary-blue)] px-8 py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                        >
                            Masuk ke Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
