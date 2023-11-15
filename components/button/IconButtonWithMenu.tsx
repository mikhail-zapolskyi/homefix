// This component that provides a button with an
// associated menu, typically used for displaying
// additional options or actions.

// The component renders a Box containing an IconButton and an associated
// icon (MoreVertical). Clicking on this button
// triggers the menu. The Menu component is conditionally rendered based
// on the open state. It contains the items passed as children ({children}).
// The menu is styled using MUI (Material-UI) components, with options for
// customization such as transition effects, elevation, and border radius.

import { Box, Fade, IconButton, Menu } from "@mui/material";
import { MoreVertical } from "lucide-react";
import React, { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    horizontal?: number | "right" | "left" | "center";
    vertical?: number | "center" | "top" | "bottom";
};

const IconButtonWithMenu: FC<Props> = ({ children }) => {
    // Handle Menu Button
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertical />
            </IconButton>
            {open && (
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onPointerUp={() => {
                        setTimeout(() => handleClose(), 100);
                    }}
                    TransitionComponent={Fade}
                    transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                    }}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "top",
                    }}
                    elevation={2}
                    sx={{
                        ".MuiPaper-root": {
                            borderRadius: ".5rem",
                        },
                    }}
                >
                    {children}
                </Menu>
            )}
        </Box>
    );
};

export default IconButtonWithMenu;
