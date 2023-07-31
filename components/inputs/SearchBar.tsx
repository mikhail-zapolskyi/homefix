import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ title }: { title: string }) => {
    return (
        <Paper
            component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderRadius: "1rem",
            }}
        >
            <IconButton type="button" aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={title}
                inputProps={{ "aria-label": `${title}` }}
            />
            <IconButton type="button" aria-label="search">
                <ClearIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
