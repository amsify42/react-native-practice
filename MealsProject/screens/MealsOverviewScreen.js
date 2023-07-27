import { StyleSheet, View, Text, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import Meal from "../components/Meal";
import { useEffect, useLayoutEffect } from "react";
import MealsList from "../components/MealsList";

function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;

  const displayMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category) => category.id === categoryId).title;
    navigation.setOptions({
      title: categoryTitle
    });
  }, [categoryId, navigation]);

  return (
    <View>
      <MealsList meals={displayMeals}/>
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    passing: 16,
  },
});
