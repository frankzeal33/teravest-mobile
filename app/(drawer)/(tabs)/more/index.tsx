import { useCallback, useEffect } from 'react'
import UserProfile from '../../(routes)/UserProfile'
import { router } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

export default function index() {

  useFocusEffect(
    useCallback(() => {
      const profile = () => {
        router.push('/(drawer)/(routes)/UserProfile')
      }
    
      profile()
    }, [])
  );

  return (
    <UserProfile/>
  )
}