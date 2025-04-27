import { StyleSheet } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MealsbookContextProvider, { MealsbookContext } from './store/MealsbookContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import MainScreen from './screens/MainScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import MealScreen from './screens/MealScreen';
import UserFavScreen from './screens/UserFavScreen';
import CreateMealScreen from './screens/CreateMealScreen';
import EditMealScreen from './screens/EditMealScreen';


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="MealScreen" component={MealScreen}/>
      <Stack.Screen name="UserFavScreen" component={UserFavScreen}/>
      <Stack.Screen name="CreateMealScreen" component={CreateMealScreen}/>
      <Stack.Screen name="EditMealScreen" component={EditMealScreen}/>
    </Stack.Navigator>
  );
}


function Navigation() {
  const ctx = useContext(MealsbookContext);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function fetchToken() {
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) {
        await ctx.authenticate(JSON.parse(storedUser));
      }
      await SplashScreen.hideAsync();
      setAppIsReady(true);
    }
    fetchToken();
  }, []);

  if(!appIsReady) {
    return null;
  }

  const isAuthenticated = ctx.isAuthenticated;
  return (
    <NavigationContainer>
      {
        isAuthenticated
          ? <AuthenticatedStack />
          : <AuthStack />
      }
    </NavigationContainer>
  );
}

function Root() {
  const [loaded, error] = useFonts({
    itim: require('./assets/fonts/Itim-Regular.ttf'),
  });

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <Navigation />
  );
}

export default function App() {
  return (
    <MealsbookContextProvider>
      <Root />
    </MealsbookContextProvider>
  );
}

const styles = StyleSheet.create({
});
