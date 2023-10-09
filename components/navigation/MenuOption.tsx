import React from "react";
import { Badge, ListItemIcon, SvgIconProps } from "@mui/material";
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
            <ListItemButton sx={{ position: "relative" }}>
                <ListItemIcon>
                    {text === "Messages" ? (
                        <Badge badgeContent={4} color="secondary">
                            {icon}
                        </Badge>
                    ) : (
                        <>{icon}</>
                    )}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuOption;
