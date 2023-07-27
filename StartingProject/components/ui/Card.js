import { View, StyleSheet } from "react-native";

function Card(props) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6f1a1a",
        alignItems: "center",
        marginHorizontal: 10,
        padding: 50,
        borderRadius: 10
    }
})