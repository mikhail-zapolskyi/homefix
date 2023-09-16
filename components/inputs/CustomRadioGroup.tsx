"use client";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent } from "react";
import CustomButton from "../button/CustomButton";

interface Props {
    title: string;
    values: string[];
    value: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const CustomRadioGroup = ({
    title,
    values,
    value,
    handleChange,
    handleSubmit,
}: Props) => {
    return (
        <FormControl component="form" onSubmit={handleSubmit}>
            <Grid
                container
                sx={{ justifyContent: "center", alignItems: "center" }}
                spacing={2}
            >
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h4">{title}</Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value.toUpperCase()}
                        onChange={handleChange}
                        row
                    >
                        {values.map((val) => (
                            <FormControlLabel
                                key={val}
                                value={val.toUpperCase()}
                                control={<Radio />}
                                label={val.toUpperCase()}
                            />
                        ))}
                    </RadioGroup>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sx={{
                        maxWidth: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CustomButton text="Submit" type="submit" fullWidth />
                </Grid>
            </Grid>
        </FormControl>
    );
};

export default CustomRadioGroup;
