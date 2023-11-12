import { Text, View, StyleSheet, ImageBackground, TextInput, Platform } from "react-native";

import {Dimensions} from 'react-native';
import  background  from '../../../assets/background.jpeg'
import { StatusBar } from "react-native";

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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: (Dimensions.get('window').height + STATUSBAR_HEIGHT)
    },
    opacity: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: Dimensions.get('window').width,
        height:(Dimensions.get('window').height + STATUSBAR_HEIGHT)
    }
});
  