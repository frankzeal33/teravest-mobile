import { View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar'
// import { useToast } from "react-native-toast-notifications";
// import { axiosClient } from '@/globalApi'
import * as SecureStore from "expo-secure-store";
import { images } from '@/constants'
import Entypo from '@expo/vector-icons/Entypo';

const SignIn = () => {

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // const toast = useToast();

  const submit = async () => {

    // if(!form.firstname){
    //     return toast.show("Firstname is empty", {
    //       type: "warning",
    //     });
    // }

    // if(!form.lastname){
    //   return toast.show("Lastname is empty", {
    //     type: "warning",
    //   });
    // }

    // if(!form.phoneNumber){
    //   return toast.show("Phone Number is empty", {
    //     type: "warning",
    //   });
    // }

    // if(!form.email){
    //   return toast.show("Email address is empty", {
    //     type: "warning",
    //   });
    // }

    // if(!form.phoneNumber){
    //   return toast.show("Phone Number is empty", {
    //     type: "warning",
    //   });
    // }

    // if(!form.password.trim()){
    //   return toast.show("Password is empty", {
    //     type: "warning",
    //   });
    // }

    // if(!form.confirmPassword.trim()){
    //   return toast.show("Confirm password is empty", {
    //     type: "warning",
    //   });
    // }

    // if(form.password.trim() !== form.confirmPassword.trim()){
    //   return toast.show("Passwords do not match", {
    //     type: "warning",
    //   });
    // }

    // try {

    //   setIsSubmitting(true)
      
    //   const result = await axiosClient.post("/auth/register", {
    //     firstName: form.firstname,
    //     lastName: form.lastname,
    //     phoneNumber: form.phoneNumber,
    //     email: form.email,
    //     password: form.password.trim(),
    //     confirmPassword: form.confirmPassword.trim(),
    //     referralCode: form.referral,
    //   })

    //   router.push({
    //     pathname: "/(onboarding)/RegisterOTP",
    //     params: { user: JSON.stringify({email: result.data.user.email}) },
    //   });

    //   setForm({
    //     firstname: '',
    //     lastname: '',
    //     phoneNumber: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     referral: ''
    //   })

    // } catch (error: any) {
    //   toast.show(error.response.data.message || error.response.data.error.message,{
    //     type: "danger",
    //   });

    // } finally {
    //   setIsSubmitting(false)
    // } 
  }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <View className='flex-row items-center justify-between mt-3 pb-3'>
        <Image source={images.logo} className='mx-auto'/>
      </View>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center my-6 mt-6">
            <Text className="text-2xl text-center text-green mt-4 font-rbold mb-4">Welcome Back!</Text>
            <FormField title="Email Address" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"/>
            <FormField title="Password" value={form.password} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, password: e })} otherStyles="mt-4"/>
            <View className="justify-end pt-3 flex-row gap-1">
              <TouchableOpacity><Text className='text-base text-green font-rmedium'>Forgot Password?</Text></TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full my-3'>
      <View className='flex-row w-full items-center gap-4'>
        <CustomButton title="Log In" handlePress={submit} containerStyles="w-[78%]" isLoading={isSubmitting} textStyles='text-white'/>
        <Entypo name="fingerprint" size={50} color="#218225" className='w-[18%] mx-auto'/>
      </View>
      <View className="mt-3 flex-row gap-1 items-center justify-center">
        <Text className="text-sm text-center font-rbold">Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(onboarding)/SignUp")}>
          <Text className="text-green font-rbold">Register</Text>
        </TouchableOpacity >
      </View>
    </View>
    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}

export default SignIn
