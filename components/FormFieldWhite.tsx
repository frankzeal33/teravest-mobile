import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { KeyboardTypeOptions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type formProps = {
  title?: string; 
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

const FormFieldWhite = ({ title, value, placeholder, inputBg, keyboardType, handleChangeText, disabled, labelStyle, otherStyles, ...props}: formProps) => {
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  
    return (
    <View className={`space-y-2 ${otherStyles}`}>
      {title ? <Text className={`text-base font-rbold pb-2 ${labelStyle ? labelStyle : 'text-green'}`}>{title}</Text> : ''}
      <View className={`${inputBg ? inputBg : 'bg-white'} border-2 border-white w-full h-[52px] px-4 rounded-md focus:border-orange-300 items-center flex-row gap-1`}>
        <TextInput className={`${inputBg ? inputBg : 'bg-white'} flex-1 text-black font-aregular text-base h-full`} style={{ textAlignVertical: 'center' }} value={value} placeholder={placeholder} placeholderTextColor="#ccc" onChangeText={handleChangeText} secureTextEntry={title === "Password" ? !showPassword : title === "Confirm Password" ? !showConfirmPassword : title === "Current Password" ? !showCurrentPassword : title === "New Password" ? !showNewPassword : title === "Confirm New Password" ? !showConfirmNewPassword : false} keyboardType={keyboardType ? keyboardType: 'default'} editable={disabled}/>
        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={!showPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
        {title === "Confirm Password" && (
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={!showConfirmPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
        {title === "Current Password" && (
            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Ionicons name={!showCurrentPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
        {title === "New Password" && (
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Ionicons name={!showNewPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
        {title === "Confirm New Password" && (
            <TouchableOpacity onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                <Ionicons name={!showConfirmNewPassword ? "eye" : "eye-off"} size={24} color="#C3C3C3" />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormFieldWhite