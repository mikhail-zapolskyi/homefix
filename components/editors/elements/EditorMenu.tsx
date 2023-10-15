import { Button, Divider, Stack } from "@mui/material";
import { Editor } from "@tiptap/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

interface Props {
    editor: Editor | null;
}

const EditorMenu: React.FC<Props> = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <>
            <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is-active" : ""}
                    size="small"
                >
                    <FormatBoldIcon />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    className={editor.isActive("italic") ? "is-active" : ""}
                >
                    <FormatItalicIcon />
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 1 })
                            ? "is-active"
                            : ""
                    }
                >
                    h1
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 })
                            ? "is-active"
                            : ""
                    }
                >
                    h2
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 })
                            ? "is-active"
                            : ""
                    }
                >
                    h3
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={editor.isActive("bulletList") ? "is-active" : ""}
                >
                    <FormatListBulletedIcon />
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={
                        editor.isActive("orderedList") ? "is-active" : ""
                    }
                >
                    <FormatListNumberedIcon />
                </Button>
                <Button
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                >
                    <HorizontalRuleIcon />
                </Button>
            </Stack>
            <Divider />
        </>
    );
};

export default EditorMenu;
