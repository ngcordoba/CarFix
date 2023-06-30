import React from 'react';
import { Provider } from 'react-redux';
import { openDatabase } from './src/db/database';
import configureStore from './src/store';
import Navigation from './src/navigation/Navigation';

const store = configureStore();

openDatabase()
  .then(() => console.log("Base de datos iniciada"))
  .catch(err => {
    console.log("Base de datos no creada");
    console.log(err.message);
  });


const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;