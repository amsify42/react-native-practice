import { View, Text, StyleSheet } from "react-native";

function ToPay() {
    return <View style={styles.container}>
        <Text>
        ToPay
        </Text>
    </View>
}

export default ToPay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
