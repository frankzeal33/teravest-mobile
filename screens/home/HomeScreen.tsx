import { View, Text, Pressable, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router'
import Octicons from '@expo/vector-icons/Octicons';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import displayCurrency from '@/utils/displayCurrency'
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import Transactions from '@/components/Transactions';

const investmentType = [
  {title: 'Basic'},
  {title: 'Mega'},
  {title: 'Premium'}
];

const cycleType = [
  { title: 'Weekly' },
  { title: '2 Weeks' },    
  { title: 'Monthly' },
  { title: '3 Months' },     
  { title: '6 Months' },   
  { title: '1 Year' },        
  { title: '2 Years' },       
  { title: '3 Years' },     
  { title: 'Lifetime' }
];

const transactions: any = [
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "DEBIT",
      paymentStatus: "COMPLETED"
    }
  },
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "CREDIT",
      paymentStatus: "FAILED"
    }
  },
  {
    details: {
      name: "ojiego franklin",
      accountNumber: "4950569504",
      amount: "50000",
      createdAt: "2025-05-06 14:30:00",
      paymentType: "DEBIT",
      paymentStatus: "PENDING"
    }
  }
]

const HomeScreen = () => {

  const navigation = useNavigation();
  const {top, bottom} = useSafeAreaInsets()
  const [hideStatus,setHideStatus] = useState<any>("false")
  const [loading, setLoading] = useState(false)

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  const getHideBalance = async () => {
    const hide = await AsyncStorage.getItem("hideBalance")
    setHideStatus(hide)
  }

  const hideBalance = async (hideValue: string) => {

    await AsyncStorage.setItem("hideBalance", hideValue)
    getHideBalance()

  }

  useFocusEffect(
    useCallback(() => {
      getHideBalance()
    }, [])
  );

  return (
    <SafeAreaView className="bg-white h-full">
      <StatusBar backgroundColor="#ffffff" style='dark'/>
      <View className="w-full justify-between items-center flex-row my-4 px-4">
        <Pressable className="items-center flex-row gap-2 max-w-40" onPress={openDrawer}>
          <View className='rounded-full items-center justify-center bg-green size-9'>
            <Text className='text-white font-rbold text-base'>OD</Text>
          </View>
          <View className='items-center flex-row gap-1'>
            <Text className="font-rmedium text-base">Welcome,</Text>
            <Text className="text-base font-rbold text-green" numberOfLines={1}>Oladapo Koiki!</Text>
          </View>
        </Pressable>

        <Pressable className='relative' onPress={() => router.push("/(drawer)/(routes)/Notifications")}>
          <View className='bg-red-500 w-2 h-2 rounded-full absolute right-0 top-0 z-10'/>
          <Octicons name="bell-fill" size={24} color="#218225" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className='flex-grow'>
        <View className='px-4 flex-1' style={{marginBottom: bottom + 80}}>
          <View className="flex-row items-center bg-white rounded-md mt-4 w-full">
            <View className="bg-red-500/30 h-14 rounded-l-md p-1 w-14 flex items-center justify-center">
              <FontAwesome5 name="exclamation-circle" size={24} color="#ef4444" />
            </View>
            <View className="flex-1 flex-row gap-1 px-2 items-center rounded-r-md border-l-0 h-14 border border-gray-100">
              <Text className="font-rlight text-base">Complete your</Text>
              <TouchableOpacity onPress={() => router.push("/(drawer)/(routes)/UserProfile")}>
                <Text className="font-rbold text-base">profile set up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='mt-6 flex-row items-center justify-between gap-1'>
            <SelectDropdown
              data={investmentType}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle1}>
                    <Text style={styles.dropdownButtonTxtStyle} numberOfLines={1}>
                      {(selectedItem && selectedItem.title) || 'Investment type'}
                    </Text>
                    <MaterialIcons name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#C3C3C3" />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#E4FFE5'})}}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />

            <SelectDropdown
              data={cycleType}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle2}>
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'Cycle'}
                    </Text>
                    <MaterialIcons name={isOpened ? 'arrow-drop-up' : 'arrow-drop-down'} style={styles.dropdownButtonArrowStyle} size={30} color="#C3C3C3" />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View key={index} style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#E4FFE5'})}}>
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>

          <View className='w-full mt-6 bg-green rounded-3xl min-h-96 px-6 py-8'>
            <View className='items-center flex-row gap-3'>
              <Text className="font-rmedium text-xl text-white">Portfolio Balance</Text>
              {hideStatus === "false" || !hideStatus ? (
                <TouchableOpacity className='items-center flex-row gap-1'  onPress={() => hideBalance('true')}>
                  <Feather name="eye" size={20} color="#ffffff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className='items-center flex-row gap-1' onPress={() => hideBalance('false')}>
                  <Feather name="eye-off" size={20} color="#ffffff"/>
                </TouchableOpacity>
              )}
            </View> 

            <View className='my-4'>
              <Text className="font-rbold text-4xl text-white">{displayCurrency(Number(1200000))}</Text>
            </View>

            <View className='bg-white rounded-2xl px-4 py-6'>
              <View className='gap-2'>
                <View className='flex-row items-center justify-between gap-1'>
                  <View className='flex-row gap-2 items-center'>
                    <View className='rounded-md bg-yellow-light size-12 items-center justify-center'>
                      <Ionicons name="arrow-undo-sharp" size={30} color="#FEC844" />
                    </View>
                    <Text className="font-rmedium text-xl">ROI Balance</Text>
                  </View>
                  <View>
                    <Image source={images.chart}/>
                  </View>
                </View>
                <Text className="font-rbold text-3xl text-black">{displayCurrency(Number(185000))}</Text>
              </View>

              <View className='border border-gray-100/60 w-full my-6'/>

              <View className='gap-2'>
                <View className='flex-row items-center justify-between gap-1'>
                  <View className='flex-row gap-2 items-center'>
                    <View className='rounded-md bg-yellow-light size-12 items-center justify-center'>
                      <MaterialCommunityIcons name="sack" size={28} color="#FEC844" />
                    </View>
                    <Text className="font-rmedium text-xl">Investment Balance</Text>
                  </View>
                </View>
                <Text className="font-rbold text-3xl text-black">{displayCurrency(Number(1850000))}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between w-full mt-6 gap-1">
              <CustomButton title="+  Top up" handlePress={() => router.push('/(drawer)/(tabs)/home')} containerStyles="w-[32%]" bgColor='bg-yellow' textStyles='text-green text-sm'/>
              <CustomButton title="Investment Overview" handlePress={() => router.push('/(drawer)/(tabs)/transactions')} containerStyles="w-[63%]" bgColor='bg-white' textStyles='text-green text-sm'/>
            </View>
          </View>

          <View className='mt-6'>
            <View className='flex-row gap-2 justify-between w-full'>
              <Text className="font-rbold text-lg">Recent Transactions</Text>
              <TouchableOpacity>
                <Text className="font-rbold text-lg text-green underline">See all</Text>
              </TouchableOpacity>
            </View>

            <View>
              
              {/* <View className='mt-4'>
                <View className='min-h-56 items-center justify-center'>
                    <View>
                      <Image source={images.noTransaction} className='mx-auto'/>
                      <View className='max-w-64 mt-2'>
                        <Text className="font-rbold text-center text-lg">No transactions yet</Text>
                        <Text className="font-rregular text-center text-sm text-gray-300">All your investment transactions will show here when you start</Text>
                      </View>
                    </View>
                </View>
              </View> */}

              {transactions?.map((item: any, index: number) => (
              
                  <Transactions item={item} index={index} isLast={index === transactions.length - 1} handlePress={() => router.push({
                    pathname: "/(drawer)/(tabs)/transactions",
                    params: { Recieptdata: JSON.stringify(item) },
                  })}/>
            
                ))
              }
                 
            </View>
          </View>
  
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  dropdownButtonStyle1: {
    width: "55%",
    height: 45,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonStyle2: {
    width: "40%",
    height: 45,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    color: '#218225',
    fontFamily: "Raleway-Medium",
  },
  dropdownButtonArrowStyle: {
    fontSize: 30,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    fontFamily: "Raleway-Medium",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});