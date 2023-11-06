"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
    const { push } = useRouter();
    const theme = useTheme();

    let url: string = "/api/messages/unread";

    const { data, error, isLoading } = useSWR(url, fetcher, {
        revalidateOnFocus: true,
    });
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
                <MenuOption
                    text="Dashboard"
                    icon={
                        <LayoutDashboard
                            color={`${theme.palette.primary.main}`}
                        />
                    }
                    activePathname="/dashboard"
                    onClick={() => {
                        push("/dashboard");
                    }}
                />
                <MenuOption
                    text="User Profile"
                    icon={<User2 color={`${theme.palette.primary.dark}`} />}
                    activePathname="/dashboard/user-profile"
                    onClick={() => {
                        push("/dashboard/user-profile");
                    }}
                />
                {session?.user.type === "PRO" && (
                    <>
                        <MenuOption
                            text="Service Profile"
                            icon={
                                <Building2
                                    color={`${theme.palette.secondary.main}`}
                                />
                            }
                            activePathname="/dashboard/service-profile"
                            onClick={() => {
                                push("/dashboard/service-profile");
                            }}
                        />
                        <MenuOption
                            text="Leads"
                            icon={
                                <Activity
                                    color={`${theme.palette.info.main}`}
                                />
                            }
                            activePathname="/dashboard/leads"
                            onClick={() => {
                                push("/dashboard/leads");
                            }}
                        />
                    </>
                )}
                <MenuOption
                    text="Projects"
                    icon={
                        <DraftingCompass
                            color={`${theme.palette.secondary.dark}`}
                        />
                    }
                    activePathname="/dashboard/projects"
                    onClick={() => {
                        push("/dashboard/projects");
                    }}
                />
                <MenuOption
                    text="Contacts"
                    icon={<Users color={`${theme.palette.star.main}`} />}
                    activePathname="/dashboard/contacts"
                    onClick={() => {
                        push("/dashboard/contacts");
                    }}
                />
                <MenuOption
                    text="Messages"
                    icon={<Mails color={`${theme.palette.warning.main}`} />}
                    totalMessages={data.total_unread_messages}
                    activePathname="/dashboard/messages"
                    onClick={() => {
                        push("/dashboard/messages");
                    }}
                />
                <MenuOption
                    text="Reviews"
                    icon={
                        <MessagesSquare color={`${theme.palette.info.light}`} />
                    }
                    activePathname="/dashboard/reviews"
                    onClick={() => {
                        push("/dashboard/reviews");
                    }}
                />
                <MenuOption
                    text="Main Page"
                    icon={<DoorOpen color={`${theme.palette.error.dark}`} />}
                    onClick={() => {
                        push("/");
                    }}
                />
            </List>
        </Drawer>
    );
};

export default SlideMenu;
