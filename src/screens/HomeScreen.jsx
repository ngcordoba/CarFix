import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagenBackground from '../components/ImagenBackground'


const HomeScreen = ({ navigation }) => {

    const handleLoadRepair = () => {
        navigation.navigate('CreateRepair');
    };

    return (

        <View style={styles.container}>
            <ImagenBackground />
            <View style={styles.viewContainer}>
                <Text style={styles.title}>¡Bievenido!</Text>

                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Car Fix te permite registrar los arreglos de tu vehiculo </Text>
                </View>

                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLoadRepair}>
                        <Text style={styles.buttonText}> Registrar un arreglo </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    viewContainer: {
        marginTop: "30%",
        margin: "10%",
        alignItems: 'center',
    },

    subtitleContainer: {
        margin: "10%",
        width: "100%",
    },

    buttonContainer: {
        margin: "30%",
    },

    title: {
        color: 'white',
        fontSize: 40,
        textAlign: "center",
    },

    subtitle: {
        color: 'white',
        fontSize: 20,
        justifyContent: "flex-start",
        textAlign: "center",
    },

    buttonContainer: {
        padding: "40%"
    },

    button: {
        backgroundColor: "#ff1700",
        width: 220,
        height: 55,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center"
    },

    buttonText: {
        color: "white"
    },


});

export default HomeScreen;