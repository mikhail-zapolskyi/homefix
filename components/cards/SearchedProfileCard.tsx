"use client";
import React from "react";
import {
    Grid,
    Typography,
    Divider,
    Avatar,
    Rating,
    Stack,
    ListItem,
    ListItemAvatar,
    ListItemText,
    List,
} from "@mui/material";
import { CustomButton, CustomDashboardCard, Loader } from "..";
import determineFixerSkillLevel from "@/utils/helpers/determineFixerSkillLevel";
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import EditorView from "../editors/EditorView";
import StarIcon from "@mui/icons-material/Star";
import useContactStatus from "@/hooks/useContactStatus";
import { useAccountHolder } from "@/hooks";

interface Props {
    data?: Record<string, any>;
    currentUser?: string | false | null | undefined;
    serviceProfileUser?: string | false | null | undefined;
    onView?: () => void;
    onContactRequest?: () => void;
    onQuoteRequest?: () => void;
}

const SearchedProfileCard: React.FC<Props> = ({
    data,
    currentUser,
    serviceProfileUser,
    onView,
    onContactRequest,
    onQuoteRequest,
}) => {
    const theme = useTheme();
    const screenMd = useMediaQuery(theme.breakpoints.up("md"));
    const contactStatus = useContactStatus({
        currentUser,
        serviceProfileUser: data?.user,
    });
    const accountHolder = useAccountHolder({ currentUser, serviceProfileUser });

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

    const renderDataMobile = data && (
        <Stack
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
            sx={{ width: "100%" }}
        >
            <Stack direction="row" spacing={1}>
                <Avatar
                    src={data.image}
                    alt={data.name}
                    sx={{
                        height: 80,
                        width: 80,
                        borderRadius: "0.8rem",
                        mr: 2,
                    }}
                    variant="square"
                />
                <Stack spacing={0.5}>
                    <Typography variant="h6">{data.name}</Typography>
                    <Typography variant="body2">
                        Skill Level: {determineFixerSkillLevel(data.experience)}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <Rating
                            defaultValue={data.rating}
                            size="small"
                            precision={0.1}
                            readOnly
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                        <Typography variant="body2">{data.rating}</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );

    const renderData = data && (
        <Stack direction="row" sx={{ width: "100%" }}>
            <Avatar
                src={data.image}
                alt={data.name}
                sx={{
                    height: 150,
                    width: 150,
                    borderRadius: "0.8rem",
                    mr: 2,
                }}
                variant="square"
            />
            <Stack spacing={1}>
                <Stack spacing={1} direction="column">
                    <Typography variant="h6">{data.name}</Typography>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Rating
                                defaultValue={data.rating}
                                size="small"
                                readOnly
                            />
                            <Typography variant="body1">
                                {data.rating}
                            </Typography>
                        </Stack>
                        <Typography variant="body2">
                            Skill Level:{" "}
                            {determineFixerSkillLevel(data.experience)}
                        </Typography>

                        <Typography variant="body2">
                            Hired Times: {data.hiredTimes}
                        </Typography>
                    </Stack>
                    <Typography variant="body2">
                        {data.location[0].city}, {data.location[0].state},{" "}
                        {data.location[0].country}
                    </Typography>
                </Stack>
                <Stack spacing={2}>{renderArrayValues}</Stack>
            </Stack>
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
                        <Avatar alt="avatar" src={data.user.image} />
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
                        {!screenMd && renderDataMobile}
                        {screenMd && renderData}
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
                {screenMd && (
                    <Stack spacing={2}>
                        <EditorView content={data.introduction.slice(0, 150)} />
                    </Stack>
                )}
            </CustomDashboardCard>
        )
    );
};

export default SearchedProfileCard;
