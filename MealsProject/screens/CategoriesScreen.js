import { FlatList } from "react-native";
import { View } from "react-native-web";
import { CATEGORIES } from "../data/dummy-data";
import Category from "../components/Category";

function CategoriesScreen({navigation}) {

function renderItem(itemData) {

    function onPressHandler() {
        navigation.navigate('MealsOverview', {
            categoryId: itemData.item.id
        });
    }

    return (
        <Category
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={onPressHandler}
        />
    );
}  

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
