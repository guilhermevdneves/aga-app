import { Text, StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { updateDate } from "../../services/dates";
import { useAuthContext } from "../../context/authContext";
import { SquareTypes } from "../../constants/SquareTypes";
import { getUserDetails } from "../../services/user";
import { checkIfUserHasAselectedDate } from "../../utils/checkIfUserHasAselectedDate";

export const Square = ({children, reserved, squareDate, fetchData, allDates }) => {
  const {authToken} = useAuthContext();

  const handleConfirmDate = async () => {
    const data = {
      userId: authToken.user._id,
      date: squareDate
    }
    try{
      await updateDate(authToken, data);
      await fetchData()
    }
    catch(e) {
      console.log(e)
    }
  }

  
  const handleCancelDateAndConfirmOther = async (previousDate) => {
    console.log(previousDate, squareDate)
    const previousData = {
      date: previousDate
    }

    const newData = {
      userId: authToken.user._id,
      date: squareDate
    }

    try{
      await updateDate(authToken, previousData);
      await updateDate(authToken, newData);
      await fetchData()
    }
    catch(e) {
      console.log(e)
    }
  }
  
  const handlePress = () => {
     const result = checkIfUserHasAselectedDate(allDates, authToken.user._id)
     console.log('result', result)
    if(result) {
      return Alert.alert(
        'Atenção!',
        `Deseja cancelar o serviço para o dia ${formatDate(new Date(result.date))}, ${formatTime(new Date(result.date))} e marcar para o dia ${formatDate(squareDate)}, ${formatTime(squareDate)} `,
        [
            {
              text: 'Okay',
              style: 'destructive',
              onPress: () => handleCancelDateAndConfirmOther(new Date(result.date))
            },

            {
              text: 'Cancelar',
              style: 'cancel',
            }
        ]
      );
    }

      return Alert.alert(
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
    
    const showUserDetails = async () => {
      try {
        const response = await getUserDetails(authToken, reserved.reservedBy);

        Alert.alert(
          'Confirmado!',
          `Horário ${formatTime(squareDate)} reservado por ${response.data.name} \nNumero para contato: ${response.data.number}`,
        );
      } catch(e) {
      console.log(e)
      }
     
    }

  if(authToken.user.admin) {
    return  (
      <TouchableOpacity 
        style={[styles.container, styles[reserved.status]]} 
        onPress={reserved.status === SquareTypes.FREE ? () => undefined : showUserDetails}
      >
        <Text style={styles.text}>
          {children}
        </Text>
      </TouchableOpacity>
    )
  }

    return (
      <TouchableOpacity 
        style={[styles.container, styles[reserved.status]]} 
        onPress={reserved.status !== SquareTypes.FREE ? () => undefined : handlePress}
      >
        <Text style={styles.text}>
          {children}
        </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1 / 4,
      paddingVertical: 30,
      borderWidth: 0.182,
      borderColor: 'rgba(117,117,117)',
      display: "flex",
      alignItems: 'center',
    },
    RESERVED_BY_OTHERS: {
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    RESERVED_BY_USER: {
      backgroundColor: 'rgba(0, 0, 255, 0.2)',
    },
    FREE: {
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
    },
    disabled: {
      backgroundColor: 'rgba(71, 71, 71, 0.7)',
    },
    text: {
      color: 'white'
    }
});
  