import { Text, StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { addDate } from "../../services/dates";
import { useAuthContext } from "../../context/authContext";

export const Square = ({children, reserved, squareDate, fetchData, disabledSquare}) => {
  const {authToken} = useAuthContext();

  const handleConfirmDate = async () => {
    const data = {
      userId: authToken.user._id,
      date: squareDate
    }
    console.log( authToken.user._id);
    try{
      await addDate(authToken, data);
      await fetchData()
    }
    catch(e) {
      console.log(e)
    }
  }
  
  const handlePress = () => {
      Alert.alert(
        'Atenção!',
        `Deseja reservar o serviço para o dia ${formatDate(squareDate)}, ${formatTime(squareDate)}`,
        [
            {
              text: 'Okay',
              style: 'destructive',
              onPress: handleConfirmDate
            },

            {
              text: 'Cancelar',
              style: 'cancel',
            }
        ]
      );
    }
    console.log('disabledSquare', disabledSquare, squareDate )
    if(disabledSquare) {
      return(

        <View 
          style={[styles.container, styles.disabled]} 
        >
        <Text style={styles.disabledText}>
          {children}
        </Text>
      </View>
      )
    }

    return (
      <>
      <TouchableOpacity 
        style={[styles.container, reserved ? styles.reserved : styles.notReserved]} 
        onPress={handlePress}
      >
        <Text style={styles.text}>
          {children}
        </Text>
      </TouchableOpacity>
      </>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '25%',
      paddingVertical: 30,
      borderWidth: 0.182,
      borderColor: 'rgba(117,117,117)',
      display: "flex",
      alignItems: 'center'
    },
    reserved: {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    notReserved: {
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
    },
    disabled: {
      backgroundColor: 'rgba(71, 71, 71, 0.7)',
    },
    disabledText: {
      color: 'rgb(71, 71, 71)',
    },
    text: {
      color: 'white'
    }
});
  