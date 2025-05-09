import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton';
import FormFieldWhite from '@/components/FormFieldWhite';


const ManagePassword = () => {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })

      const submit = () => {

      }
      
  return (
    <View className='flex-1 px-4'>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 0}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='mt-2'>
                    <View>
                        <FormFieldWhite title="Current Password" value={form.currentPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, currentPassword: e })} otherStyles="mt-7"/>
                        <FormFieldWhite title="New Password" value={form.newPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, newPassword: e })} otherStyles="mt-7"/>
                        <FormFieldWhite title="Confirm New Password" value={form.confirmNewPassword} placeholder="Enter here" handleChangeText={(e: any) => setForm({ ...form, confirmNewPassword: e })} otherStyles="mt-7"/>
                    </View>    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        <View className='w-full justify-center my-4'>
          <CustomButton title="Update" handlePress={submit} containerStyles="w-full" isLoading={isSubmitting} textStyles='text-white'/>
        </View>
    </View>
  )
}

export default ManagePassword
