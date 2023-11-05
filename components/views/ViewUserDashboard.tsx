import { FulllUserType } from "@/app/types";
import { Grid } from "@mui/material";
import React from "react";
import WelcomeCard from "../cards/WelcomeCard";

interface Props {
    data: FulllUserType;
}

const ViewUserDashboard: React.FC<Props> = ({ data }) => {
    return (
        <Grid container spacing={1}>
            <Grid container item xs={12}>
                <WelcomeCard data={data} />
            </Grid>
        </Grid>
    );
};

export default ViewUserDashboard;
