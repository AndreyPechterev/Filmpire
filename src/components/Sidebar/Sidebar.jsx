import React, { useEffect } from "react";
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemIcon,
    Box,
    CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import blue from "../../assets/logo/blue.png";
import red from "../../assets/logo/red.png";
import { useTheme } from "@mui/styles";
import useStyles from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genresIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import {
    searchMovie,
    selectGenreOrCategory,
    selectPage,
} from "../../features/currentGenreOrCategory";

const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ setMobileOpen }) => {
    const { genreIdOrCategoryName } = useSelector(
        (state) => state.currentGenreOrCategory
    );
    const theme = useTheme();
    const classes = useStyles();
    const { data, error, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName]);

    return (
        <>
            <Link
                to="/"
                className={classes.imageLink}
                onClick={() => {
                    dispatch(searchMovie(""));
                    dispatch(selectPage(1));
                }}
            >
                <img
                    src={theme.palette.mode === "light" ? blue : red}
                    alt="Filmpire logo"
                    className={classes.image}
                />
            </Link>
            <Divider />
            <List>
                <ListSubheader>Categories</ListSubheader>
                {categories.map(({ label, value }) => (
                    <Link key={value} className={classes.links} to={"/"}>
                        <ListItem
                            onClick={() => {
                                dispatch(selectGenreOrCategory(value));
                                dispatch(searchMovie(""));
                                dispatch(selectPage(1));
                            }}
                        >
                            <ListItemIcon>
                                <img
                                    src={genresIcons[label.toLowerCase()]}
                                    className={classes.genreImage}
                                    height={30}
                                />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : (
                    data?.genres.map(({ name, id }) => (
                        <Link key={name} className={classes.links} to={"/"}>
                            <ListItem
                                onClick={() => {
                                    dispatch(selectGenreOrCategory(id));
                                    dispatch(searchMovie(""));
                                    dispatch(selectPage(1));
                                }}
                                button
                            >
                                <ListItemIcon>
                                    <img
                                        src={genresIcons[name.toLowerCase()]}
                                        className={classes.genreImage}
                                        height={30}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Link>
                    ))
                )}
            </List>
        </>
    );
};

export default Sidebar;
