import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SelectProps,
    styled,
} from "@mui/material";
import React from "react";

interface SelectFieldProps {
    id: string;
    name: string;
    emptyValue?: string;
    value: string | number | undefined | null;
    onChange: (e: SelectChangeEvent<unknown>) => void;
    array?: string[] | number[] | undefined;
    fieldState?: boolean;
    border?: true | false;
    label?: true | false;
    padSize?: "small" | "default";
}

interface StyledSelectProps extends SelectProps {
    padsize?: "small" | "default";
}

const StyledSelect = styled(Select)<StyledSelectProps>(
    ({ padsize = "small" }) => ({
        borderRadius: "1rem",
        ...(padsize === "small" && {
            ".MuiSelect-select": {
                padding: ".4rem",
            },
        }),
    })
);

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    backgroundColor: `${theme.palette.background.paper}`,
    padding: "0 .3rem",
}));

export const SelectField: React.FC<SelectFieldProps> = ({
    emptyValue,
    id,
    value,
    onChange,
    array,
    name,
    fieldState = true,
    label = false,
    border = false,
    padSize,
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
                "& fieldset": {
                    border: `${border ? "1px solid lightgrray" : "none"}`,
                },
            }}
        >
            <FormControl
                fullWidth
                sx={{
                    padding: "0",
                }}
            >
                {label && (
                    <StyledInputLabel>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </StyledInputLabel>
                )}
                <StyledSelect
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    displayEmpty
                    disabled={fieldState}
                    padsize={padSize}
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
