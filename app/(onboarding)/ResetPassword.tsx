import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router, useLocalSearchParams  } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'
import OTPTextInput from "react-native-otp-textinput";
import { images } from '@/constants'
// import Modal from '@/components/Modal'
// import { useToast } from 'react-native-toast-notifications'
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import CountDown from 'react-native-countdown-component';
import { Platform } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import FormField from '@/components/FormField'
// import { axiosClient } from '@/globalApi'
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage'

const ResetPassword = () => {

  const [otp, setOtp] = useState('')
  // const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState("")

  const submit = async () => {
    router.push('/(onboarding)/ResetPasswordOTP')
   
  }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <View className='flex-row items-center justify-between mt-3 pb-3'>
        <TouchableOpacity onPress={() => router.back()}><AntDesign name="leftcircle" size={30} color="#C3C3C3"/></TouchableOpacity>
        <Image source={images.logo}/>
        <View className='w-10'/>
      </View>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center my-6 mt-6">
            <Text className="text-2xl text-center text-green mt-4 font-rbold">Reset your password</Text>
            <Text className="text-sm text-center font-rlight mb-8">Enter your email address and we’ll send you a reset code</Text>
            <FormField title="Email Address" value={email} placeholder="Enter here" handleChangeText={(e: any) => setEmail(e)} otherStyles="mt-7" keyboardType="email-address"/> 
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center my-3'>
      <CustomButton title="Request OTP" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
      <View className="mt-3 flex-row gap-1 items-center justify-center">
        <Text className="text-sm text-center font-rbold">Was this request a mistake?</Text>
        <TouchableOpacity onPress={() => router.push("/(onboarding)/SignIn")}>
          <Text className="text-green font-rbold">Back to Login</Text>
        </TouchableOpacity >
      </View>
    </View>

    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}


export default ResetPassword
