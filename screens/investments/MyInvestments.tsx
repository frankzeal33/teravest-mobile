import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import { Octicons } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { images } from '@/constants'
import MyInvestmentCard from '@/components/MyInvestmentCard'
import { router } from 'expo-router'

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
        status: "ACTIVE",
        investmentAmount: "30000",
        startDate: "2025-05-09T14:30:00Z",
        endDate: "2026-05-09T14:30:00Z"

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
        status: "IN ACTIVE",
        investmentAmount: "60000",
        startDate: "2025-05-09T14:30:00Z",
        endDate: "2026-05-09T14:30:00Z"
    }
]
  

const MyInvestments = ({ goToAllInvestments }: { goToAllInvestments: () => void }) => {
    
    const [loading, setLoading] = useState(false)

    const renderInvestment = ({item, index}: {item: any, index: number}) => (
        <MyInvestmentCard item={item} index={index} handlePress={() => router.push({
            pathname: "/(drawer)/(routes)/InvestmentDetails",
            params: { investmentData: JSON.stringify(item) }
        })}/>
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
                                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">You have no investments yet</Text>
                                    </View>
                                </View>
                                )}
                            />
                            <View className='w-full'>
                                <CustomButton title='Add Investment' containerStyles='my-6' textStyles='text-white' handlePress={goToAllInvestments}/>
                            </View>
                        </View> 
                    )
                }
            </View>    
        </View>
    </View>
  )
}

export default MyInvestments