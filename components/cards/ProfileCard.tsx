import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useSession } from "next-auth/react";
import { Avatar, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const ProfileCard = async () => {
    const { data: session } = useSession();

    const getUser = async () => {
        if (!session) return;
        const res = await fetch(`api/users/${session?.user.id}`, {
            method: "GET",
        });

        return res.json();
    };

    const user = await getUser();

    return (
        <Card sx={{ minWidth: 275, margin: "2rem" }}>
            <CardContent>
                <Grid container spacing={2} marginBottom={2}>
                    <Grid xs={12} sm={6}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid>
                                <Avatar
                                    src={`${user?.image}`}
                                    alt={`${user?.name}`}
                                    sx={{ width: 90, height: 90 }}
                                />
                            </Grid>
                            <Grid>
                                <Typography variant="body1">
                                    {user?.name}
                                </Typography>
                                <Button size="small">Upload Photo</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Grid container justifyContent="flex-end">
                            <Button size="small">Message</Button>
                            <Button size="small">Save</Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={2} sx={{ maxWidth: 600 }}>
                    <Grid xs={12} sm={6}>
                        <Grid container direction="column" rowGap={2}>
                            <TextField
                                fullWidth
                                type="tel"
                                placeholder={`${user?.phone}`}
                            />
                            <TextField
                                fullWidth
                                type="email"
                                placeholder={`${user?.email}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Grid container direction="column" rowGap={2}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder={`${user?.address}`}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                placeholder={`${user?.city}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <Grid container direction="column" rowGap={2}>
                            <TextField
                                fullWidth
                                type="text"
                                placeholder={`${user?.postalCode}`}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                placeholder={`${user?.country}`}
                            />
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="•••••••••••"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
