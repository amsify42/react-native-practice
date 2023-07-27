import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function Category({ title, color, onPress }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Pressable
        style={styles.content}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
      >
        <Text style={styles.title}>{title}</Text>
      </Pressable>
    </View>
  );
}

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    borderColor: "#8c8c8c",
    shadowColor: "#cbcbcb",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
