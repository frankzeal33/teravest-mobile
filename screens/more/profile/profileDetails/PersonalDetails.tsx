import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import FormField from '@/components/FormField'
// import DatePicker from 'react-native-date-picker'
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { data, images } from '@/constants';
// import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';

const PersonalDetails = () => {
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [hasPickedDate, setHasPickedDate] = useState(false);
    const [selectedGender, setSelectedGender] = useState();
    const [selectedID, setSelectedID] = useState();

    console.log(date)

    const [form, setForm] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        confirmPassword: '',
        referral: '',
        IDimage: {}
      })

      console.log(form.IDimage)

      const openPicker = async () => {

        const MAX_FILE_SIZE = 5000000;

        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'],
            copyToCacheDirectory: true,
            multiple: false,
          });
    
          if (result.canceled) return;

            const file: any = result.assets[0];

            if (file.size > MAX_FILE_SIZE) {
                Alert.alert('File too large', 'Please select a file smaller than 5 MB.');
                return;
            }

            if (!result.canceled) {
                setForm({ ...form, IDimage: file}) 
                console.log('Picked document:', file);
            }  
          
        } catch (err) {
          console.error('Error picking document:', err);
        }
      };

    //   const openPicker = async () => {

    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ['images'],
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });
    
    //     // const result = await DocumentPicker.getDocumentAsync({
    //     //   type: selectType === "image" ? ['image/png', 'image/jpg', 'image/jpeg'] : ['video/mp4', 'video/gif']
    //     // })
    
    //     if(!result.canceled) {
    //         setForm({ ...form, IDimage: result.assets[0]})
     
    //     }
    // }

  return (
    <View className='flex-1 px-4'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='mt-2'>
                    <View>
                        <FormField title="Full Name" value={form.fullName} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, fullName: e })} otherStyles="mt-7" />
                        <View className='mt-7'>
                            <Text className='text-base font-rbold pb-2 text-green'>Date of Birth</Text>
                            <TouchableOpacity className='w-full flex-row gap-2 bg-inputBg p-4 items-center justify-between h-[52px] rounded-md'  onPress={() => setOpen(true)}>
                                <Text className={`${hasPickedDate ? 'text-black' : 'text-[#ccc]'}`}>{hasPickedDate ? date.toISOString().split('T')[0] : 'Select Date'}</Text>
                                <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />
                            </TouchableOpacity>
                        </View>
                        <FormField title="Address" value={form.address} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, address: e })} otherStyles="mt-7"/>
                        <FormField title="Email Address" value={form.email} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, email: e })} otherStyles="mt-7" keyboardType="email-address"/>
                        <FormField title="Phone Number" value={form.phoneNumber} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, phoneNumber: e })} otherStyles="mt-7" keyboardType="phone-pad"/>
                        <View className='mt-7'>
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
                        <View className='mt-7'>
                            <Text className='text-base font-rbold pb-2 text-green'>ID Type</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setSelectedID(value)}
                                items={data.IDType}
                                value={selectedID}
                                placeholder={{ label: 'Select ID', value: null }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => {   
                                    return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                                }}
                            />
                        </View>
                        <View className='mt-7'>
                            <Text className='text-base font-rbold pb-2 text-green'>Upload ID</Text>
                            <View className='bg-inputBg p-4 min-h-36 w-full rounded-lg'>
                                <TouchableOpacity className='border-2 border-dashed flex-1 border-gray-200 rounded-md' onPress={openPicker}>
                                    <View className='flex-row items-center justify-center gap-2 my-auto'>
                                       <Image source={images.file}/> 
                                       <View>
                                            <Text className='text-base font-rbold text-green'>Tap to add</Text>
                                            <Text className="font-rregular text-center text-sm text-gray-300">PNG/JPEG/PDF</Text>
                                       </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <Text className="font-rmedium text-sm mt-2 mb-20 text-gray-300">Must be clear and NOT Blurry</Text>
                        </View>
                        
                    </View>    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
{/* 
        <DatePicker
            modal
            open={open}
            mode="date"
            date={date}
            onConfirm={(date) => {
                setOpen(false)
                setHasPickedDate(true)
                setDate(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        /> */}
    </View>
  )
}

export default PersonalDetails

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