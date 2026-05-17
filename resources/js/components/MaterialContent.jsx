import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export default function MaterialContent({ html }) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const element = contentRef.current;

        element.innerHTML = html;

        element.innerHTML = element.innerHTML
            .replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
                try {
                    return katex.renderToString(formula, {
                        displayMode: true,
                        throwOnError: false,
                    });
                } catch {
                    return match;
                }
            })
            .replace(/\$(.*?)\$/gs, (match, formula) => {
                try {
                    return katex.renderToString(formula, {
                        displayMode: false,
                        throwOnError: false,
                    });
                } catch {
                    return match;
                }
            });
    }, [html]);

    return (
        <article
            ref={contentRef}
            className="prose prose-slate max-w-none prose-p:leading-8 prose-img:rounded-xl prose-table:overflow-hidden"
        />
    );
}
