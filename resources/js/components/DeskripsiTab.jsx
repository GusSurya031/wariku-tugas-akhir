import MaterialContent from "@/components/MaterialContent";

export default function DeskripsiTab({ material }) {
    return (
        <div className="tab-content grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left: description */}
            <div className="min-w-0 lg:col-span-8">
                <h2 className="mb-5 text-[clamp(1.3rem,2.5vw,1.6rem)] font-black text-gray-900">
                    Tentang Materi Ini
                </h2>
                <MaterialContent html={material?.description ?? ""} />
            </div>

            {/* Right: sidebar */}
            <div className="flex flex-col gap-5 lg:col-span-4">
                {/* Tools */}
                <div className="sidebar-card">
                    <h3 className="mb-1.5 text-[15px] font-extrabold text-gray-900">
                        Peralatan Belajar
                    </h3>
                    <p className="text-[12.5px] text-gray-400">
                        Sebelum memulai, pastikan kamu telah menyiapkan:
                    </p>
                    {material.tools.map((t, i) => (
                        <div key={i} className="tool-item items-center">
                            <span className="shrink-0 text-xl">{t.icon}</span>
                            <span className="text-[13px] leading-normal text-gray-700">
                                {t.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Methods */}
                <div className="sidebar-card">
                    <h3 className="mb-1.5 text-[15px] font-extrabold text-gray-900">
                        Metode Pembelajaran
                    </h3>
                    <p className="mb-4 text-[12.5px] text-gray-400">
                        Materi disampaikan melalui pendekatan bertahap yang
                        mencakup:
                    </p>
                    {material.methods.map((m, i) => (
                        <div key={i} className="mb-3 flex items-start gap-2.5">
                            <div className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-100">
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="3"
                                >
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                            <span className="text-[13px] leading-normal text-gray-700">
                                {m}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
