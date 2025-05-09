import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import {images} from '../constants'
import { KeyboardTypeOptions } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

type formProps = {
  title: string; 
  value?: string;
  placeholder?: any; 
  handleChangeText?: (e: any) => void;
  labelStyle?: string;
  inputBg?: string;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
  [props:string]: any;
}

const FormFieldSheet = ({ title, value, placeholder, inputBg, keyboardType, handleChangeText, labelStyle, otherStyles, ...props}: formProps) => {
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    return (
    <View className={`space-y-2 w-full ${otherStyles}`}>
      <Text className={`text-base font-rbold pb-2 ${labelStyle ? labelStyle : 'text-green'}`}>{title}</Text>
      <View className={`${inputBg ? inputBg : 'bg-inputBg'} border-2 border-inputBg w-full h-[52px] px-4 rounded-md focus:border-orange-300 items-center flex-row gap-1`}>
        <BottomSheetTextInput className={`${inputBg ? inputBg : 'bg-inputBg'} flex-1 text-black font-aregular text-base h-full`} value={value} placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText} secureTextEntry={title === "Password" ? !showPassword : title === "Confirm Password" ? !showConfirmPassword : false} keyboardType={keyboardType ? keyboardType : 'default'}/>
        {title === "Confirm Password" && (
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={!showConfirmPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormFieldSheet