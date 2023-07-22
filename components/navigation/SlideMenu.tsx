import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import theme from "@/theme/theme";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const drawerWidth = 300;
const StyledSlider = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    background: "black",
    border: "none",
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        height: "94%",
        boxShadow: "",
        border: "none",
    },
}));

interface SlideMenuProps {
    slideMenuState: boolean;
    handleslideMenuClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
    slideMenuState,
    handleslideMenuClose,
}) => {
    return (
        <StyledSlider variant="persistent" anchor="left" open={slideMenuState}>
            <DrawerHeader>
                <IconButton onClick={handleslideMenuClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {["Account", "Services", "Reviews"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </StyledSlider>
    );
};

export default SlideMenu;
