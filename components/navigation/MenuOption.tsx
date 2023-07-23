import React from "react";
import { ListItemIcon, SvgIconProps } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface MenuOptionProps {
    text: string;
    icon: React.ReactElement<SvgIconProps>;
    onClick: () => void;
}

export const MenuOption: React.FC<MenuOptionProps> = ({
    text,
    icon,
    onClick,
}) => {
    return (
        <ListItem disablePadding onClick={onClick}>
            <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuOption;
