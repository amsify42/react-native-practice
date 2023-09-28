import { StyleSheet, Text, View } from "react-native"

function ReminderItem({id, name}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {name}
            </Text>
        </View>
    )
}

export default ReminderItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        padding: 5,
        margin: 5
    },
    text: {
        color: 'white'
    }
})