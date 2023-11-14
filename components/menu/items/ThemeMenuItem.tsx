import { ListItemIcon, MenuItem, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
    title: string;
    icon: ReactNode;
    onClick: () => void;
    color?: string;
};

const ThemeMenuItem: FC<Props> = ({ title, icon, onClick, color }) => {
    return (
        <MenuItem onClick={onClick} dense sx={{ color: color }}>
            <ListItemIcon>{icon}</ListItemIcon>
            {title}
        </MenuItem>
    );
};

export default ThemeMenuItem;
