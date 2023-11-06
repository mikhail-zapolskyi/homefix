import { FulllUserType } from "@/app/types";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import WelcomeCard from "../cards/WelcomeCard";
import StatsCard from "../cards/StatsCard";
import useProjectsStats from "@/hooks/useProjectsStats";
import { Project } from "@prisma/client";

interface Props {
    data: FulllUserType;
}
const ViewUserDashboard: React.FC<Props> = ({ data }) => {
    let projectsStats = useProjectsStats({ data: data.projects });

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12}>
                <WelcomeCard user={data} />
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatsCard
                        title="Total Projects"
                        number1={projectsStats.yearProjectComparison}
                        number2={projectsStats.totalProjects}
                        barColor="primary"
                        data={projectsStats.projectsOverYear}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatsCard
                        title="Total Initiated"
                        number1={12}
                        number2={projectsStats.initiated}
                        barColor="secondary"
                        data={[]}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatsCard
                        title="Total Completed"
                        number1={-3}
                        number2={projectsStats.completed}
                        barColor="info"
                        data={[]}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    <StatsCard
                        title="Total Reviewed"
                        number1={44.3}
                        number2={projectsStats.reviewed}
                        barColor="star"
                        data={[]}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ViewUserDashboard;
