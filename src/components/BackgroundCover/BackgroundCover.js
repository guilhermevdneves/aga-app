import { Text, View, StyleSheet, ImageBackground, TextInput } from "react-native";
import {Dimensions} from 'react-native';
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
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    opacity: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});
  