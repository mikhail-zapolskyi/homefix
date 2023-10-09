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
import { useMediaQuery } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import EditorView from "../editors/EditorView";
import StarIcon from "@mui/icons-material/Star";
import useContactStatus from "@/hooks/useContactStatus";

interface Props {
    data?: Record<string, any>;
    activeUserId?: string | false | null | undefined;
    onView?: () => void;
    onContactRequest?: () => void;
}

const SearchedProfileCard: React.FC<Props> = ({
    data,
    activeUserId,
    onView,
    onContactRequest,
}) => {
    const theme = useTheme();
    const screenMd = useMediaQuery(theme.breakpoints.up("md"));
    const h: Record<string, any> = {};
    const contactStatus = useContactStatus({ activeUserId, data });

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
            <Stack
                spacing={2}
                divider={<Divider orientation="horizontal" flexItem />}
            >
                <EditorView content={data.introduction.slice(0, 100)} />
                <Stack
                    spacing={1}
                    direction={{ xs: "column", sm: "row", lg: "column" }}
                >
                    <CustomButton
                        onClick={onView}
                        text="Profile"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <CustomButton
                        onClick={onContactRequest}
                        text={
                            contactStatus.inContact
                                ? "Connected"
                                : contactStatus.inContactRequest
                                ? "Request Sent"
                                : "Send Request"
                        }
                        variant="contained"
                        size="small"
                        fullWidth
                        disabled={
                            contactStatus.inContact ||
                            contactStatus.inContactRequest
                                ? true
                                : false
                        }
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
                <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
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
                    <Stack spacing={1}>
                        <CustomButton
                            onClick={onView}
                            text="Profile"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                        <CustomButton
                            onClick={onContactRequest}
                            text={
                                contactStatus.inContact
                                    ? "Connected"
                                    : contactStatus.inContactRequest
                                    ? "Request Sent"
                                    : "Send Request"
                            }
                            variant="contained"
                            size="small"
                            fullWidth
                            disabled={
                                contactStatus.inContact ||
                                contactStatus.inContactRequest
                                    ? true
                                    : false
                            }
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

export default SearchedProfileCard;
