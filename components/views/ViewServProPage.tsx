"use client";
import React from "react";
import {
    Avatar,
    Divider,
    Grid,
    Paper,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { ProgressWithPercentage, SectionWithTitle } from "@/components";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import EditorView from "../editors/EditorView";

interface ViewServProPageProps {
    data: Record<string, any>;
}

const ViewServProPage: React.FC<ViewServProPageProps> = ({ data }) => {
    console.log(data);
    return (
        <Stack
            spacing={6}
            sx={{ width: { md: "70%" }, py: { xs: "2rem" }, mx: "auto" }}
        >
            <Stack direction="row" spacing={4}>
                <Stack alignItems="center">
                    <Avatar
                        alt={`${data.name}`}
                        src={`${data.image}`}
                        variant="rounded"
                        sx={{
                            width: { xs: 80, md: 150 },
                            height: { xs: 80, md: 150 },
                        }}
                    />
                </Stack>
                <Stack direction="column" spacing={2}>
                    <Typography
                        variant="h1"
                        sx={{ fontSize: { xs: "1.375rem", md: "1.625rem" } }}
                    >
                        {data.name}
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={1}>
                        <Rating
                            name="text-feedback"
                            value={data.rating}
                            readOnly
                            precision={0.1}
                            size="small"
                            emptyIcon={
                                <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                />
                            }
                        />
                        <Typography variant="caption">
                            {data.rating !== 0 ? data.rating : "Not rated"}
                        </Typography>
                    </Stack>
                    <Typography variant="body2">Professional</Typography>
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
                <Typography variant="body2">
                    Customers rated this pro highly for work quality,
                    professionalism, and responsiveness.
                </Typography>
                <ProgressWithPercentage
                    number={data.rating}
                    array={data.reviews}
                />
                <Divider />
                {data.reviews.map((review: Record<string, any>) => (
                    <Paper
                        elevation={2}
                        sx={{ padding: "1rem", borderRadius: "1rem" }}
                        key={review.id}
                    >
                        <Stack spacing={1}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <Avatar
                                    sx={{ w: 6, h: 6 }}
                                    src={review.user.image}
                                />
                                <Stack sx={{ p: 1 }}>
                                    <Typography>{review.user.name}</Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                    >
                                        <Rating
                                            name="text-feedback"
                                            value={review.rating}
                                            readOnly
                                            precision={0.1}
                                            size="small"
                                            emptyIcon={
                                                <StarIcon
                                                    style={{ opacity: 0.55 }}
                                                    fontSize="inherit"
                                                />
                                            }
                                        />
                                        <Typography>
                                            {review.rating} rating
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <EditorView content={review.comment} />
                        </Stack>
                    </Paper>
                ))}
            </SectionWithTitle>
        </Stack>
    );
};

export default ViewServProPage;
