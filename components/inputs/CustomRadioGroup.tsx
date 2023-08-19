"use client";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
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
            <FormLabel id="demo-controlled-radio-buttons-group">
                {title}
            </FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value.toUpperCase()}
                onChange={handleChange}
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
            <CustomButton text="Submit" type="submit" />
        </FormControl>
    );
};

export default CustomRadioGroup;
