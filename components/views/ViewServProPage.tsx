"use client";
import React, { FC } from "react";
import {
    Avatar,
    Divider,
    Grid,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { ProgressWithPercentage, SectionWithTitle } from "@/components";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import EditorView from "../editors/EditorView";
import { ViewServiceProfileType } from "@/app/types";
import { useDefineSkillLevel } from "@/hooks";
import { useTheme } from "@mui/material/styles";
import { Star } from "lucide-react";
import useDefineColorByRating from "@/hooks/useDefineColorByRating";
import moment from "moment";

type Props = { data: ViewServiceProfileType };

const ViewServProPage: FC<Props> = ({ ...props }) => {
    const theme = useTheme();
    const { data } = props;
    const skillLevel = useDefineSkillLevel(data.experience || 0);
    const color = useDefineColorByRating({ number: data.rating });

    return (
        <Stack
            spacing={6}
            sx={{ width: { md: "70%" }, py: { xs: "2rem" }, mx: "auto" }}
        >
            <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                <Stack alignItems="center">
                    <Avatar
                        alt={`${data.name}`}
                        src={`${data.image}`}
                        variant="rounded"
                        sx={{
                            width: { xs: 100, md: 150 },
                            height: { xs: 100, md: 150 },
                        }}
                    />
                </Stack>
                <Stack direction="column" spacing={1} sx={{ width: "100%" }}>
                    <Stack
                        alignItems={{ xs: "center", md: "start" }}
                        justifyContent={{ xs: "center", md: "start" }}
                        direction="column"
                        spacing={1}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: "1.375rem", md: "1.625rem" },
                            }}
                        >
                            {data.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={1}
                            sx={{ width: "100%" }}
                        >
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                                sx={{ minWidth: "fit-content" }}
                            >
                                <Typography variant="caption">
                                    Overall Rating
                                </Typography>

                                <Star
                                    color={`${theme.palette.info.main}`}
                                    fontSize="large"
                                />
                            </Stack>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                                sx={{ width: "100%" }}
                            >
                                <LinearProgress
                                    variant="determinate"
                                    value={data.rating || 0}
                                    color={color}
                                    sx={{
                                        width: { xs: "100%", md: "50%" },
                                        height: "1rem",
                                        borderRadius: "2rem",
                                    }}
                                    valueBuffer={100}
                                />
                                <Typography variant="caption">
                                    {data.rating !== 0
                                        ? `${data.rating}%`
                                        : "Not rated"}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack
                        alignItems="center"
                        justifyContent={{ xs: "center", md: "start" }}
                        direction="row"
                        spacing={1}
                        sx={{ width: "100%" }}
                    >
                        <Typography variant="caption">
                            Skill Level: {skillLevel}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            {data.introduction && (
                <SectionWithTitle title="Introduction">
                    <EditorView content={data.introduction} />
                </SectionWithTitle>
            )}
            <SectionWithTitle title="Overview" />
            <Grid container item xs={12}>
                <Grid item xs={12} md={6}>
                    <SectionWithTitle>
                        <Stack direction="row" spacing={1}>
                            <WorkIcon fontSize="small" />
                            <Typography>
                                Hired {data.hiredTimes} times
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <PlaceIcon fontSize="small" />
                            <Typography>
                                Serves {data.location[0].city},{" "}
                                {data.location[0].state
                                    ? data.location[0].state
                                    : data.location[0].city}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <PlaylistAddCheckIcon fontSize="small" />
                            <Typography>
                                Background{" "}
                                {data.bgChecked ? "checked" : "not checked"}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <PeopleAltIcon />
                            <Typography>{data.employees} employees</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <QueryBuilderIcon fontSize="small" />
                            <Typography>
                                {data.experience} years of experience
                            </Typography>
                        </Stack>
                    </SectionWithTitle>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography>
                        {data.payment_methods.length > 0
                            ? `This pro accepts payments via 
                        ${data.payment_methods.toString().replace(/,/g, ", ")}`
                            : "Payment Methods not listed"}
                    </Typography>
                </Grid>
            </Grid>
            <SectionWithTitle title="Specialties">
                <Stack direction="column" spacing={1}>
                    {data.specialties_Do.map((value: string) => (
                        <Stack direction="row" spacing={1} key={value}>
                            <CheckIcon color="success" fontSize="small" />
                            <Typography>{value}</Typography>
                        </Stack>
                    ))}
                </Stack>
                <Stack direction="column" spacing={1}>
                    {data.specialties_No.map((value: string) => (
                        <Stack direction="row" spacing={1} key={value}>
                            <NotInterestedIcon
                                color="warning"
                                fontSize="small"
                            />
                            <Typography color="GrayText">{value}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </SectionWithTitle>
            {data.bio && (
                <SectionWithTitle title="Biography">
                    <EditorView content={data.bio} />
                </SectionWithTitle>
            )}
            {data.schedule_policy && (
                <SectionWithTitle title="Schedule Policy">
                    <EditorView content={data.schedule_policy} />
                </SectionWithTitle>
            )}
            <SectionWithTitle title="Reviews">
                <Typography variant="body1">
                    <strong>
                        Customers rated this pro highly for work quality,
                        professionalism, and responsiveness.
                    </strong>
                </Typography>
                <ProgressWithPercentage
                    number={data.rating || 0}
                    array={data.reviews}
                />
                <Divider />
                {data.reviews.map((review: Record<string, any>) => {
                    return (
                        <Paper
                            elevation={2}
                            sx={{ padding: "1rem", borderRadius: "1rem" }}
                            key={review.id}
                        >
                            <Stack spacing={1} sx={{ width: "100%" }}>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                >
                                    <List
                                        disablePadding={true}
                                        dense={true}
                                        sx={{ width: "100%", height: "100%" }}
                                    >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={review.user.name || ""}
                                                    src={
                                                        review.user.image || ""
                                                    }
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="caption">
                                                        {review.user.name}
                                                    </Typography>
                                                }
                                                secondary={moment(
                                                    review.createdAt
                                                ).format("LLL")}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ width: "100%" }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    alignItems="center"
                                                >
                                                    <Typography variant="body2">
                                                        Rated
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
                                                        value={
                                                            review.overall_rating ||
                                                            0
                                                        }
                                                        color={color}
                                                        sx={{
                                                            width: "100%",
                                                            height: "0.6rem",
                                                            borderRadius:
                                                                "0.6rem",
                                                        }}
                                                        valueBuffer={100}
                                                    />
                                                    <Star
                                                        color={`${theme.palette.info.main}`}
                                                        fontSize="small"
                                                    />
                                                    <Typography variant="body2">
                                                        {review.overall_rating}%
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </ListItem>
                                    </List>
                                </Stack>
                                <EditorView content={review.content} />
                            </Stack>
                        </Paper>
                    );
                })}
            </SectionWithTitle>
        </Stack>
    );
};

export default ViewServProPage;
