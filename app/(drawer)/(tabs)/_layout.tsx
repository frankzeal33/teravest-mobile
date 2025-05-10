import { View, Image, Platform } from 'react-native'
import { Tabs, router } from 'expo-router'
import { icons } from '../../../constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';

const TabIcon = ({icon, focused}: {icon: any; focused: boolean}) => {
  return (
    <View className={`items-center justify-center ${!focused ? 'opacity-60' : ''}`}>
      <Image source={icon} resizeMode='contain' className={`w-6 h-6`}/>
    </View>
  )
}
const TabsLayout = () => {

  const navigation = useNavigation();

   const {top, bottom} = useSafeAreaInsets()

   const bottomHeight = Platform.OS === 'ios' ? bottom : bottom + 10

   const marginX = Platform.OS === 'ios' ? 10 : 12

   const openDrawer = () => {
      navigation.dispatch(DrawerActions.toggleDrawer());
    };

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
          bottom: bottomHeight,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          marginHorizontal: marginX,
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
            )}}
            listeners={() => ({
              tabPress: (e) => {
                e.preventDefault()
                openDrawer()
              }
            })}/>
        </Tabs>
    </>
  )
}

export default TabsLayout