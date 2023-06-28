import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { openDatabase } from '../../db/database';

const RepairsScreen = () => {
    const [repairs, setRepairs] = useState([]);

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

    const renderItem = ({ item }) => {
        return (
            <View>
                <Image source={item.locationImage} style={{ width: 120, height: 120, borderColor: "black" }} />
                <Text>Vehiculo: {item.vehicle}</Text>
                <Text>Descripción: {item.description}</Text>
                <Text>Costo: ${item.cost}</Text>
                <Text>Ubicación: {item.location}</Text>
                <Text>Fecha: {item.date}</Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={repairs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </View>
    );
};

export default RepairsScreen;