import InvestmentScreen from '@/screens/investments/InvestmentScreen'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react';

export default function index() {

  useFocusEffect(
      useCallback(() => {
        const profile = () => {
          router.push('/(drawer)/(routes)/Investments')
        }
      
        profile()
      }, [])
    );

  return (
    <InvestmentScreen/>
  )
}