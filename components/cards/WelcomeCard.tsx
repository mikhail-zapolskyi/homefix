import { Grid, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React, { FC, ReactNode } from "react";
import CustomButton from "../button/CustomButton";
import { Welcome } from "@/components";

const StyledGrid = styled(Grid)(({ theme, ...props }) => ({
    borderRadius: "1rem",
    backgroundColor: `${theme.palette.primary.lighter}`,
    wrap: "wrap",
}));

type Props = {
    name: string | null | undefined;
};

const WelcomeCard: FC<Props> = ({ name }) => {
    return (
        <StyledGrid container item xs={12}>
            <Grid item xs={12} sm={6} p={{ xs: "1.8rem", md: "2.6rem" }}>
                <Stack justifyContent="center" spacing={3}>
                    <Stack>
                        <Typography variant="h1" color="secondary.dark">
                            Welcome back,
                        </Typography>
                        <Typography variant="h2" color="secondary.dark">
                            {name}
                        </Typography>
                    </Stack>
                    <Typography variant="body1">
                        If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything.
                    </Typography>
                    <CustomButton
                        text="Create Project"
                        onClick={() => alert("Mika Add end point")}
                        padsize="none"
                        variant="contained"
                        width="10rem"
                    />
                </Stack>
            </Grid>
            <Grid
                item
                sm={6}
                p={{ xs: "1.3rem", md: "2rem" }}
                sx={{ display: { xs: "none", sm: "flex" } }}
                justifyContent="end"
            >
                <Welcome width="15rem" height="15rem" />
            </Grid>
        </StyledGrid>
    );
};

export default WelcomeCard;
