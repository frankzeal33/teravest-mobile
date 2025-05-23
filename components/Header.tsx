import { View, Text, TouchableOpacity } from 'react-native'
import React, { ReactElement } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

type headerProps = {
    title: string;
    right?: ReactElement, 
    showGoBack?: boolean;
    showRight?: boolean;
    icon?: any;
    onpress?: () => void
}

export default function Header({title, right, showGoBack, showRight, icon, onpress}: headerProps) {
  return (
    <View className='flex-row items-center justify-between mt-4 pb-4 gap-1'>
        {showGoBack ? 
          <TouchableOpacity onPress={onpress} className='size-9 items-center justify-center bg-gray-100 rounded-full'>
            <AntDesign name="left" size={22} color="black"/>
          </TouchableOpacity>
          : <Text/>
        }
        <Text className="text-2xl text-green font-rmedium">{title}</Text>
        {showRight ? (
          icon
        ) : (
          <View className='w-8'/>
        )}
    </View>
  )
}