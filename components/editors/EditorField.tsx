"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import EditorMenu from "./elements/EditorMenu";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorLabel from "./elements/EditorLabel";

interface Props {
    content: string;
    label?: string;
    name?: string;
    onChange: (data: Record<string, any>) => void;
}

const StyledDivWrapper = styled("div")(() => ({
    width: "100%",
    padding: "0 .5rem",
    border: "1px solid darkgrey",
    borderRadius: "0.8rem",
    position: "relative",
}));

const StyledEditorContent = styled(EditorContent)(() => ({
    "& .PromiseMirror.PromiseMirror-focused": {
        outline: "none",
        backgroundColor: "black",
    },
}));

const EditorField: React.FC<Props> = ({ name, content, label, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content || "Enter some text here",
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const handleEditorChange = () => {
            // Get the updated HTML content from the editor
            const updatedHtml = editor.getHTML();

            // Call the onChange callback with the updated content
            if (onChange) {
                onChange({ [name as string]: updatedHtml });
            }
        };

        // Subscribe to the editor's changes
        editor.on("transaction", handleEditorChange);

        return () => {
            // Unsubscribe from the editor's changes when the component unmounts
            editor.off("transaction", handleEditorChange);
        };
    }, [editor, onChange]);

    return (
        <StyledDivWrapper>
            <EditorLabel label={label} />
            <EditorMenu editor={editor} />
            <StyledEditorContent editor={editor} />
        </StyledDivWrapper>
    );
};

export default EditorField;
