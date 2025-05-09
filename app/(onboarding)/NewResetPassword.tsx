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

const NewResetPassword = () => {

    const [form, setForm] = useState({
        newPassword: '',
        confirmNewPassword: '',
    })
  // const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    router.push('/(onboarding)/SignIn')
   
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
            <Text className="text-2xl text-center text-green mt-4 font-rbold">Change your password</Text>
            <Text className="text-sm text-center font-rlight mb-8">Enter your new password and confirm as well</Text>
            <FormField title="New Password" value={form.newPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, newPassword: e })} otherStyles="mt-7"/>
            <FormField title="Confirm New Password" value={form.confirmNewPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, confirmNewPassword: e })} otherStyles="mt-7"/>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center my-4'>
      <CustomButton title="Reset Password" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
    </View>

    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}


export default NewResetPassword