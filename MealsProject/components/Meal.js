import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

function Meal({id, title, imageUrl, duration, complexity, affordability}) {

    const navigation = useNavigation();
    function mealDetailsHandler() {
        navigation.navigate('MealDetail', {
            mealId: id
        });
    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.content} android_ripple={{color: '#ccc'}} onPress={mealDetailsHandler}>
                <View>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.textContent}>
                        {title}
                    </Text>
                </View>
                <View style={styles.textItems}>
                    <Text>{duration}</Text>
                    <Text>{complexity}</Text>
                    <Text>{affordability}</Text>
                </View>
            </Pressable>
        </View>
    );
}

export default Meal;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        margin: 12,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 10,
        elevation: 4,
        borderColor: "#8c8c8c",
        shadowColor: "#cbcbcb",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8
    },
    image: {
        width: '100%',
        height: 200
    },
    textContent: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingVertical: 5
    },
    textItems: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
});