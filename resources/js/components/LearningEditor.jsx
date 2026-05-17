// resources/js/Components/LearningEditor.jsx
import "ckeditor5/ckeditor5.css";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Heading,
    List,
    Link,
    BlockQuote,
    Table,
    TableToolbar,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageResize,
    ImageUpload,
    MediaEmbed,
    Alignment,
    FontColor,
    FontBackgroundColor,
    FontSize,
    FontFamily,
    CodeBlock,
} from "ckeditor5";


export default function LearningEditor({ value, onChange }) {
    return (
        <div className="learning-editor">
            <CKEditor
                editor={ClassicEditor}
                data={value || ""}
                config={{
                    licenseKey: "GPL",
                    plugins: [
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        Underline,
                        Heading,
                        List,
                        Link,
                        BlockQuote,
                        Table,
                        TableToolbar,
                        Image,
                        ImageToolbar,
                        ImageCaption,
                        ImageStyle,
                        ImageResize,
                        ImageUpload,
                        MediaEmbed,
                        Alignment,
                        FontColor,
                        FontBackgroundColor,
                        FontSize,
                        FontFamily,
                        CodeBlock,
                    ],
                    toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "|",
                        "fontSize",
                        "fontFamily",
                        "fontColor",
                        "fontBackgroundColor",
                        "|",
                        "alignment",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "link",
                        "blockQuote",
                        "insertTable",
                        "mediaEmbed",
                        "codeBlock",
                        "|",
                        "undo",
                        "redo",
                    ],
                    table: {
                        contentToolbar: [
                            "tableColumn",
                            "tableRow",
                            "mergeTableCells",
                        ],
                    },
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </div>
    );
}
