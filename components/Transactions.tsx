import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Feather from '@expo/vector-icons/Feather';
import moment from 'moment'
import displayCurrency from '@/utils/displayCurrency';

const Transactions = ({item, handlePress, index, isLast}: {item: any; handlePress: () => void; index: number; isLast: boolean}) => {
  return (
    <Pressable key={index} onPress={handlePress} className={`${!isLast ? 'border-b border-[#ccc]/70' : ''}`}>
      <View className="justify-between my-3 w-full flex-row items-end bg-gray-light rounded-lg p-3">
        <View className="gap-1 items-start max-w-[160px]">
          <View className={`flex items-center justify-center size-10 rounded-full ${item?.details?.paymentType === "CREDIT" ? "bg-green-100" : item?.details?.paymentType === "DEBIT" ? "bg-red-100" : "bg-yellow-100"} `}>
            <Feather name={item?.details?.paymentType === "DEBIT" ? "arrow-up-right" : item?.details?.paymentType === "CREDIT" ? "arrow-down-left" : "minus"} color={item?.details?.paymentType === "CREDIT" ? "#22c55e" : item?.details?.paymentType === "DEBIT" ? "#ef4444" : "#ca8a04"} size={20}/>
          </View>
          <Text className="font-rbold text-base capitalize" numberOfLines={1}>{item?.details?.name}</Text>
          <Text className="font-rmedium text-xs" numberOfLines={1}>{item?.details?.accountNumber}</Text>
        </View>

        <View className="gap-1 items-end">
          <View className={`flex items-center justify-center px-3 py-1 rounded-full ${item?.details?.paymentStatus === "COMPLETED" ? "bg-green-100" : item?.details?.paymentStatus === "FAILED" ? "bg-red-100" : "bg-yellow-100"} `}>
            <Text className={`font-rmedium text-sm capitalize ${item?.details?.paymentStatus === "COMPLETED" ? "text-green-500" : item?.details?.paymentStatus === "FAILED" ? "text-red-500" : "text-yellow-600"}`}>{item?.details?.paymentStatus}</Text>
          </View>
          <Text className="font-rbold text-base" numberOfLines={1}>{displayCurrency(Number(item?.details?.total_amount))}</Text>
          <Text className="font-rmedium text-xs" numberOfLines={1}>{moment(item?.details?.createdAt).format('llll')}</Text>
        </View>
      </View>
    </Pressable>

  )
}

export default Transactions