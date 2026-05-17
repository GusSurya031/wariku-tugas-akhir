import MaterialContent from '@/components/MaterialContent';
// import '@/../css/style_module_illustration_aljabar.css';
// import '@/../css/style_module_illustration_persamaan_linear.css';
// import '@/../css/style_module_illustration_pertidaksamaan_linear.css';
// import '@/../css/style_module_illustration_spldv.css';
// import '@/../css/style_module_illustration_relasi_fungsi.css';
// import '@/../css/style_module_illustration_fungsi_linear.css';
// import '@/../css/style_module_illustration_phytagoras.css';
// import '@/../css/style_module_illustration_geometri.css';
// import '@/../css/style_module_illustration_segitiga_segiempat.css';
import '@/../css/style_module_illustration_statistika_peluang.css';
import '@/../css/app.css';

export default function ShowMaterial({ chapter }) {
    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="mb-6 text-3xl font-bold text-slate-900">
                {chapter.title}
            </h1>

            <MaterialContent
                className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-8 prose-img:rounded-xl prose-table:overflow-hidden"
                html={chapter.content}
            />
        </div>
    );
}
