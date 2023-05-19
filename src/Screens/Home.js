import { Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from "react-native";
import logo from '../../assets/Barbearia_Branco.png';
import { BackgroundCover } from "../components/BackgroundCover/BackgroundCover";

export const Home = () => {
    return (
        <BackgroundCover>
            <View style={styles.container}>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={logo}
                />
                
                <View style={styles.inputContainer}>
                    <TextInput style={[styles.input, styles.inputValue]} placeholder="Username"></TextInput>
                    <TextInput style={[styles.input, styles.inputValue]} placeholder="Senha"></TextInput>

                    <TouchableOpacity  style={[styles.button, styles.input]}  onPress={() => console.log('asd')}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BackgroundCover>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',
        alignItems: 'center'
    },
    logo: {
        alignSelf: "center",
        width: '50%',
    },
    input: {
        padding: 5,
        width: '100%',
        borderRadius: 5,
        height: 40
    },
    inputValue: {
        marginBottom: 20,
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
        textAlign: 'center',
        fontWeight: "700",
    } 
});
  