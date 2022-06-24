import { AntDesign } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Header from './Header';
import HomeScreen from '../Screens/HomeScreen';
import ChatMainScreen from '../Screens/ChatMainScreen';
import CreateScreen from '../Screens/CreateScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 15,
          right: 15,
          elevation: 4,
          height: 65,
          borderRadius: 10
        },
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);

          return <Header title={title} />;
        }
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign color={focused ? "#246bfb" : "#646464"} name="home" size={28} />
            )
          }
        }}
        name="Home" component={HomeScreen} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign color={focused ? "#246bfb" : "#646464"} name="pluscircleo" size={28} />
            )
          }
        }}
        name="Create" component={CreateScreen} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign color={focused ? "#246bfb" : "#646464"} name="message1" size={28} />
            )
          }
        }}
        name="Chat List" component={ChatMainScreen} />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign color={focused ? "#246bfb" : "#646464"} name="profile" size={28} />
            )
          }
        }}
        name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default NavigationBar;