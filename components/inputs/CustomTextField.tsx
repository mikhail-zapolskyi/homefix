"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

import React from "react";

interface TextFieldProps {
    type?: string;
    name: string;
    placeholder?: string;
    value?: string | number;
    error?: boolean | undefined;
    errorText?: string | null;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledTextField = styled(OutlinedInput)(({ theme }) => ({
    ".MuiSelect-select": {
        padding: ".4rem",
    },
    ".MuiInputBase-input": {
        backgroundColor: `${theme.palette.background.paper} !important`,
        "&:-webkit-autofill": {
            borderRadius: "0.8rem",
        },
        "&:-internal-autofill-selected": {
            backgroundColor: `${theme.palette.background.paper} !important`,
            transition: "background-color 600000s 0s",
        },
    },
}));

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    backgroundColor: `${theme.palette.background.paper}`,
    padding: "0 .3rem",
}));

const StyledAlert = styled(Alert)(({ theme }) => ({
    border: "none",
    background: "none",
}));

export const CustomTextField: React.FC<TextFieldProps> = ({
    name,
    onChange,
    value,
    error,
    errorText,
    placeholder,
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
                <StyledInputLabel>
                    {(name.charAt(0).toUpperCase() + name.slice(1)).replace(
                        "_",
                        " "
                    )}
                </StyledInputLabel>
                <StyledTextField
                    id={name}
                    name={name}
                    type={showPassword ? "text" : type}
                    value={value}
                    error={!!errorText}
                    onChange={onChange}
                    placeholder={placeholder}
                    inputProps={{ autoComplete: "off" }}
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
                {error && errorText && (
                    <StyledAlert severity="error">{errorText}</StyledAlert>
                )}
            </FormControl>
        </Box>
    );
};

export default CustomTextField;
