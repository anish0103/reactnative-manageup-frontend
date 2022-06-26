import { React, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NavigationBar from './Components/NavigationBar';
import IntroScreen from './Screens/IntroScreen';
import AppStartScreen from './Screens/AppStartScreen';
import SignInScreen from './Screens/SignInScreen';

export default function App() {
  const [userStatus, setUserStatus] = useState(null)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user-status', value)
      setUserStatus(value);
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-status')
      if (value === null) {
        storeData("Intro")
      } else {
        storeData(value);
      }
    } catch (e) {
      console.log(e)
    }
  }

  // AsyncStorage.removeItem('user-status');

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={{ width: '100%', flex: 1 }}>
      {
        userStatus === "Intro" ? <IntroScreen storeData={storeData} />
          : userStatus === "Start" ? <AppStartScreen storeData={storeData} />
            : userStatus === "Auth" ? <SignInScreen storeData={storeData} />
              : userStatus === "Home" ? <NavigationContainer>
                <NavigationBar />
              </NavigationContainer>
                : <View></View>
      }
    </View>
  )
}
