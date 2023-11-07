import React, { FC } from "react";
import { Badge, ListItemIcon, SvgIconProps } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { usePathname } from "next/navigation";

type Props = {
    text: string;
    icon?: React.ReactElement<SvgIconProps>;
    totalMessages?: number | null | undefined;
    onClick: () => void;
    activePathname?: boolean;
};

export const MenuOption: FC<Props> = ({
    text,
    icon,
    totalMessages,
    onClick,
    activePathname,
}) => {
    const pathanme = usePathname();

    return (
        <ListItem
            disablePadding
            onClick={onClick}
            sx={{
                backgroundColor: `${
                    activePathname ? "primary.lighter" : "inherit"
                }`,
            }}
        >
            <ListItemButton
                sx={{
                    position: "relative",
                }}
            >
                {icon && (
                    <ListItemIcon>
                        {text === "Messages" && totalMessages ? (
                            <Badge
                                badgeContent={totalMessages}
                                color="secondary"
                            >
                                {icon}
                            </Badge>
                        ) : (
                            <>{icon}</>
                        )}
                    </ListItemIcon>
                )}
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};

export default MenuOption;
