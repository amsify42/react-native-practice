import { FlatList } from "react-native";
import Meal from "./Meal";

function MealsList({meals}) {

    function renderMeal(mealItem) {
        return (
          <Meal
            id={mealItem.item.id}
            title={mealItem.item.title}
            imageUrl={mealItem.item.imageUrl}
            duration={mealItem.item.duration}
            complexity={mealItem.item.complexity}
            affordability={mealItem.item.affordability}
          />
        );
      }

    return (
        <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={renderMeal}
        />
    );
}

export default MealsList;