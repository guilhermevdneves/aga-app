import { Text, View, StyleSheet, ImageBackground, TextInput } from "react-native";
import  background  from '../../../assets/background.jpeg'
export const BackgroundCover = ({children}) => {
    return (
        <ImageBackground
            resizeMode="cover"
            source={background}
            style={styles.container}
        >
        <View  style={styles.opacity}>
            {children}
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    opacity: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
});
  