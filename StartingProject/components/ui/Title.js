import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

function Title(props) {
    return (
        <Text style={styles.text}>
            {props.children}
        </Text>
    );
}

export default Title;

const styles = StyleSheet.create({
    text: {
        color: Colors.themeYellow,
        fontFamily: 'open-sans-bold',
        fontSize: 25
    }
})