"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Drawer, List, IconButton } from "@mui/material";
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

    let url: string = "/api/messages/unread";

    const { data, error, isLoading } = useSWR(url, fetcher, {
        refreshInterval: 1000,
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
                    icon={<LayoutDashboard />}
                    onClick={() => {
                        push("/dashboard");
                    }}
                />
                <MenuOption
                    text="Profile"
                    icon={<User2 />}
                    onClick={() => {
                        push("/dashboard/user-profile");
                    }}
                />
                {session?.user.type === "USER" && (
                    <MenuOption
                        text="Businesses"
                        icon={<Building2 />}
                        onClick={() => {
                            push("/dashboard/businesses");
                        }}
                    />
                )}
                <MenuOption
                    text="Messages"
                    icon={<Mails />}
                    totalMessages={data.total_unread_messages}
                    onClick={() => {
                        push("/dashboard/messages");
                    }}
                />
                {session?.user.type === "PRO" && (
                    <>
                        <MenuOption
                            text="Service Profile"
                            icon={<Building2 />}
                            onClick={() => {
                                push("/dashboard/service-profile");
                            }}
                        />
                        <MenuOption
                            text="Customers"
                            icon={<Users />}
                            onClick={() => {
                                push("/dashboard/customers");
                            }}
                        />
                    </>
                )}
                <MenuOption
                    text="Reviews"
                    icon={<MessagesSquare />}
                    onClick={() => {
                        push("/dashboard/reviews");
                    }}
                />
                <MenuOption
                    text="Main Page"
                    icon={<DoorOpen />}
                    onClick={() => {
                        push("/");
                    }}
                />
            </List>
        </Drawer>
    );
};

export default SlideMenu;
