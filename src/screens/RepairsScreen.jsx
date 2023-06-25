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
                <Image source={item.locationImage} style={{ width: 60, height: 60, backgroundColor: "black" }} />
                <Text>{item.description}</Text>
                <Text>{`${item.location.street}, ${item.location.number}`}</Text>
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