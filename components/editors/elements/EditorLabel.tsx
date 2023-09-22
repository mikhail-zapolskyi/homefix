import { styled } from "@mui/material";

const StyledDivLabel = styled("div")(({ theme }) => ({
    position: "absolute",
    backgroundColor: `${theme.palette.background.paper}`,
    padding: "0 .3rem",
    top: "-0.7rem",
    left: "1rem",
    fontSize: "0.8rem",
    textTransform: "capitalize",
}));

const EditorLabel = ({ label }: { label: string | null | undefined }) => {
    return <>{label && <StyledDivLabel>{label}</StyledDivLabel>}</>;
};

export default EditorLabel;
