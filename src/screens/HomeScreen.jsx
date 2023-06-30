import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import Button from '../components/Button';
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

                    <Button
                        onPress={handleLoadRepair}
                        text={"Registrar un arreglo"}>
                    </Button>

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
        fontWeight: 'bold',
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