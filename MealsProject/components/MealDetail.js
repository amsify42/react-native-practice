import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import { useContext, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../store/context/favorites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/slices/favorites";

function MealDetail({ route, navigation }) {
  const mealId = route.params.mealId;

  /**
   * Redux
   */
  const mealIds     = useSelector((state) => state.favoriteMeals.ids);
  const dispatch    = useDispatch();
  const isFavorite  = mealIds.includes(mealId);

  /**
   * Context
   */
  //const favoritesMealsContext = useContext(FavoritesContext);
  //const isFavorite = favoritesMealsContext.ids.includes(mealId);

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  function headerButtonPressHandler() {
    if(isFavorite) {
      dispatch(removeFavorite({id: mealId}));
      //favoritesMealsContext.removeFavorite(mealId);
    } else {
      dispatch(addFavorite({id: mealId}));
      //favoritesMealsContext.addFavorite(mealId);
    }
    
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons name={isFavorite? 'star': 'star-outline'} size={22} color="white" onPress={headerButtonPressHandler}/>
        )
      }
    });
  }, [navigation, headerButtonPressHandler])

  return (
    <ScrollView>
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <View style={styles.textItems}>
                <Text style={styles.item}>{selectedMeal.duration}</Text>
                <Text style={styles.item}>{selectedMeal.complexity}</Text>
                <Text style={styles.item}>{selectedMeal.affordability}</Text>
            </View>
            <Text style={[styles.title, styles.subTitle]}>Ingredients</Text>
            <View style={styles.listItems}>
                {selectedMeal.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.listItem}>{index+1}. {ingredient}</Text>
                ))}
            </View>
            <Text style={[styles.title, styles.subTitle]}>Steps</Text>
            <View style={styles.listItems}>
                {selectedMeal.steps.map((step, index) => (
                <Text key={index} style={styles.listItem}>{index+1}. {step}</Text>
                ))}
            </View>
        </View>
    </ScrollView>
  );
}

export default MealDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 20,
    borderBottomColor:'white',
    borderBottomWidth: 1,
    padding: 10
  },
  textItems: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  item: {
    color: "white",
    fontSize: 15,
    fontWeight: 'bold'
  },
  listItems: {
    width: '90%',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 9
  },
  listItem: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    paddingVertical: 5
  }
});
