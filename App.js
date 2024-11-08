
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Search from './screens/Search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/Signup';
import LoginScreen from './screens/Login';
import Profile from './screens/profile';
import DoctorDetails from './screens/DoctorDetails ';
import { AuthProvider } from './AuthContext';
import Appointments from './screens/appointements';

export default function App(props) {
  const Tap = createBottomTabNavigator();
  const HomeStack = createNativeStackNavigator();

  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <HomeStack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: true,
            headerTitle: 'Search for doctor',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'rgb(0,112,205)' }
          }}
        />
        <HomeStack.Screen
          name='details'
          component={DoctorDetails}
          options={{
            headerShown: true,
            headerTitle: 'Doctor Profile',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'rgb(0,112,205)' }
          }}
        />
        <HomeStack.Screen
          name='signup'
          component={SignUp}
          options={{
            headerShown: true,
            headerTitle: 'Sign Up',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'rgb(0,112,205)' }
          }}
        />
        <HomeStack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            headerShown: true,
            headerTitle: 'Login',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'rgb(0,112,205)' }
          }}
        />
        <HomeStack.Screen
          name='appoint'
          component={Appointments}
          options={{
            headerShown: true,
            headerTitle: 'Your reservations',
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'rgb(0,112,205)' }
          }}
        />
      </HomeStack.Navigator>
    );
  }

  function getTabBarVisibility(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    return !['Search', 'details', 'signup'].includes(routeName);
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Tap.Navigator
          initialRouteName='Home'
          screenOptions={({ route }) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route) ? 'flex' : 'none',
            },
          })}
        >
          <Tap.Screen
            name='Homestack'
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: () => <AntDesign name="home" size={24} color="rgb(0,112,205)" />
            }}
          />
          <Tap.Screen
            name='profile'
            component={Profile}
            options={{
              headerShown: false,
              tabBarLabel: 'My Profile',
              tabBarIcon: () => <AntDesign name="user" size={24} color="rgb(0,112,205)" />
            }}
          />
        </Tap.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
