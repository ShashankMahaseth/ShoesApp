import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootParamList } from "../navigation/types/RootStackParamList";
import { useTheme } from "../../res/themes/useTheme";
import { sessionUseCases } from "../../core/session/sessionModule";
import auth from "@react-native-firebase/auth";

type SplashNavigation = NativeStackNavigationProp<RootParamList, "Splash">;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigation>();
  const theme = useTheme();

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (!isMounted) return;

      // Light splash delay to keep UX smooth before onboarding
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));

      if (!isMounted) return;

      const isAuthed = Boolean(user);
      
      sessionUseCases.setLoggedIn.execute(isAuthed);

      if (isAuthed) {
        sessionUseCases.markFirstTimeDone.execute();
        navigation.reset({ index: 0, routes: [{ name: "HomeScreen" }] });
        return;
      }

      const { isFirstTime } = sessionUseCases.getStatus.execute();
      navigation.reset({
        index: 0,
        routes: [{ name: isFirstTime ? "OnBoarding" : "AuthScreen" }],
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator color={theme.primary} size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SplashScreen;
