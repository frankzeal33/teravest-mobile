import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const InvestmentCard = ({item, handlePress, index}: {item: any; handlePress: () => void; index: number}) => {
    const isEven = index % 2 === 0;

  return (
    <View className={`w-[49%] rounded-xl p-2 pb-4 ${isEven ? 'bg-green-lighter' : 'bg-yellow-lighter'}`}>
        <TouchableOpacity onPress={handlePress}>
            <Image source={item.image} className="w-full h-28 rounded-lg mb-2" resizeMode="cover" />
        </TouchableOpacity>

        <Text className="text-lg font-rbold text-green" numberOfLines={1}>{item.title}</Text>
        <Text className="text-sm font-rmedium text-gray-300 mb-2" numberOfLines={1}>{item.description}</Text>

        <View className="flex-row justify-between items-center border-t border-gray-100 pt-2">
            <Text className="text-xs font-rmedium text-gray-300">Monthly Returns</Text>
            <Text className="text-green font-rbold">{item.percentage}%</Text>
        </View>
        
        <View className="flex-row justify-between mt-3 items-center">
            <TouchableOpacity className="bg-green px-3 py-3 rounded-md" onPress={handlePress}>
                <Text className="text-white font-rmedium text-sm">Invest now</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text className="text-green underline text-sm">Learn more</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default InvestmentCard