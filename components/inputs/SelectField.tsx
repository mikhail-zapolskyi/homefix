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
    emptyValue?: string;
    value: string | number;
    onChange: (e: SelectChangeEvent<string | unknown | number>) => void;
    array?: string[] | number[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
    emptyValue,
    id,
    value,
    onChange,
    array,
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
        <Box sx={{ width: "100%", "& fieldset": { border: "none" } }}>
            <FormControl fullWidth>
                <Select id={id} value={value} onChange={onChange} displayEmpty>
                    <MenuItem value="">
                        <em>{emptyValue}</em>
                    </MenuItem>
                    {renderOptions(array)}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectField;
