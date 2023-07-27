import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

function FavoritesContextProvider({ children }) {
  const [favoritesMealIds, setFavoritesMealIds] = useState([]);

  function addFavorite(id) {
    setFavoritesMealIds((prevMealIds) => [...prevMealIds, id]);
  }

  function removeFavorite(id) {
    setFavoritesMealIds((prevMealIds) =>
      prevMealIds.filter(
            (mealId) => mealId !== id
        )
    );
  }

  const value = {
    ids: favoritesMealIds,
    addFavorite,
    removeFavorite
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
