import React, { useState } from "react";
import { Box } from "@mui/system";
import { CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../services/TMDB";
import { FeaturedMovie, MovieList, Pagination } from "..";

const Movies = () => {
    const dispatch = useDispatch()
    // const [page, setPage] = useState(1);
    const lg = useMediaQuery((theme) => theme.breakpoints.only("lg"));
    const { genreIdOrCategoryName, searchQuery, page } = useSelector(
        (state) => state.currentGenreOrCategory
    );
    const numberOfMovies = lg ? 17 : 19;
    const { data, error, isFetching } = useGetMoviesQuery({
        genreIdOrCategoryName,
        page,
        searchQuery,
    });

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center" alignItems='center' marginTop='100px'>
                <CircularProgress size="8rem" />
            </Box>
        );
    }
    
    if (!data?.results.length) {
        return (
            <Box display="flex" alignItems="center" mt="20px">
                <Typography variant="h4">
                    No movies that match that name.
                    <br />
                    Please search for something else.
                </Typography>
            </Box>
        );
    }

    if (error) return "Error has occured";

    return (
        <div>
            <FeaturedMovie movie={data?.results[0]} />
            <MovieList
                movies={data}
                numberOfMovies={numberOfMovies}
                excludeFirst
            />
            <Pagination
                currentPage={page}
                // setPage={setPage}
                totalPages={data?.totalPages}
            />
        </div>
    );
};

export default Movies;
