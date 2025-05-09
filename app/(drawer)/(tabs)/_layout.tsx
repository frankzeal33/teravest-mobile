import { View, Image } from 'react-native'
import { Tabs, router } from 'expo-router'
import { icons } from '../../../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabIcon = ({icon, focused}: {icon: any; focused: boolean}) => {
  return (
    <View className={`items-center justify-center ${!focused ? 'opacity-60' : ''}`}>
      <Image source={icon} resizeMode='contain' className={`w-6 h-6`}/>
    </View>
  )
}
const TabsLayout = () => {

   const {top, bottom} = useSafeAreaInsets()

  return (
    <>
        <Tabs screenOptions={{ tabBarShowLabel: true, tabBarActiveTintColor: '#218225', tabBarInactiveTintColor: '#21822566', tabBarLabelStyle: { 
            fontFamily: 'Raleway-Bold',
            fontSize: 11
          }, 
          tabBarStyle: {
          backgroundColor: '#ffffff', 
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: bottom,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          marginHorizontal: 10,
          borderRadius: 6,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 6
        }}}>
            <Tabs.Screen name="home/index" options={{title: 'Home', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} focused={focused}/>
            )}}/>
            <Tabs.Screen name="investments/index" options={{title: 'Investments', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.investments} focused={focused}/>
            )}} listeners={() => ({
              tabPress: (e) => {
                e.preventDefault()
                router.push("/(drawer)/(routes)/Investments")
              }
            })}/>
            <Tabs.Screen name="transactions/index" options={{title: 'Transactions', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.transactions} focused={focused}/>
            )}}/>
            <Tabs.Screen name="more/index" options={{title: 'More', headerShown: false, tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.more} focused={focused}/>
            )}}/>
        </Tabs>
    </>
  )
}

export default TabsLayout