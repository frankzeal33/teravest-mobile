import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Notification from '@/components/Notification'
import Loading from '@/components/Loading'
import { Octicons } from '@expo/vector-icons'

const notifications: any = [
    // {
    //     title: "Your cattle investment ROI will be due for payment in 5 days time.",
    //     message1: "We are pleased to inform you that your investment with ArdVest has reached maturity.",
    //     message2: "We would like to congratulate you on the successful completion of your investment term. As a result, your investment has now matured, and you are eligible to receive the returns or proceeds as per the terms of your investment agreement.",
    //     createdAt: "2025-05-06 14:30:00",
    //     isRead: false
    // },
    // {
    //     title: "Your cattle investment ROI will be due for payment in 5 days time.",
    //     message1: "We are pleased to inform you that your investment with ArdVest has reached maturity.",
    //     message2: "We would like to congratulate you on the successful completion of your investment term. As a result, your investment has now matured, and you are eligible to receive the returns or proceeds as per the terms of your investment agreement.",
    //     createdAt: "2025-05-06 14:30:00",
    //     isRead: true
    // },
    // {
    //     title: "Your cattle investment ROI will be due for payment in 5 days time.",
    //     message1: "We are pleased to inform you that your investment with ArdVest has reached maturity.",
    //     message2: "We would like to congratulate you on the successful completion of your investment term. As a result, your investment has now matured, and you are eligible to receive the returns or proceeds as per the terms of your investment agreement.",
    //     createdAt: "2025-05-06 14:30:00",
    //     isRead: false
    // }
]
  

const Activities = () => {
    
    const [loading, setLoading] = useState(false)

    const click = async (item: any) => {

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

    const renderNotification = ({item, index}: {item: any, index: number}) => (
        <Notification item={item} index={index} isLast={index === notifications.length - 1} handlePress={() => click(item)}/>
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
                            <Text className="font-rbold text-lg">Today</Text>
                            <FlatList
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={notifications}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderNotification}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                                ListEmptyComponent={() => (
                                <View>
                                    <View className="w-full items-center mx-auto justify-center max-w-64">
                                        <View className='flex items-center justify-center size-16 rounded-full bg-green-lighter'>
                                            <Octicons name="bell-fill" size={32} color="#218225" />
                                        </View>
                                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">No notifications yet</Text>
                                        <Text className="text-sm text-center text-blue mt-1 font-rlight">You don't have any activities notification for now</Text>
                                    </View>
                                </View>
                                )}
                            />
                        </View>
                        
                    )
                }
            </View>    
        </View>
    </View>
  )
}

export default Activities