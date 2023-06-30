import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { openDatabase } from '../db/database';
import { useNavigation } from '@react-navigation/native';
import ImagenBackground from '../components/ImagenBackground';

const RepairsScreen = () => {
    const [repairs, setRepairs] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const db = await openDatabase();

                db.transaction((tx) => {
                    tx.executeSql(
                        'SELECT * FROM repairs',
                        [],
                        (_, { rows }) => {
                            const data = rows._array || [];
                            setRepairs(data);
                        },
                        (_, error) => {
                            console.log('Error al obtener las reparaciones:', error);
                        }
                    );
                });
            } catch (error) {
                console.log('Error al abrir la base de datos:', error);
            }
        };

        fetchRepairs();
    }, []);

    const keyExtractor = (item) => {
        return item && item.id ? item.id.toString() : '';
    };

    const handleReparationPress = (item) => {
        navigation.navigate('DetailsRepair', item);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleReparationPress(item)}>
                <View style={styles.contentContainer}>
                    <Image source={require('../assets/images/imageRepair.png')} style={styles.image} imageStyle={styles.imageStyle} />

                    <View style={styles.itemsContainer}>
                        <Text>Vehiculo: {item.vehicle}</Text>
                        <Text>Detalle: {item.description}</Text>
                        <Text>Dirección: {item.location}</Text>
                        <Text>Costo: ${item.cost}</Text>
                        <Text>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (


        <View style={styles.screenContainer}>
            <ImagenBackground />
            <Text style={styles.title}>Tus Reparaciones</Text>
            <View style={styles.container}>
                <View style={styles.listContainer}>
                    <FlatList data={repairs} keyExtractor={keyExtractor} renderItem={renderItem} />
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        height: '65%',
        width: '90%',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },

    listContainer: {
        flex: 1,
        margin: 10,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    image: {
        width: 65,
        height: 65,
        marginRight: 10,
        borderRadius: 32.5,
        overflow: 'hidden',
    },
    imageStyle: {
        resizeMode: 'cover',
    },
    itemsContainer: {
        flex: 1,
        margin: 15,
        padding: 1,
    },
    title: {
        color: 'white',
        fontSize: 28,
        textAlign: "center",
        fontWeight: 'bold',
        margin: "5%",
    },

});



export default RepairsScreen;