import { View, Text, Pressable } from 'react-native'

type rowProp = {
    title: string;
    value: string; 
    status?: string;
    type?: string
}

export default function Details({title, value, status, type}: rowProp) {
  return (
    <View className="justify-between w-full flex-row gap-2 items-start bg-white border-b border-gray-100 rounded-lg py-2">
        <View className="items-center flex-row gap-1">
            <Text className="font-rmedium text-sm text-blue">{title}</Text>
        </View>

        <Text className={`font-rbold text-lg text-right max-w-60 ${status === "SUCCESSFUL" || type === "CREDIT" ? "text-green-500" : status === "FAILED" || type === "DEBIT" ? "text-red-500" : status === "PENDING" ? "text-yellow-600" : "text-blue"}`}>{value}</Text>
    </View>
  )
}