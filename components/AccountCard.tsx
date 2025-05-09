import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AccountCard = ({item, handlePress, index}: {item: any; handlePress: () => void, index: number}) => {
  return (
    <View className='bg-white p-5 gap-3 rounded-lg w-[230px] min-h-[230px]'>
      <View className='w-full flex-row items-start justify-between'>
        <View className={`flex items-center justify-center size-14 rounded-full bg-green-100`}>
            <FontAwesome name="bank" size={24} color="#218225" />
        </View>
        <TouchableOpacity onPress={handlePress}>
          <FontAwesome name="trash" size={26} color="red" className='opacity-60'/>
        </TouchableOpacity>
      </View>
      <View className='w-full gap-2'>
        <Text className="font-rmedium text-lg">Access Bank</Text>
        <Text className="font-rbold text-3xl text-green">0123456789</Text>
        <Text className="font-rmedium text-lg">Oladapo Koiki</Text>
      </View>
    </View>
  )
}

export default AccountCard