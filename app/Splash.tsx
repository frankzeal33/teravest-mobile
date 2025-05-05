import { ScrollView, StyleSheet, Image, Text, View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { images} from "../constants"
import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Splash() {

    useEffect(() => {
        setTimeout(() => {
            router.replace('/(onboarding)')
        },3000)
      }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={images.splash} resizeMode="cover" style={styles.image}>
            <Animated.View entering={FadeInDown.duration(800).delay(200).springify()} className="flex-row justify-center items-center">
              <Image source={images.splashLogo}/>
            </Animated.View>
        </ImageBackground>
      </SafeAreaView>
      <StatusBar style='light'/>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  }
});
