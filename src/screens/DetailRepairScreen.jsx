import { StyleSheet, Text, View, SafeAreaView, Image, } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import ImagenBackground from '../components/ImagenBackground'

const DetailRepairScreen = ({ route }) => {
    const { vehicle, description, location, cost, date, mechanic, kilometres } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ImagenBackground />
            <View>
                <View style={styles.photoContainer}>
                    <Image source={require('../assets/images/imageRepair.png')} style={styles.image} />
                </View>

            </View>

            <View style={styles.detailsContainer}>

                <Text style={styles.label}>Marca y modelo: {vehicle} </Text>
                <Text style={styles.label}>Costo: {cost} $</Text>
                <Text style={styles.label}>Taller Mecánico: {mechanic} </Text>
                <Text style={styles.label}>Fecha: {date}</Text>
                <Text style={styles.label}>Dirección: {location}</Text>
                <Text style={styles.label}>Kilometraje: {kilometres}</Text>
                <Text style={styles.label}>Descripcion: {description} </Text>

                <View style={styles.buttonContainer}>

                </View>



            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

    image: {
        width: 160,
        height: 160,
        alignSelf: "center",
        margin: "10%"
    },

    detailsContainer: {
        height: '50%',
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        alignSelf: "center",
        borderRadius: 15,
        margin: "5%"
    },

    label: {
        maxWidth: "90%",
        height: "10%",
        fontSize: 15,
        marginVertical: 5,
        margin: "5%",
        marginTop: "3%",
        padding: "3%",

    },




});

export default DetailRepairScreen;
