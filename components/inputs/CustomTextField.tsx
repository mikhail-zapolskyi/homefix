import styled from "@emotion/styled";
import { Box, FormControl, TextField } from "@mui/material";

import React from "react";

interface TextFieldProps {
    type?: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(TextField)(() => ({
    ".MuiSelect-select": {
        padding: ".4rem",
    },
}));

export const CustomTextField: React.FC<TextFieldProps> = ({
    name,
    placeholder,
    onChange,
    value,
    type = "text",
}) => {
    return (
        <Box
            sx={{
                width: "100%",
                "& fieldset": {
                    borderRadius: "1rem",
                },
            }}
        >
            <FormControl
                fullWidth
                sx={{
                    padding: "0",
                }}
            >
                <StyledTextField
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </FormControl>
        </Box>
    );
};

export default CustomTextField;
