"use client";
import React from "react";
import { Avatar, Grid, Rating, Stack, Typography } from "@mui/material";
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
            <SectionWithTitle title="Introduction">
                <EditorView content={data.introduction} />
            </SectionWithTitle>
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
                        This pro accepts payments via{" "}
                        {data.payment_methods.toString().replace(/,/g, " and ")}
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
            <SectionWithTitle title="Biography">
                <EditorView content={data.bio} />
            </SectionWithTitle>
            <SectionWithTitle title="Reviews">
                <Typography variant="body2">
                    Customers rated this pro highly for work quality,
                    professionalism, and responsiveness.
                </Typography>
                <ProgressWithPercentage
                    number={data.rating}
                    array={data.reviews}
                />
            </SectionWithTitle>
        </Stack>
    );
};

export default ViewServProPage;