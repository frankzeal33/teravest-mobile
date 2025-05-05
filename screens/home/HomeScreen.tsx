import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import { router } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons';
import { DrawerActions, useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <SafeAreaView className="bg-white h-full">
       <StatusBar backgroundColor="#ffffff" style='dark'/>
          <View className="justify-between items-center flex-row my-4 px-4">
            <Pressable className="items-center flex-row gap-2" onPress={openDrawer}>
              <View className='rounded-full items-center justify-center bg-green size-9'>
                <Text className='text-white font-rbold text-base'>OK</Text>
              </View>
              <View className='items-center flex-row gap-1'>
                <Text className="text-base font-rbold text-green" numberOfLines={1}>Oladapo Koiki!</Text>
              </View>
            </Pressable>

            <Pressable className='relative' onPress={() => router.push("/(drawer)/(tabs)/investments")}>
              <View className='bg-red-500 w-2 h-2 rounded-full absolute right-0 top-0 z-10'/>
              <Octicons name="bell-fill" size={24} color="#218225" />
            </Pressable>
          </View>

    </SafeAreaView>
  )
}

export default HomeScreen