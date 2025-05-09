import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import CustomButton from './CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomButtomSheet from './CustomButtomSheet';
import AntDesign from '@expo/vector-icons/AntDesign';
// import { useToast } from 'react-native-toast-notifications';
// import { axiosClient } from '@/globalApi';
import * as SecureStore from "expo-secure-store";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const ConfirmPin = ({bottomSheetModalPinRef, closePinModal, onConfirmPin}: {bottomSheetModalPinRef: any; closePinModal: () => void; onConfirmPin: (pin: string) => void}) => {

    // const toast = useToast();
    const snapPoints = useMemo(() => ["55%","55%"], [])
    const { width, height } = Dimensions.get("window");
    const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"];
    const dialPadSize = width * 0.28;
    const pinLength = 4;
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [pinCode, setPinCode] = useState<any>([]);
    const [displayPinCode, setDisplayPinCode] = useState<any>([]);

    const handleSetPin = async () => {
      // if(pinCode.length === 4){
      //   const pin = pinCode.join('')
  
      //   try {
                
      //     setIsSubmitting(true)
      //     const token = await SecureStore.getItemAsync("accessToken")
      //     const result = await axiosClient.post("/transact/use-transaction-pin", {
      //       transactionPin: pin
      //     }, {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       }
      //     })

      //     closePinModal()

      //     onConfirmPin(pin)
    
      //   } catch (error: any) {
      //     toast.show(error.response.data.message || error.response.data.error.message,{
      //       type: "danger",
      //     });
      //   } finally {
      //     setIsSubmitting(false)
      //   }
  
      // }else if (pinCode.length === 0){
      //   toast.show("Pin fields are empty",{
      //     type: "error",
      //   });
      // }else if (pinCode.length < 4){
      //   toast.show("Pin must be 4 numbers",{
      //     type: "error",
      //   });
      // }else if (pinCode.length > 4){
      //   toast.show("Pin is greater than 4 numbers",{
      //     type: "error",
      //   });
      // }
    }

    const SetPinDailPad = ({ onPress }: {onPress: (item: string | number) => void}) => {
        return (
          <View>
            <FlatList
              data={dialPad}
              scrollEnabled={false}
              numColumns={3}
              style={{ flexGrow: 1 }}
              keyExtractor={(_, index) => index.toString()}
              columnWrapperStyle={{ gap: 7 }}
              contentContainerStyle={{ gap: 7 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => onPress(item)}
                    disabled={item === ""}
                  >
                    <View
                      style={{
                        width: dialPadSize,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 45
                      }}
                      className={`${item !== "" && item !== "del" && 'bg-inputBg rounded-md'}`}
                    >
                      {item === "del" ? (
                        <MaterialCommunityIcons
                          name="backspace-outline"
                          size={dialPadSize / 4}
                          color="#218225"
                        />
                      ) : item === "" ? (
                        <Ionicons
                          name="finger-print"
                          size={dialPadSize / 4}
                          color="white"
                        />
                      ) : (
                        <Text
                          style={{
                            fontSize: dialPadSize / 4,
                            fontWeight: "500",
                            color: "#218225",
                          }}
                        >
                          {item}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={() => (
                <View className='w-full justify-center my-4'>
                    <CustomButton title="Confirm PIN" handlePress={handleSetPin} containerStyles="w-full" textStyles='text-white' isLoading={isSubmitting}/>
                </View>
              )}
            />
          </View>
        );
      };

  return (
    <CustomButtomSheet ref={bottomSheetModalPinRef} snapPoints={snapPoints} onDismiss={closePinModal}>
        <View>
          <TouchableOpacity className='flex-row justify-end' onPress={closePinModal}>
              <AntDesign name="closecircle" size={32} color="#C3C3C3" />
          </TouchableOpacity>

          <Text className="text-xl font-rbold mt-2 text-center mb-1">Enter Transaction PIN</Text>

          <View className='items-center justify-between gap-2'>
              <View className='flex-row gap-2 my-4 items-center justify-center'>
              {[...Array(pinLength).keys()].map((index) => {
                  // const isSelected = !!pinCode[index];
                  const isSelected = displayPinCode[index] ?? "";

                  return (
                  <View key={index} className='size-10 bg-inputBg rounded-lg items-center justify-center'>
                      <Text className='font-amedium text-2xl text-blue'>{isSelected}</Text>
                  </View>
                  );
              })}
              </View>
      
              <View style={{ justifyContent: 'center'}}>
                <SetPinDailPad
                    onPress={(item) => {
                    if (item === "del") {

                        if(pinCode.length > 4){

                          pinCode.splice(3, pinCode.length - 2);
                          displayPinCode.splice(3, pinCode.length - 2);
                
                        }else{
                          setPinCode((prevCode: any) => prevCode.slice(0, prevCode.length - 1));
                          setDisplayPinCode((prevCode: any) => prevCode.slice(0, prevCode.length - 1));
                        }

                    } else if (typeof item === "number") {

                      if(pinCode.length < 4){
                        setPinCode((prevCode: any) => [...prevCode, item]);
                        setDisplayPinCode((prevCode: any) => [...prevCode, item]);

                        // After 500ms, replace the last entered number with "*"
                        setTimeout(() => {
                          setDisplayPinCode((prevCode: any) => {
                            const updated = [...prevCode];
                            if (updated.length > 0) {
                              updated[updated.length - 1] = "*";
                            }
                            return updated;
                          });
                        }, 200);
                      }
                      
                    }
                    }}
                />
              </View>
          </View>
        </View>
    </CustomButtomSheet>
  )
}

export default ConfirmPin