import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import logo from '../../assets/Barbearia_Branco.png';
import { BackgroundCover } from "../components/BackgroundCover/BackgroundCover";
import { checkIfSignUpTryIsValid } from "../utils/checkIfIsAValidUser";
import { useState } from "react";
import { api } from "../services/apiConnector";

export const SignUp = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        try{
            const userData = {
                username,
                password,
                name,
                email,
            }
            const validationResult = await checkIfSignUpTryIsValid(userData);

            if(!validationResult) {
                Alert.alert(
                    'Erro!',
                    'Verifique os dados e tente novamente',
                    [
                        {
                        text: 'Okay',
                        },
                    ]
                );
            } else {
                await api.post('/user', userData);
                
                Alert.alert(
                    'Sucesso!',
                    'Usuario criado! Faça o login',
                    [
                        {
                        text: 'ir',
                        onPress: navigation.navigate('Signin')
                        },
                    ]
                );
            }
        }
        catch(e) {
            console.log(e)
            Alert.alert(
                'Erro!',
                'Tente novamente mais tarde',
                [
                    {
                    text: 'Okay',
                    style: 'default',
                    },
                ]
            );
        }
    }


    return (
        <BackgroundCover>
            <ScrollView>
                <View style={styles.container}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={logo}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.signUpTitle}>CADASTRO</Text>

                        <TextInput onChangeText={setName} style={[styles.input, styles.inputValue]} placeholder="Nome"></TextInput>
                        <TextInput onChangeText={setEmail} style={[styles.input, styles.inputValue]} placeholder="E-mail"></TextInput>
                        <TextInput onChangeText={setUsername} style={[styles.input, styles.inputValue]} placeholder="Username"></TextInput>
                        <TextInput onChangeText={setPassword} style={[styles.input, styles.inputValue]} placeholder="Senha"></TextInput>

                        <TouchableOpacity  style={[styles.button, styles.input]}  onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Entrar</Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </ScrollView>
        </BackgroundCover>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    logo: {
        alignSelf: "center",
        width: '50%',
        height: 300
    },
    input: {
        padding: 5,
        width: '100%',
        borderRadius: 5,
        height: 40
    },
    inputValue: {
        marginBottom: 18,
        backgroundColor: '#fff',
        alignSelf: "center"
    },
    inputContainer: {
        width: '80%',
        display: "flex",
        alignItems: "center",
    },
    button: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    } ,
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "700",
    },
    signUpContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
    },
    signUp: {
        padding: 5,
        color: 'red'
    },
    signUpTitle: {
      color: 'white',
      fontSize: 25,
      marginBottom: 18
    }
});
  