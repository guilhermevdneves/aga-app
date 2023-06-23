import { Text, StyleSheet, SafeAreaView, StatusBar, FlatList, View, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import logo from '../../assets/Barbearia_Branco.png';
import { Entypo, FontAwesome } from '@expo/vector-icons'; 
import { BackgroundCover } from "../components/BackgroundCover/BackgroundCover";
import { Square } from "../components/Square/Square";
import { useEffect, useState } from "react";
import { getDates } from "../services/dates";
import { useAuthContext } from "../context/authContext";
import { formatDate } from "../utils/formatDate";
import { generateTimeArray } from "../utils/generateTimeArray";
import { formatTime } from "../utils/formatTime";
import { checkIfForWhoTheDateIsReserved } from "../utils/checkIfForWhoTheDateIsReserved";

const currentDate = new Date();

export const Home = ({navigation}) => {
    const [dateData, setDateData] = useState();
    const [fetchedDates, setFetchedDates] = useState([]);
    const {authToken, setAuthToken } = useAuthContext();

    const renderRelevantSquares = (date = new Date()) => {
        const dates = generateTimeArray(date)

        return {...dates, timeArray: dates.timeArray};
    }

    const fetchData = async () => {
        const response  = await getDates(authToken);
        setFetchedDates(response.data);
    }

    const increaseDate = () => {
        setDateData((prevState) => {
            const newDate = new Date(prevState.selectedDate)
            newDate.setDate(newDate.getDate() + 1);

            return renderRelevantSquares(newDate);
        });
    }

    const decreaseDate = () => {
        setDateData((prevState) => {
            const newDate = new Date(prevState.selectedDate)
            newDate.setDate(newDate.getDate() - 1);

            return renderRelevantSquares(newDate);
        });
    }
    
    useEffect(() => {
        fetchData();
        setDateData(renderRelevantSquares());
    },[])

    return (
        <BackgroundCover>
            <SafeAreaView style={styles.container}>
                <StatusBar  style='light'/>
                <View  style={styles.signOutContainer}>
                    <TouchableWithoutFeedback onPress={() => setAuthToken('')}>
                        <FontAwesome name="sign-out" size={24} color="white" />
                    </TouchableWithoutFeedback>
                </View>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={logo}
                />
            {dateData && 
            <>
                <View style={styles.date}>
                    { formatDate(dateData.selectedDate)  !== formatDate(currentDate) ?
                        <TouchableWithoutFeedback onPress={decreaseDate}>
                            <Entypo name="chevron-left" size={18} color="white" />
                        </TouchableWithoutFeedback>

                        :
                        <View style={styles.noContent}/>
                    }
                    
                    <Text style={styles.dateText}>{formatDate(dateData.selectedDate)}</Text>
                    <TouchableWithoutFeedback onPress={increaseDate}>
                        <Entypo name="chevron-right" size={18} color="white" />
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.dateContainer}>
                   
                        <FlatList 
                            style={{ flex: 1}}
                            data={dateData.timeArray}
                            scrollEnabled={true}
                            keyExtractor={(item) => item.getTime()}
                            numColumns={4}
                            renderItem={({item}) => 
                            ( 
                                <Square
                                    allDates={fetchedDates}
                                    fetchData={fetchData}
                                    reservedBy={fetchedDates.find(somDate => new Date(somDate.date).getTime() === currentDate.getTime())}
                                    squareDate={item} 
                                    reserved={checkIfForWhoTheDateIsReserved({
                                        currentDate: item,
                                        fetchedDates,
                                        currentUserId: authToken.user._id
                                    })}
                                >
                                    {formatTime(item)}
                                </Square>
                            )}
                        
                        />
                </View>
                </>
            }

            </SafeAreaView>
        </BackgroundCover>
    );
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: "center",
        width: '50%',
        height: 100,
        marginVertical: 50
    },
    container: {
        flex: 1,
    },
    dateContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
    date: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingHorizontal: 25,
        width: '100%',
        marginBottom: 15
    },
    dateText: {
        color: 'white'
    },
    noContent: {
        height: 18.5,
        width: 18.5   
    },
    signOutContainer: {
        width: '100%',
        height: 50,
        display: 'flex',
        alignItems: "flex-end",
        paddingTop: 10,
        paddingHorizontal: 25,
        justifyContent: 'center',
    }
});
  