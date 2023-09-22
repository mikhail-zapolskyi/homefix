import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
    content: string;
}

const EditorView: React.FC<Props> = ({ content }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "Enter som text here",
        editable: false,
    });
    return <EditorContent editor={editor} />;
};

export default EditorView;
