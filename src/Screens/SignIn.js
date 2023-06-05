import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Alert } from "react-native";
import logo from '../../assets/Barbearia_Branco.png';
import { BackgroundCover } from "../components/BackgroundCover/BackgroundCover";
import { useState } from "react";
import { checkIfLoginTryIsValid } from "../utils/checkIfIsAValidUser";
import { api } from "../services/apiConnector";
import { useAuthContext } from "../context/authContext";

export const SignIn = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setAuthToken} = useAuthContext();
    navtigateToSignUpPage = () => {
        navigation.navigate('SignUp')
    }

    const handleSubmit = async e => {
        try{
            const credentials = {
                username,
                password
            }

            const validationResult = await checkIfLoginTryIsValid(credentials);

            if(!validationResult) {
                Alert.alert(
                    'Erro!',
                    'Credenciais inválidas',
                    [
                        {
                        text: 'Okay',
                        style: 'default',
                        },
                    ]
                );
            }

            const response = await api.post('/login', credentials);
            setAuthToken(response.data)
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
            <ScrollView >
                <View style={styles.container}>
                    <Image
                        resizeMode="contain"
                        style={styles.logo}
                        source={logo}
                    />
                    
                    <View style={styles.inputContainer}>
                        <TextInput value={username} onChangeText={setUsername} style={[styles.input, styles.inputValue]} placeholder="Username"></TextInput>
                        <TextInput value={password} onChangeText={setPassword}  style={[styles.input, styles.inputValue]} placeholder="Senha" secureTextEntry></TextInput>

                        <View style={styles.signUpContainer}>
                            <TouchableWithoutFeedback onPress={navtigateToSignUpPage}  style={styles.signUp}>
                                <Text style={styles.buttonText}>Cadastre-se</Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <TouchableOpacity  style={[styles.button, styles.input]}  onPress={handleSubmit}>
                            <Text style={styles.buttonText} onPress={handleSubmit}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </BackgroundCover>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
        justifyContent: "space-between"
    },
    logo: {
        alignSelf: "center",
        width: '50%',
        height: 380
    },
    input: {
        padding: 5,
        width: '100%',
        borderRadius: 5,
        height: 40
    },
    inputValue: {
        marginTop: 18,
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
    }
});
  