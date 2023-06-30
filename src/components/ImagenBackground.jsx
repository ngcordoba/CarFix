import React from 'react'
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImagenBackground = () => {
    return (
        <Image
            source={require('../assets/images/homeBackgroundImage.jpg')}
            style={[styles.imagenBackground, { width: windowWidth, height: windowHeight }]}
        >
        </Image>
    );
}

const styles = StyleSheet.create({
    imagenBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
    },

});


export default ImagenBackground;