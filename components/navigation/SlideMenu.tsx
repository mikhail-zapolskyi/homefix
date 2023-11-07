"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, List, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Loader, MenuOption } from "@/components";
import { styled } from "@mui/material/styles";
import {
    Mails,
    User2,
    LayoutDashboard,
    Building2,
    Users,
    MessagesSquare,
    DoorOpen,
    ChevronLeft,
    Activity,
    DraftingCompass,
} from "lucide-react";
import useSWR from "swr";
import { toast } from "react-toastify";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

interface SlideMenuProps {
    slideMenuState: boolean;
    handleslideMenuClose: () => void;
}

const SlideMenu: React.FC<SlideMenuProps> = ({
    slideMenuState,
    handleslideMenuClose,
}) => {
    const { data: session, status } = useSession();
    let url: string = "/api/messages/unread";
    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateOnFocus: true,
    });

    const { push } = useRouter();
    const pathname = usePathname();
    const theme = useTheme();

    const iconColor: Record<string, any> = {
        [pathname]: `${theme.palette.primary.main}`,
    };

    const menuItems = [
        {
            name: "Dashbord",
            pathname: "/dashboard",
            icon: <LayoutDashboard color={iconColor["/dashboard"]} />,
            type: "USER",
        },
        {
            name: "User Profile",
            pathname: "/dashboard/user-profile",
            icon: <User2 color={iconColor["/dashboard/user-profile"]} />,
            type: "USER",
        },
        {
            name: "Service Profile",
            pathname: "/dashboard/service-profile",
            icon: <Building2 color={iconColor["/dashboard/service-profile"]} />,
            type: "PRO",
        },
        {
            name: "Leads",
            pathname: "/dashboard/leads",
            icon: <Activity color={iconColor["/dashboard/leads"]} />,
            type: "PRO",
        },
        {
            name: "Projects",
            pathname: "/dashboard/projects",
            icon: <DraftingCompass color={iconColor["/dashboard/projects"]} />,
            type: "USER",
        },
        {
            name: "Contacts",
            pathname: "/dashboard/contacts",
            icon: <Users color={iconColor["/dashboard/contacts"]} />,
            type: "USER",
        },
        {
            name: "Messages",
            pathname: "/dashboard/messages",
            icon: <Mails color={iconColor["/dashboard/messages"]} />,
            type: "USER",
        },
        {
            name: "Reviews",
            pathname: "/dashboard/reviews",
            icon: <MessagesSquare color={iconColor["/dashboard/reviews"]} />,
            type: "USER",
        },
        {
            name: "Main Page",
            pathname: "/",
            icon: <DoorOpen />,
            type: "USER",
        },
    ];

    if (error) {
        toast.error(error.message);
    }

    return isLoading ? (
        <Loader />
    ) : (
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
                    <ChevronLeft />
                </IconButton>
            </DrawerHeader>
            <List onClick={handleslideMenuClose}>
                {menuItems.map((obj: Record<string, any>) => {
                    // Check if the user's type is "PRO" or if the menu item type matches the user's type
                    if (
                        session?.user.type === "PRO" ||
                        session?.user.type === obj.type
                    ) {
                        return (
                            <MenuOption
                                key={obj.name}
                                text={obj.name}
                                icon={obj.icon}
                                activePathname={obj.pathname === pathname}
                                onClick={() => {
                                    push(obj.pathname);
                                }}
                            />
                        );
                    } else {
                        // Return null for menu items that shouldn't be displayed
                        return null;
                    }
                })}
            </List>
        </Drawer>
    );
};

export default SlideMenu;
