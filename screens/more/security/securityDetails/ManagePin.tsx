import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton';
import OTPTextInput from "react-native-otp-textinput";


const ManagePin = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [currentPin, setCurrentPin] = useState('')
    const [newPin, setNewPin] = useState('')

      const submit = () => {

      }
      
  return (
    <View className='flex-1 px-4'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='mt-2'>
                    <View>
                        <View className='mt-7'>
                            <Text className='text-base font-rbold pb-2 text-green'>Current PIN</Text>
                            <OTPTextInput
                                handleTextChange={(pin: any) => setCurrentPin(pin)}
                                inputCount={4}
                                containerStyle={style.container}
                                textInputStyle={style.otpTextInput}
                                tintColor={"#218225"}
                                autoFocus={false}
                            />
                        </View>
                        <View className='mt-7'>
                            <Text className='text-base font-rbold pb-2 text-green'>New PIN</Text>
                            <OTPTextInput
                                handleTextChange={(pin: any) => setNewPin(pin)}
                                inputCount={4}
                                containerStyle={style.container}
                                textInputStyle={style.otpTextInput}
                                tintColor={"#218225"}
                                autoFocus={false}
                            />
                        </View>
                    </View>    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <View className='w-full justify-center my-4'>
          <CustomButton title="Update" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
        </View>
    </View>
  )
}

export default ManagePin


const style = StyleSheet.create({
    otpTextInput: {
      backgroundColor: "#ffffff",
      borderColor: "#218225",
      borderWidth: 0.5,
      borderRadius: 6,
      width: 48,
      height: 48,
      borderBottomWidth: 0.5,
      color: "#000000",
      fontSize: 16,
      textAlign: "center",
    },
    container: {
      width: "100%",
      marginHorizontal: "auto"
    }
  });