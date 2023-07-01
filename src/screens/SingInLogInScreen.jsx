/* 
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { initializeApp } from '@firebase/app';
import { firebaseConfig } from '../constants/firebase-config';

import ImagenBackground from '../components/ImagenBackground';
import Button from '../components/Button';

const SignInLogInScreen = () => {


    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleCreateAccount = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuario creado con exito!")
                const user = userCredential.user;
                console.log(user)
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
    }



    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuario logueado correctamente")
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('HomeScreen')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImagenBackground />

            <View style={styles.detailsContainer}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ejemplo@gmail.com"
                    onChange={(text) => setEmail(text)}
                />
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ingrese contraseña"
                    onChange={(text) => setPassword(text)}
                    secureTextEntry={true}
                />

                <Button
                    onPress={handleSignIn}
                    text={"Iniciar Sesión"}>
                </Button>
                <Button
                    onPress={handleCreateAccount}
                    text={"Registrarse"}>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 140,
        height: 140,
        alignSelf: "center",
        margin: "10%",
    },

    detailsContainer: {
        height: '55%',
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 15,
        margin: "5%",
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        fontSize: 15,
        textAlign: 'left'
    },

    input: {
        width: '60%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 2,
        marginBottom: 20,
    },
});

export default SignInLogInScreen;
 */