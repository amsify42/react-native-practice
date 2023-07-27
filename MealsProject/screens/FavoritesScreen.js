import MealsList from "../components/MealsList";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";
import { View } from "react-native";
import { useSelector } from "react-redux";

function FavoritesScreen() {
    /**
     * Redux
     */
    const mealIds = useSelector((state) => state.favoriteMeals.ids);
    const meals = MEALS.filter((meal) => mealIds.includes(meal.id));
    /**
     * Context
     */
    // const favoritesMealsContext = useContext(FavoritesContext);
    // const meals = MEALS.filter((meal) => favoritesMealsContext.ids.includes(meal.id));

    let favorites = (
        <View style={styles.container}>
            <Text style={styles.text}>You have no favorites yet</Text>
        </View>
    );
    if(meals.length > 0) {
        favorites = <MealsList meals={meals}/>;
    }

    return  <>
        {favorites}
    </>;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})