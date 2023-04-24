import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
    name: "genreOrCategory",
    initialState: {
        genreIdOrCategoryName: "",
        page: 1,
        searchQuery: "",
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload;
        },
        selectPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { selectGenreOrCategory, searchMovie, selectPage } =
    genreOrCategory.actions;

export default genreOrCategory.reducer;
