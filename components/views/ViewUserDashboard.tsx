import { StatslUserType } from "@/app/types";
import { Grid, Stack } from "@mui/material";
import React from "react";
import WelcomeCard from "../cards/WelcomeCard";
import StatsCard from "../cards/StatsCard";
import { useSession } from "next-auth/react";
import {
    CustomDashboardCard,
    SectionWithTitle,
    StatsProgress,
} from "@/components";

interface Props {
    data: StatslUserType;
}
const ViewUserDashboard: React.FC<Props> = ({ data }) => {
    const { data: session } = useSession();
    console.log(data);
    return (
        <Grid container justifyContent="center">
            <Grid
                container
                item
                xs={12}
                justifyContent={{ xl: "center" }}
                spacing={2}
            >
                <Grid container item xs={12}>
                    <Grid container item xs={12} md={8}>
                        <WelcomeCard name={session?.user.name} />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={4}>
                        <StatsCard
                            title="Total Projects"
                            number1={data.projectsStats.yearToDate}
                            number2={data.totalProjects}
                            barColor="primary"
                            data={data.projectsStats.overYear}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatsCard
                            title="Total Contacts"
                            number1={data.contactsStats.yearToDate}
                            number2={data.totalContacts}
                            barColor="secondary"
                            data={data.contactsStats.overYear}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatsCard
                            title="Total Reviews"
                            number1={data.reviewsStats.yearToDate}
                            number2={data.totalReviews}
                            barColor="info"
                            data={data.reviewsStats.overYear}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <Grid container item xs={12} md={8}>
                        <CustomDashboardCard>
                            <SectionWithTitle title="Projects Overview">
                                <StatsProgress
                                    title={`Projects Initiated`}
                                    progress={data.initiated}
                                    color="info"
                                />
                                <StatsProgress
                                    title={`Projects Aproved`}
                                    progress={data.approved}
                                    color="fair"
                                />
                                <StatsProgress
                                    title={`Projects In Progress`}
                                    progress={data.in_progress}
                                    color="warning"
                                />
                                <StatsProgress
                                    title={`Projects Completed`}
                                    progress={data.completed}
                                    color="good"
                                />
                                <StatsProgress
                                    title={`Projects Accepted`}
                                    progress={data.accepted}
                                    color="exellent"
                                />
                                <StatsProgress
                                    title={`Projects Reviewd`}
                                    progress={data.reviewed}
                                    color="secondary"
                                />
                            </SectionWithTitle>
                        </CustomDashboardCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewUserDashboard;
