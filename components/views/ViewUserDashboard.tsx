import { StatslUserType } from "@/app/types";
import { Grid } from "@mui/material";
import React from "react";
import WelcomeCard from "../cards/WelcomeCard";
import StatsCard from "../cards/StatsCard";
import { useSession } from "next-auth/react";

interface Props {
    data: StatslUserType;
}
const ViewUserDashboard: React.FC<Props> = ({ data }) => {
    const { data: session } = useSession();

    return (
        <Grid container justifyContent="center">
            <Grid
                container
                item
                xs={12}
                xl={6}
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
            </Grid>
        </Grid>
    );
};

export default ViewUserDashboard;
