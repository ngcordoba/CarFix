import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addRepair, loadRepair } from '../store/fix.actions';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Map from '../../constants/Map'
import getAddress from '../../components/geocoding'

const CreateRepairScreen = ({ navigation }) => {
    const [repairData, setRepairData] = useState({
        vehicle: '',
        date: '',
        description: '',
        cost: '',
        mechanic: '',
        location: '',
    });

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const dispatch = useDispatch();

    const handleSaveRepair = () => {
        dispatch(addRepair(repairData));
        navigation.goBack();

        console.log(repairData);

        setRepairData({
            vehicle: '',
            date: '',
            description: '',
            cost: '',
            mechanic: '',
            location: '',
        });
    };

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            if (location) {
                const apiKey = Map.API_KEY;
                const formattedAddress = await getAddress(
                    location.coords.latitude,
                    location.coords.longitude,
                    apiKey
                );
                setRepairData({ ...repairData, location: formattedAddress });
            }
        })();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleDateConfirm = (date) => {
        const formattedDate = date.toLocaleDateString('es-ES');
        setRepairData({ ...repairData, date: formattedDate });
        hideDatePicker();
    };

    return (
        <View>
            <Text>Crear arreglo de vehículo:</Text>
            <TextInput
                placeholder="Vehículo"
                value={repairData.vehicle}
                format="DD/MM/YYYY"
                onChangeText={(text) => setRepairData({ ...repairData, vehicle: text })}
            />
            <TouchableOpacity onPress={showDatePicker}>
                <Text>{repairData.date ? repairData.date : 'Seleccionar fecha'}</Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
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


            <View style={{ height: 200, width: 400, marginVertical: 30 }}>
                {location && (
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
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
            <Button title="Guardar" onPress={handleSaveRepair} />
        </View>
    );
};

export default CreateRepairScreen;