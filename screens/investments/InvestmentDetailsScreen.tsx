import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions, Pressable } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Header from '@/components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { router, useLocalSearchParams } from 'expo-router'
import { data, images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import AccountCard from '@/components/AccountCard'
import Loading from '@/components/Loading'
// import { axiosClient } from '@/globalApi'
// import * as SecureStore from "expo-secure-store";
// import { useToast } from 'react-native-toast-notifications'
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import FormFieldSheet from '@/components/FormFieldSheet'
import Modals from '@/components/Modals'
import LottieView from 'lottie-react-native'
import OTPTextInput from "react-native-otp-textinput";
import ConfirmPin from '@/components/ConfirmPin'
import SelectDropdown from 'react-native-select-dropdown'
import displayCurrency from '@/utils/displayCurrency'
import moment from 'moment'
import FormField from '@/components/FormField'
import Input from '@/components/Input'
import Details from '@/components/Details'
import { SceneMap, TabView } from 'react-native-tab-view'
import Transactions from '@/components/Transactions'

const transactions: any = [
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "DEBIT",
      paymentStatus: "COMPLETED"
    }
  },
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "CREDIT",
      paymentStatus: "FAILED"
    }
  },
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "DEBIT",
      paymentStatus: "PENDING"
    }
  }
]

