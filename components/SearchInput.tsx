import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

type formProps = {
  value?: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string,
  otherStyles?: string;
  [props:string]: any;
}

const SearchInput = ({ value, placeholder, handleChangeText, labelStyle, otherStyles, ...props}: formProps) => {
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="border-2 border-inputBg w-full h-[52px] px-2 bg-inputBg rounded-md focus:border-yellow-400 items-center gap-1 flex-row">
            <TouchableOpacity>
                <AntDesign name="search1" size={18} color="#ccc" />
            </TouchableOpacity>
            <TextInput className="flex-1 bg-inputBg text-black font-rregular text-base" placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText}/>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default SearchInput