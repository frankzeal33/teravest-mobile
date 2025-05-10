import { View, Text, ScrollView, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Header'
import Feather from '@expo/vector-icons/Feather';
import IconButton from '@/components/IconButton'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Details from '@/components/Details'
import { router, useLocalSearchParams } from 'expo-router'
// import { generateReceiptPDF, downloadReceiptPDF } from '@/utils/ReceiptPDF'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'
import displayCurrency from '@/utils/displayCurrency'

const TransactionReceiptScreen = () => {
  const [downloading, setDownloading] = useState(false);

  const { Recieptdata } = useLocalSearchParams() as any;
  const parsedRecieptdata=  Recieptdata? JSON.parse(Recieptdata) : null;

  const transaction =  {
    recipient: parsedRecieptdata?.recipient,
    amount: parsedRecieptdata?.amount,
    type: parsedRecieptdata?.category,
    channel: parsedRecieptdata?.channel,
    referenceCode: parsedRecieptdata?.merchantTxRef,
    rechargeToken: parsedRecieptdata?.rechargeToken,
    status: parsedRecieptdata?.status === "SUCCESS" || parsedRecieptdata?.status === "SUCCESSFUL" ? 'SUCCESSFUL' : parsedRecieptdata?.status === "FAIL" || parsedRecieptdata?.status === "FAILED" ? 'FAILED' : "PENDING",
    timestamp: moment(parsedRecieptdata?.timeStamp).format('llll'),
    category: parsedRecieptdata?.category,
    remark: !parsedRecieptdata?.remark ? "Nil" : parsedRecieptdata?.remark
  }

  // const shareReceipt = async () => {
  //   generateReceiptPDF(transaction)
   
  // }

  // const downloadReceipt = () => {
  //   downloadReceiptPDF(transaction)
  // }

  return (
    <SafeAreaView className="bg-white h-full px-4">
      <Header title='Transaction Receipt' showGoBack={true} onpress={() => router.back()}/>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='mt-3 items-center justify-center gap-1'>
          <View className='items-center flex-row gap-1'>
            {transaction.status === "SUCCESSFUL" ? (
              <AntDesign name="checkcircle" size={48} color="#22c55e" />
            ) : transaction.status === "FAILED" ? (
              <AntDesign name="closecircle" size={48} color="#ef4444" />
            ) : (
              <AntDesign name="minuscircle" size={48} color="#eab308" />
            )}
          </View>
          
          <View className='items-center mt-2'>
            <Text className="font-rbold text-base text-blue">PENDING</Text>
            <Text className="font-rbold text-4xl text-blue my-2">{displayCurrency(Number(transaction.amount))}</Text>
            <View className='items-end flex-row gap-1'>
              <Text className="font-rmedium text-xs text-blue">Reference Code:</Text>
              <Text className="font-rbold text-xs text-blue uppercase">ABDG-788766667677</Text>
            </View>
          </View>

          {/* Reference details */}
          <View className='bg-inputBg w-full mt-4 rounded-2xl p-4'>
            <View className='gap-2'>
              <View>
                <Text className="font-rbold text-lg text-black">Reference Details</Text>
              </View>
              <View>
                <Text className="font-rmedium text-base">Settlement Reference:</Text>
                <Text className="font-rbold text-base text-black">99924025021308102786</Text>
              </View>
              <View>
                <Text className="font-rmedium text-base">Transaction Date:</Text>
                <Text className="font-rbold text-base text-black">Feb 13, 2025, 8:08 AM</Text>
              </View>
            </View>
          </View>

          {/* Reference details */}
          <View className='bg-inputBg w-full mt-4 rounded-2xl p-4'>
            <View className='gap-1'>
              <View>
                <Text className="font-rbold text-lg text-black">Payment Details</Text>
              </View>
              <View>
                <Text className="font-rmedium text-base">Amount:</Text>
                <Text className="font-rbold text-base text-black">{displayCurrency(Number(transaction.amount))}</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">Fee:</Text>
                <Text className="font-rbold text-base text-black">{displayCurrency(Number(transaction.amount))}</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">VAT</Text>
                <Text className="font-rbold text-base text-black">40.00</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">Stamp Duty:</Text>
                <Text className="font-rbold text-base text-black">{displayCurrency(Number(transaction.amount))}</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">Currency:</Text>
                <Text className="font-rbold text-base text-black">NGN</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">Payment Channel:</Text>
                <Text className="font-rbold text-base text-black">Transfer</Text>
              </View>
              <View className='border border-gray-100/60 w-full my-1'/>
              <View>
                <Text className="font-rmedium text-base">Fee Bearer:</Text>
                <Text className="font-rbold text-base text-black">Account</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* <View>
        <View className='flex-row items-center justify-center gap-3 mb-5'>
          <IconButton title='Download' textStyles='text-white' icon={<MaterialCommunityIcons name="download-box" size={20} color="white" />} containerStyles='bg-orange w-1/2' handlePress={downloadReceipt}/>
          <IconButton title='Share' textStyles='text-white' icon={<FontAwesome name="send" size={18} color="white" />} containerStyles='bg-blue w-1/2' handlePress={shareReceipt}/>
        </View>
      </View> */}

      <View>
        <View className='w-full flex-row items-center justify-between gap-3 mt-6 mb-5'>
          <IconButton title='Download' textStyles='text-white' icon={<MaterialCommunityIcons name="download-box" size={20} color="white" />} containerStyles='bg-green w-[47%]'/>
          <IconButton title='Share' textStyles='text-green' icon={<FontAwesome name="send" size={18} color="#218225" />} containerStyles='bg-white border border-green w-[47%]'/>
        </View>
      </View>

      <Modal transparent={true} visible={downloading}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#FF6600" />
            <Text style={{ marginTop: 10, fontSize: 16, color: '#333' }}>Downloading...</Text>
          </View>
        </View>
      </Modal>

      <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default TransactionReceiptScreen