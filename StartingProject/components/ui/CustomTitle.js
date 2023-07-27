import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

function CustomTitle({children}) {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>
                {children}
            </Text>
        </View>
    )
}

export default CustomTitle;

const styles = StyleSheet.create({
    container: {
        marginVertical: 30,
        marginHorizontal: 10
    },
    content: {
        borderWidth: 1,
        borderColor: Colors.themeWhite,
        padding: 10,
        margin: 5,
        textAlign: 'center',
        color: Colors.themeWhite,
        fontWeight: 'bold',
        fontSize: 20
    }
});