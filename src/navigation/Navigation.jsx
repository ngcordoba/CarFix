import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen';
import RepairsScreen from '../screens/RepairsScreen';
import CreateRepairScreen from '../screens/CreateRepairScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={{ backgroundColor: '#694fad' }}
                initialRouteName="Inicio"
                screenOptions={{
                    tabBarActiveTintColor: "#ff1700",
                    tabBarInactiveTintColor: "black",

                }}

            >
                <Tab.Screen
                    name="Inicio"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="home" size={20} color={color} />
                        ),
                    }}

                />
                <Tab.Screen name="CreateRepair" component={CreateRepairScreen}
                    options={{ tabBarButton: () => null, tabBarVisible: false, headerShown: false }} />

                <Tab.Screen
                    name="Repairs"
                    component={RepairsScreen}
                    options={{
                        title: "Mis Reparaciones",
                        tabBarIcon: ({ color }) => (
                            <Ionicons name="build" size={20} color={color} />
                        ),
                    }}

                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;