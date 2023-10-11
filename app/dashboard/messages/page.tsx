"use client";

import {
    Loader,
    ContactList,
    MessageList,
    EditorMessageFeild,
} from "@/components";
import {
    Avatar,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
} from "@mui/material";

import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import moment from "moment";
import EditorView from "@/components/editors/EditorView";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const page = () => {
    const { data: session } = useSession();
    const { data, error, isLoading } = useSWR("/api/conversations", fetcher, {
        refreshInterval: 1000,
    });

    const [messages, setMessages] = useState<Record<string, any>[]>([]);
    const [activeUser, setActiveUser] = useState<string>("");

    if (error) {
        toast.error(error.message);
    }

    useEffect(() => {
        if (data) {
            setMessages(data && data.conversations[0].messages);
            setActiveUser(data && data.conversations[0].id);
        }
    }, [data]);

    const handleChooseConversation = (
        messages: Record<string, any>[],
        id: string
    ) => {
        setMessages(messages);
        setActiveUser(id);
    };

    return isLoading ? (
        <Loader />
    ) : (
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
            <Grid container item xs={12} spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} md={4} sx={{ height: "fit-content" }}>
                    <ContactList>
                        {data.conversations.map((obj: Record<string, any>) => (
                            <ListItem
                                alignItems="flex-start"
                                key={obj.id}
                                onClick={() =>
                                    handleChooseConversation(
                                        obj.messages,
                                        obj.id
                                    )
                                }
                                sx={{
                                    cursor: "pointer",
                                    borderLeft:
                                        obj.id === activeUser ? 4 : "none",
                                    borderColor: "success.main",
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar
                                        alt="avatar"
                                        src={
                                            session?.user.id === obj.userId
                                                ? obj.service.image
                                                : obj.user.image
                                        }
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        session?.user.id === obj.userId
                                            ? obj.service.name
                                            : obj.user.name
                                    }
                                    secondary={`Last Message: ${moment(
                                        obj.lastMessageAt
                                    ).fromNow()}`}
                                />
                            </ListItem>
                        ))}
                    </ContactList>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={8}
                    sx={{
                        // 2px for grid spacing and 8rem for maxHeight of the contacts container
                        height: { xs: "calc(100% - 2px - 8rem)", md: "100%" },
                    }}
                >
                    <MessageList
                        textarea={
                            <Stack
                                sx={{
                                    width: "100%",
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                }}
                            >
                                <EditorMessageFeild
                                    content=""
                                    onChange={() =>
                                        console.log("Change text area")
                                    }
                                    onClick={() => console.log("Click Send")}
                                />
                            </Stack>
                        }
                    >
                        {messages.map((obj: Record<string, any>) => (
                            <ListItem
                                alignItems="flex-start"
                                key={obj.id}
                                sx={{
                                    backgroundColor: "common.white",
                                    borderRadius: "1rem",
                                }}
                            >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                    flexWrap="wrap"
                                >
                                    <Stack direction="row" spacing={1}>
                                        <Avatar
                                            alt="avatar"
                                            src={
                                                session?.user.id === obj.userId
                                                    ? obj.service.image
                                                    : obj.user.image
                                            }
                                        />
                                        <ListItemText
                                            primary={
                                                session?.user.id === obj.userId
                                                    ? obj.service.name
                                                    : obj.user.name
                                            }
                                            secondary={moment(
                                                obj.createdAt
                                            ).fromNow()}
                                        />
                                    </Stack>
                                    <EditorView content={obj.content} />
                                </Stack>
                            </ListItem>
                        ))}
                    </MessageList>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default page;
