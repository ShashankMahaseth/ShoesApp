import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootParamList } from "./types/RootStackParamList";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import OnBoardingScreen from "../screens/onboardingScreen";
import AuthScreen from "../screens/AuthScreen";
import { useTheme } from "../../res/themes/useTheme";
import { useColorScheme } from "react-native";
const Stack = createNativeStackNavigator<RootParamList>();



const NavigationApp =() =>{
    const appTheme = useTheme();
    const colorScheme = useColorScheme();
    const baseTheme = colorScheme === 'dark' ? NavigationDarkTheme : NavigationDefaultTheme;

    const navigationTheme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            background: appTheme.background,
            card: appTheme.card,
            border: appTheme.borderColor,
            primary: appTheme.primary,
            text: appTheme.text,
        },
    };

    return(
        <NavigationContainer theme={navigationTheme}>
           <Stack.Navigator
           initialRouteName="OnBoarding"
             screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: appTheme.background },
             }}
           >
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen}/>

            <Stack.Screen name="AuthScreen" component={AuthScreen}/>

           </Stack.Navigator>
        </NavigationContainer>
    )

}

export default NavigationApp;
