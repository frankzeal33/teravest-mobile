import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { KeyboardTypeOptions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type formProps = {
  value?: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string;
  inputBg?: string;
  disabled?: boolean;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  [props:string]: any;
}

const Input = ({ value, placeholder, inputBg, keyboardType, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className={`${inputBg ? inputBg : 'bg-inputBg'} border-2 border-inputBg w-full h-[52px] px-4 rounded-md focus:border-orange-300 items-center flex-row gap-1`}>
        <TextInput className={`${inputBg ? inputBg : 'bg-inputBg'} flex-1 text-black font-aregular text-base h-full`} style={{ textAlignVertical: 'center' }} value={value} placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText} keyboardType={keyboardType ? keyboardType: 'default'} editable={disabled}/>
      </View>
    </View>
  )
}

export default Input