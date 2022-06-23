import { NavigationContainer } from '@react-navigation/native'

import NavigationBar from './Components/NavigationBar';
import IntroScreen from './Screens/IntroScreen';
import AppStartScreen from './Screens/AppStartScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import CreateProjectScreen from './Screens/CreateProjectScreen';
import CreateTaskScreen from './Screens/CreateTaskScreen';

export default function App() {
  return (
    // <NavigationContainer>
    //   <NavigationBar />
    // </NavigationContainer>
    // <IntroScreen />
    // <AppStartScreen />
    // <SignInScreen />
    // <SignUpScreen />
    // <CreateProjectScreen />
    <CreateTaskScreen />
  );
}
