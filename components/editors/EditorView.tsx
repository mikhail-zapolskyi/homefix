import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
    content: string;
}

const EditorView: React.FC<Props> = ({ content }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        editable: false,
    });

    editor?.commands.setContent(content);

    return <EditorContent editor={editor} />;
};

export default EditorView;
