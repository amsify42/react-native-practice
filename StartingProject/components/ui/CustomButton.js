import { Pressable, StyleSheet, Text, View } from "react-native";

function CustomButton({children, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.outerContainer]
          : styles.outerContainer
      }
      android_ripple={{ color: "#7d3e3e" }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default CustomButton;

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  innerContainer: {
    backgroundColor: "#2d0303",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    fontFamily: 'open-sans-bold',
    fontSize: 20
  },
  pressed: {
    opacity: 0.75,
  },
});
