"use client";
import React from "react";
import {
    Grid,
    Typography,
    Divider,
    Avatar,
    Stack,
    ListItem,
    ListItemAvatar,
    ListItemText,
    List,
    LinearProgress,
} from "@mui/material";
import { CustomButton, CustomDashboardCard } from "..";
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import useContactStatus from "@/hooks/useContactStatus";
import { useAccountHolder, useDefineSkillLevel } from "@/hooks";
import { Star } from "lucide-react";
import useDefineColorByRating from "@/hooks/useDefineColorByRating";
import { SearchServiceProfilesType } from "@/app/types";

type Props = {
    data: SearchServiceProfilesType;
    currentUser: string | false | null | undefined;
    serviceProfileUser: string | false | null | undefined;
    onView?: () => void;
    onContactRequest?: () => void;
    onQuoteRequest?: () => void;
};

const SearchedProfileCard: React.FC<Props> = ({
    data,
    currentUser,
    serviceProfileUser,
    onView,
    onContactRequest,
    onQuoteRequest,
}) => {
    const theme = useTheme();
    const screenSm = useMediaQuery(theme.breakpoints.up("sm"));
    const screenMd = useMediaQuery(theme.breakpoints.up("md"));
    const contactStatus = useContactStatus({
        currentUser,
        serviceProfileUser: data?.user,
    });
    const accountHolder = useAccountHolder({ currentUser, serviceProfileUser });
    const skillLevel = useDefineSkillLevel(data?.experience || 0);
    const color = useDefineColorByRating({ number: data.rating });

    const renderArrayValues = (
        <Stack direction="row" flexWrap="wrap">
            {data &&
                data.specialties_Do.map((i: string) => (
                    <Typography
                        key={i}
                        variant="body1"
                        sx={{
                            minWidth: "max-content",
                            fontSize: "small",
                            px: "0.6rem",
                            m: ".2rem",
                            backgroundColor: "primary.main",
                            borderRadius: "0.4rem",
                            color: "common.white",
                        }}
                    >
                        {i}
                    </Typography>
                ))}
        </Stack>
    );

    const renderData = data && (
        <Stack direction="row" sx={{ width: "100%" }}>
            <List
                disablePadding={true}
                dense={true}
                sx={{ width: "100%", height: "100%" }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            alt={data.name || ""}
                            src={data.image || ""}
                            variant="square"
                            sx={{
                                height: 80,
                                width: 80,
                                borderRadius: "0.8rem",
                                mr: "1rem",
                            }}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="caption">
                                {data.name}
                            </Typography>
                        }
                        secondary={
                            <>
                                <strong>Skill Level: {skillLevel}</strong> |{" "}
                                <strong>Hired Times: {data.hiredTimes}</strong>
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="body2">
                                Overall Rating
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ width: "70%" }}
                        >
                            <LinearProgress
                                variant="determinate"
                                value={data.rating || 0}
                                color={color}
                                sx={{
                                    width: "100%",
                                    height: "0.6rem",
                                    borderRadius: "0.6rem",
                                }}
                                valueBuffer={100}
                            />
                            <Star
                                color={`${theme.palette.info.main}`}
                                fontSize="small"
                            />
                            <Typography variant="body2">
                                {data.rating}%
                            </Typography>
                        </Stack>
                    </Stack>
                </ListItem>
                <ListItem>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        alignItems="center"
                    >
                        {screenSm && (
                            <Typography variant="body2">Serves:</Typography>
                        )}
                        <Typography variant="body2">
                            {data.location[0].city}, {data.location[0].state},
                            {data.location[0].country}
                        </Typography>
                    </Stack>
                </ListItem>
                <ListItem>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        alignItems="center"
                    >
                        {screenSm && (
                            <Typography variant="body2">
                                Specialties:
                            </Typography>
                        )}
                        <Stack spacing={2}>{renderArrayValues}</Stack>
                    </Stack>
                </ListItem>
            </List>
        </Stack>
    );

    const renderActionButtons = data && (
        <List
            disablePadding={true}
            dense={true}
            sx={{ width: "100%", height: "100%" }}
        >
            {screenMd && (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="avatar" src={data.user.image || ""} />
                    </ListItemAvatar>
                    <ListItemText primary={data.user.name} secondary="Owner" />
                </ListItem>
            )}
            <ListItem>
                <CustomButton
                    onClick={onView}
                    text="Profile"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
            </ListItem>
            {!accountHolder.state && (
                <ListItem>
                    <CustomButton
                        onClick={onQuoteRequest}
                        text="Quote Request"
                        variant="contained"
                        color="success"
                        size="small"
                        fullWidth
                    />
                </ListItem>
            )}
            {!accountHolder.state && (
                <ListItem>
                    <CustomButton
                        onClick={onContactRequest}
                        text={
                            contactStatus.status
                                ? contactStatus.status
                                : contactStatus.default
                        }
                        variant="contained"
                        size="small"
                        fullWidth
                        disabled={contactStatus.status ? true : false}
                    />
                </ListItem>
            )}
        </List>
    );

    return (
        data && (
            <CustomDashboardCard>
                <Grid
                    container
                    spacing={{ xs: 2, md: 1 }}
                    sx={{ alignItems: "center" }}
                >
                    <Grid
                        container
                        item
                        xs={12}
                        md={8}
                        lg={9}
                        sx={{
                            justifyContent: { md: "center" },
                        }}
                    >
                        {renderData}
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        md={4}
                        lg={3}
                        spacing={2}
                        sx={{
                            alignContent: "end",
                        }}
                    >
                        <Grid item xs={12} md={1}>
                            <Divider
                                orientation={
                                    screenMd ? "vertical" : "horizontal"
                                }
                                sx={{ height: { md: "100%" }, width: "100%" }}
                            />
                        </Grid>
                        {/* This is in place of the company logo */}
                        <Grid container item xs={12} md={10}>
                            {renderActionButtons}
                        </Grid>
                    </Grid>
                </Grid>
            </CustomDashboardCard>
        )
    );
};

export default SearchedProfileCard;
