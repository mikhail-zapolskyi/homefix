import styled from "@emotion/styled";
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface SelectFieldProps {
    id: string;
    name: string;
    emptyValue?: string;
    value: string | number;
    onChange: (e: SelectChangeEvent<string | unknown | number>) => void;
    array?: string[] | number[] | undefined;
}

const StyledSelect = styled(Select)(() => ({
    ".MuiSelect-select": {
        padding: ".4rem",
    },
}));

export const SelectField: React.FC<SelectFieldProps> = ({
    emptyValue,
    id,
    value,
    onChange,
    array,
    name,
}) => {
    const renderOptions = (options: string[] | number[] | undefined) => {
        if (options === undefined) {
            return;
        } else {
            return options.map((i) => (
                <MenuItem key={i} value={i}>
                    {i}
                </MenuItem>
            ));
        }
    };
    return (
        <Box
            sx={{
                width: "100%",
                "& fieldset": { border: "none" },
            }}
        >
            <FormControl
                fullWidth
                sx={{
                    padding: "0",
                }}
            >
                <StyledSelect
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>{emptyValue}</em>
                    </MenuItem>
                    {!undefined && renderOptions(array)}
                </StyledSelect>
            </FormControl>
        </Box>
    );
};

export default SelectField;
