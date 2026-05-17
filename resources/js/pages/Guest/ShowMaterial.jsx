import MaterialContent from '@/components/MaterialContent';

export default function ShowMaterial({ material }) {
    return (
        <div className="mx-auto max-w-4xl px-6 py-10">
            <h1 className="mb-6 text-3xl font-bold text-slate-900">
                {material.title}
            </h1>

            <MaterialContent
                className="prose prose-slate max-w-none prose-headings:font-bold prose-p:leading-8 prose-img:rounded-xl prose-table:overflow-hidden"
                html={material.description}
            />
        </div>
    );
}
