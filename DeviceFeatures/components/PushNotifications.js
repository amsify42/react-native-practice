import { StyleSheet, Text, View } from "react-native";
import * as Notifications from 'expo-notifications';
import { Button } from "react-native";

function PushNotifications() {

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { id: 123 },
          },
          trigger: { seconds: 2 },
        });
      }

    return (
        <View style={styles.container}>
            <Text>
            <Button
                title="Press to schedule a notification"
                onPress={async () => {
                    await schedulePushNotification();
                }}
            />
            </Text>
        </View>
    );
}

export default PushNotifications;

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
});