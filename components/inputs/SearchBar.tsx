import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = () => {
    return (
        <Paper
            component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
            }}
        >
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Find a Review"
                inputProps={{ "aria-label": "find a review" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <ClearIcon />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
