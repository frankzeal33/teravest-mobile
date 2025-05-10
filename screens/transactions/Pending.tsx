import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Loading from '@/components/Loading'
import {FontAwesome6 } from '@expo/vector-icons'
import Transactions from '@/components/Transactions'
import { router } from 'expo-router'
import SearchInput from '@/components/SearchInput'
import { images } from '@/constants'

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
  

const Pending = () => {
    
    const [loading, setLoading] = useState(true)


    const renderTransactions = ({item, index}: {item: any, index: number}) => (
        <Transactions item={item} index={index} isLast={index === transactions.length - 1} handlePress={() => router.push({
          pathname: "/(drawer)/(routes)/TransactionReceipt",
            params: { Recieptdata: JSON.stringify(item) },
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
                                ListHeaderComponent={() => (
                                  <View className='flex-row items-center justify-between w-full gap-4 mb-2'>
                                    <View className='rounded-md bg-yellow-light h-[52px] px-4 items-center justify-center'>
                                      <FontAwesome6 name="arrow-down-wide-short" size={30} color="#FEC844"/>
                                    </View>
                                    <SearchInput placeholder="Search Transactions..." otherStyles='flex-1'/>
                                  </View>
                                )}
                                nestedScrollEnabled={true}
                                scrollEnabled={true}
                                data={transactions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderTransactions}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={
                                  transactions.length === 0
                                      ? { flexGrow: 1, justifyContent: 'center', paddingBottom: 100, alignItems: 'center' }
                                      : {paddingBottom: 100, paddingTop: 10}
                                }
                                ListEmptyComponent={() => (
                                <View className='flex-1'>
                                    <View className="w-full items-center mx-auto justify-center my-6 max-w-64 flex-1">
                                        <Image source={images.withdrawEmpty} className="mx-auto" resizeMode='contain'/>
                                        <Text className="text-2xl text-center text-blue mt-4 font-rbold">You have no transactions yet.</Text>
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

export default Pending