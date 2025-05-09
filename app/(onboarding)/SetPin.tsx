import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, BackHandler } from 'react-native'
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
import Checkbox from 'expo-checkbox';
import LottieView from 'lottie-react-native';
import Modals from '@/components/Modals'

const SetPin = () => {

  const [otp, setOtp] = useState('')
  const [isChecked, setChecked] = useState(false);
  // const toast = useToast();
  // const { user } = useLocalSearchParams() as any;
  // const parsedUser = JSON.parse(user);

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [modalVisible, setModalVisible] = useState(false)

  const submit = async () => {
    showModal()

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

  const showModal = async () => {
    setModalVisible(!modalVisible)
    setTimeout(() => {
        router.replace("/(drawer)/(tabs)/home")
    },2000)
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
            <Text className="text-2xl text-center text-green mt-4 font-rbold">Finally, create a new PIN</Text>
            <Text className="text-sm text-center mx-auto font-rlight mb-8 max-w-80">This PIN should be a secure 4 (four)-digit PIN to confirm transactions when using the app</Text>
            <View style={{marginTop:10}}>
              <OTPTextInput
                handleTextChange={(code: any) => setOtp(code)}
                inputCount={4}
                containerStyle={style.container}
                textInputStyle={style.otpTextInput}
                tintColor={"#218225"}
                autoFocus={false}
              />
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center my-3'>
      <View className='w-full flex-row items-start gap-2 mb-6'>
        <Checkbox value={isChecked} onValueChange={setChecked} color='#218225' style={{borderRadius: 5}}/>
        <View className="flex-row flex-wrap flex-1 w-[90%] -mt-1">
          <Text className="font-rlight">By checking this box, you totally accept the </Text>
          <TouchableOpacity onPress={() => router.push("/(onboarding)/Terms")}>
            <Text className="text-green font-rbold">terms & conditions</Text>
          </TouchableOpacity>
          <Text className="font-rlight"> of Terevest</Text>
        </View>
      </View>
      <CustomButton title="Create PIN" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
    </View>


    <Modals showModal={modalVisible}>
      <View>
        <TouchableOpacity className='flex-row justify-end' onPress={() => setModalVisible(!modalVisible)}>
            <AntDesign name="closecircle" size={32} color="#C3C3C3" />
        </TouchableOpacity>

        <LottieView
          autoPlay
          loop={false}
          style={{
            width: 150,
            height: 150,
            alignSelf: 'center'
          }}
          source={images.Animatedcheck}
        />

        <Text className="text-3xl text-center text-green -mt-4 font-rbold">Success!</Text>
        <Text className="text-base text-center mt-1 font-rlight mb-6">You have created a PIN</Text>
      </View>
    </Modals>

    <StatusBar style='dark'/>
  </SafeAreaView>
  )
}


export default SetPin


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
      textAlign: "center",
    },
    container: {
      width: "70%",
      marginHorizontal: "auto"
    }
  });