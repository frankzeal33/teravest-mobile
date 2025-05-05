import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  const [loaded] = useFonts({
    "PlayFair-BlackItalics": require("../assets/fonts/PlayfairDisplay-BlackItalic.ttf"),
    "Raleway-Black": require("../assets/fonts/Raleway-Black.ttf"),
    "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf"),
    "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf"),
    "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
    "Raleway-Regular": require("../assets/fonts/Raleway-Regular.ttf"),
    "Raleway-Thin": require("../assets/fonts/Raleway-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="Splash"/>
        <Stack.Screen name="(onboarding)"/>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="(routes)"/>
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  }
});
