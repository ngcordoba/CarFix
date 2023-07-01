import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRepair, loadRepairs } from '../store/fix.actions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import getAddress from '../components/GeoFormat';

import Button from '../components/Button';
import ImagenBackground from '../components/ImagenBackground';

const CreateRepairScreen = ({ navigation }) => {
    const [repairData, setRepairData] = useState({
        vehicle: '',
        date: '',
        description: '',
        cost: '',
        mechanic: '',
        location: '',
        kilometres: '',
    });

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const dispatch = useDispatch();
    const [isFormValid, setFormValid] = useState(false);

    const handleSaveRepair = () => {
        if (isFormValid) {
            dispatch(addRepair(repairData));
            navigation.goBack();

            console.log(repairData);
            Alert.alert('Reparación guardada ✅', 'Tu reparación ha sido guardada exitosamente!');

            setRepairData({
                vehicle: '',
                date: '',
                description: '',
                cost: '',
                mechanic: '',
                location: '',
                kilometres: '',
            });
        } else {
            Alert.alert('Campos incompletos', 'Por favor completa todos los campos y agrega una fecha.');
        }
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

    const validateForm = () => {
        const { vehicle, date, description, cost, location } = repairData;
        const isValid = vehicle && date && description && cost && location;
        setFormValid(isValid);
    };

    useEffect(() => {
        validateForm();
    }, [repairData]);

    return (
        <View style={styles.container}>
            <ImagenBackground />
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Cargá los datos de tu vehiculo</Text>
                <Text>Marca y modelo</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Ford Fiesta Kinetic"
                    value={repairData.vehicle}
                    onChangeText={(text) => {
                        setRepairData({ ...repairData, vehicle: text });
                        validateForm();
                    }}
                />

                <View style={styles.inlineFields}>
                    <View style={styles.inlineField}>
                        <Text>Costo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Costo de la reparación"
                            value={repairData.cost}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setRepairData({ ...repairData, cost: text });
                                validateForm();
                            }}
                        />
                    </View>

                    <View style={styles.inlineField}>
                        <Text>Kilometraje</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Kilometraje actual"
                            value={repairData.kilometres}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setRepairData({ ...repairData, kilometres: text });
                                validateForm();
                            }}
                        />
                    </View>
                </View>

                <Text>Taller Mecánico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del taller"
                    value={repairData.mechanic}
                    onChangeText={(text) => setRepairData({ ...repairData, mechanic: text })}
                />

                <Text>Descripción</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej: Frenos y filtros"
                    value={repairData.description}
                    onChangeText={(text) => {
                        setRepairData({ ...repairData, description: text });
                        validateForm();
                    }}
                />

                <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                    <Text style={styles.textFecha}>{repairData.date ? repairData.date : 'Cargar fecha'}</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            {location && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
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
                    <Text style={styles.textUbi}>*Ubicación del taller mecánico</Text>
                </View>
            )}

            <Button onPress={handleSaveRepair} text="Guardar datos" />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '10%',
        color: 'white',
    },
    inputContainer: {
        width: windowWidth * 0.8,
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: '10%',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 2,
        marginBottom: 10,
    },

    dateButton: {
        backgroundColor: "#ff1700",
        width: 150,
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignSelf: "center"
    },
    textFecha: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    textUbi: {
        alignSelf: 'center',
        color: 'white',
    },
    mapContainer: {
        width: windowWidth * 0.8,
        height: windowWidth * 0.5,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 15,
    },
    map: {
        flex: 1,
    },
    inlineFields: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inlineField: {
        flex: 1,
        marginRight: 10,
    },
});

export default CreateRepairScreen;