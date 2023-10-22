"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import axios from "axios";

import {
    ContactList,
    MessageList,
    EditorMessageFeild,
    DashConversationCard,
    MessageItem,
} from "@/components";

import { Grid, ListItem, ListItemText, Stack } from "@mui/material";

import { ConversationContactsType, FullMessageType } from "@/app/types";
import pusherClient from "@/lib/pusher/pusher";
import _ from "lodash";
import { Message } from "@prisma/client";

const fetcher = (url: URL) => fetch(url).then((r) => r.json());

const page = () => {
    const { data, error } = useSWR("/api/conversations", fetcher, {
        revalidateOnFocus: true,
    });
    const [messages, setMessages] = useState<FullMessageType[]>([]);
    const [converasation, setConversation] = useState<
        ConversationContactsType[]
    >([]);
    const [conversationId, setConversationId] = useState<string>("");
    const [content, setContent] = useState<string>("");

    if (error) {
        toast.error(error.message);
    }

    if (!pusherClient) {
        toast.error("Something went wrong");
    }

    useEffect(() => {
        if (data) {
            setConversation(data);
        }
    }, [data]);

    useEffect(() => {
        if (conversationId) {
            axios.post(`/api/messages/${conversationId}/seen`);
        }
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);

        const messageHandler = (message: FullMessageType) => {
            setMessages((current) => {
                if (_.find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });
        };

        const deleteHandler = (message: Message) => {
            setMessages((current) => {
                return _.remove(current, (o) => o.id !== message.id);
            });
        };

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("messages:delete", deleteHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("messages:delete", deleteHandler);
        };
    }, [conversationId]);

    const handleGetMessages = async (conversationId: string) => {
        try {
            const response = await axios.get(`/api/messages/${conversationId}`);

            if (response.status === 200) {
                setConversationId(conversationId);
                setMessages(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    const hadnleDeleteMessage = async (messageId: string) => {
        // Need to create endpoint
        try {
            const response = await axios.delete(`/api/messages`, {
                data: { messageId },
            });
            if (response.status === 200) {
                console.log(response.status);
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    const handleMessageContent = (content: string) => {
        setContent(content);
    };

    const handleSendMessage = async () => {
        if (!content) {
            return toast.error("Please provide a message with content");
        }

        try {
            const response = await axios.post(`/api/messages`, {
                content,
                conversationId,
            });

            if (response.status === 200) {
                setContent("");
            }
        } catch (error: any) {
            toast.error(error.response.data.error);
        }
    };

    const renderEmptyListItem = (
        <ListItem alignItems="flex-start">
            <ListItemText primary="Contact List Empty" />
        </ListItem>
    );

    const renderConversationList = (
        <ContactList>
            {converasation.length > 0
                ? converasation.map((obj: ConversationContactsType) => (
                      <DashConversationCard
                          key={obj.id}
                          activeConversationId={conversationId}
                          onClick={() => handleGetMessages(obj.id)}
                          {...obj}
                      />
                  ))
                : renderEmptyListItem}
        </ContactList>
    );

    const renderMessagesList = (
        <MessageList>
            {messages.map((obj: FullMessageType) => (
                <MessageItem
                    {...obj}
                    key={obj.id}
                    onDelete={() => hadnleDeleteMessage(obj.id)}
                />
            ))}
            <Stack
                sx={{
                    width: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            >
                <EditorMessageFeild
                    conversationId={conversationId}
                    content={content}
                    onChange={handleMessageContent}
                    onClick={handleSendMessage}
                />
            </Stack>
        </MessageList>
    );

    return (
        <Grid container justifyContent="center" sx={{ height: "100%" }}>
            <Grid container item xs={12} spacing={2} sx={{ height: "100%" }}>
                <Grid item xs={12} md={4} sx={{ height: "fit-content" }}>
                    {renderConversationList}
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
                    {renderMessagesList}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default page;
