import { View, Text, Button, StyleSheet, Image } from "react-native";
import { launchCameraAsync } from 'expo-image-picker'; 
import { useState } from "react";

function CameraPicture({navigation}) {
    const [cameraImage, setCameraImage] = useState('');

    async function takePictureHandler() {
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5
        });
        setCameraImage(image.assets[0].uri);
    }

    function goToSqliteHandler() {
        navigation.navigate('SqLiteOperations');
    }

    return (
        <>
            <View style={styles.container}>
                {cameraImage && <Image style={styles.image} source={{uri: cameraImage}}/>}
                {!cameraImage && <Text style={styles.content}>CameraPicture</Text>}
            </View>
            <Button title="Take Picture" onPress={takePictureHandler}/>
            <View style={{flex: 1, marginTop: 10}}>
                <Button title="SQLite Operations" onPress={goToSqliteHandler}/>
            </View>
        </>
    )
}

export default CameraPicture;

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'center',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 5
    },
    content: {
        textAlign: 'center'
    },
    image: {
        height: 330
    },
    button: {

    }
});