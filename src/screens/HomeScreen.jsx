import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { loadRepairs } from '../store/fix.actions'


const HomeScreen = ({ navigation }) => {

    const handleLoadRepair = () => {
        navigation.navigate('CreateRepair');
    };

    return (
        <View>
            <Text>Bienvenido a la aplicación de arreglos de vehículo</Text>
            <Button title="Cargar arreglo de vehículo" onPress={handleLoadRepair} />
        </View>
    );
};

export default HomeScreen;