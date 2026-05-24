import { router, usePage, Head } from "@inertiajs/react";
import { useState } from "react";
import "@/../css/app.css";
import { BalineseDate } from "balinese-date-js-lib";
import { MOODS } from "@/constants/Material";

export default function Onboarding() {
    const { hasProfile, userProfile } = usePage().props;
    const balineseTodayDate = new BalineseDate();

    const [step, setStep] = hasProfile ? useState(2) : useState(1);
    const [username, setUsername] = useState(userProfile?.username ?? "");
    const [birthDate, setBirthDate] = useState(userProfile?.birth_date ?? "");
    const [gender, setGender] = useState(userProfile?.gender ?? "");

    const [selectedMood, setSelectedMood] = useState(null);
    const [errors, setErrors] = useState({});

    // Step 1 - Handle Profile submission
    const handleProfile = () => {
        const balineseBirthDate = new BalineseDate(new Date(birthDate));

        router.post(
            "/onboarding/profile",
            {
                username,
                birth_date: birthDate,
                gender,
                balinese_birth_date: balineseBirthDate,
                balinese_today_date: balineseTodayDate,
            },
            {
                onError: (errs) => setErrors(errs),
                onSuccess: () => setStep(2),
            },
        );
    };
    // Step 2 - Handle Mood submission
    const handleMood = () => {
        if (!selectedMood) return;

        router.post(
            "/onboarding/mood",
            {
                mood_level: selectedMood.value,
                mood_label: selectedMood.label,
            },
            {
                onSuccess: () => setStep(3),
            },
        );
    };
    // Step 3 - Finish onboarding
    const handleFinish = () => {
        router.post("/onboarding/finish");
    };

    const totalSteps = 3;

    return (
        <>
            <Head title="Wariku - Onboarding" description="Lengkapi profilmu untuk memulai perjalanan di Wariku" />
            <main>
                <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl border border-(--border-primary)">
                        {/* PROGRESS BAR */}
                        <div className="mb-8 flex items-center justify-center gap-3">
                            {Array.from(
                                { length: totalSteps },
                                (_, i) => i + 1,
                            ).map((item) => (
                                <div
                                    key={item}
                                    className={`h-3 w-20 rounded-full transition-all duration-300 ${
                                        step >= item
                                            ? "bg-(--theme-primary)"
                                            : "bg-gray-200"
                                    }`}
                                />
                            ))}
                        </div>
                        {step === 1 && (
                            <div>
                                <div className="mb-8 text-center">
                                    <h1 className="text-3xl font-serif text-(--text-primary) mb-2">
                                        "Lengkapi Profilmu"
                                    </h1>
                                    <p className="text-(--text-secondary)">
                                        "Bantu sistem mengenal dirimu lebih
                                        baik"
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {/* Nama Panggilan */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                                            Nama Panggilan
                                        </label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => {
                                                setUsername(e.target.value);
                                                if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
                                            }}
                                            placeholder="Contoh: Made"
                                            className={`w-full rounded-2xl border px-5 py-4 outline-none transition-colors
                                                ${errors.username
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-(--border-primary) focus:border-(--theme-primary)"}`}
                                        />
                                        {errors.username && (
                                            <p className="mt-1.5 text-sm text-red-500">{errors.username}</p>
                                        )}
                                    </div>

                                    {/* Tanggal Lahir */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                                            Tanggal Lahir
                                        </label>
                                        <input
                                            type="date"
                                            value={birthDate}
                                            onChange={(e) => {
                                                setBirthDate(e.target.value);
                                                if (errors.birth_date) setErrors((prev) => ({ ...prev, birth_date: undefined }));
                                            }}
                                            className={`w-full rounded-2xl border px-5 py-4 outline-none transition-colors
                                                ${errors.birth_date
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-(--border-primary) focus:border-(--theme-primary)"}`}
                                        />
                                        {errors.birth_date && (
                                            <p className="mt-1.5 text-sm text-red-500">{errors.birth_date}</p>
                                        )}
                                    </div>

                                    {/* Jenis Kelamin */}
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-(--text-primary)">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            value={gender}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                                if (errors.gender) setErrors((prev) => ({ ...prev, gender: undefined }));
                                            }}
                                            className={`w-full rounded-2xl border bg-white px-5 py-4 outline-none transition-colors
                                                ${errors.gender
                                                    ? "border-red-400 focus:border-red-500"
                                                    : "border-(--border-primary) focus:border-(--theme-primary)"}`}
                                        >
                                            <option value="">
                                                Pilih jenis kelamin
                                            </option>
                                            <option value="male">
                                                Laki-laki
                                            </option>
                                            <option value="female">
                                                Perempuan
                                            </option>
                                        </select>
                                        {errors.gender && (
                                            <p className="mt-1.5 text-sm text-red-500">{errors.gender}</p>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleProfile}
                                        className="w-full rounded-2xl bg-(--theme-primary) py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                                    >
                                        Lanjutkan
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="mb-8 text-center">
                                    <h1 className="text-3xl font-serif text-(--text-primary) mb-2">
                                        Bagaimana Mood-mu Hari Ini?
                                    </h1>
                                    <p className="text-(--text-secondary)">
                                        Sistem akan menyesuaikan pengalaman
                                        belajar berdasarkan kondisimu
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {MOODS.map((mood, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedMood(mood)
                                            }
                                            className={`rounded-2xl border p-5 text-left transition-all duration-200
                                                ${selectedMood?.label ===mood.label
                                                    ? "border-(--theme-primary) bg-(--theme-soft)/50"
                                                    : "border-(--border-primary) bg-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-3xl">
                                                    {mood.emoji}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-(--text-primary)">
                                                        {mood.label}
                                                    </h3>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleMood}
                                    className="mt-6 w-full rounded-2xl bg-(--theme-primary) py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                                >
                                    Simpan Mood
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="py-10 text-center">
                                <div className="mb-6 text-6xl">🎉</div>
                                <h1 className="mb-3 text-4xl font-serif text-(--text-primary)">
                                    Sistem Siap Digunakan
                                </h1>
                                <p className="mx-auto mb-8 max-w-lg leading-relaxed text-(--text-secondary)">
                                    Profil dan preferensimu berhasil disimpan.
                                    Sekarang kamu sudah bisa mulai belajar
                                    dengan pengalaman yang lebih personal.
                                </p>
                                <button
                                    onClick={handleFinish}
                                    className="rounded-2xl bg-(--theme-primary) px-8 py-4 font-semibold text-white transition-all duration-200 hover:opacity-90"
                                >
                                    Masuk ke Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
