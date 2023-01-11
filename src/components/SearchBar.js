import { IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) navigate(`/search/${searchTerm}`);
    setsearchTerm("");
  };

  return (
    <Paper
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
      onSubmit={handleSubmit}
      component="form"
    >
      <input
        onChange={(e) => {
          setsearchTerm(e.target.value);
        }}
        value={searchTerm}
        className="search-bar"
        placeholder="Search..."
      />
      <IconButton type="submit" sx={{ p: "10px", color: "red" }}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
