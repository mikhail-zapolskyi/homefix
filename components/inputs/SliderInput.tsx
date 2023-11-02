import { Alert, Slider, Typography } from "@mui/material";
import React, { FC } from "react";
import _ from "lodash";

type Props = {
    title: string;
    content: string | null | undefined;
    value: number | string | null;
    name: string;
    errorContent?: string;
    onChange: (e: Event, value: number | number[]) => void;
};

const SliderInput: FC<Props> = ({ ...props }) => {
    const numericValue = typeof props.value === "number" ? props.value : 25;
    return (
        <>
            <Typography variant="body1">
                <strong>{props.title}: </strong>
                {props.content}
            </Typography>
            <Slider
                disabled={false}
                marks
                max={100}
                min={0}
                valueLabelDisplay="auto"
                name={props.name}
                defaultValue={0}
                value={numericValue}
                onChange={props.onChange}
            />
            {props.errorContent && (
                <Alert severity="warning">{props.errorContent}</Alert>
            )}
        </>
    );
};

export default SliderInput;
