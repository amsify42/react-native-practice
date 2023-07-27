import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({label, textInputConfig}) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} {...textInputConfig}/>
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
    },
    label: {
        fontWeight: 'bold',
        fontSize: 17,
        color: GlobalStyles.colors.gray500,
        margin: 5
    },
    input: {
        color: GlobalStyles.colors.primary700,
        fontWeight: 'bold',
        borderColor: GlobalStyles.colors.gray500,
        borderWidth: 1,
        borderRadius: 3,
        fontSize: 15,
        padding: 5,
        margin: 5
    }
});