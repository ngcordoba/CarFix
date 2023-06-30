import axios from 'axios';
import Map from '../../constants/Map'

const getAddress = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Map.API_KEY}`
    );

    if (response.data.results.length > 0) {
      const addressComponents = response.data.results[0].address_components;
      let streetNumber = '';
      let route = '';

      for (const component of addressComponents) {
        const types = component.types;
        if (types.includes('street_number')) {
          streetNumber = component.long_name;
        }
        if (types.includes('route')) {
          route = component.long_name;
        }
      }

      return `${route} ${streetNumber}`;
    }

    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default getAddress;