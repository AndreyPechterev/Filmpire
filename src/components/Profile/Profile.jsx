import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCard } from "..";

const Profile = () => {
    const { user } = useSelector(userSelector);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };
    const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery(
        {
            listName: "favorite/movies",
            accountId: user.id,
            sessionId: localStorage.getItem("session_id"),
            page: 1,
        }
    );
    const { data: watchlistMovies, refetch: refetchWatchlist } =
        useGetListQuery({
            listName: "watchlist/movies",
            accountId: user.id,
            sessionId: localStorage.getItem("session_id"),
            page: 1,
        });

        useEffect(() => {
            refetchFavorites()
            refetchWatchlist()
        }, [])
    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">My profile</Typography>
                <Button color="inherit" onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>
            {!favoriteMovies?.results?.length &&
            !watchlistMovies?.results?.length ? (
                <Typography variant="h5">
                    Add favorites or watchlist some movies to see them here!
                </Typography>
            ) : (
                <Box>
                    <RatedCard title="Favorite Movies" data={favoriteMovies} />
                    <RatedCard
                        title="Watchlist Movies"
                        data={watchlistMovies}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Profile;
