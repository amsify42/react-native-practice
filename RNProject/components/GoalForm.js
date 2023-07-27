import { useState } from "react";
import { Button, TextInput, View, StyleSheet, Modal, Image } from "react-native";

function GoalForm(props) {
    const [enteredGoal, setGoalText] = useState('');

    function onChangeGoalText(goalText) {
        setGoalText(goalText);
    }

    function onSubmitGoal() {
        console.log(enteredGoal);
        props.onAddGoal(enteredGoal);
        setGoalText('');
    }

    return (
        <Modal animationType="slide" style={{backgroundColor: 'blue'}}>
            <Image style={styles.image} source={require('../assets/images/goal.jpg')}/>
            <View style={styles.formContainer}>
                <View style={styles.input}>
                    <TextInput placeholder="Goal Name" onChangeText={onChangeGoalText} value={enteredGoal}/>
                </View>
                <View style={styles.buttonRow}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.closeModal} />
                    </View>
                    <View style={styles.button}>
                        <Button title="Add" onPress={onSubmitGoal} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default GoalForm;

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        //flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#cccc",
        marginBottom: 0,
        flex: 1,
        backgroundColor: '#F6F6F6'
      },
      image: {
        width: 150,
        height: 150,
        marginTop: '5%',
        marginLeft: '25%',
        position: 'absolute',
        zIndex: 1
      },
      input: {
        flexDirection: "row",
        padding: 11,
        borderColor: "black",
        borderWidth: 1,
        width: '95%',
        borderRadius: 7
      },
      buttonRow: {
        flexDirection: "row"
      },
      button: {
        width: '42%',
        margin: 20,
        borderRadius: 7
      }
});