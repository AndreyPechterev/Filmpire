import React, { useRef, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { searchMovie, selectPage } from "../../features/currentGenreOrCategory";
import { useLocation } from "react-router-dom";

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            dispatch(searchMovie(query));
            dispatch(selectPage(1))
            setQuery("");
            event.target.blur();
        }
    };

    if (location.pathname !== "/") return null;

    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Search;
