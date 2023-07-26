import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface Props {
    name: string;
    values: string[];
}

const DropDown = ({ name, values }: Props) => {
    const [value, setValue] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, pb: 2 }}>
            <InputLabel id="standard-label">{name}</InputLabel>
            <Select
                labelId="standard-label"
                id="standard"
                value={value}
                onChange={handleChange}
                label={name}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {values.map((value) => (
                    <MenuItem value={value} key={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDown;
