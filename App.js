import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/store/fix.reducers';
import HomeScreen from './src/screens/HomeScreen';
import RepairsScreen from './src/screens/RepairsScreen';
import CreateRepairScreen from './src/screens/CreateRepairScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { openDatabase } from './db/database';
import configureStore from './src/store';

const store = configureStore();
const Tab = createBottomTabNavigator();


openDatabase()
  .then(() => console.log("Base de datos iniciada"))
  .catch(err => {
    console.log("Base de datos no creada");
    console.log(err.message);
  });


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Repairs') {
                iconName = 'wrench';
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CreateRepair" component={CreateRepairScreen} />
          <Tab.Screen name="Repairs" component={RepairsScreen} />

        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;