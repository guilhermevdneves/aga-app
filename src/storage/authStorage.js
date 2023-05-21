import AsyncStorage from '@react-native-async-storage/async-storage';

const USER ='user'

export const getUserStorage = async () => {
  const value = await AsyncStorage.getItem(USER);

  if(value)  {
    return await JSON.parse(value)

  }

  return undefined;
}

export const setUserStorage = async (payload) => {
  await AsyncStorage.setItem(USER, JSON.stringify(payload));
}