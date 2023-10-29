import AsyncStorage from '@react-native-async-storage/async-storage';

const DATE ='date'

export const getScheduleDate = async () => {
  const value = await AsyncStorage.getItem(DATE);

  if(value)  {
    return await JSON.parse(value)
  }

  return undefined;
}

export const setScheuleDateStorage = async (payload) => {
  await AsyncStorage.setItem(DATE, JSON.stringify(payload));
}