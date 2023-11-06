import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from "react-native";
import logo from '../../assets/Barbearia_Branco.png';
import { BackgroundCover } from "../components/BackgroundCover/BackgroundCover";
import { checkIfSignUpTryIsValid } from "../utils/checkIfIsAValidUser";
import { useState } from "react";
import {maskPhoneFixo, maskPhone, removeMask} from '../masks/number'
import { api } from "../services/apiConnector";
import { Ionicons } from '@expo/vector-icons'; 

export const SignUp = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = async () => {
        try{
            if (password.length < 8) {
                Alert.alert(
                'Erro!',
                'A senha deve ter no mínimo 8 caracteres',
                [
                    {
                    text: 'Okay',
                    },
                ]
                );
                return; // Retorna aqui para interromper o processo de submissão
            }

            const userData = {
                username,
                password,
                name,
                number: removeMask(number),
            }

            console.log('userData', userData);
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

    const handleChangeNumber = (number) => {
      
        const numberWithoutMask = removeMask(number) 

        setNumber(() =>  numberWithoutMask.length < 11 ? maskPhoneFixo(numberWithoutMask) : maskPhone(numberWithoutMask))
    }

    function handleChangeName(nameChanges) {
        var regex = new RegExp(/^[a-zA-Z\s]*$/); // Expressão regular para verificar se contém apenas letras

        if(regex.test(nameChanges)) {
            setName(nameChanges)
        }
    }
    
    return (
        <BackgroundCover>
            <ScrollView>
                <View style={styles.container}>

                    <View  style={styles.backContainer}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signin')}>
                            <Ionicons name="arrow-back-outline" size={24} color="white" />
                        </TouchableWithoutFeedback>
                    </View>

                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={logo}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.signUpTitle}>CADASTRO</Text>

                        <TextInput value={name} onChangeText={handleChangeName} style={[styles.input, styles.inputValue]} placeholder="Nome"></TextInput>
                        <TextInput value={number} onChangeText={(number) => handleChangeNumber(number)} style={[styles.input, styles.inputValue]} placeholder="Telefone"></TextInput>
                        <TextInput onChangeText={setUsername} style={[styles.input, styles.inputValue]} placeholder="Username"></TextInput>
                        <TextInput onChangeText={setPassword} style={[styles.input, styles.inputValue]} placeholder="Senha" secureTextEntry ></TextInput>

                        <TouchableOpacity  style={[styles.button, styles.input]}  onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Cadastrar</Text>
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
        alignItems: 'center',
        marginBottom: 50
    },
    logo: {
        alignSelf: "center",
        width: '50%',
        height: 250
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
    },
    backContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
        paddingTop: 10,
        paddingHorizontal: 25,
        justifyContent: 'center',
    }
});
  