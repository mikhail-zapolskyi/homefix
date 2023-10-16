"use client";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { SendHorizontal } from "lucide-react";
import { CustomButton } from "@/components";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EditorLabel from "./elements/EditorLabel";
import { Divider } from "@mui/material";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
    content?: string;
    onChange: (content: string) => void;
    onClick: () => void;
}

const StyledDivWrapper = styled("div")(({ theme }) => ({
    width: "100%",
    borderEndEndRadius: "0.8rem",
    position: "relative",
    backgroundColor: `${theme.palette.common.white}`,
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

const StyledButtonContainer = styled("span")(({}) => ({
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "1rem",
}));

const EditorMessageFeild: React.FC<Props> = ({
    content,
    onChange,
    onClick,
}) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Type here …",
            }),
        ],
        editorProps: {
            attributes: {
                class: "test",
            },
        },
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
                onChange(updatedHtml as string);
            }
        };

        // Subscribe to the editor's changes
        editor.on("transaction", handleEditorChange);

        return () => {
            // Unsubscribe from the editor's changes when the component unmounts
            editor.off("transaction", handleEditorChange);
        };
    }, [editor, onChange]);

    const onClear = () => {
        if (!editor) {
            return;
        }
        editor.commands.clearContent();
    };

    return (
        <StyledDivWrapper>
            <StyledEditorContent editor={editor} />
            <Divider />
            <StyledButtonContainer>
                <CustomButton
                    endIcon={<SendHorizontal size={16} />}
                    text="Send"
                    onClick={() => {
                        onClick();
                        onClear();
                    }}
                />
            </StyledButtonContainer>
        </StyledDivWrapper>
    );
};

export default EditorMessageFeild;
