"use client";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessIcon from "@mui/icons-material/Business";
import ReviewsIcon from "@mui/icons-material/Reviews";
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { MenuOption } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const drawerWidth = 240;

interface SlideMenuProps {
    slideMenuState: boolean;
    handleslideMenuClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
    slideMenuState,
    handleslideMenuClose,
}) => {
    const { data: session } = useSession();

    const { push } = useRouter();

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={slideMenuState}
            PaperProps={{
                elevation: 2,
            }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    borderRadius: "1rem",
                    border: "none",
                },
            }}
        >
            <DrawerHeader>
                <IconButton onClick={handleslideMenuClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <List onClick={handleslideMenuClose}>
                <MenuOption
                    text="Profile"
                    icon={<ManageAccountsIcon />}
                    onClick={() => {
                        push("/dashboard/profile");
                    }}
                />
                {session?.user.type === "USER" && (
                    <MenuOption
                        text="Businesses"
                        icon={<BusinessIcon />}
                        onClick={() => {
                            push("/dashboard/businesses");
                        }}
                    />
                )}
                {session?.user.type === "PRO" && (
                    <>
                        <MenuOption
                            text="Business Profile"
                            icon={<BusinessCenterIcon />}
                            onClick={() => {
                                push("/dashboard/business-profile");
                            }}
                        />
                        <MenuOption
                            text="Customers"
                            icon={<GroupIcon />}
                            onClick={() => {
                                push("/dashboard/customers");
                            }}
                        />
                    </>
                )}
                <MenuOption
                    text="Reviews"
                    icon={<ReviewsIcon />}
                    onClick={() => {
                        push("/dashboard/reviews");
                    }}
                />
                <MenuOption
                    text="Go Main Page"
                    icon={<ExitToAppIcon />}
                    onClick={() => {
                        push("/");
                    }}
                />
            </List>
        </Drawer>
    );
};

export default SlideMenu;