const InvestmentDetailsScreen = () => {

    const { investmentData } = useLocalSearchParams() as any;
    const parsedInvestmentData =  investmentData ? JSON.parse(investmentData) : null;
  const [loading, setLoading] = useState(false)
  const emailSnapPoints = useMemo(() => ["40%"], [])
  const bottomSheetEmailModalRef = useRef<BottomSheetModal>(null);
  const successSnapPoints = useMemo(() => ["40%"], [])
  const bottomSheetSuccessModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetInvestModalRef = useRef<BottomSheetModal>(null);
      const investSnapPoints = useMemo(() => ["90%"], [])
       const bottomSheetPayModalRef = useRef<BottomSheetModal>(null);
          const paySnapPoints = useMemo(() => ["92%"], [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [email, setEmail] = useState('')
     const [returnDecision, setReturnDecision] = useState('')
        const [amount, setAmount] = useState('')
        const [active, setActive] = useState("all")

    const handlePresentEmailModalPress = useCallback(() => {
        bottomSheetEmailModalRef.current?.present();
    }, []);

    const handleCloseEmailModalPress = useCallback(() => {
        bottomSheetEmailModalRef.current?.close();
    }, []);

    const handlePresentSuccessModalPress = useCallback(() => {
        bottomSheetSuccessModalRef.current?.present();
    }, []);

    const handleCloseSuccessModalPress = useCallback(() => {
        bottomSheetSuccessModalRef.current?.close();
    }, []);

    const handlePresentInvestModalPress = useCallback(() => {
        bottomSheetInvestModalRef.current?.present();
    }, []);

    const handleCloseInvestModalPress = useCallback(() => {
        bottomSheetInvestModalRef.current?.close();
    }, []);

     const handlePresentPayModalPress = useCallback(() => {
        bottomSheetPayModalRef.current?.present();
    }, []);

    const handleClosePayModalPress = useCallback(() => {
        bottomSheetPayModalRef.current?.close();
    }, []);
 

    const confirmStatement = async () => {
        handlePresentEmailModalPress()
    }

    const pay = () => {
        handlePresentPayModalPress()
    }

    const makePayment = () => {
    
        handleCloseInvestModalPress()
        handleClosePayModalPress()
        router.push({
            pathname: "/(drawer)/(routes)/PaymentGateway",
            params: { paylink:  ""},
        })
    }

    const sendStatement = async () => {
        handleCloseEmailModalPress()
        handlePresentSuccessModalPress()        
    }

    const allTransactions = () => {
      setActive("all")
      // setData(allFetchTransactions)
    }
  
    const pendingTransactions = () => {
      setActive("pending")
  
      // const pendings = allFetchTransactions.filter((item: any) => item?.details?.paymentStatus === "PENDING")
  
      // setData(pendings)
    }
  
    const failedTransactions = () => {
      setActive("failed")
  
      // const fail = allFetchTransactions.filter((item: any) => item?.details?.paymentStatus === "FAILED")
  
      // setData(fail)
    }
  
    const successfulTransactions = () => {
      setActive("successful")
  
      // const success = allFetchTransactions.filter((item: any) => item?.details?.paymentStatus === "SUCCESSFUL")
  
      // setData(success)
    }

    const renderTransactions = ({item, index}: {item: any, index: number}) => (
      <Transactions item={item} index={index} isLast={index === transactions.length - 1} handlePress={() => router.push({
          pathname: "/(drawer)/(routes)/TransactionReceipt",
          params: { Recieptdata: JSON.stringify(item) },
      })}/>
    )

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

const listHeader = () => (
  <View>
    <View className='mt-6 flex-row items-center justify-between gap-1'>

      <SelectDropdown
          data={data.cycleType}
          onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
              return (
                  <View style={styles.dropdownButtonStyle2}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                          {(selectedItem && selectedItem.title) || 'Cycle'}
                      </Text>
                      <MaterialIcons name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#C3C3C3" />
                  </View>
              );
          }}
          renderItem={(item, index, isSelected) => {
              return (
                  <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#E4FFE5'})}}>
                      <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
              );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
      />

      <View className={`flex-row items-center gap-1 justify-center px-4 py-2 rounded-full ${parsedInvestmentData.status === "ACTIVE" ? "bg-green-200" : "bg-red-200"} `}>
          <Text className={`font-rbold text-base capitalize ${parsedInvestmentData.status === "ACTIVE" ? "text-green" : "text-red-600"}`}>{parsedInvestmentData.status}</Text>
          <Ionicons name="checkmark-circle" size={16} color={parsedInvestmentData.status === "ACTIVE" ? "#218225" : "#dc2626"} />
      </View>
    </View>

    <View className='bg-white mt-6 border border-gray-100 rounded-3xl px-4 py-6'>
      <View className='gap-2'>
          <View className='w-full gap-1'>
              <View className='flex-row gap-2 items-center'>
                  <View className='rounded-md bg-yellow-light size-9 items-center justify-center'>
                  <Ionicons name="arrow-undo-sharp" size={20} color="#FEC844" />
                  </View>
                  <Text className="font-rmedium text-lg">Investment Amount</Text>
              </View>
          </View>
          <Text className="font-rbold text-2xl text-black">{displayCurrency(Number(parsedInvestmentData.investmentAmount))}</Text>
      </View>

      <View className='border border-gray-100/60 w-full my-3'/>

      <View className='gap-2'>
          <View className='w-full gap-1'>
              <View className='flex-row gap-2 items-center'>
                  <View className='rounded-md bg-yellow-light size-9 items-center justify-center'>
                      <MaterialCommunityIcons name="sack" size={20} color="#FEC844" />
                  </View>
                  <Text className="font-rmedium text-lg">ROI Rate</Text>
              </View>
          </View>
          <Text className="font-rbold text-2xl text-black">{parsedInvestmentData.percentage}%</Text>
      </View>

      <View className='border border-gray-100/60 w-full my-3'/>

      <View className='gap-2'>
          <View className='w-full gap-1'>
              <View className='flex-row gap-2 items-center'>
                  <View className='rounded-md bg-yellow-light size-9 items-center justify-center'>
                      <Ionicons name="calendar" size={20} color="#FEC844" />
                  </View>
                  <Text className="font-rmedium text-lg">Start Date/Time</Text>
              </View>
          </View>
          <Text className="font-rbold text-2xl text-black">{moment(parsedInvestmentData.startDate).format('DD/MM/YYYY hh:mm:ss A')}</Text>
      </View>

      <View className='border border-gray-100/60 w-full my-3'/>

      <View className='gap-2'>
          <View className='w-full gap-1'>
              <View className='flex-row gap-2 items-center'>
                  <View className='rounded-md bg-yellow-light size-9 items-center justify-center'>
                      <Ionicons name="calendar" size={20} color="#FEC844" />
                  </View>
                  <Text className="font-rmedium text-lg">End Date/Time</Text>
              </View>
          </View>
          <Text className="font-rbold text-2xl text-black">{moment(parsedInvestmentData.endDate).format('DD/MM/YYYY hh:mm:ss A')}</Text>
      </View>

      
      <View className="flex-row items-center justify-between w-full mt-6 gap-1">
          <CustomButton title="+  Top up" handlePress={handlePresentInvestModalPress} containerStyles="w-full" textStyles='text-white'/>
      </View>

      <TouchableOpacity onPress={confirmStatement} className='my-4'>
          <Text className="font-rbold text-lg text-green underline">Request Investment Statement</Text>
      </TouchableOpacity>
  </View>

    <View className='flex-row items-center justify-between mt-6 mb-1'>
      <Text className='font-rbold'>Investment transactions</Text>
      <View className='rounded-md bg-yellow-light size-10 items-center justify-center'>
        <FontAwesome6 name="arrow-down-wide-short" size={20} color="#FEC844"/>
      </View>
    </View>
  
    {/* navigate */}
    <View className='flex-row justify-between items-center mb-5 mt-2 w-full gap-1'>
      <Pressable className={`w-[16%] justify-center rounded-md items-center py-3 ${active === "all" ? "bg-green" : "bg-green/50"}`} onPress={allTransactions}>
          <Text className={`text-sm text-white ${active === "all" ? "font-abold text-orange" : "text-blue"}`}>All</Text>
      </Pressable>

      <Pressable className={`w-[26%] justify-center rounded-md items-center py-3 ${active === "pending" ? "bg-green" : "bg-green/50"}`} onPress={pendingTransactions}>
          <Text className={`text-sm text-white ${active === "pending" ? "font-abold text-orange" : "text-blue"}`}>Pending</Text>
      </Pressable>

      <Pressable className={`w-[26%] justify-center rounded-md items-center py-3 ${active === "failed" ? "bg-green" : "bg-green/50"}`} onPress={failedTransactions}>
          <Text className={`text-sm text-white ${active === "failed" ? "font-abold text-orange" : "text-blue"}`}>Failed</Text>
      </Pressable>

      <Pressable className={`w-[26%] justify-center rounded-md items-center py-3 ${active === "successful" ? "bg-green" : "bg-green/50"}`} onPress={successfulTransactions}>
          <Text className={`text-sm text-white ${active === "successful" ? "font-abold text-orange" : "text-blue"}`}>Completed</Text>
      </Pressable>
    </View>

  </View>
)

  return (
    <SafeAreaView className='h-full bg-inputBg px-4'>
        <Header title="Investment" showGoBack={true} onpress={() => router.back()}/>
  
        <View>
              {loading ? (
                  <Loading/>
                ) : (
                  <FlatList
                    nestedScrollEnabled={true}
                    scrollEnabled={true}
                    ListHeaderComponent={listHeader}
                    data={transactions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderTransactions}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                      <View className="w-full items-center mx-auto justify-center my-6 max-w-52 flex-1">
                        <Image source={images.noTransaction} className='size-20' resizeMode='contain'/>
                        <Text className="text-2xl text-center text-blue mt-4 font-ablack">No transactions yet!</Text>
                        <Text className="text-sm text-center text-blue mt-1 font-alight">All your transactions will show here.</Text>
                      </View>
                    )}
                    ListFooterComponent={() => (
                      <View className='mb-20'/>
                    )}
                />
                )}
        </View>

        <CustomButtomSheet ref={bottomSheetEmailModalRef} snapPoints={emailSnapPoints} enablePenDown={false}>
            <View className='h-full'>
                <TouchableOpacity className='flex-row justify-end' onPress={handleCloseEmailModalPress}>
                    <AntDesign name="closecircle" size={32} color="#C3C3C3" />
                </TouchableOpacity>


                <View className='flex-1'>
                    <View>
                        <Text className='font-rbold text-green text-2xl mb-2'>Investment statement</Text>
                        <Text className='font-rmedium text-gray-300 text-lg'>
                            This statement will include all your returns, deposits & withdrawals during the period selected below
                        </Text>
                    </View>

                    <FormFieldSheet title="Email Address" value={email} placeholder="Enter here" handleChangeText={(e: any) => setEmail(e)} otherStyles="mt-7" keyboardType="email-address"/>
                </View>
                <View className='w-full justify-center my-4'>
                    <CustomButton title="Send" handlePress={sendStatement} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
                </View>
                        
            </View>     
        </CustomButtomSheet>

        <CustomButtomSheet ref={bottomSheetSuccessModalRef} snapPoints={successSnapPoints} enablePenDown={false}>
            <View className='h-full'>
                <TouchableOpacity className='flex-row justify-end' onPress={handleCloseSuccessModalPress}>
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
                <Text className="text-base text-center mt-1 font-rlight mb-6">We have sent the statement of your investment to the email ID you provided.</Text>
                        
            </View>     
        </CustomButtomSheet>

        {/* select amount */}
        <CustomButtomSheet ref={bottomSheetInvestModalRef} snapPoints={investSnapPoints} enablePenDown={false} scrollable>
          <View className='h-full'>
            <TouchableOpacity className='flex-row justify-end' onPress={handleCloseInvestModalPress}>
                <AntDesign name="closecircle" size={32} color="#C3C3C3" />
            </TouchableOpacity>

            <BottomSheetScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full mt-4" contentContainerStyle={{ paddingBottom: 80 }}>
                <View className='flex-1'>
                    <View>
                        <Text className='font-rbold text-green text-2xl mb-2 text-justify'>{parsedInvestmentData.title}</Text>
                        <Image source={parsedInvestmentData.image} className="w-full h-40 rounded-lg mb-2" resizeMode="cover" />
                    </View>

                    <View className='mt-5'>
                        <Text className="text-lg font-rmedium text-gray-300 mb-2">Suggested Amount</Text>
                        <FlatList
                            data={parsedInvestmentData.suggestedInvestmentAmount}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) => (
                                <View className={`items-center justify-center px-3 py-2 rounded-full bg-green-100`}>
                                    <Text className={`font-rmedium text-sm capitalize text-green-500`}>{displayCurrency(Number(item))}</Text>
                                </View>
                            )}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View style={{ width: 8 }} />} // spacing between cards
                            snapToAlignment="start"
                        />
                    </View>

                    <View className='mt-7'>
                        <Text className='text-base font-rbold pb-2 text-green'>Or Enter an Amount <Text className='text-black'>(Min of {displayCurrency(Number(parsedInvestmentData.minimumInvestmentAmount))})</Text></Text>
                        <Input handleChangeText={(text) => setAmount(text)} placeholder="Enter here" keyboardType="number-pad"/>
                    </View>

                    <View className='mt-7'>
                        <Text className='text-base font-rbold pb-2 text-green'>Decision after maturity</Text>
                        <RNPickerSelect
                            onValueChange={(value) => setReturnDecision(value)}
                            items={data.returnDecision}
                            placeholder={{ label: 'Select', value: null }}
                            style={pickerSelectStyles}
                            value={returnDecision}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => {   
                                return <MaterialIcons name="arrow-drop-down" size={30} color="#C3C3C3" />;
                            }}
                        />
                    </View>

                    <View className='mt-5'>
                        <View className="mt-2 flex-row gap-1 items-center">
                            <Text className="text-lg text-center font-rmedium text-gray-300">Your return: <Text className='font-rbold'>{parsedInvestmentData.percentage}% per {parsedInvestmentData.percentageCycle}</Text></Text>
                            <Ionicons name="information-circle-outline" size={18} color="#787878" />
                        </View>

                        <View>
                            <Text className='font-rmedium text-gray-300 text-lg'>This is a locked investment for a period of <Text className='font-rbold'>{parsedInvestmentData.duration}</Text></Text>
                        </View>
                    </View>
                    
                </View>
            </BottomSheetScrollView>
            <View className='w-full justify-center my-4'>
                <CustomButton title="Invest Now" handlePress={pay} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
            </View>
                        
          </View>     
        </CustomButtomSheet>

         {/* summary */}
         <CustomButtomSheet ref={bottomSheetPayModalRef} snapPoints={paySnapPoints} enablePenDown={false} scrollable>
            <View className='h-full'>
            <TouchableOpacity className='flex-row justify-end' onPress={handleClosePayModalPress}>
                <AntDesign name="closecircle" size={32} color="#C3C3C3" />
            </TouchableOpacity>

            <BottomSheetScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full mt-4" contentContainerStyle={{ paddingBottom: 80 }}>
                <View className='flex-1'>
                    <View>
                        <Text className='font-rbold text-green text-2xl mb-2'>Investment Summary</Text>
                        <Text className='font-rmedium text-gray-300 text-lg'>
                            Kindly confirm the details before making payment
                        </Text>
                    </View>

                    <View className='mt-7'>
                        <Details title='Name of Investor' value={"Oladapo Koiki"}/>
                        <Details title='Investment option' value={parsedInvestmentData.title}/>
                        <Details title='Cycle' value={`per ${parsedInvestmentData.percentageCycle}`}/>
                        <Details title='Date of Investment' value={moment(new Date()).format('ll')}/>
                        <Details title='What should happen to ROI' value={returnDecision ? returnDecision : "Nil"}/>
                        <Details title='Status' value={"Pending"}/>
                        <Details title='Amount' value={displayCurrency(Number(amount))}/>
                        <Details title='Transaction Fee' value={displayCurrency(Number(500))}/>
                        <Details title='Total' value={displayCurrency(Number(50000))}/>
                    </View>
                </View>
            </BottomSheetScrollView>
            <View className='bg-gray-100 my-4 px-4 py-6 rounded-lg'>
                <Text className='font-rmedium text-black text-lg mb-6'>Make Payment With:</Text>
                <View className="w-full flex-row items-center justify-between gap-1">
                    <TouchableOpacity onPress={makePayment} className='w-[43%]'>
                        <Image source={images.saveHaven} className='rounded-md w-full'/>
                    </TouchableOpacity>
                    <Text className='font-rbold text-green text-lg'>OR</Text>
                    <TouchableOpacity onPress={makePayment} className='w-[43%]'>
                        <Image source={images.nomba} className='rounded-md w-full'/>
                    </TouchableOpacity>
                </View>
            </View>
                        
            </View>     
        </CustomButtomSheet>
        
      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default InvestmentDetailsScreen
  
 
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


const styles = StyleSheet.create({
    dropdownButtonStyle2: {
      width: "45%",
      height: 45,
      backgroundColor: '#DDDDDD',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      color: '#218225',
      fontFamily: "Raleway-Medium",
    },
    dropdownButtonArrowStyle: {
      fontSize: 30,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#ffffff',
      borderRadius: 8,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
      fontFamily: "Raleway-Medium",
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });