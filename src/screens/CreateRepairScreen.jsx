import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRepair, loadRepair } from '../store/fix.actions';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const CreateRepairScreen = ({ navigation }) => {
    const [repairData, setRepairData] = useState({
        vehicle: '',
        date: '',
        description: '',
        cost: '',
        mechanic: '',
        location: '',
    });
    const dispatch = useDispatch();

    const handleSaveRepair = () => {
        dispatch(addRepair(repairData));
        navigation.goBack(); // Vuelve a la pantalla anterior después de guardar
    };

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // Manejo de permisos denegados
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    return (
        <View>
            <Text>Crear arreglo de vehículo:</Text>
            <TextInput
                placeholder="Vehículo"
                value={repairData.vehicle}
                onChangeText={(text) => setRepairData({ ...repairData, vehicle: text })}
            />
            <TextInput
                placeholder="Fecha"
                value={repairData.date}
                onChangeText={(text) => setRepairData({ ...repairData, date: text })}
            />
            <TextInput
                placeholder="Descripción"
                value={repairData.description}
                onChangeText={(text) => setRepairData({ ...repairData, description: text })}
            />
            <TextInput
                placeholder="Costo"
                value={repairData.cost}
                onChangeText={(text) => setRepairData({ ...repairData, cost: text })}
            />
            <TextInput
                placeholder="Mecánico"
                value={repairData.mechanic}
                onChangeText={(text) => setRepairData({ ...repairData, mechanic: text })}
            />
            <Button title="Guardar" onPress={handleSaveRepair} />

            <View style={{ height: 200, width: 400, marginVertical: 30 }}>
                {location && (
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Ubicación actual"
                        />
                    </MapView>
                )}
            </View>
        </View>
    );
};

export default CreateRepairScreen;