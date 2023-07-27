import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Icon({ icon, color, size, onPress }) {
  return (
    <Pressable onPress={onPress} android_ripple={{ color: "white" }}>
      <View style={styles.container}>
        <Ionicons style={styles.icon} icon={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
}

export default Icon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary700,
    paddingHorizontal: 15,
    //paddingVertical: 5,
  },
  icon: {},
});
