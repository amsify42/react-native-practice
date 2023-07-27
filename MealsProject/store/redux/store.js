import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favorites";

export const store = configureStore({
    reducer: {
        favoriteMeals: favoritesSlice
    }
});