import React from "react";
import {
    Grid,
    Typography,
    Divider,
    Avatar,
    Rating,
    Stack,
} from "@mui/material";
import { CustomButton, CustomDashboardCard, Loader } from "..";
import determineFixerSkillLevel from "@/utils/helpers/determineFixerSkillLevel";
import { useTheme, useMediaQuery } from "@mui/material";
import EditorView from "../editors/EditorView";

interface ViewSearchServProProps {
    data?: Record<string, any>;
    onView?: () => void;
    onFollow?: () => void;
}

const ViewSearchServPro: React.FC<ViewSearchServProProps> = ({
    data,
    onView,
    onFollow,
}) => {
    const theme = useTheme();
    const screenMd = useMediaQuery(theme.breakpoints.up("md"));

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
                            backgroundColor: "secondary.dark",
                            borderRadius: "0.4rem",
                            color: "white",
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
            onClick={onView}
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
                            readOnly
                        />
                        <Typography variant="body2">{data.rating}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                <EditorView content={data.introduction.slice(0, 100)} />
                <Stack spacing={1} direction="row">
                    <CustomButton
                        onClick={onView}
                        text="Profile"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <CustomButton
                        onClick={onFollow}
                        text="Follow"
                        variant="contained"
                        size="small"
                        fullWidth
                    />
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
                <Stack spacing={2}>
                    <EditorView content={data.introduction.slice(0, 150)} />
                </Stack>
                {renderArrayValues}
            </Stack>
        </Stack>
    );

    const renderActionButtons = data && (
        <Grid
            container
            item
            md={4}
            lg={3}
            spacing={2}
            sx={{
                alignContent: "end",
            }}
        >
            <Grid item xs={1}>
                <Divider orientation="vertical" sx={{ height: "10rem" }} />
            </Grid>
            {/* This is in place of the company logo */}
            <Grid container item xs={10}>
                <Stack direction="column" spacing={2}>
                    <Stack alignItems="center" direction="row">
                        <Avatar
                            alt={data.user.name}
                            src={data.user.image}
                            sx={{ mr: "1rem", mt: "0.3rem" }}
                        />
                        <Typography fontWeight="700">
                            {data.user.name}
                        </Typography>
                    </Stack>
                    <Stack spacing={1} direction="row">
                        <CustomButton
                            onClick={onView}
                            text="Profile"
                            variant="outlined"
                            size="small"
                        />
                        <CustomButton
                            onClick={onFollow}
                            text="Follow"
                            variant="contained"
                            size="small"
                        />
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );

    return data ? (
        <CustomDashboardCard>
            <Grid container spacing={1} sx={{ alignItems: "center" }}>
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
                {screenMd && renderActionButtons}
            </Grid>
        </CustomDashboardCard>
    ) : (
        <CustomDashboardCard>
            <Loader />
        </CustomDashboardCard>
    );
};

export default ViewSearchServPro;
