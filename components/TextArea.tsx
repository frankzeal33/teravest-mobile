import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import {images} from '../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons';

type formProps = {
  title: string; 
  value: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string,
  otherStyles?: string;
  [props:string]: any;
}

const TextArea = ({ title, value, placeholder, handleChangeText, labelStyle, otherStyles, ...props}: formProps) => {
  
    return (
    <View className={`space-y-2 w-full ${otherStyles}`}>
      <Text className={`text-base font-rbold pb-2 ${labelStyle ? labelStyle : 'text-green'}`}>{title}</Text>
      <View className="border-2 border-inputBg w-full h-64 bg-inputBg rounded-md">
        <View className='flex-row gap-2 justify-between items-center bg-gray-100 m-1 mb-2 p-2 rounded-md'>
          <View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="delete" size={20} color="#787878" />
            </TouchableOpacity>
          </View>
          <Text className={`text-xs font-rmedium max-w-52`} numberOfLines={1}>Receipt.png</Text>
          <View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="file-upload" size={20} color="#787878" />
            </TouchableOpacity>
          </View>
        </View>
        <View className='flex-row'>
          <TextInput className="flex-1 px-4 py-2 bg-inputBg text-black font-aregular text-base h-44" textAlignVertical='top' multiline={true} value={value} placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText}/>
        </View>
      </View>
    </View>
  )
}

export default TextArea