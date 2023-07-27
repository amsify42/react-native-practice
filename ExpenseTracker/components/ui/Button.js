import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({title, onPress}) {
    return (
        <Pressable onPress={onPress} android_ripple={{color: 'white'}}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.primary700,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    title: {
        color: GlobalStyles.colors.primary50
    }
})