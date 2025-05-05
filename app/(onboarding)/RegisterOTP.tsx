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
// import { axiosClient } from '@/globalApi'
// import * as SecureStore from "expo-secure-store";
// import AsyncStorage from '@react-native-async-storage/async-storage'

const RegisterOTP = () => {

  const [otp, setOtp] = useState('')
  // const toast = useToast();
  // const { user } = useLocalSearchParams() as any;
  // const parsedUser = JSON.parse(user);

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resend, setResend] = useState(false)

  const submit = async () => {
    
    router.push("/(onboarding)/Terms")

    // if(!otp){
    //   return toast.show("OTP fields can't be empty", {
    //     type: "warning",
    //   });
    // }

    // if(otp.length < 4){
    //   return toast.show("OTP needs 4 numbers", {
    //     type: "warning",
    //   });
    // }

    // try {

    //   const data = {
    //     email: parsedUser.email,
    //     verificationCode: otp
    //   }
      
    //   setIsSubmitting(true)

    //   const result = await axiosClient.post("/auth/verify-account", data)

    //   const user = {
    //     email: result.data.user.email,
    //     firstname: result.data.user.first_name,
    //     lastname: result.data.user.last_name,
    //     phoneNumber: result.data.user.phone_number,
    //     location: result.data.user.locationDetails,
    //     profilePicture: result.data.user.profilePicture,
    //     isPinSet: result.data.user.isPinSet,
    //     setPin: false,
    //     gender: result.data.user.gender,
    //     isQuestionSet: result.data.user.isQuestionSet,
    //     questions: result.data.questions || []
    //   }
    //   const userData = JSON.stringify(user);
    //   await SecureStore.setItemAsync("accessToken", result.data.user.accessToken);
    //   await AsyncStorage.setItem("userProfile", userData);

    //   toast.show("Logged in", {
    //     type: "success",
    //   });

    //   setOtp("")

    //   router.replace('/home')

    // } catch (error: any) {
    //   toast.show(error.response.data.message || error.response.data.error.message,{
    //     type: "danger",
    //   });
    // } finally {
    //   setIsSubmitting(false)
    // }

  }

  const resendOtp = async () => {

    // setResendLoading(true)

    // try {
    //   const data = {
    //     email: parsedUser.email,
    //   }
      
    //   const result = await axiosClient.post("/auth/resend-otp", data)

    //   console.log(result.data)

    //   toast.show(result.data.message,{
    //     type: "success",
    //   });

    //   setResend(false)

    // } catch (error: any) {
    //   toast.show(error.response.data.message || error.response.data.error.message,{
    //     type: "danger",
    //   });
    // } finally {
    //   setResendLoading(false)
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
            <Text className="text-2xl text-center text-green mt-4 font-rbold">Verify your email address</Text>
            <Text className="text-sm text-center font-rlight mb-8">Enter <Text className='text-gray-300 font-rbold'>6 (Six)-digit</Text> OTP code sent to <Text className='text-gray-300 font-rbold'>userid@gmail.com</Text></Text>
            <View style={{marginTop:20}}>
              <Text className="text-base text-green font-rbold">Enter Code</Text>
              <OTPTextInput
                handleTextChange={(code: any) => setOtp(code)}
                inputCount={6}
                containerStyle={style.container}
                textInputStyle={style.otpTextInput}
                tintColor={"#218225"}
                autoFocus={false}
              />
              <View className="pt-3 flex-row items-center gap-1">
                {resendLoading ? ( 
                  <FontAwesome5 name="circle-notch" size={20} color="#FF6600" className='animate-spin'/>
                ) : !resend ? (
                  <View className='flex-row items-center gap-0.5'>
                    <Text className="text-base font-rregular">Resend code in</Text>
                    <CountDown
                      until={300}
                      size={15}
                      onFinish={() => setResend(true)}
                      digitStyle={{backgroundColor: '#FFF', width: 20, height: 20, marginTop: -5}}
                      digitTxtStyle={{color: '#218225'}}
                      separatorStyle={{color: '#218225', marginTop: -5}}
                      timeToShow={['M', 'S']}
                      timeLabels={{m: undefined, s: undefined}}
                      showSeparator
                    />
                    {/* <Text className='text-base text-orange font-abold -ml-1 -mt-0.5'>Sec</Text> */}
                  </View>
                  
                ) : ""}
                {(resend && !resendLoading) &&
                  <TouchableOpacity onPress={resendOtp}>
                    <Text className='text-base text-green font-rbold'>Resend Code</Text>
                  </TouchableOpacity>
                }
              </View>
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center my-3'>
      <CustomButton title="Continue" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
      <View className="mt-3 flex-row gap-1 items-center justify-center">
        <Text className="text-sm text-center font-rbold">Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/(onboarding)/SignIn")}>
          <Text className="text-green font-rbold">Login</Text>
        </TouchableOpacity >
      </View>
    </View>

    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}


export default RegisterOTP


const style = StyleSheet.create({
    otpTextInput: {
      backgroundColor: "#F3F3F3",
      borderColor: "#218225",
      borderWidth: 0.5,
      borderRadius: 6,
      width: 45,
      height: 45,
      borderBottomWidth: 0.5,
      color: "#000000",
      fontSize: 16,
      textAlign: "center"
    },
    container: {
      width: "100%"
    }
  });