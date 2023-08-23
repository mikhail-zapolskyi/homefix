import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";

import React from "react";

interface TextFieldProps {
    type?: string;
    name: string;
    placeholder?: string | number;
    value?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
    ".MuiSelect-select": {
        padding: ".4rem",
    },
    ".MuiInputBase-input": {
        "&:-webkit-autofill": {
            borderRadius: "1rem",
        },
    },
}));

export const CustomTextField: React.FC<TextFieldProps> = ({
    name,
    placeholder,
    onChange,
    value,
    type = "text",
}) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

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
                    type={showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                    autoComplete="new-password"
                    endAdornment={
                        type === "password" && (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }
                />
            </FormControl>
        </Box>
    );
};

export default CustomTextField;
