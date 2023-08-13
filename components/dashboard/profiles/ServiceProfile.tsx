import { CustomButton } from "@/components";
import { Grid } from "@mui/material";
import React from "react";

const ServiceProfile = ({}) => {
    return (
        <Grid container>
            <Grid item xs={3}>
                Date
                <CustomButton text="CLICK" />
            </Grid>
        </Grid>
    );
};

export default ServiceProfile;
