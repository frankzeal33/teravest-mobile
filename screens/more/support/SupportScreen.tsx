import { View, Text, ScrollView, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Feather from '@expo/vector-icons/Feather';
import Header from '@/components/Header'
import TextArea from '@/components/TextArea'
// import { useToast } from 'react-native-toast-notifications'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useFocusEffect } from '@react-navigation/native'
import Modals from '@/components/Modals'
import { AntDesign } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { images } from '@/constants'

const SupportScreen = () => {

  // const toast = useToast();
  const [modalVisible, setModalVisible] = useState(false)
  const [form, setForm] = useState({
    goodsType: '',
    itemCategory: '',
    item: '',
    details: '',
    quantity: '',
    onlineStoreLink: '',
    amount: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const submit = async () => {
    setModalVisible(!modalVisible)
  }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <Header title="Support" showGoBack={true} onpress={() => router.back()}/>
      <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="w-full justify-center my-4 mt-2">
            <FormField title="Message Subject" value={form.item} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, item: e })} otherStyles="mt-7"/>
            <TextArea title="Message Body" value={form.details} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, details: e })} otherStyles="mt-7"/>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
    <View className='w-full justify-center gap-2 my-4'>
      <CustomButton title="Send message" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
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
        <Text className="text-base text-center mt-1 font-rlight mb-6">Message sent</Text>
      </View>
    </Modals>

    <StatusBar backgroundColor="#ffffff" style='dark'/>
  </SafeAreaView>
  )
}

export default SupportScreen