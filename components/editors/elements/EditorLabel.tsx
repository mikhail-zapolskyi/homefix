const EditorLabel = ({ label }: { label: string | null | undefined }) => {
    return <div>{label && label}</div>;
};

export default EditorLabel;
