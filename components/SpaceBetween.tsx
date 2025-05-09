import { View, Text, Pressable } from 'react-native'
import React, { ReactElement } from 'react'
import { Image } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

type rowProp = {
    title: string;
    desc: string; 
    image?: any; 
    balance?: string;
    descStyle?: string;
    lefticon?: ReactElement;
    onpress: () => void
}

export default function SpaceBetween({title, desc, descStyle, image, onpress, balance, lefticon}: rowProp) {
  return (
    <Pressable onPress={onpress} className="justify-between w-full flex-row items-center bg-white border-b border-gray-100 rounded-lg py-3">
        <View className="items-center flex-row gap-2">
          {lefticon ? 
            <View className={`flex items-center justify-center size-10 rounded-full bg-orangeLight `}>
              {lefticon}
            </View> : 
            <View>
              <Image source={image} className="w-10 h-10" resizeMode='contain'/>
            </View>
          }
          
          <View className='flex-col'>
              <View className='flex-row gap-1 items-center'>
                <Text className="font-amedium text-base text-blue">{title}</Text>
                {balance && 
                  <View className='rounded-full px-2 py-1 bg-orangeLight flex-row gap-1 items-center'>
                    <Text className="font-alight text-xs text-orange">Bal:</Text>
                    <Text className="font-amedium text-xs text-orange">{balance}</Text>
                  </View>
                }
              </View>
              <Text className={`font-amedium text-gray-300 ${descStyle ? descStyle : 'text-xs'}`}>{desc}</Text>
          </View>
        </View>

        <Entypo name="chevron-small-right" size={24} color="#787878" />
    </Pressable>
  )
}