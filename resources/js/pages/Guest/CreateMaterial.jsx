// resources/js/Pages/Admin/Materials/Create.jsx

import React from "react";
import { useForm } from "@inertiajs/react";
import LearningEditor from "@/components/LearningEditor";

export default function CreateMaterial() {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        difficulty_level: "easy",
        learning_type: "text",
        chapters: [
            {
                title: "",
                content: "",
            },
            {
                title: "",
                content: "",
            },
            {
                title: "",
                content: "",
            },
            {
                title: "",
                content: "",
            },
            {
                title: "",
                content: "",
            },
            {
                title: "",
                content: "",
            },
        ],
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/materials");
    };

    const handleChapterChange = (index, field, value) => {
        const updatedChapters = [...data.chapters];

        updatedChapters[index] = {
            ...updatedChapters[index],
            [field]: value,
        };

        setData("chapters", updatedChapters);
    };

    return (
        <div className="mx-auto max-w-5xl p-6">
            <h1 className="mb-6 text-2xl font-bold text-slate-800">
                Tambah Materi Pembelajaran
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Judul Materi */}
                <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                        Judul Materi
                    </label>

                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
                        placeholder="Contoh: Aljabar"
                    />

                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>

                {/* Deskripsi Materi */}
                <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                        Deskripsi Materi
                    </label>

                    <LearningEditor
                        value={data.description}
                        onChange={(value) => setData("description", value)}
                    />

                    {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Tingkat Kesulitan */}
                <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                        Tingkat Kesulitan
                    </label>

                    <select
                        value={data.difficulty_level}
                        onChange={(e) =>
                            setData("difficulty_level", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    {errors.difficulty_level && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.difficulty_level}
                        </p>
                    )}
                </div>

                {/* Jenis Pembelajaran */}
                <div>
                    <label className="mb-2 block font-semibold text-slate-700">
                        Jenis Pembelajaran
                    </label>

                    <select
                        value={data.learning_type}
                        onChange={(e) =>
                            setData("learning_type", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
                    >
                        <option value="text">Text</option>
                        <option value="illustration">Illustration</option>
                    </select>

                    {errors.learning_type && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.learning_type}
                        </p>
                    )}
                </div>

                {/* Chapters */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Daftar Chapter
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Lengkapi 6 chapter untuk materi pembelajaran ini.
                        </p>
                    </div>

                    {data.chapters.map((chapter, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <h3 className="mb-4 text-lg font-bold text-purple-700">
                                Chapter {index + 1}
                            </h3>

                            {/* Judul Chapter */}
                            <div className="mb-5">
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Judul Chapter {index + 1}
                                </label>

                                <input
                                    type="text"
                                    value={chapter.title}
                                    onChange={(e) =>
                                        handleChapterChange(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-purple-500 focus:outline-none"
                                    placeholder={`Contoh: Chapter ${
                                        index + 1
                                    } - Mengenal Bentuk Aljabar`}
                                />

                                {errors[`chapters.${index}.title`] && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors[`chapters.${index}.title`]}
                                    </p>
                                )}
                            </div>

                            {/* Konten Chapter */}
                            <div>
                                <label className="mb-2 block font-semibold text-slate-700">
                                    Konten Chapter {index + 1}
                                </label>

                                <LearningEditor
                                    value={chapter.content}
                                    onChange={(value) =>
                                        handleChapterChange(
                                            index,
                                            "content",
                                            value
                                        )
                                    }
                                />

                                {errors[`chapters.${index}.content`] && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors[`chapters.${index}.content`]}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-60"
                >
                    Simpan Materi
                </button>
            </form>
        </div>
    );
}
