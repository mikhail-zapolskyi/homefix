"use client";

import { CircularProgress } from "@mui/material";
import { ServiceProfile } from "@prisma/client";
import axios from "axios";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const initState: ServiceProfile[] = [];

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(initState);
  const [isLoading, setisLoading] = useState(false);
  const [category, setCategory] = useState("");

  const onSearch = async () => {
    setisLoading(true);
    try {
      const response = await axios.get("/api/service", {
        params: { [category]: searchQuery },
      });

      const { data } = response;
      setResult(data);

      setisLoading(false);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
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
      <div>
        <div>
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
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <input
          type="text"
          placeholder="What's on your mind?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={onSearch}>Find a pro</button>
      </div>
      <div>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          result.map((item) => (
            <div key={item.id}>
              <h1>{item.name}</h1>
              <p>{item.city}</p>
              <p>{item.rating}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default SearchBar;
