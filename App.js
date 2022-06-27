import { React, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReduxThunk from 'redux-thunk'

import UserReducer from './Store/Reducers/UserReducer';
import ProjectReducer from './Store/Reducers/ProjectReducer';
import NavigationBar from './Components/NavigationBar';
import IntroScreen from './Screens/IntroScreen';
import AppStartScreen from './Screens/AppStartScreen';
import SignInScreen from './Screens/SignInScreen';

const rootReducer = combineReducers({
  users: UserReducer,
  projects: ProjectReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

console.disableYellowBox = true;

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

  console.log(userStatus)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user-status')
      if (value === null) {
        storeData("Intro")
      } else if (value === "Auth") {
        storeData("Start");
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
    <Provider store={store}>
      <View style={{ width: '100%', flex: 1 }}>
        {
          userStatus === "Intro" ?
            <IntroScreen storeData={storeData} />
            : userStatus === "Start" ?
              <AppStartScreen storeData={storeData} />
              : userStatus === "Auth" ?
                <SignInScreen storeData={storeData} />
                : userStatus === "Home" ?
                  <NavigationContainer><NavigationBar /></NavigationContainer>
                  : <View></View>
        }
      </View>
    </Provider>
  )
}
