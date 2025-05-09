import { View, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import FormField from '@/components/FormField'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { data, images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import Modals from '@/components/Modals';
import LottieView from 'lottie-react-native';
import CustomButtomSheet from '@/components/CustomButtomSheet';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';

const NextOfKin = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["30%"], [])
    const { dismiss } = useBottomSheetModal()

      const [selectedGender, setSelectedGender] = useState();
  
      const [form, setForm] = useState({
          fullName: '',
          phoneNumber: '',
          email: '',
          address: '',
          relationship: ''
        })

        const submit = async () => {
          showModal()
        }

        const showModal = async () => {
          handlePresentModalPress()
        }

        const handlePresentModalPress = useCallback(() => {
          bottomSheetModalRef.current?.present();
        }, []);

        const save = async () => {
          setModalVisible(true)
          
          setTimeout(() => {
            setModalVisible(false)
            dismiss()
            router.replace("/(drawer)/(tabs)/home")
          },3000)
        }

  return (
    <View className='flex-1 px-4'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className='mt-2'>
                    <View>
                        <FormField title="Full Name" value={form.fullName} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, fullName: e })} otherStyles="mt-7" />
                        <FormField title="Relationship" value={form.relationship} placeholder="E.g Mother" handleChangeText={(e: any) => setForm({ ...form, relationship: e })} otherStyles="mt-7"/>
                        <FormField title="Address" value={form.address} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, address: e })} otherStyles="mt-7"/>
                        <FormField title="Email Address" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"/>
                        <FormField title="Phone Number" value={form.phoneNumber} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} otherStyles="mt-7" keyboardType="phone-pad"/>
                        <View className='mt-7 mb-10'>
                            <Text className='text-base font-rbold pb-2 text-green'>Gender</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedGender(value)}
                                items={data.gender}
                                value={selectedGender}
                                placeholder={{ label: 'Select gender', value: null }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => {   
                                    return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                                }}
                            />
                        </View>    
                    </View>    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <View className='w-full justify-center my-4'>
          <CustomButton title="Save Update" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
        </View>

        
        <CustomButtomSheet ref={bottomSheetModalRef} snapPoints={snapPoints} enablePenDown={true}>
          <View>
            <TouchableOpacity className='flex-row justify-end' onPress={() => dismiss()}>
                <AntDesign name="closecircle" size={32} color="#C3C3C3" />
            </TouchableOpacity>

            <View className="mx-auto">
              <FontAwesome5 name="exclamation-circle" size={50} color="#ef4444" />
            </View>

            <Text className="text-3xl text-center text-green font-rbold mt-4">Hold on!</Text>
            <Text className="text-base text-center mt-1 font-rlight mb-2">Be sure to confirm your details again</Text>

            <View className='w-full justify-center my-4'>
              <CustomButton title="Confirmed" handlePress={save} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
            </View>
          </View>
        </CustomButtomSheet>
       

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

            <Text className="text-3xl text-center text-green font-rbold -mt-4">Success!</Text>
            <Text className="text-base text-center mt-1 font-rlight mb-6">Profile updated</Text>
          </View> 
        </Modals>    
        
    </View>
  )
}

export default NextOfKin

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 6,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#F3F3F3',
      height: 52,
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
      color: 'black',
      paddingRight: 30,
      backgroundColor: '#F3F3F3',
      height: 52
    },
    iconContainer: {
        top: 10,
        right: 10,
      }
  });