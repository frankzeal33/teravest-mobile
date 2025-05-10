import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import AccountCard from '@/components/AccountCard'
import Loading from '@/components/Loading'
// import { axiosClient } from '@/globalApi'
// import * as SecureStore from "expo-secure-store";
// import { useToast } from 'react-native-toast-notifications'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FormFieldSheet from '@/components/FormFieldSheet'
import Modals from '@/components/Modals'
import LottieView from 'lottie-react-native'
import OTPTextInput from "react-native-otp-textinput";
import ConfirmPin from '@/components/ConfirmPin'

const banks = [
    { label: 'Access Bank Plc.', value: 'access' },
    { label: 'Fidelity Bank Plc.', value: 'fidelity' },
    { label: 'First City Monument Bank Limited.', value: 'fcmb' },
    { label: 'First Bank of Nigeria Limited.', value: 'firstbank' },
    { label: 'Guaranty Trust Holding Company Plc.', value: 'gtb' },
    { label: 'Union Bank of Nigeria Plc.', value: 'union' },
];

const account: any = [
    {
        id: "1",
        accountName: 'ojiego franklin',
        accountNumber: '2039402909',
        backName: 'United Bank of Africa'
    },
    {
        id: "2",
        accountName: 'ojiego franklin',
        accountNumber: '2039402909',
        backName: 'United Bank of Africa'
    },
    {
        id: "3",
        accountName: 'ojiego franklin',
        accountNumber: '2039402909',
        backName: 'United Bank of Africa'
    },
]
const WithdrawalAccountScreen = () => {

  const [loading, setLoading] = useState(false)
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ["70%"], [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [userAccounts, setUserAccount] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [pin, setPin] = useState('')
    const [accountID, setAccountID] = useState('')

    const bottomSheetConfirmPinModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalConfirmPinPress = useCallback(() => {
        bottomSheetConfirmPinModalRef.current?.present();
    }, []);

    const closeConfirmPinModal = useCallback(() => {
        bottomSheetConfirmPinModalRef.current?.close();
    }, []);
 

    const save = async () => {
        setModalVisible(true)
        setTimeout(() => {
            handleCloseModalPress()
            setModalVisible(false)
        },3000)
    }


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    const submit = async () => {
        save()
    }

    useEffect(() => {
        setUserAccount(account)
    }, [])

//    const toast = useToast();

//    const getShipments = async () => {

//       setLoading(true)

//       try {

//         const token = await SecureStore.getItemAsync("accessToken")
//         const result = await axiosClient.get("/shipment/get-shipments", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         })

//         console.log("ship=",result.data.data)

//         setAllShipments(result.data.data); // Save the original list
//         setShipment(result.data.data);     // Also show it initially

//       } catch (error: any) {
//         toast.show(error.response.data.message || error.response.data.error.message,{
//           type: "danger",
//         });
//       } finally {
//         setLoading(false)
//       }
//     }

//     useEffect(() => {
//       getShipments();
//     }, []);

const deleteAccount = async () => {
    const id = accountID
    closeConfirmPinModal()
} 

const handleDelete = (id: string) => {
    setAccountID(id)
    handlePresentModalConfirmPinPress()
}
  
  const renderAccount = ({item, index}: {item: any, index: number}) => (
    <AccountCard item={item} index={index} handlePress={() => handleDelete(item?.id)}/>
  )

  return (
    <SafeAreaView className='h-full bg-inputBg'>
        <View className='px-4'>
            <Header title="Withdrawal Account" showGoBack={true} onpress={() => router.back()}/>
        </View>

        <View className='flex-1'>
            {userAccounts?.length === 0 && !loading ?
            <View className='w-full flex-1 items-center justify-center'>
                <Image source={images.withdrawEmpty} className="mx-auto" resizeMode='contain'/>
            
                <View>
                    <Text className="text-2xl text-center text-blue mt-4 font-rbold">You have no</Text>
                    <Text className="text-2xl text-center text-blue font-rbold"> withdrawal account yet!</Text>
                </View>
            </View>
            : 
                <View>
                    {
                        loading ? (
                            <View className='flex-1'>
                                <Loading/>
                            </View>
                            
                    ) : (
                        <View>
                             {account.length > 0 && (
                                <>
                                 <FlatList
                                    data={userAccounts}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderAccount}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 16, marginVertical: 20 }}
                                    ItemSeparatorComponent={() => <View style={{ width: 12 }} />} // spacing between cards
                                    snapToAlignment="start"
                                    snapToInterval={230 + 12} // width of card + spacing (adjust to your card width)
                                    decelerationRate="fast"
                                    onScroll={e => {
                                        const index = Math.round(
                                        e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
                                        );
                                        setActiveIndex(index);
                                    }}
                                />
                                <View className='flex-row justify-center mt-2'>
                                    {userAccounts.map((_, index) => (
                                        <View key={index} className={`size-2 rounded-full mx-1 ${index === activeIndex ? 'bg-green' : 'bg-gray-200'}`}/>
                                    ))}
                                    </View>
                                    </>
                                )}
                        </View>
                    )
                    }
                </View>
            }
            <View className='px-4 w-full mt-auto'>
                <CustomButton title='Add Account' containerStyles='my-6' textStyles='text-white' handlePress={handlePresentModalPress}/>
            </View>
        </View>


        <CustomButtomSheet ref={bottomSheetModalRef} snapPoints={snapPoints} enablePenDown={false} scrollable>
          <View className='h-full'>
            <TouchableOpacity className='flex-row justify-end' onPress={handleCloseModalPress}>
                <AntDesign name="closecircle" size={32} color="#C3C3C3" />
            </TouchableOpacity>

            <BottomSheetScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full mt-4" contentContainerStyle={{ paddingBottom: 80 }}>
                <View className='flex-1'>
                    <View>
                        <Text className='font-rbold text-green text-2xl mb-2'>Add a withdrawal account</Text>
                        <Text className='font-rmedium text-gray-300 text-lg'>
                            This is where your investment returns will be disbursed
                        </Text>
                    </View>

                    <View className='mt-7'>
                        <Text className='text-base font-rbold pb-2 text-green'>Select Bank</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setSelectedBank(value)}
                            items={banks}
                            placeholder={{ label: 'Enter here', value: null }}
                            style={pickerSelectStyles}
                            value={selectedBank}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {   
                                return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                            }}
                        />
                        <View className="mt-2 flex-row gap-1 items-center">
                            <Text className="text-lg text-center font-rmedium text-gray-300">Can’t find your bank?</Text>
                            <TouchableOpacity onPress={() => router.push("/(drawer)/(routes)/WithdrawalAccount")}>
                                <Text className="text-green font-rbold text-lg">Contact support</Text>
                            </TouchableOpacity >
                        </View>
                    </View>

                    <FormFieldSheet title="Account Number" handleChangeText={(text) => setAccountNumber(text)} placeholder="Enter here" otherStyles="mt-7" keyboardType="number-pad"/>
                    <View className='mt-7'>
                        <Text className='font-rmedium text-gray-300 text-xl'>Account name will appear here</Text>
                    </View>
                </View>
            </BottomSheetScrollView>
            <View className='w-full justify-center my-4'>
                <CustomButton title="Add Account" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
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
    
                <Text className="text-3xl text-center text-green -mt-4 font-rbold">Withdrawal account set up successfully!</Text>
                <Text className="text-base text-center mt-1 font-rlight mb-6">You can now make withdrawals</Text>
            </View>
        </Modals>

        <ConfirmPin onConfirmPin={() => deleteAccount()} bottomSheetModalPinRef={bottomSheetConfirmPinModalRef} closePinModal={closeConfirmPinModal}/>

      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default WithdrawalAccountScreen
  
 
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