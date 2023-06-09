import React from "react";
import { CssBaseline, useTheme } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Actors, MovieInformation, Movies, Navbar, Profile } from "./";
import useStyles from "./styles";

const App = () => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Routes>
                    <Route  path="/" element={<Movies />} />
                    <Route  path="approved" element={<Movies />} />
                    <Route path="/movie/:id" element={<MovieInformation />} />
                    <Route  path="/actors/:id" element={<Actors />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
