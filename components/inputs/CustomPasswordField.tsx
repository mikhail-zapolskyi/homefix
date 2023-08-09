import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from "@mui/material";
import { useState } from "react";

const StyledTextField = styled(TextField)(() => ({
    ".MuiSelect-select": {
        padding: ".4rem",
    },
}));

interface Props {
    name: string;
    placeholder?: string;
}

const CustomPasswordField = ({ name, placeholder }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

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
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    InputProps={{
                        endAdornment: (
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
                        ),
                    }}
                />
            </FormControl>
        </Box>
    );
};

export default CustomPasswordField;
