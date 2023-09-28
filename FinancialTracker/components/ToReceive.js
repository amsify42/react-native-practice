import { View, Text, StyleSheet } from "react-native";

function ToReceive() {
    return <View style={styles.container}>
        <Text>
            To Receive
        </Text>
    </View>
}

export default ToReceive;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})