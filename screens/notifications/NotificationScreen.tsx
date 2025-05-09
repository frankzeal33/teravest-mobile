import { View, Text, KeyboardAvoidingView, useWindowDimensions, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import { TabView, SceneMap } from 'react-native-tab-view';
import Transactions from './Transactions'
import Activities from './Activities'
import Updates from './Updates'


const NotificationScreen = () => {

    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

  
    const renderScene = SceneMap({
        first: Transactions,
        second: Activities,
        third: Updates
    });
  
    const routes = [
        { key: 'first', title: 'Transactions' },
        { key: 'second', title: 'Activities' },
        { key: 'third', title: 'Updates' },
    ];

  // Render the custom tab bar
  const renderTabBar = (props: any) => {
    return (
      <View className="flex-row gap-2 mx-4 mt-3">
        {props.navigationState.routes.map((route: any, i: number) => {
          const isFocused = props.navigationState.index === i;
  
          return (
            <TouchableOpacity
              key={i}
              className={`flex-1 items-center py-3 rounded-md ${
                isFocused ? 'bg-green' : 'bg-green/50'
              }`}
              onPress={() => props.jumpTo(route.key)}
            >
              <Text
                className={`text-sm font-rbold text-white`}
              >
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white h-full">
        <View className='px-4'>
            <Header title='Notifications' showGoBack={true} onpress={() => router.back()}/>
        </View>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{ width: layout.width }}
        />
        <StatusBar backgroundColor="#ffffff" style='dark'/>
    </SafeAreaView>
  )
}

export default NotificationScreen