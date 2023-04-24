import React, { useEffect, useState } from "react";
import {
    Modal,
    Typography,
    Button,
    ButtonGroup,
    Grid,
    Box,
    CircularProgress,
    useMediaQuery,
    Rating,
} from "@mui/material";
import {
    Movie as MovieIcon,
    Theaters,
    Language,
    PlusOne,
    Favorite,
    FavoriteBorderOutlined,
    Remove,
    ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    useGetMovieQuery,
    useGetRecommendationsQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import genresIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { MovieList } from "..";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";

const MovieInformation = () => {
    const classes = useStyles();
    const { id } = useParams();
    const { user } = useSelector(userSelector);
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: favoriteMovies } = useGetListQuery({
        listName: "favorite/movies",
        accountId: user.id,
        sessionId: localStorage.getItem("session_id"),
        page: 1,
    });
    const { data: watchlistMovies } = useGetListQuery({
        listName: "watchlist/movies",
        accountId: user.id,
        sessionId: localStorage.getItem("session_id"),
        page: 1,
    });
    const { data: recommendations, isFetching: isRecommenFetching } =
        useGetRecommendationsQuery({ list: "/recommendations", movie_id: id });
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [isMovieFavorited, setIsMovieFavorited] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

    useEffect(() => {
        setIsMovieFavorited(
            !!favoriteMovies?.results?.find((movie) => movie.id === data?.id)
        );
    }, [favoriteMovies, data]);
    useEffect(() => {
        setIsMovieWatchlisted(
            !!watchlistMovies?.results?.find((movie) => movie.id === data?.id)
        );
    }, [watchlistMovies, data]);
    const addToFavorites = async () => {
        await axios.post(
            `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
                process.env.REACT_APP_TMDB_KEY
            }&session_id=${localStorage.getItem("session_id")}`,
            {
                media_type: "movie",
                media_id: id,
                favorite: !isMovieFavorited,
            }
        );
        setIsMovieFavorited((prev) => !prev);
    };

    const addToWatchlist = async () => {
        await axios.post(
            `https://api.themoviedb.org/3/account/${
                user.id
            }/watchlist?api_key=${
                process.env.REACT_APP_TMDB_KEY
            }&session_id=${localStorage.getItem("session_id")}`,
            {
                media_type: "movie",
                media_id: id,
                watchlist: !isMovieWatchlisted,
            }
        );
        setIsMovieWatchlisted((prev) => !prev);
    };

    if (isFetching) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="100px"
            >
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box dispaly="flex" justifyContent="center" alignItems="center">
                <Link to="/">Something went wrong</Link>
            </Box>
        );
    }

    return (
        <Grid container className={classes.containerSpaceAround}>
            <Grid
                item
                sm={12}
                lg={4}
                style={{ display: "flex", marginBottom: "30px" }}
            >
                <img
                    className={classes.poster}
                    src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
                    alt={data?.title}
                />
            </Grid>
            <Grid item container direction="column" lg={7}>
                <Typography variant="h3" align="center" gutterBottom>
                    {data?.title}({data?.release_date.split("-")[0]})
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    {data?.tagline}
                </Typography>
                <Grid item className={classes.containerSpaceAround}>
                    <Box dispaly="flex" align="center">
                        <Rating readOnly value={data?.vote_average / 2} />
                        <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{ marginLeft: "10px" }}
                        >
                            {data?.vote_average.toFixed(1)} / 10
                        </Typography>
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                        {data?.runtime}min | Language:
                        {data?.spoken_languages[0].name}
                    </Typography>
                </Grid>
                <Grid item className={classes.genresContainer}>
                    {data?.genres?.map((genre, i) => (
                        <Link
                            key={genre.name}
                            className={classes.links}
                            to="/"
                            onClick={() =>
                                dispatch(selectGenreOrCategory(genre.id))
                            }
                        >
                            <img
                                src={genresIcons[genre.name.toLowerCase()]}
                                className={classes.genreImages}
                                height={30}
                            />
                            <Typography color="textPrimary" variant="subtitle1">
                                {genre?.name}
                            </Typography>
                        </Link>
                    ))}
                </Grid>
                <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginTop: "10px" }}
                >
                    Overview
                </Typography>
                <Typography style={{ marginBottom: "2rem" }}>
                    {data?.overview}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Top Cast
                </Typography>
                <Grid item container spacing={2}>
                    {data &&
                        data.credits?.cast
                            ?.map(
                                (character, i) =>
                                    character.profile_path && (
                                        <Grid
                                            key={i}
                                            item
                                            xs={4}
                                            md={2}
                                            component={Link}
                                            to={`/actors/${character.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <img
                                                className={classes.castImage}
                                                src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                                                alt={character.name}
                                            />
                                            <Typography color="textPrimary">
                                                {character.name}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {character.character.split("/")}
                                            </Typography>
                                        </Grid>
                                    )
                            )
                            .slice(0, 6)}
                </Grid>
                <Grid item container style={{ marginTop: "2rem" }}>
                    <div className={classes.buttonsContainer}>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            className={classes.buttonsContainer}
                        >
                            <ButtonGroup size="small" variant="outlined">
                                <Button
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={data?.homepage}
                                    endIcon={<Language />}
                                >
                                    Website
                                </Button>
                                <Button
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                    endIcon={<MovieIcon />}
                                >
                                    IMDB
                                </Button>
                                <Button
                                    href={"#"}
                                    onClick={() => setOpen(true)}
                                    endIcon={<Theaters />}
                                >
                                    Trailer
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            className={classes.buttonsContainer}
                        >
                            <ButtonGroup size="medium" variant="outlined">
                                {!!Object.keys(user).length && (
                                    <Button
                                        onClick={addToFavorites}
                                        endIcon={
                                            isMovieFavorited ? (
                                                <FavoriteBorderOutlined />
                                            ) : (
                                                <Favorite />
                                            )
                                        }
                                    >
                                        {isMovieFavorited
                                            ? "Unfavorite"
                                            : "Favorite"}
                                    </Button>
                                )}
                                {!!Object.keys(user).length && (
                                    <Button
                                        onClick={addToWatchlist}
                                        endIcon={
                                            isMovieWatchlisted ? (
                                                <Remove />
                                            ) : (
                                                <PlusOne />
                                            )
                                        }
                                    >
                                        Watchlist
                                    </Button>
                                )}
                                <Button
                                    sx={{ borderColor: "primary.main" }}
                                    endIcon={<ArrowBack />}
                                >
                                    <Typography
                                        style={{ textDecoration: "none" }}
                                        component={Link}
                                        to="/"
                                        color="inherit"
                                        variant="subtitle2"
                                    >
                                        Back
                                    </Typography>
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            {recommendations?.results?.length > 0 && (
                <Box marginTop="5rem" width="100%">
                    <Typography variant="h3" gutterBottom align="center">
                        You might also like
                    </Typography>
                    {recommendations ? (
                        <MovieList
                            movies={recommendations}
                            numberOfMovies={12}
                        />
                    ) : (
                        <Box>Sorry, nothing was found.</Box>
                    )}
                </Box>
            )}
            <Modal
                closeAfterTransition
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
            >
                {data?.videos?.results?.length > 0 && (
                    <iframe
                        autoPlay
                        className={classes.video}
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
                        allow="autoplay"
                    />
                )}
            </Modal>
        </Grid>
    );
};

export default MovieInformation;
