import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

const index = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-between pt-5 pb-8">
          <View className="items-center px-4">
            <Image
              source={images.logo}
              resizeMode="contain"
            />
          </View>

          <View className='w-full'>
            <View className="items-center mt-10 px-4">
              <Text className="text-5xl font-black">
                <Text className="text-green-light font-pblackitalics">Invest</Text>
                <Text> in</Text>
              </Text>
              <Animated.Text entering={FadeInLeft.duration(600).delay(200).springify()} className="text-5xl font-black">what you eat</Animated.Text>
              <Animated.Text entering={FadeInRight.duration(500).delay(600).springify()}  className="text-base mt-1 text-center font-rmedium">
                Earn 2.3% profit monthly on investment.
              </Animated.Text>
            </View>

            <Image
              source={images.onBoarding}
              className="w-full my-8"
              resizeMode="cover"
            />
          </View>

          {/* Buttons */}
          <View className="flex-row items-center justify-between w-full px-4 gap-1">
            <CustomButton title="Sign Up" handlePress={() => router.push('/(onboarding)/SignUp')} containerStyles="w-[47%]" bgColor='bg-white border border-green' textStyles='text-green'/>
            <CustomButton title="Log In" handlePress={() => router.push('/(onboarding)/SignIn')} containerStyles="w-[47%]" textStyles='text-white'/>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#ffffff' style="dark"/>
    </SafeAreaView>
  )
}

export default index