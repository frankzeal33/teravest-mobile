import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import { AntDesign, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { data, images } from '@/constants'
import InvestmentCard from '@/components/InvestmentCard'
import CustomButtomSheet from '@/components/CustomButtomSheet'
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { router } from 'expo-router'
import displayCurrency from '@/utils/displayCurrency'
import FormFieldSheet from '@/components/FormFieldSheet'
import RNPickerSelect from 'react-native-picker-select';
import Input from '@/components/Input'
import Details from '@/components/Details'
import moment from 'moment'

const notifications: any = [
    {
        id: "1",
        title: "Cattle",
        image: images.Invest1,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "2.3",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "2",
        title: "Exports",
        image: images.Invest2,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "2",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "500000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "3",
        title: "Grains",
        image: images.Invest3,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "5.5",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "4",
        title: "Chickens",
        image: images.Invest4,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "8",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "5",
        title: "Cattle",
        image: images.Invest1,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "2.3",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "6",
        title: "Exports",
        image: images.Invest2,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "2",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "500000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "7",
        title: "Grains",
        image: images.Invest3,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "5.5",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
    {
        id: "8",
        title: "Chickens",
        image: images.Invest4,
        description: "Cattle farming, also known as cattle ranching or beef production, involves raising domestic cattle for various purposes, primarily meat production, but also for dairy products, leather, and other by-products. Cattle are large ruminant mammals that are commonly raised for their meat (beef cattle)",
        percentage: "8",
        percentageCycle: "month",
        duration: "5 months",
        currentInvestors: "250",
        minimumInvestmentAmount: "100000000",
        suggestedInvestmentAmount: ['10000','400000','6000000','700000','90000000']

    },
]
  

const AllInvestments = () => {
    
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<any>({})
    const bottomSheetPreviewModalRef = useRef<BottomSheetModal>(null);
    const previewSnapPoints = useMemo(() => ["80%"], [])
    const bottomSheetInvestModalRef = useRef<BottomSheetModal>(null);
    const investSnapPoints = useMemo(() => ["90%"], [])
    const bottomSheetPayModalRef = useRef<BottomSheetModal>(null);
    const paySnapPoints = useMemo(() => ["92%"], [])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [returnDecision, setReturnDecision] = useState('')
    const [amount, setAmount] = useState('')

    const handlePresentPreviewModalPress = useCallback(() => {
        bottomSheetPreviewModalRef.current?.present();
    }, []);

    const handleClosePreviewModalPress = useCallback(() => {
        bottomSheetPreviewModalRef.current?.close();
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

    const inputAmount = () => {
        handlePresentInvestModalPress()

        setTimeout(() => {
            handleClosePreviewModalPress()
        },500)
    }

    const pay = () => {
        handlePresentPayModalPress()
    }

    const click = async (item: any) => {

        setPreview(item)

        handlePresentPreviewModalPress()

        // setModalMessage(item)
        // handlePresentModalPress()

        // if(!item?.isRead){
        //   try {
  
        //     const token = await SecureStore.getItemAsync("accessToken")
        //     const result = await axiosClient.patch(`/notifications/${item?.id}/read`, {
        //       headers: {
        //         Authorization: `Bearer ${token}`
        //       }
        //     })
  
        //     console.log("read=",result.data.data.results)
    
    
        //   } catch (error: any) {
        //     toast.show(error.response.data.message || error.response.data.error.message,{
        //       type: "danger",
        //     });
        //   }
        // }
        
    }

    const makePayment = () => {

        handleCloseInvestModalPress()
        handleClosePayModalPress()
        router.push({
            pathname: "/(drawer)/(routes)/PaymentGateway",
            params: { paylink:  ""},
        })
    }

    const renderInvestment = ({item, index}: {item: any, index: number}) => (
        <InvestmentCard item={item} index={index} handlePress={() => click(item)}/>
    )

  return (
    <View className='flex-1 px-4'>
        <View className='flex-1 mt-4'>
            <View className='flex-1'>
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View className='flex-1'>
                            <FlatList
                                nestedScrollEnabled={true}
                                data={notifications}
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderInvestment}
                                columnWrapperStyle={{gap: 4, justifyContent: 'space-between', width: '100%'}}
                                contentContainerStyle={
                                    notifications.length === 0
                                        ? { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }
                                        : {gap: 10, paddingBottom: 100, paddingTop: 10}
                                }
                                ListEmptyComponent={() => (
                                <View>
                                    <View className="w-full items-center mx-auto justify-center max-w-64">
                                        <Image source={images.InvestmentEmpty} className='mx-auto'/>
                                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">Investments have not been added yet</Text>
                                    </View>
                                </View>
                                )}
                            />
                        </View>
                        
                    )
                }
            </View>    
        </View>

        {/* preview */}
        <CustomButtomSheet ref={bottomSheetPreviewModalRef} snapPoints={previewSnapPoints} enablePenDown={false} scrollable>
          <View className='h-full'>
            <TouchableOpacity className='flex-row justify-end' onPress={handleClosePreviewModalPress}>
                <AntDesign name="closecircle" size={32} color="#C3C3C3" />
            </TouchableOpacity>

            <BottomSheetScrollView showsVerticalScrollIndicator={false} className="flex-1 w-full mt-4" contentContainerStyle={{ paddingBottom: 80 }}>
                <View className='flex-1'>
                    <View>
                        <Text className='font-rbold text-green text-2xl mb-2 text-justify'>{preview.title}</Text>
                        <Image source={preview.image} className="w-full h-40 rounded-lg mb-2" resizeMode="cover" />
                    </View>

                    <View className='mt-2'>
                        <Text className='font-rmedium text-gray-300 text-base text-justify'>{preview.description}</Text>
                        <View className="justify-between my-6 w-full flex-row items-start">
                            <View className="gap-1 items-start max-w-[180px]">
                                <Text className="font-rmedium text-base text-gray-300">Return on investment</Text>
                                <Text className="font-rbold text-2xl">
                                    {preview.percentage}%
                                    <Text className='font-rmedium text-gray-300'> per </Text>{preview.percentageCycle}
                                </Text>
                            </View>

                            <View className="gap-1 items-end">
                                <Text className="font-rmedium text-base text-gray-300">Investment duration</Text>
                                <Text className="font-rbold text-2xl" numberOfLines={1}>{preview.duration}</Text>
                            </View>
                        </View>

                        <View className="justify-between w-full flex-row items-start">
                            <View className="gap-1 items-start max-w-[150px]">
                                <Text className="font-rmedium text-base text-gray-300">Current Investors</Text>
                                <Text className="font-rbold text-2xl">{preview.currentInvestors}</Text>
                            </View>

                            <View className="gap-1 items-end">
                                <Text className="font-rmedium text-base text-gray-300">Minimum amount to invest</Text>
                                <Text className="font-rbold text-2xl">{displayCurrency(Number(preview.minimumInvestmentAmount))}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </BottomSheetScrollView>
            <View className='w-full justify-center my-4'>
                <CustomButton title="Invest Now" handlePress={inputAmount} containerStyles="w-full" textStyles='text-white'/>
            </View>
                        
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
                        <Text className='font-rbold text-green text-2xl mb-2 text-justify'>{preview.title}</Text>
                        <Image source={preview.image} className="w-full h-40 rounded-lg mb-2" resizeMode="cover" />
                    </View>

                    <View className='mt-5'>
                        <Text className="text-lg font-rmedium text-gray-300 mb-2">Suggested Amount</Text>
                        <FlatList
                            data={preview.suggestedInvestmentAmount}
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
                        <Text className='text-base font-rbold pb-2 text-green'>Or Enter an Amount <Text className='text-black'>(Min of {displayCurrency(Number(preview.minimumInvestmentAmount))})</Text></Text>
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
                            <Text className="text-lg text-center font-rmedium text-gray-300">Your return: <Text className='font-rbold'>{preview.percentage}% per {preview.percentageCycle}</Text></Text>
                            <Ionicons name="information-circle-outline" size={18} color="#787878" />
                        </View>

                        <View>
                            <Text className='font-rmedium text-gray-300 text-lg'>This is a locked investment for a period of <Text className='font-rbold'>{preview.duration}</Text></Text>
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
                        <Details title='Investment option' value={preview.title}/>
                        <Details title='Cycle' value={`per ${preview.percentageCycle}`}/>
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
    </View>
  )
}

export default AllInvestments

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