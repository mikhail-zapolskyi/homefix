"use client";

import { Box, CircularProgress, TextField, styled } from "@mui/material";
import { ServiceProfile } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { PrimaryButton } from "..";
import { useRouter } from "next/navigation";

const initState: ServiceProfile[] = [];

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [result, setResult] = useState(initState);
    const [isLoading, setisLoading] = useState(false);
    const [category, setCategory] = useState("");
    const push = useRouter();

    const onSearch = async () => {
        setisLoading(true);
        console.log({ params: { [category]: searchQuery } });
    };

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    const Categories = [
        { value: "name", label: "Name" },
        { value: "city", label: "City" },
        { value: "country", label: "Country" },
        { value: "postalCode", label: "Postal Code" },
        { value: "address", label: "Address" },
        { value: "phone", label: "Phone" },
        { value: "rating", label: "Rating" },
    ];

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl sx={{ m: 1, minWidth: 110 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                        Category
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={category}
                        onChange={handleChange}
                        autoWidth
                        label="Category"
                    >
                        {Categories.map((category) => (
                            <MenuItem
                                key={category.value}
                                value={category.value}
                            >
                                {category.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    type="text"
                    placeholder="What's on your mind?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <PrimaryButton text="Search" onClick={onSearch} />
            </Box>
        </>
    );
};

export default SearchBar;
