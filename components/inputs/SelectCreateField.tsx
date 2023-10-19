"use client";
import { styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createFilterOptions } from "@mui/material/Autocomplete";
import React from "react";

interface CategoryOptionType {
    inputValue?: string;
    title: string;
}

interface SelectCreateFieldProps {
    array: CategoryOptionType[];
    fullWidth?: true | false;
    onInputChange: (
        e: React.SyntheticEvent,
        value: string,
        reason: string
    ) => void;
    label?: string;
}

const StyledTextField = styled(TextField)(({ ...params }) => ({
    "& fieldset": {
        borderRadius: "0.7rem",
    },
}));

const filter = createFilterOptions<CategoryOptionType>();

const SelectCreateField: React.FC<SelectCreateFieldProps> = ({
    array,
    fullWidth,
    onInputChange,
    label = "Pick Category or Create One",
}) => {
    const [value, setValue] = React.useState<CategoryOptionType | null>(null);

    const handleOnInputChange = (
        e: React.SyntheticEvent,
        value: string,
        reason: string
    ) => {
        onInputChange(e, value, reason);
    };

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                    (option) => inputValue === option.title
                );
                if (inputValue !== "" && !isExisting) {
                    filtered.push({
                        inputValue,
                        title: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="autocomplete"
            options={array}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.title;
            }}
            renderOption={(props, option) => (
                <li {...props} key={option.title}>
                    {option.title}
                </li>
            )}
            freeSolo
            renderInput={(params) => (
                <StyledTextField {...params} label={label} sx={{}} />
            )}
            fullWidth={fullWidth}
            onInputChange={handleOnInputChange}
        />
    );
};

export default SelectCreateField;
