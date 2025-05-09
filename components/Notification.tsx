import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DateLabels } from '@/utils/DateLabels';

const Notification = ({item, handlePress, index, isLast}: {item: any; handlePress: () => void, index: number; isLast: boolean}) => {
  return (
    <Pressable key={index} onPress={handlePress} className={`${!isLast ? 'border-b border-[#ccc]/70' : ''}`}>
        <View className="justify-between w-full flex-row items-start gap-2 bg-gray-light rounded-lg p-2 my-4">
          <View className="items-start flex-row gap-2">
            <View className='flex items-center justify-center size-8 rounded-full bg-white'>
                <FontAwesome name="bell" size={15} color="#218225"/>
            </View>
            <View className='flex-col'>
                <Text className="font-amedium text-base text-blue max-w-48" numberOfLines={3}>{item.title}</Text>
            </View>
          </View>

          <View className='flex items-end justify-end gap-2'>
            <Text className="font-abold text-sm text-blue">{DateLabels(item.createdAt)}</Text>
            <Text className={`font-rbold text-xs ${item.isRead === false ? 'text-yellow-500' : 'text-green'}`}>{item.isRead === false ? 'Unread' : 'Read'}</Text>
          </View>
        </View>
    </Pressable >
  )
}

export default Notification