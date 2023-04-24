import React from "react";
import { Typography, Button } from "@mui/material";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { selectPage } from "../../features/currentGenreOrCategory";

const Pagination = ({ currentPage, totalPages }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    if (totalPages === 0) return null;

    const handlePrev = () => {
        if (currentPage !== 1) {
            dispatch(selectPage(currentPage - 1));
            // setPage((prevPage) => prevPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage !== totalPages) {
            dispatch(selectPage(currentPage + 1));

            // setPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div className={classes.container}>
            <Button
                onClick={handlePrev}
                className={classes.button}
                variant="contained"
                color="primary"
                type="button"
            >
                Prev
            </Button>
            <Typography variant="h4" className={classes.pageNumber}>
                {currentPage}
            </Typography>
            <Button
                onClick={handleNext}
                className={classes.button}
                variant="contained"
                color="primary"
                type="button"
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;
