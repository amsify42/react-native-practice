import { FlatList, StyleSheet, Text, View } from "react-native"
import Reminder from "./Reminder/ReminderItem";

const reminders = [
    {
        id: 1,
        name: "Reminder1"
    },
    {
        id: 2,
        name: "Reminder2"
    },
    {
        id: 3,
        name: "Reminder3"
    },
    {
        id: 4,
        name: "Reminder4"
    }
];

function Reminders() {
        
    return (
        <View style={styles.container}>
            <Text style={styles.head}> Reminders </Text>
            <FlatList style={styles.list} data={reminders} renderItem={(itemData) => <Reminder id={itemData.item.id} name={itemData.item.name}/>}/>
        </View>
    )
}

export default Reminders;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    head: {
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    list: {
        
    }
})