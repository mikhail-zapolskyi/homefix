"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import EditorMenu from "./elements/EditorMenu";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorLabel from "./elements/EditorLabel";
import Placeholder from "@tiptap/extension-placeholder";

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
    "& .tiptap": {
        outline: "none",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        maxHeight: "8rem",
        overflowY: "scroll",
    },

    "& .tiptap::-webkit-scrollbar": {
        display: "none",
    },

    "& .tiptap p.is-editor-empty:first-of-type::before": {
        color: "#adb5bd",
        content: "attr(data-placeholder)",
        float: "left",
        height: 0,
        pointerEvents: "none",
    },
}));

const EditorField: React.FC<Props> = ({ name, content, label, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type here …",
            }),
        ],
        content: content,
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
    }, [editor, onChange, name]);

    const onClear = () => {
        if (!editor) {
            return;
        }
        editor.commands.clearContent();
    };

    return (
        <StyledDivWrapper>
            <EditorLabel label={label} />
            <EditorMenu editor={editor} />
            <StyledEditorContent editor={editor} />
        </StyledDivWrapper>
    );
};

export default EditorField;
